<template>
  <div id="app">
    <div class="h-screen w-screen flex bg-gray-200">
      <div class="w-1/2 text-gray-700 text-center bg-gray-400 p-2 m-2 flex flex-col items-center justify-center">
        <textarea v-model="text" class="w-full h-full border rounded focus:outline-none p-2"/>
        <div class="flex flex-col rounded p-2 m-2 mb-0 bg-white shadow items-center">
          <flag v-if="language.icon" :iso="language.icon" :squared="false" class="text-5xl shadow"/>
          <div class="text-5xl font-semibold" v-else>?</div>
          <span class="font-semibold mt-2">{{language.label}}</span>
        </div>
      </div>
      <div class="w-1/2 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 flex flex-col items-center justify-center">
        <div class="hyphenate resize overflow-auto m-2 px-4 py-2 bg-white shadow">{{text}}</div>
        <div class="w-1/2 resize overflow-auto bg-white rounded shadow p-2">
          <div class="flex border-b mb-2 justify-between items-center cursor-pointer">
            <span class="font-bold text-md mx-4">hyphen</span>
            <img class="m-3" width="30" src="./assets/img/github.svg"/>
          </div>
          <div class="hyphenate mt-2 hyphens-manual bg-red-100 flex-1">
            {{hyphenTranslated}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: () => ({
    text: '',
    detectedLanguage: 'und',
    languages: {
      por: { label: 'Portuguese', icon: 'pt' },
      spa: { label: 'Spanish', icon: 'es' },
      eng: { label: 'English', icon: 'us' },
      deu: { label: 'German', icon: 'de' },
      fra: { label: 'French', icon: 'fr' },
      ita: { label: 'Italian', icon: 'it' },
      und: { label: 'Language undefined' }
    }
  }),
  computed: {
    language () {
      return this.languages[this.detectedLanguage]
    },
    hyphenTranslated () {
      const hyphenator = this.$hyphenate[this.detectedLanguage]
      console.log('hyphenator', hyphenator)
      return hyphenator ? hyphenator(this.text) : this.text
    }
  },
  watch: {
    text (val) {
      this.detectedLanguage = this.$franc(val, { only: ['por', 'spa', 'eng', 'deu', 'fra', 'ita'] })
    }
  },
  created () {
    this.$lx.init()
      .then(reportSetup => {
        this.$lx.ready({})
      })
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.hyphenate
  overflow-wrap break-word
  word-wrap break-word
  hyphens auto
  -webkit-hyphens auto
  -ms-hyphens auto
  // hyphenate-limit-chars 10 4 4

.hyphens-none
  hyphens none

.hyphens-manual
  hyphens manual

.hyphens-auto
  hyphens auto
</style>
