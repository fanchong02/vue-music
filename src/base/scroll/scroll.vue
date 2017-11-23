<template>
  <div ref="wrapper">
  <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      }
    },
    mouted() {
      setTimeout(() => {
        this._initScroll() 
      })
    },
    methods: {
      _initScroll() {
        if(!this.$refs.wrapper){
          return
        }else{
          this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: this.click
          })
        }

        if(this.listenScroll) {
          let me = this
          this.scroll.on('scroll',(pos)=> {
            me.$emit('scroll',pos)
          })
        }
        //pullup refresh
        if(this.pullup){
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y<=this.scroll.maxScrollY + 50){
              this.$emit('scrollToEnd')
            }
          })
        }
        if(this.beforeScroll) {
          this.scroll.on('beforeScrollStar', ()=> {
            this.$emit('beforeScroll')
          })
        }
      },
      enable() {
        this.scroll && this.scroll.disable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this._initScroll() 
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  
</style>