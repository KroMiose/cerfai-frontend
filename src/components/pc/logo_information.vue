<template>
  <div>
    <div class="logo">
      <div class="logo_img animate__animated animate__backInDown">
        <img :src="logo" style="width: 100%" />
      </div>
    </div>
    <div class="text">
      <div style="text-align: center">
        <div class="title_main animate__animated animate__backInUp">
          <h1 class="title">Novelai词条百科共享站</h1>
          <el-tag class="tag animate__animated animate__swing">Beta</el-tag>
        </div>
        <p class="title_bottom animate__animated animate__backInUp">
          累计收到用户贡献词条数: {{ up_cnt }},已收录总词条数: {{ ct_total }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/logo.svg";
export default {
  data() {
    return {
      logo,
      up_cnt: "获取中...",
      ct_total: "获取中...",
      form: {
        id: "",
        name: "",
        t_name: "",
        c_id: "",
        c_name: "",
        is_nsfw: false,
        desc: "",
        remarks: "",
        contributor: "",
      },
      categories: [],
    };
  },
  methods: {
    get_categories() {
      let self = this;
      // 获取categories列表
      this.$http({
        method: "GET",
        url: `${self.$store.state.serverhost}/get_categories`,
      })
        .then((res) => {
          // console.log(res.data)
          // self.categories = res.data.data
          self.up_cnt = res.data.up_cnt;
          self.ct_total = res.data.ct_total;
          // self.$store.commit('setCategories', self.categories)
          self.roll_tag();
          let cd = res.data.contributor;
          let nlist = [];
          for (let key in cd) {
            // console.log(key,obj[key])
            nlist.push({ name: key, cnt: cd[key] });
          }
          self.contributor_toplist = nlist;
          // TODO:该函数为过渡方案，等待替换
          self.get_categories_full();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取完整的分类列表
    // TODO:该函数为过渡方案，等待替换
    get_categories_full() {
      let self = this;
      // 获取categories列表
      this.$http({
        method: "GET",
        url: `${self.$store.state.serverhost}/open/get_full_categories`,
      })
        .then((res) => {
          // console.log(res.data)
          self.categories = res.data.data;
          self.$store.commit("setCategories", self.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    roll_tag() {
      let self = this;
      // 获取categories列表
      this.$http({
        method: "GET",
        url: `${self.$store.state.serverhost}/get_random_tag`,
      })
        .then((res) => {
          if (res.data.code == 200) {
            self.$notify({
              title: "欢迎！",
              message: "Novelai项目组，欢迎你使用词条百科数据库！",
              type: "success",
            });
            console.log(res.data);
            self.form.id = res.data.data.id;
            self.form.c_id = res.data.data.c_id;
            self.form.is_nsfw = res.data.data.is_nsfw ? true : false;
            self.form.name = res.data.data.name;
            self.form.t_name = res.data.data.t_name;
            self.form.desc = res.data.data.desc ? res.data.data.desc : "";
            self.form.remarks = res.data.data.remarks
              ? res.data.data.remarks
              : "";

            self.categories.forEach((v) => {
              if (v.id == res.data.data.c_id) {
                self.form.c_name = v.name;
              }
            });
          } else {
            self.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        })
        .catch((err) => {
          this.$notify({
            title: "警告",
            message: "无法链接后台服务器，请刷新浏览器重试",
            type: "warning",
          });
        });
    },
  },
  mounted() {
    this.get_categories();
  },
};
</script>

<style scoped>
.logo_img {
  background: linear-gradient(270deg, hsla(270, 100%, 58%, 0.62), #114df36e);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 20px;
  width: 20%;
}
.text {
  display: flex;
  justify-content: center;
}
.title_main {
  display: flex;
}
.tag {
  margin-top: 25px;
  color: #475669;
  border-radius: 20px;
}
.title {
  font-size: 56px;
  font-weight: 700;
  line-height: 64px;
  opacity: 0.8;
  transition: all 0.5s;
}
.logo {
  width: 100%;
  display: flex;
  justify-content: center;
}
.title_bottom {
  animation-delay: 0.6s;
}
.tag {
  animation-delay: 2.5s;
}
.animate__backInUp {
  animation-delay: 0.5s;
}
</style>
