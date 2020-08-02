<template>
    <view>
        <!-- 推荐开始 -->
        <view class="recommend_wrap">
            <view class="recommend_item" v-for="item in recommends" :key="item.id">
                <image mode="widthFix" :src="item.thumb"></image>
            </view>
        </view>
        <!-- 推荐结束 -->
    </view>
</template>

<script>
export default {
    data(){
        return{
            recommends:[] //推荐列表
        }
    },
    mounted(){
        this.request({
            url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
            data:{
                limit:30,
                order:"hot",
                skip:0
            }
        }).then(result=>{
            this.recommends=result.res.homepage[1].items;
        })
    }
}
</script>

<style lang="scss" scoped>
.recommend_wrap{
    display: flex;
    flex-wrap: wrap;
    .recommend_item{
        width: 50%;
        border:5rpx solid #fff;
    }
}
</style>