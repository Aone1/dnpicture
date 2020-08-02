export default(params)=>{
    return new Promise((resolve,reject)=>{

        //加载中
        uni.showLoading({
            title:"加载中"
        })
        
        wx.request({
            ...params,
            success(res){
                resolve(res.data);
            },
            fail(err) {
                resolve(err);
            },
            complete() {
                uni.hideLoading();
            }
        })

    })
}