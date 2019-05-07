const app = getApp()

Page({
  data: {
    swiperNav: {
      i: 0,
  　　 arr: [
    　　　{ v: 0, txt: "推荐专区" },
    　　　{ v: 1, txt: "进口商品" },
    　　　{ v: 2, txt: "饮料冲调" },
    　　　{ v: 3, txt: "休闲零食" },
    　　　{ v: 4, txt: "生鲜" },
    　　　{ v: 5, txt: "速食调味" }
  　　 ]
    },
    moveParams: {
      scrollLeft: 0, // scroll-view滚动的距离,默认为0,因为没有触发滚动
      subLeft: 0, //点击元素距离屏幕左边的距离
      subHalfWidth: 0, //点击元素的宽度一半
      screenHalfWidth: 0 //屏幕宽度的一半
    }
  },

  getRect(ele) { //获取点击元素的信息,ele为传入的id
    wx.createSelectorQuery().select(ele).boundingClientRect(
      (rect) => {
        let moveParams = this.data.moveParams;
        moveParams.subLeft = rect.left;
        moveParams.subHalfWidth = rect.width / 2;
        this.moveTo();
      }).exec()
  },

  handleSwiperNav(e) {
    console.log(e)
    this.setData({
      'swiperNav.i': e.target.dataset.i
    })

    let ele = '#ele' + e.target.dataset.i

    this.getRect(ele)
  },

  moveTo() {
    let subLeft = this.data.moveParams.subLeft;
    let screenHalfWidth = this.data.moveParams.screenHalfWidth;
    let subHalfWidth = this.data.moveParams.subHalfWidth;
    let scrollLeft = this.data.moveParams.scrollLeft;

    let distance = subLeft - screenHalfWidth + subHalfWidth;

    scrollLeft = scrollLeft + distance;
    // debugger
    this.setData({
      scrollLeft: scrollLeft
    })
  },

  scrollMove(e) {
    this.setData({
      'moveParams.scrollLeft': e.detail.scrollLeft
    })
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        let moveParams = this.data.moveParams
        moveParams.screenHalfWidth = res.screenWidth / 2;
        this.setData({
          moveParams
        })
      },
    })
  },
})
