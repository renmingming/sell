<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease " v-show="food.count>0" @click.stop="decreaseCart">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import bus from 'components/bus.js'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          console.log(this.food.count)
          // this.food.count = 1直接赋值是不行的，需要vue接口
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        /* this.$dispatch('cart.add', event.target) */
        bus.$emit('cart.add', event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size:0
    .cart-decrease
      display:inline-block
      padding: 6px
      transition: all 0.4s linear
      .inner
        display:inline-block
        line-height:24px
        font-size:24px
        color:rgb(0,160,220)
      &.move-enter-active, &.move-leave
        opacity:1
        transform: translate3D(0, 0, 0)
        .inner
          display:inline-block
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3D(24px, 0, 0)
        .inner
          transform: rotate(360deg)
    .cart-count
      display:inline-block
      vertical-align:top
      width:12px
      padding-top:6px
      line-height:24px
      text-align:center
      font-size:10px
      color:rgb(147,153,159)
    .cart-add
      display:inline-block
      padding:6px
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
</style>
