<template>
  <div class="search">
    <el-table
      @row-click="getRow"
      :data="search_res"
      class="searchTable"
      border
      fit
      height="80%"
      style="width: 100%"
    >
      <el-table-column prop="name" label="词条名"></el-table-column>
      <el-table-column prop="t_name" label="词条译名"></el-table-column>
      <el-table-column prop="desc" label="描述说明"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="contributor" label="贡献者"></el-table-column>
      <el-table-column prop="c_name" label="所属分类"></el-table-column>
      <el-table-column prop="nsfw" label="是否NSFW"></el-table-column>
      <el-table-column prop="opration" label="操作" width="80">
        <template>
          <el-button size="mini" type="primary" style="margin: 0 1px" plain
            >贡献
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_res: [],
      search_keyword: "",
    };
  },
  methods: {
    getRow(row) {
      this.selRowData = JSON.parse(JSON.stringify(row));
    },
    search() {
      this.search_keyword = this.$route.query.value;
      if (/^\s$/.test(this.searchHis)) {
        this.$message({
          type: "error",
          message: "搜索词为空",
          duration: 2000,
        });
        return;
      }
      this.$message({
        type: "info",
        message: "正在检索词条",
        duration: 1000,
      });
      for (let i = 0; i < this.searchHis.length; i++) {
        if (this.searchHis[i].w == this.search_keyword) {
          for (let j = i - 1; j >= 0; j--) {
            this.searchHis[j + 1] = this.searchHis[j];
            this.searchHis[j + 1].i--;
          }
          this.searchHis.shift();
          break;
        }
      }
      this.searchHis.unshift({
        w: this.search_keyword,
        i: this.searchHis.length,
      });
      localStorage.searchHis = JSON.stringify(this.searchHis);
      let self = this;
      // 获取categories列表
      this.$http({
        method: "POST",
        url: `${self.$store.state.serverhost}/search_tags`,
        data: {
          keyword: self.search_keyword,
        },
      })
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data)
            if (res.data.data.length > 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                let curId = parseInt(res.data.data[i].c_id),
                  l1name = "";
                self.$store.state.categories.l1.forEach((elem) => {
                  if (elem.id == parseInt(curId / 100)) l1name = elem.name;
                });
                if (
                  self.$store.state.categories.l2[parseInt(curId / 100)] !==
                  undefined
                ) {
                  self.$store.state.categories.l2[
                    parseInt(curId / 100)
                  ].forEach((elem) => {
                    if (elem.id == curId) {
                      res.data.data[i].c_name = l1name + ">" + elem.name;
                    }
                  });
                }
              }
              self.search_res = res.data.data;
            } else {
              self.$message({
                type: "info",
                message: "查无相关数据",
                duration: 2000,
              });
              self.search_res = [];
            }
          } else {
            self.$message({
              type: "error",
              message: res.data.msg,
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          self.$message({
            type: "error",
            message: "请求后端服务器发生错误",
            duration: 2000,
          });
        });
    },
  },
  mounted() {
    this.searchHis = JSON.parse(localStorage.searchHis || "[]");
    this.search();
  },
};
</script>

<style scoped>
.row {
  margin-bottom: 10px;
}
.select_box {
  height: 45px;
  justify-content: center;
  display: flex;
  color: #fff;
}
.select_box i {
  border-radius: 20px 0 0 20px;
  background: #fd4b4b;
  width: 60px;
  line-height: 45px;
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
  width: 100%;
  padding: 0 10px;
}
.btn {
  border-radius: 0 20px 20px 0;
  background: #2d65ff;
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
