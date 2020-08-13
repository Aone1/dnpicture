<template>
    <scroll-view @scrolltolower="handleToLower" class="recommend-view" 
    scroll-y=true v-if="recommends.length>0">
        <!-- 推荐开始 -->
        <view class="recommend_wrap">
            <navigator :url="`/pages/album/index?id=${item.target}`" class="recommend_item" v-for="item in recommends" :key="item.id">
                <image mode="widthFix" :src="item.thumb"></image>
            </navigator>
        </view>
        <!-- 推荐结束 -->

        <!-- 月份开始 -->
        <view class="monthes_wrap">
            <view class="monthes_title">
                <view class="monthes_title_info">
                    <view class="monthes_info">
                        <text> {{monthes.DD}} / </text>
                        {{monthes.MM}} 月份
                    </view>
                    <view class="monthes_text">{{monthes.title}}</view>
                </view>
                <view class="monthes_title_more">更多 > </view>
            </view>
            <view class="monthes_content">
                <view class="monthes_item" v-for="(item,index) in monthes.items" :key="item.id">
                    <go-detail :list="monthes.items" :index="index">
                        <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 月份结束 -->

        <!-- 热门开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text> 热门 </text>
            </view>
            <view class="hots_content">
                <view class="hot_item" v-for="(item,index) in hots" :key="item.id">
                    <go-detail :list="hots" :index="index">
                        <image mode="widthFix" :src="item.thumb"></image>
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 热门结束 -->
    </scroll-view>
</template>

<script>
import moment from "moment"
import goDetail from "@/components/goDetail"
export default {
    components:{goDetail},
    data(){
        return{
            recommends:[], //推荐列表
            monthes:{}, //月份
            hots:[], //热门
            params:{
                limit:30,
                order:"hot",
                skip:0
            },
            hasMore:true //是否还有下一页
        }
    },
    mounted(){
        uni.setNavigationBarTitle({title:"推荐"});
        this.getList();
    },
    methods:{
        //获取接口数据
        getList(){
            this.request({
                url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
                data:this.params
            }).then(result=>{
                //判断还有没有下一页
                if(result.res.vertical.length==0){
                    this.hasMore=false;
                    uni.showToast({
                        title:"我是有底线的！",
                        icon:"none"
                    });
                    return;
                }

                if(this.recommends.length==0){
                    //第一次发送的请求
                    //推荐模块
                    this.recommends=result.res.homepage[1].items;
                    //月份模块
                    this.monthes=result.res.homepage[2];
                    //将时间戳改成 18号/月
                    this.monthes.MM=moment(this.monthes.stime).format("MM");
                    this.monthes.DD=moment(this.monthes.stime).format("DD");
                }
                
                //获取热门数据列表
                //this.hots=result.res.vertical;
                this.hots=[...this.hots,...result.res.vertical];
            })
        },
        //滚动条触底事件
        handleToLower(){
            if(this.hasMore){
                this.params.skip+=this.params.limit;
                this.getList();
            }else{
                uni.showToast({
                    title:"我是有底线的！",
                    icon:"none"
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.recommend-view{
    //height:屏幕的高度-头部标题的高度
    height: calc( 100vh - 36px);
}

.recommend_wrap{
    display: flex;
    flex-wrap: wrap;
    .recommend_item{
        width: 50%;
        border:5rpx solid #fff;
    }
}

.monthes_wrap {
  .monthes_title {
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
    .monthes_title_info {
        color: $color;
        font-size: 30rpx;
        font-weight: 600;
        display: flex;
      .monthes_info {
        text {
            font-size: 36rpx;
        }
      }
      .monthes_text {
          font-size: 34rpx;
          color: #666;
          margin-left: 30rpx;
      }
    }
    .monthes_title_more {
        font-size: 24rpx;
        color: $color;
    }
  }
  .monthes_content {
      display: flex;
      flex-wrap: wrap;
      .monthes_item{
          width: 33.33%;
          border: 5rpx solid #fff;
      }
  }
}

.hots_wrap {
  .hots_title {
      padding: 20rpx;
    text {
        border-left: 20rpx solid $color;
        padding-left: 20rpx;
        font-size:34rpx;
        font-weight: 600;
    }
  }
  .hots_content {
      display: flex;
      flex-wrap: wrap;
    .hot_item {
        width: 33.33%;
        border:5rpx solid #fff;
      image {}
    }
  }
}
</style>