import { defineNuxtModule, addPlugin, addTemplate, createResolver, extendViteConfig } from '@nuxt/kit'
import { replaceCodePlugin } from './replace'

const isNotLazy = (text, options, kind) => text.includes('data-not-lazy') || (options && !options[kind])

const replaceAttrs = (text, tag, attrs, directiveOnly) => {
  if (text.includes('devtools')) return text
  if (!directiveOnly && tag) {
    const regex = new RegExp(`<${tag}`)
    text = text.replace(regex, `<${tag} v-lazy-load `)
  }

  for (const attr of attrs) {
    const regex = new RegExp(`${attr}=`, 'g')
    text = text.replace(regex, `data-${attr}=`)
  }

  return text
}

export default defineNuxtModule({
  meta: {
    name: 'nuxt-lazy-load',
    configKey: 'lazyLoad'
  },
  defaults: {
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,
    defaultImage: false,
    loadingClass: 'isLoading',
    loadedClass: 'isLoaded',
    appendClass: 'lazyLoad',
    observerConfig: {}
  },
  setup(options, nuxt) {
    extendViteConfig(config => {
      if (!config?.vue?.template?.transformAssetUrls) config.vue.template.transformAssetUrls = {}
      config.vue.template.transformAssetUrls['img'] = [
        'src',
        'data-src',
        'srcset',
        'data-srcset',
        'data-flickity-lazyload'
      ]
      config.vue.template.transformAssetUrls['video'] = ['src', 'data-src', 'poster', 'data-poster']
      config.vue.template.transformAssetUrls['source'] = ['src', 'data-src', 'srcset', 'data-srcset']
      config.vue.template.transformAssetUrls['audio'] = ['src', 'data-src']

      let replacements = []
      if (!options.native) {
        replacements = [
          {
            from: /<img[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'images')
                ? match
                : replaceAttrs(match, 'img', ['src', 'srcset'], options.directiveOnly)
          },
          {
            from: /<source[^>]*?>/g,
            to: match =>
              isNotLazy(match) ? match : replaceAttrs(match, null, ['src', 'srcset'], options.directiveOnly)
          },
          {
            from: /<video[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'videos')
                ? match.replace('<video', '<video v-not-lazy')
                : replaceAttrs(match, 'video', ['src', 'poster'], options.directiveOnly)
          },
          {
            from: /<picture[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'images')
                ? match.replace('<picture', '<picture v-not-lazy')
                : replaceAttrs(match, 'picture', ['src'], options.directiveOnly)
          },
          {
            from: /<audio[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'audios')
                ? match.replace('<audio', '<audio v-not-lazy')
                : replaceAttrs(match, 'audio', ['src'], options.directiveOnly)
          },
          {
            from: /<iframe[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'iframes')
                ? match.replace('<iframe', '<iframe v-not-lazy')
                : replaceAttrs(match, 'iframe', ['src'], options.directiveOnly)
          }
        ]
      } else {
        replacements = [
          {
            from: /<img[^>]*?>/g,
            to: match => (isNotLazy(match, options, 'images') ? match : match.replace('<img', '<img loading="lazy"'))
          },
          {
            from: /<video[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'videos') ? match : match.replace('<video', '<video loading="lazy"')
          },
          {
            from: /<audio[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'audios') ? match : match.replace('<audio', '<audio loading="lazy"')
          },
          {
            from: /<iframe[^>]*?>/g,
            to: match =>
              isNotLazy(match, options, 'iframes') ? match : match.replace('<iframe', '<iframe loading="lazy"')
          }
        ]
      }

      config.plugins.push(
        replaceCodePlugin({
          replacements
        })
      )
    })

    if (!options.native) {
      const resolver = createResolver(import.meta.url)
      addPlugin(resolver.resolve('./runtime/plugin'))
      addTemplate({
        filename: 'nuxt-lazy-load-options.js',
        write: true,
        getContents: () => `export const options = ${JSON.stringify(options, undefined, 2)}`
      })
    }
  }
})
