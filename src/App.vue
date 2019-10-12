<template>
  <div id="app">
    <div class="h-screen w-screen flex bg-gray-200">
      {{language}}
      <div class="w-1/2 text-gray-700 text-center bg-gray-400 p-2 m-2 flex items-center justify-center">
        <textarea v-model="text" class="w-full h-full border rounded focus:outline-none"/>
      </div>
      <div class="w-1/2 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 flex items-center justify-center">
        <div class="hyphenate resize overflow-auto m-2 px-4 py-2 bg-white shadow">{{text}}</div>
        <div class="hyphenate resize overflow-auto m-2 px-4 py-2 bg-white shadow bg-yellow-300">
          {{$hyphenate.de(text)}}
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
    language: ''
  }),
  watch: {
    text (val) {
      this.language = this.$franc(val, { only: ['por', 'spa', 'eng', 'deu', 'fra'] })
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
</style>
