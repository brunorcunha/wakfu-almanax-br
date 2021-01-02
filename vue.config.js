module.exports = {
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  pwa: {
    name: 'Wakfu-Almanax',
    msTileColor: '#ffffff',
    themeColor: '#f5c20a',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'Wakfu-Almanax',
      short_name: 'Almanax',
      orientation: 'portrait',
      themeColor: '#f5c20a'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'dev/sw.js'
    }
  }
};
