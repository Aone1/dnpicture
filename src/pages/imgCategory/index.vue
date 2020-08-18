<template>
    <view>
        <view class="cate_tab">
            <view class="cate_tab_title">
                <view class="title_inner">
                    <uni-segmented-control :current="current" :values="items.map(v=>v.title)" @clickItem="onClickItem" 
                    style-type="text" active-color="#d4237a"></uni-segmented-control>
                </view>
                <view class="iconfont iconsearch"></view>
            </view>
            
            <scroll-view @scrolltolower="handleToLower" enable-flex scroll-y=true class="cate_tab_content">
                <view class="cate_item" v-for="(item,index) in vertical" :key="item.id">
                    <go-detail :list="vertical" :index="index">
                        <image :src="item.thumb" mode="widthFix"></image>
                    </go-detail>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
import goDetail from "@/components/goDetail"
//引入分段器
import {uniSegmentedControl} from '@dcloudio/uni-ui'
export default {
    components:{goDetail,uniSegmentedControl},
    data() {
        return {
            items:[
                {title:"最新",order:"new"},
                {title:"热门",order:"hot"}
            ],
            current:0,
            params:{
                limit:30,
                order:"new",
                skip:0
            },
            id:0,
            vertical:[],
            hasMore:true
        }
    },
    onLoad(option){
        this.id=option.id;
        this.getList();
    },
    methods:{
        onClickItem(e){
            if(this.current!==e.currentIndex){
                this.current=e.currentIndex;
            }else{
                //点击的是相同的标题
                return;
            }
            this.params.order=this.items[e.currentIndex].order;
            this.params.skip=0;
            this.vertical=[];
            this.getList();
        },
        getList(){
            this.request({
                url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
                data:this.params
            })
            .then(result=>{
                if(result.res.vertical.length===0){
                    this.hasMore=false;
                    uni.showToast({
                        title:"我是有底线的！",
                        icon:"none"
                    });
                    return;
                }
                this.vertical=[...this.vertical,...result.res.vertical];
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
.cate_tab{
    .cate_tab_title{
        position: relative;
        .title_inner{
            width: 60%;
            margin: 0 auto;
        }
        .iconsearch{
            position:absolute;
            top: 48%;
            transform: translateY(-50%);
            right: 5%;
        }
    }
    .cate_tab_content{
        display: flex;
        flex-wrap: wrap;
        height: calc( 100vh - 36px);
        .cate_item{
            width: 33.33%;
            border: 5rpx solid #fff;
            image{
                
            }
        }
    }
}
</style>