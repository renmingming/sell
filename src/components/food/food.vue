<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
          <div class="image-head">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :select-type="selectType" :desc="desc" :ratings="food.ratings" :only-content="onlyContent" ></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px" v-for="rating in food.ratings">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType==1}"></span>{{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/mixin.styl"
  .food
    position: fixed
    left:0
    top:0
    bottom: 48px
    z-index:30
    width:100%
    background: #ffffff
    &.move-enter-active,&.move-leave
      transition:all 0.2s linear
      transform:translate3D(0,0,0)
    &.move-enter,&.move-leave-active
      transition:all 0.2s linear
      transform:translate3D(100%,0,0)
    .image-head
      position:relative
      width:100%
      height:0
      padding-top:100%
      img
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
      .back
        position:absolute
        top: 10px
        left:0
        .icon-arrow_lift
          display:block
          padding: 10px
          font-size: 20px
          color: #ffffff
    .content
      position:relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight:bold
        color:rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size:0
        .sell-count, .rating
          font-size: 10px
          color:rgb(147,153,159)
        .sell-count
          margin-left: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color:rgb(240,20,24)
        .old
          text-decoration: line-through
          font-size: 10px
          color:rgb(147,153,159)
      .cartcontrol-wrapper
        position:absolute
        right: 12px
        bottom: 12px
      .buy
        position:absolute
        right: 18px
        bottom: 18px
        z-index:10
        height: 24px
        line-height: 24px
        padding:0 12px
        box-sizing:border-box
        font-size: 10px
        border-radius:12px
        color: #ffffff
        background:rgb(0,160,220)
        &.fade-enter-active, &.fade-leave
          transition:all 0.4s
          opacity:1
        &.fade-enter, &.fade-leave-active
          transition:all 0.4s
          opacity:0
    .info
      padding: 18px
      .title
        line-hieght:14px
        margin-bottom: 6px
        font-size: 14px
        color:rgb(7,17,27)
      .text
        line-height: 24px
        padding:0 8px
        font-size: 12px
        color:rgb(77,85,93)
    .rating
      padding-top: 18px
      .title
        line-hieght:14px
        margin-left: 18px
        font-size: 14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position:relative
          padding: 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position:absolute
            right:0
            top: 16px
            line-height: 12px
            font-size:0
            .name
              display:inline-block
              margin-right: 6px
              vertical-align:top
              font-size: 10px
              color:rgb(147,153,159)
            .avatar
              border-radius:50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color:rgb(147,153,159)
          .text
            line-height: 16px
            font-size: 12px
            color:rgb(7,17,27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color:rgb(0,160,220)
            .icon-thumb_down
              color:rgb(147,153,159)
      .no-rating
        padding:16px 0
        font-size: 12px
        color:rgb(147,153,159)
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import {formatDate} from 'common/js/date.js' // {}export出来的方法要加花括号，可以export出多个，export default不用加
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import ratingselect from 'components/ratingselect/ratingselect'
  import split from 'components/split/split'
  import bus from 'components/bus.js'
 /* const POSITIVE = 0
  const NEGATIVE = 1 */
  const ALL = 2
    export default{
      props: {
        food: {
          type: Object
        }
      },
        data() {
            return {
              showFlag: false,
              selectType: ALL, // 选择全部
              onlyContent: false, // 是否读内容
              desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
              }
            }
        },
        created() {
          bus.$on('ratingtype.select', (type) => {
            this.selectType = type
            this.$nextTick(() => {
              this.scroll.refresh()
            })
          })
          bus.$on('content.toggle', (onlyContent) => {
            console.log(onlyContent)
            this.onlyContent = onlyContent
            this.$nextTick(() => {
              this.scroll.refresh()
            })
          })
        },
        methods: {
          show() {
            this.showFlag = true
            this.selectType = ALL // 可能多次使用，在这里重新初始化一下，确保每次为初始化状态
            this.onlyContent = true // 可能多次使用，在这里重新初始化一下，确保每次为初始化状态
            this.$nextTick(() => { // nextTick接口保证dome是渲染的
              if (!this.scroll) { // 可能多次
                this.scroll = new BScroll(this.$refs.food, {
                  click: true
                })
              } else {
                this.scroll.refresh() // 重新做一次
              }
            })
          },
          hide() {
            this.showFlag = false
          },
          addFirst(event) {
            if (!event._constructed) {
              return
            }
            Vue.set(this.food, 'count', 1)
          },
          needShow(type, text) { // 内容匹配显示
            if (this.onlyContent && !text) { // 不看内容 并且没有内容
              return false
            }
            if (this.selectType === ALL) { // 显示全部
              return true
            } else {
              return type === this.selectType // 选择的类型是否和这条数据的类型相等
            }
          }
        },
      filters: {
        formatDate(time) {
          let date = new Date(time)
          return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
      },
      components: {
        cartcontrol,
        split,
        ratingselect
      }
    }
</script>
