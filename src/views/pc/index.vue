<template>
  <div class="main">
    <div class="cent">
      <transition name="plus-icon">
        <logo_information v-if="logo_information"></logo_information>
      </transition>
      <div :class="menu_class">
        <el-button
          class="but but1 animate__animated animate__fadeInUp"
          type="primary"
          @click="contribution"
          round
        >
          <i class="fa fa-heart" aria-hidden="true"></i> 参与贡献
        </el-button>
        <div
          class="select_box animate__animated animate__fadeInUp"
          :class="{
            box_open: search_state || search_his_state || search_keyword,
          }"
        >
          <i class="fa fa fa-search"></i>
          <!-- 分类选择栏 -->
          <category-selector @change="(nv) => (category_id = nv)" ></category-selector>
          <!-- 词条搜索栏 -->
          <input
            class="tbox"
            @focus="search_state = true"
            @blur="search_state = false"
            v-model="search_keyword"
            @keyup.enter="search"
            placeholder='请输入词条名'
          >
          <button class="btn" type="button" name="button" @click="search">搜索词条</button>
        </div>
        
        <el-dropdown trigger="click" @command="r">
          <el-button
            type="primary"
            class="but but3 animate__animated animate__fadeInUp"
          >
            <i class="fa fa-cubes" aria-hidden="true"></i> 更多菜单
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/List">
              <i class="fa fa-heartbeat" aria-hidden="true"></i>
              贡献榜单
            </el-dropdown-item>
            <el-dropdown-item command="/Share">
              <i class="fa fa-rocket" aria-hidden="true"></i>
              共享计划
            </el-dropdown-item>
            <el-dropdown-item command="/about">
              <i class="fa fa-wheelchair-alt" aria-hidden="true"></i>
              关于本站
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button
          v-if="!logo_information"
          class="but but4 animate__animated animate__fadeInUp"
          type="primary"
          @click="home"
          round
        >
          <i class="fa fa-home" aria-hidden="true"></i> 返回首页
        </el-button>
      </div>

      <el-collapse-transition>
        <search-history
          @mouseover="search_his_state = true"
          @mouseout="search_his_state = false"
          v-show="search_state"
          :datas="$store.state.searchHis"
          @select="
            (k) => {
              (this.search_keyword = k), this.search();
            }
          "
          @clear="clearHistory"
        ></search-history>
      </el-collapse-transition>

      <router-view
        :key="key"
        v-if="!logo_information"
        class="animate__animated animate__fadeInUp animate__slow"
      />
      <el-dialog title="共享计划" :visible.sync="Share" width="30%">
        <div>
          <p>
            NovelAI词条百科共享站 - 数据开放平台 根据
            <a href="https://www.bilibili.com/read/cv19252957" target="_blank"
              >NovelAI信息并联计划公约</a
            >
            约定：
          </p>
          <p>
            共享站所有词条数据资源来源于用户/网络搜集，免费服务于所有用户，任何个人/团队均可免费使用本站资源于任何
            <strong style="color: #e55">非商用/非盈利目的</strong> 项目<br />
            您只需要联系本站开发团队任意成员，提供 "任意联系方式", "应用名"
            即可免费获取本站的数据源访问token，用于您的开发项目中
          </p>
          <p>
            本站提供接口详见
            <a
              href="https://console-docs.apipost.cn/preview/dbc3a0be7aff05cb/526a9c13fe093c2c?target_id=632986c9-4ce6-4b50-b6b8-409e41be0c4b"
              >接口文档</a
            >
          </p>
          <p>本站交流群：660612010</p>
          <p>
            PS:由于开发任务繁重、人手有限，页面样式未有充足时间进行美化，如果您有一技之长希望加入我们，欢迎加入交流群共议
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="but but2" @click="Share = false">
            <i class="fa fa-bullseye" aria-hidden="true"></i>
            已 读
          </el-button>
        </span>
      </el-dialog>
      <el-dialog title="关于本站" :visible.sync="about" width="30%">
        <div>
          <div>
            本站皆在建立novelai中所包含的词条百科数据库，为广大魔导师提供词条贡献平台，所有收集的数据在收集整理后免费公开，为novelai开源生态建立数据仓库基础，为各大开发者提供<strong
              style="color: #e55"
              >数据接口服务</strong
            >（详见"共享计划"），如果您有其他数据源或者自行整理的词条信息，并且希望参与本站建设，可以直接联系我们进行批量数据导入<br />
            联系方式： 621816415(洛儿)<br />
            本站交流群：660612010
          </div>
          <div>
            参与贡献基本原则：在不破坏他人劳动成果的前提下，对词条原有信息做任何有效补充均可视为有效贡献
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="but but2" @click="about = false">
            <i class="fa fa-moon-o" aria-hidden="true"></i>
            确 认
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import logo_information from "@/components/pc/logo_information.vue";
import searchHistory from "@/components/pc/searchHistory.vue";
import categorySelector from "@/components/pc/categorySelector.vue";

export default {
  data() {
    return {
      logo_information: true,
      menu_class: "menu",
      searchHis: [],
      search_state: false,
      search_his_state: false,
      search_keyword: "",
      // 分类id
      category_id: '',
      key: 0,
      Share: false,
      about: false,
    };
  },
  components: {
    logo_information,
    searchHistory,
    categorySelector,
  },
  methods: {
    r(path) {
      if (path == "/Share") {
        this.Share = !this.Share;
        return;
      }
      if (path == "/about") {
        this.about = !this.about;
        return;
      }
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
      this.$router.push({
        path: "/contribution",
        query: { fromTable: 0 },
      });
    },
    search() {
      this.key++;
      this.logo_information = false;
      this.menu_class = "menu2 animate__animated animate__backInUp";
      this.$router.push({
        path: "/selectTags",
        query: {
          keyword: this.search_keyword,
          c_id: this.category_id
        },
      });
    },
    home() {
      this.key++;
      this.logo_information = true;
      this.menu_class = "menu animate__animated animate__fadeInDown";
      this.$router.push("/index");
    },
  },
};
</script>

<style scoped>
@import url(https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css);

.main {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

.el-cascader >>> .el-input__inner {
  width: fit-content;
  height: 40px;
  padding: 1px 30px 1px 2px;
  border: none;
  border-radius: 0%;
  overflow: hidden;
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

.but2 {
  background: #ff9665;
  border: 1px solid #ff9665;
  color: white;
}

.but2:hover,
.but2:focus {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
  background: #fa834b;
  border: 1px solid #fa834b;
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

.select_box select {
  min-width: 0;
  max-width: fit-content;
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

.select_box:hover > .tbox,
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
