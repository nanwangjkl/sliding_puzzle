wx.onMessage(ev => {
    switch (ev.type) {
        case 'friends': {
            wx.getFriendCloudStorage({
                success(res) {
                    console.log(res.data[0].KVDataList)
                }
            })
            break
        }

        case 'setUserData': {
            wx.setUserCloudStorage({
                KVDataList: [{key: 'name', value: 'JetLu'}],
                success(res) {
                    console.log(res)
                }
            })
            break
        }
    }
})