<template>
    <view>
        <scroll-view @scrolltolower="handleScrolltolower" class="video_main" scroll-y="true" enable-flex>
            <view @click="handleGoVideo(item)" class="video_item" v-for="item in videowp" :key="item.id">
                <image mode="widthFix" :src="item.img"></image>
            </view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    props:{
        urlobj:Object
    },
    data() {
        return {
            videowp:[],
            hasMore:true
        }
    },
    watch:{
        urlobj(){
            this.videowp=[];
            this.getList();
        }
    },
    mounted(){
        this.getList();
    },
    methods:{
        getList(){
            this.request({
                url:this.urlobj.url,
                data:this.urlobj.params
            })
            .then(result=>{
                if(result.res.videowp.length===0){
                    this.hasMore=false;
                    uni.showToast({
                        title:"我是有底线的！",
                        icon:"none"
                    });
                    return;
                }
                this.videowp=[...this.videowp,...result.res.videowp];
            });
        },
        //分页事件
        handleScrolltolower(){
            if(this.hasMore){
                this.urlobj.params.skip+=this.urlobj.params.limit;
                this.getList();
            }else{
                uni.showToast({
                    title:"我是有底线的！",
                    icon:"none"
                });
            }
        },
        handleGoVideo(item){
            getApp().globalData.video=item;
            uni.navigateTo({
                url:"/pages/videoPlay/index"
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.video_main{
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 36px);
    .video_item{
        width: 33.33%;
        border: 5rpx solid #fff;
    }
}
</style>