<template>
    <view class="video_play">
        <!-- 背景 -->
        <image :src="videoObj.img"></image>

        <!-- 工具栏 开始 -->
        <view class="video_tool">
            <view @click="handleMuted" :class="['iconfont',muted?'iconjingyin':'iconshengyin']"></view>
            <view class="iconfont iconzhuanfa">
                <button open-type="share"></button>
            </view>
        </view>
        <!-- 工具栏 结束 -->

        <!-- 视频 开始 -->
        <view class="video_wrap">
            <video :muted="muted" :src="videoObj.video" objectFit="fill"></video>
        </view>
        <!-- 视频 结束 -->

        <!-- 下载 开始 -->
        <view class="download">
            <view @click="handleDownload" class="download_btn">下载高清</view>
        </view>
        <!-- 下载 结束 -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            videoObj:{},
            //是否静音
            muted:false
        }
    },
    onLoad(){
        this.videoObj=getApp().globalData.video;
    },
    methods:{
        //开关声音
        handleMuted(){
            this.muted=!this.muted;
        },
        //下载视频
        async handleDownload(){
            uni.showToast({
                title:"下载中..."
            });

            //将远程文件下载到小程序的内存中 tempFilePath
            const {tempFilePath}=(await uni.downloadFile({url:this.videoObj.video}))[1];
            //将小程序内存中的临时文件下载到本地（手机相册）
            await uni.saveVideoToPhotosAlbum({filePath:tempFilePath});

            uni.hideLoading();
            uni.showToast({
                title:"下载成功"
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.video_play {
    position: relative;
  image {
      position: absolute;
      width: 100vh;
      height: 100vh;
      z-index: -1;
      //css滤镜
      filter: blur(20px);
  }

  .video_tool {
      height: 80rpx;
      display: flex;
      justify-content: flex-end;
    .iconfont {
        width: 80rpx;
        color: #fff;
        font-size: 50rpx;
        border-radius: 40rpx;
        background-color: rgba(0,0,0,.2);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20rpx;
    }
    .iconzhuanfa{
        position: relative;
        button{
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
  }

  .video_wrap {
      display: flex;
      justify-content: center;
    video {
        width: 360rpx;
        height: 600rpx;
    }
  }

  .download {
      display: flex;
      justify-content: center;
      margin-top: 30rpx;
    .download_btn {
        width: 360rpx;
        height: 80rpx;
        border-radius: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border: 1rpx solid #fff;
        background-color: rgba(0,0,0,.6);
    }
  }
}
</style>