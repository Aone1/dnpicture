<template>
    <scroll-view class="album_scroll_view" @scrolltolower="handleToLower" scroll-y=true>
        <!-- 
            swiper需要设置三个属性
            1.自动轮播 autoplay
            2.指示器 indicator-dots
            3.衔接轮播 circular
         -->
        <!-- 轮播图开始 -->
        <view class="album_swiper">
            <swiper autoplay indicator-dots circular>
                <swiper-item v-for="item in banner" :key="item.id">
                    <image :src="item.thumb"></image>
                </swiper-item>
            </swiper>
        </view>
        <!-- 轮播图结束 -->

        <!-- 列表开始 -->
        <view class="album_list">
            <navigator class="album_item" :url="`/pages/album/index?id=${item.id}`" v-for="item in album" :key="item.id">
                <view class="album_img">
                    <image mode="aspectFill" :src="item.cover"></image>
                </view>
                <view class="album_info">
                    <view class="album_name">{{item.name}}</view>
                    <view class="album_desc">{{item.desc}}</view>
                    <view class="album_btn">
                        <view class="album_attention">+关注</view>
                    </view>
                </view>
            </navigator>
        </view>
        <!-- 列表结束 -->
    </scroll-view>
</template>

<script>
export default {
    data(){
        return{
            params:{
                limit:30,
                order:"new",
                skip:0
            },
            banner:[],//轮播图
            album:[],//列表数组
            hasMore:true //是否还有下一页
        }
    },
    mounted(){
        uni.setNavigationBarTitle({title:"专辑"});
        this.getList();
    },
    methods:{
        getList(){
            this.request({
                url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
                data:this.params
            }).then(result=>{
                //判断还有没有下一页
                if(result.res.album.length==0){
                    this.hasMore=false;
                    uni.showToast({
                        title:"我是有底线的！",
                        icon:"none"
                    });
                    return;
                }

                if(this.banner.length==0){
                    this.banner=result.res.banner;
                }

                this.album=[...this.album,...result.res.album];
            })
        },
        handleToLower(){
            if(this.hasMore){
                this.params.skip+=this.params.limit;
                this.getList();
            }else{
                uni.showToast({
                    title:"我是有底线的！",
                    icon:"none"
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.album_scroll_view{
    height: calc( 100vh - 36px);
}

.album_swiper{
    swiper{
        // height: calc(750rpx / 2.3);
        height: 326.1rpx;
        image{
            height: 100%;
        }
    }
}

.album_list {
    padding: 10rpx;
  .album_item {
      padding: 10rpx 0;
      display: flex;
      border-bottom: 1rpx solid #ccc;
    .album_img {
        flex: 1;
        padding: 10rpx;
      image {
          width: 200rpx;
          height: 200rpx;
      }
    }

    .album_info {
        flex: 2;
        padding: 0 10rpx;
        overflow: hidden;
      .album_name {
          font-size: 30rpx;
          color: #000;
          padding: 10rpx 0;
      }
      .album_desc {
          padding: 10rpx 0;
          font-size: 24rpx;

          //设置描述不换行，多余的用...代替，记得设置父级overflow: hidden;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
      }
      .album_btn {
          padding: 10rpx;
          display: flex;
          justify-content: flex-end;
        .album_attention {
            color: $color;
            border: 1rpx solid $color;
            padding: 10rpx;
        }
      }
    }
  }
}
</style>