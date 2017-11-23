<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box :placeholder="placeholder" ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="(item, index) in hotkey">
                <span v-text="item.k"></span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @select="addQuery" @delete="deleteOne" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="searchResult">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空所有搜索历史？" confirmBtnText="清空" @confirm="deleteAll"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
  import SearchBox from '@/base/search-box/search-box'
  import SearchList from '@/base/search-list/search-list'
  import Scroll from '@/base/scroll/scroll'
  import Confirm from '@/base/confirm/confirm'
  import Suggest from '@/components/suggest/suggest'
  import {getHotKey} from '@/api/search'
  import {ERR_OK} from '@/api/config'
  import {playlistMixin, searchMixin} from '@/common/js/mixin'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    mixins: [playlistMixin],
    created(){
      this._getHotKey()
    },
    data(){
      return {
        placeholder: '搜索歌曲、歌手',
        hotkey: [],
        query: ''
      }
    },
    watch: {
      query(newQuery) {
        if(!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    computed: {
      shortcut() {
        return this.hotkey.concat(this.searchHistory)
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0? '60px' : ''
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      deleteAll() {
        this.clearSearchHistory()
      },
      deleteOne(item) {
        this.deleteSearchHistory(item)
      },
      blurInput() {
        this.$refs.searchBox.blur()
      },
      onQueryChange(query) {
        this.query = query
      },
      _getHotKey() {
        getHotKey().then((res) => {
          if(res.code === ERR_OK){
            this.hotkey = res.data.hotkey.slice(0, 10)
            console.log(res.data.hotkey)
          }
        })
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      saveSearch() {
        console.log('search')
        this.saveSearchHistory(this.query)
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
   components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
   }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      z-index: 10
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>