<template>
  <div id="app">
    <router-view />
    <div class="flooat animate__animated animate__jackInTheBox">
        <a href="https://beian.miit.gov.cn/" target="_blank"
          >闽ICP备2022015899号</a
        >
      </div>
  </div>
</template>

<style lang="scss">
#app,
html,
body {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
* {
  font-family: -apple-system, PingFang SC, Microsoft YaHei, system-ui, Arial,
    serif;
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
.flooat {
  position: fixed;
  bottom: 20px;
  left: 0px;
  width: 100%;
  text-align: center;
}
.flooat > a {
  color: #ffffff;
  border-bottom: dotted 1px;
  text-decoration: none;
}
</style>
