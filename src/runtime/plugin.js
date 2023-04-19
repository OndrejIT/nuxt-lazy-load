import { defineNuxtPlugin } from '#app'
import { options } from '#build/nuxt-lazy-load-options'

export default defineNuxtPlugin(nuxtApp => {
  let observer = null
  const isPictureChild = el => el.parentNode && el.parentNode.tagName.toLowerCase() === 'picture'

  const setAttribute = (el, attribute) => {
    const dataAttribute = `data-${attribute}`

    if (Array.isArray(el)) for (const item of el) setAttribute(item, attribute)
    else if (el.getAttribute(dataAttribute)) {
      el.setAttribute(attribute, el.getAttribute(dataAttribute))
      el.removeAttribute(dataAttribute)
      if (el.parentNode.load) el.parentNode.load()
    } else if (el.tagName.toLowerCase() === 'picture') {
      const img = el.querySelector('img')
      if(img) {
        setAttribute(img, 'src')
        setAttribute(img, 'srcset')
        img.addEventListener('load', () => setClass(el))
      }
    }
  }

  const setClass = el => {
    el.classList.remove(options.loadingClass)
    if (options.loadedClass) el.classList.add(options.loadedClass)
  }

  const setEvents = el => {
    const tagName = el.tagName.toLowerCase()
    let eventName = 'load'
    if (['video', 'audio'].includes(tagName)) eventName = 'loadeddata'

    el.addEventListener(eventName, () => {
      if (isPictureChild(el)) {
        if (el.parentNode.getAttribute('data-not-lazy') === null) setClass(el.parentNode)
        else el.parentNode.removeAttribute('data-not-lazy')
      } else setClass(el)
    })
  }

  // Observer
  if (process.client) {
    observer = new IntersectionObserver((entries, self) => {
      for (const { isIntersecting, target } of entries) {
        if (isIntersecting) {
          let el = target;
          if (!isPictureChild(el) && options.loadingClass) el.classList.add(options.loadingClass)

          const source = el.querySelectorAll('source')
          setAttribute(el, 'poster')

          if (source.length) el = [...source]
          setAttribute(el, 'src')
          setAttribute(el, 'srcset')
          self.unobserve(target)
        }
      }
    }, options.observerConfig)
  }

  // Directives
  nuxtApp.vueApp.directive('lazy-load', {
    beforeMount(el) {
      setEvents(el)
      if (!isPictureChild(el) && options.appendClass) el.classList.add(options.appendClass)
    },

    mounted(el) {
      if (observer) observer.observe(el)
      if (options.defaultImage && el.tagName.toLowerCase() === 'img') el.src = options.defaultImage
    },

    getSSRProps() {
      return {}
    }
  })

  nuxtApp.vueApp.directive('not-lazy', {
    beforeMount(el) {
      for (const item of [...el.querySelectorAll('source'), ...el.querySelectorAll('img')]) {
        setAttribute(item, 'src')
        setAttribute(item, 'srcset')
      }

      if (el.tagName.toLowerCase() !== 'picture') el.removeAttribute('data-not-lazy')
    },

    getSSRProps() {
      return {}
    }
  })
})
