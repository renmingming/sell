<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" >
        <div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty"  @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrappe">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixin.styl"
  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index:50
    width:100%
    height:48px
    .content
      display:flex
      font-size:0
      background:#141d27
      .content-left
        flex:1
        color:rgba(255,255,255,0.4)
        .logo-wrapper
          display:inline-block
          position:relative
          top: -10px
          margin:0 12px
          padding: 6px
          width: 56px
          height:56px
          box-sizing:border-box
          vertical-align: top
          border-radius:50%
          background: #141d27
          .logo
            width:100%
            height:100%
            border-radius:50%
            text-align:center
            background:#2b343c
            &.highlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color:#80858a
              &.highlight
                color: #ffffff
          .num
            position:absolute
            top:0
            right:0
            width: 24px
            height: 16px
            line-height: 16px
            text-align:center
            border-radius:16px
            font-size: 9px
            font-weight:700
            color: #ffffff
            background:rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display:inline-block
          vertical-align:top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing:border-box
          border-right:1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight:700
          color:rgba(255,255,255,0.4)
          &.highlight
            color: #ffffff
        .desc
          display:inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          color:rgba(255,255,255,0.4)
          font-size: 10px
      .content-right
        flex:0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align:center
          font-size: 12px
          font-weight:700
          color:rgba(255,255,255,0.4)
          background:#2b333b
          &.no-enough
            background:#2b333b
          &.enough
            background:#00b43c
            color:#fff
    .ball-container
      .ball
        position:fixed
        left: 32px
        bottom: 32px
        z-index:200
      .drop-enter-active
        transition: all 5s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width: 16px
          height: 16px
          border-radius:50%
          background:rgb(0,160,220)
          transition: all 0.4s
    .shopcart-list
      position:absolute
      top:0
      left:0
      z-index:-1
      width:100%
      transform:translate3d(0,-100%,0)
      &.fold-enter-active, &.fold-leave
        transition:all 0.4s
        transform:translate3d(0,-100%,0)
      &.fold-enter, &.fold-leave-active
        transition:all 0.4s
        transform:translate3d(0,0,0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .title
          float:left
          margin:0
          font-size: 14px
          color:rgb(7,17,27)
        .empty
          float:right
          font-size: 12px
          color:rgb(0,16,220)
      .list-content
        padding:0 18px
        max-height: 217px
        overflow:hidden
        background: #ffffff
        .food
          position:relative
          padding:12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height: 24px
            font-size: 14px
            color:rgb(7,17,27)
          .price
            position:absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight:700
            color:rgb(240,20,20)
          .cartcontrol-wrappe
            position:absolute
            right:0
            bottom: 6px
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import bus from 'components/bus.js'
    export default{
      props: {
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        },
        selectFoods: {
          type: Array,
          default() {
            return [
              {
                price: 20,
                count: 2
              }
            ]
          }
        }
      },
      data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          dropBall: [],
          fold: true
        }
      },
      computed: {
        // 总价
        totalPrice() {
          let total = 0
          this.selectFoods.forEach((food) => {
            total += food.price * food.count
          })
          return total
        },
        // 总件数
        totalCount() {
          let count = 0
          this.selectFoods.forEach((food) => {
            count += food.count
          })
          return count
        },
        // 判断购买状态
        payDesc() {
          if (this.totalPrice === 0) {
            return `¥${this.minPrice}元起送`
          } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice
            return `还差¥${diff}元起送`
          } else {
            return '去结算'
          }
        },
        // 购买状态Class
        payClass() {
          if (this.totalPrice < this.minPrice) {
            return 'no-enough'
          } else {
            return 'enough'
          }
        },
        listShow() {
          if (!this.totalCount) {
            this.fold = true
            return false
          }
          let show = !this.fold
          if (show) {
            this.$nextTick(() => {
              if (!this.scroll) { // 在没有的时候添加
                // 添加滚动
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                })
              } else {
                this.scroll.refresh() // 系统和他的高度差，决定是否滚动bs自带
              }
            })
          }
          return show
        }
      },
      created() {
        bus.$on('cart.add', function drop(target) {
          // 体验优化，异步执行下落动画
          this.$nextTick(() => {
            console.log(this.balls)
            for (let i = 0; i < this.balls; i++) {
              let ball = this.balls[i]
              console.log(ball.show)
              if (ball.show) {
                ball.show = true
                ball.el = target
                this.dropBall.push(ball)
                return
              }
            }
          })
        })
      },
      methods: {
        toggleList() {
          if (!this.totalCount) {
            return
          }
          this.fold = !this.fold
        },
        empty() {
          this.selectFoods.forEach((food) => {
            food.count = 0
          })
        }
      },
      components: {
        cartcontrol
      },
      transition: {
        drop: {
          beforeEnter(el) {
            let count = this.balls.length
            while (count--) {
              let ball = this.balls[count]
              if (ball.show) {
                let rect = ball.el.getBoundingClientRect() // 相对于屏幕的位置
                let y = -(window.innerHeight - rect.top - 22)
                el.style.display = ''
                el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                el.style.transform = `translate3d(0, ${y}px, 0)`
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = `translate3d(${y}px, 0, 0)`
                inner.style.transform = `translate3d(${y}px, 0, 0)`
              }
            }
          },
          enter(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight
            this.$nextTick(() => {
              el.style.display = ''
              el.style.webkitTransform = 'translate3d(0, 0, 0)'
              el.style.transform = 'translate3d(0, 0, 0)'
              let inner = el.getElementsByClassName('inner-hook')[0]
              inner.style.webkitTransform = 'translate3d(0, 0, 0)'
              inner.style.transform = 'translate3d(0, 0, 0)'
            })
            done()
          },
          afterEnter(el) {
          }
        }
      }
    }
</script>
