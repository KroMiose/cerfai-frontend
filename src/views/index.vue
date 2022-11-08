<template>
  <div class="main">
    <div class="cent">
      <transition name="plus-icon">
        <logo_information v-if="logo_information"></logo_information>
      </transition>
      <div :class="menu_class">
        <el-button class="but but1 animate__animated animate__fadeInUp" type="primary" @click="contribution" round><i
            class="fa fa-heart" aria-hidden="true"></i> 参与贡献</el-button>
        <div class="select_box animate__animated animate__fadeInUp"
          :class="{ 'box_open': search_state || search_his_state || search_keyword }">
          <i class="fa fa fa-search"></i>
          <input class="tbox" @focus="search_state = true" @blur="search_state = false" v-model="search_keyword"
            @keyup.enter="search" placeholder="请输入词条名" />
          <button class="btn" type="button" name="button" @click="search">
            搜索词条
          </button>
        </div>
        <el-dropdown trigger="click" @command="r">
          <el-button type="primary" class="but but3 animate__animated animate__fadeInUp">
            <i class="fa fa-cubes" aria-hidden="true"></i> 更多菜单
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/List"><i class="fa fa-heartbeat" aria-hidden="true"></i>
              贡献榜单</el-dropdown-item>
            <el-dropdown-item><i class="fa fa-rocket" aria-hidden="true"></i>
              共享计划</el-dropdown-item>
            <el-dropdown-item><i class="fa fa-wheelchair-alt" aria-hidden="true"></i>
              关于本站</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-if="!logo_information" class="but but4 animate__animated animate__fadeInUp" type="primary"
          @click="home" round><i class="fa fa-home" aria-hidden="true"></i> 返回首页</el-button>
      </div>
      <el-collapse-transition>
        <div @mouseover="search_his_state = true" @mouseout="search_his_state = false"
          v-show="search_state || search_his_state || search_keyword">
          <search-history :datas="$store.state.searchHis" @select="
            (k) => {
              (this.search_keyword = k), this.search();
            }
          " @clear="clearHistory"></search-history>
        </div>
      </el-collapse-transition>
      <router-view :key="key" v-if="!logo_information" class="animate__animated animate__fadeInUp animate__slow" />
    </div>
  </div>
</template>

<script>
import logo_information from "@/components/logo_information.vue";
import searchHistory from "@/components/searchHistory.vue";
export default {
  data() {
    return {
      logo_information: true,
      menu_class: "menu",
      searchHis: [],
      search_state: false,
      search_his_state: false,
      search_keyword: "",
      key: 0,
    };
  },
  components: {
    logo_information,
    searchHistory,
  },

  methods: {
    r(path) {
      this.key++;
      this.logo_information = false;
      this.menu_class = "menu2 animate__animated animate__backInUp";
      this.$router.push(path);
    },
    clearHistory() {
      localStorage.searchHis = "";
      this.$store.state.searchHis = [];
    },
    contribution() {
      this.key++;
      this.logo_information = false;
      this.menu_class = "menu2 animate__animated animate__backInUp";
      this.$router.push("/contribution");
    },
    search() {
      this.key++;
      this.logo_information = false;
      this.menu_class = "menu2 animate__animated animate__backInUp";
      this.$router.push({
        path: "/selectTags",
        query: { value: this.search_keyword },
      });
    },
    home() {
      this.key++;
      this.logo_information = true;
      this.menu_class = "menu animate__animated animate__fadeInDown";
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@import url(https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css);

.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(270deg, hsla(271, 100%, 86%, 0.62), #6089f86e);
  display: flex;
  /* align-items: center; */
  justify-content: center;
}

.menu {
  transition: all 3s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.menu2 {
  z-index: 2;
  align-items: center;
  transition: all 3s;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
}

.plus-icon-enter-active {
  animation: axisX 0.5s;
}

.plus-icon-leave-active {
  animation: axisX 0.5s reverse;
}

@keyframes axisX {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0px);
  }
}

.cent {
  margin-top: 7%;
  width: 800px;
  transition: all 1s linear;
}

.but {
  border-radius: 20px;
  margin: 5px;
}

.but1 {
  background: #e889df;
  border: 1px solid #e889df;
}

.but1:hover,
.but1:focus {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
  background: #c777bf;
  border: 1px solid #c777bf;
  transition: all 1s;
}

.but3 {
  background: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  color: #475669;
  transition: all 0.5s;
}

.but3:hover,
.but3:focus {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
  background: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  color: #475669;
}

.but4 {
  background: rgb(152, 252, 194);
  border: 1px solid rgb(152, 252, 194);
  color: #475669;
  transition: all 0.5s;
}

.but4:hover,
.but4:focus {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
  background: rgb(121, 255, 177);
  border: 1px solid rgb(121, 255, 177);
  color: #475669;
}

/* 动画 */
.but1 {
  animation-delay: 1.2s;
}

.select_box {
  animation-delay: 1.5s;
}

.but3 {
  animation-delay: 1.7s;
}

/* **** */
.select_box {
  height: 40px;
  justify-content: center;
  display: flex;
  color: #fff;
  border-radius: 20px;
}

.select_box i {
  border-radius: 20px 0 0 20px;
  background: #fd4b4b;
  width: 40px;
  line-height: 40px;
}

.tbox,
.btn {
  border: none;
  outline: none;
}

.tbox {
  width: 0px;
  transition: 0.6s;
}

.select_box:hover>.tbox,
.select_box.box_open>.tbox,
.tbox:focus {
  width: 200px;
  padding: 0 10px;
  transition: width 1s;
}

.select_box:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
  background: #ff8260;
  transition: all 1s;
}

.btn {
  border-radius: 0 20px 20px 0;
  background: #fd8b6b;
  color: white;
  padding: 0 10px;
  text-transform: uppercase;
  cursor: pointer;
  width: 100px;
}

.fa {
  text-align: center;
}
</style>
