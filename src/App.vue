<template>
  <div id="app">
    <div class="h-screen w-screen flex bg-gray-200">
      <div class="flex-1 text-gray-700 text-center bg-gray-400 p-2 m-2 flex flex-col items-center justify-center">
        <div class="flex flex-col rounded p-2 m-2 bg-white shadow items-center">
          <template v-if="text">
            <flag v-if="language.icon" :iso="language.icon" :squared="false" class="text-5xl shadow"/>
            <div class="text-5xl font-semibold" v-else>?</div>
          </template>
          <span class="font-semibold mt-2">{{text ? language.label : 'Enter some text below...'}}</span>
        </div>
        <textarea v-model="text" class="w-full h-full border rounded focus:outline-none p-2"/>
      </div>
      <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 flex flex-col items-center justify-center">
        <div class="w-1/2 hyphenate resize overflow-auto m-2 p-2 bg-white shadow">
          <div class="flex border-b mb-2 justify-between items-center">
            <span class="font-bold text-md mx-4">Browser's native hyphenation (auto)</span>
          </div>
          <div class="bg-blue-700 shadow text-white">{{text}}</div>
        </div>
        <div class="mt-4 w-1/2 resize overflow-auto bg-white rounded shadow p-2">
          <div class="flex border-b mb-2 justify-between items-center cursor-pointer">
            <span class="font-bold text-md mx-4">JS library: <span class="underline">hyphen</span></span>
          </div>
          <div class="hyphenate mt-2 hyphens-manual bg-green-700 text-white shadow">
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
