<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    // 判断是否是移动端
    _isMobile () {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  },
  created () {
    if (this._isMobile()) {
      // 手机端
      this.platform = 'pe'
      // 设置rem
      // window.onload = function(){
      //   getRem(750,100)
      // };
      // window.onresize = function(){
      //   getRem(750,100)
      // };
      // function getRem(pwidth,prem){
      //   var html = document.getElementsByTagName("html")[0];
      //   var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
      //   html.style.fontSize = oWidth/pwidth*prem + "px";
      // }
      // console.log('mobile')
    } else {
      // pc端
      this.platform = 'pc'
      // console.log('pc')
    }
    this.$store.commit('setPlatform', this.platform)
  }
}
</script>

<style lang="scss">
#app, html, body {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.drawer {
  padding: 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  i {
    margin-right: 5px;
  }

  .el-descriptions {
    width: 100%;
  }

  .singer-title {
    font-size: 16px;
    font-weight: 700;
    margin: 15px 5px 10px;
  }

  .el-table {
    flex: 1;
  }
}
</style>
