<template>
  <div id="app">
   <music-header></music-header>
   <tab></tab>
   <keep-alive>
     <router-view></router-view>
   </keep-alive>
   <player></player>
  </div>
</template>

<script>
import musicHeader from '@/components/header/musicHeader'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
export default {
  name: 'app',
  mounted() {
    document.addEventListener('touchmove', function (e) { 
      e.preventDefault(); 
    }, false)
  },
  components: {
    musicHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import 'common/stylus/variable'
#app
  color: $color-theme
</style>
