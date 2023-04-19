![nuxt-lazy-load](https://drive.google.com/a/broj42.com/uc?id=186beiHH4j6fTdRpTnM_khROLL1a7c5Oc)
```bash
npm i nuxt-lazy-load
```

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![npm downloads][kofi-src]][kofi-href]


## 👉 Description
You don't need to bother with extra attributes on elements (like **data-src** and **data-srcset**), just add the **module** in **nuxt.config.js** and that's it

⚠️ For Nuxt 2, use **nuxt-lazy-load** < 3.0.0

## 🚀 Usage
```javascript
// nuxt.config.js (nuxt.config.ts)
modules: [
  'nuxt-lazy-load'
]
```

## 🔧 Options
```javascript
modules: [
  'nuxt-lazy-load'
],

lazyLoad: {
  // These are the default values
  images: true,
  videos: true,
  audios: true,
  iframes: true,
  native: false,
  directiveOnly: false,
  
  // Default image must be in the public folder
  defaultImage: '/images/default-image.jpg',

  // To remove class set value to false
  loadingClass: 'isLoading',
  loadedClass: 'isLoaded',
  appendClass: 'lazyLoad',
  
  observerConfig: {
    // See IntersectionObserver documentation
  }
}
```

#### directiveOnly
If you don't want to use lazy load on every image/video/audio/iframe, set **directiveOnly** to **true** and use directive like this (with data-src/data-srcset/data-poster)
```html
<img data-src="image.png" alt="" title="" v-lazy-load>
```
You don't need to add directive (**v-lazy-load**) on source elements
```html
<video data-poster="~/assets/images/poster.jpg" v-lazy-load>
  <source data-src="video.mp4" type="video/mp4"> --> without directive
</video>
```

#### data-not-lazy
If you don't want to lazy load single element, just add **data-not-lazy** attribute
```html
<audio controls="controls" data-not-lazy>
  <source type="audio/mpeg" src="audio.mp3">
</audio>
```

### Buy me a coffee
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31MWWL)

<!-- Badges -->
[npm-version-src]: https://badgen.net/npm/v/nuxt-lazy-load/latest
[npm-version-href]: https://npmjs.com/package/nuxt-lazy-load

[kofi-src]: https://badgen.net/badge/icon/kofi?icon=kofi&label=support
[kofi-href]: https://ko-fi.com/darioferderber

[npm-downloads-src]: https://badgen.net/npm/dm/nuxt-lazy-load
[npm-downloads-href]: https://npmjs.com/package/nuxt-lazy-load