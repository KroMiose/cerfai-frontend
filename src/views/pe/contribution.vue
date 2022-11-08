<template>
  <div class="home">
    <!-- 贡献页面 -->
    <div class="contributePage">
      <!-- 贡献表单 -->
      <el-form ref="form" :model="form" :rules="form_rule" label-width="100px">
        <el-form-item prop="name">
          <span slot="label">
            <el-tag type="danger" class="tag">词条名称：</el-tag>
          </span>
          <div class="row">
            <el-input
              placeholder="等待抽取"
              v-model="form.name"
              disabled
              class="input-with-select"
            >
              <el-button
                slot="append"
                v-clipboard:copy="form.name"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                icon="el-icon-document-copy"
                >复制词条名</el-button
              >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="t_name">
          <span slot="label">
            <el-tag type="danger" class="tag">词条译名：</el-tag>
          </span>
          <el-input placeholder="词条翻译" v-model="form.t_name"></el-input>
        </el-form-item>
        <el-form-item prop="desc">
          <span slot="label">
            <el-tag type="danger" class="tag">词条说明：</el-tag>
          </span>
          <el-input
            type="textarea"
            v-model="form.desc"
            placeholder="请输入词条说明信息，作为该词条的使用参考或者效果"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="remarks">
          <span slot="label">
            <el-tag type="danger" class="tag">备注信息：</el-tag>
          </span>
          <el-input
            type="textarea"
            v-model="form.remarks"
            placeholder="请输入备注信息，可包含该词条信息依据的参考资料链接"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="contributor">
          <span slot="label">
            <el-tag type="danger" class="tag">贡献者：</el-tag>
          </span>
          <el-input
            v-model="form.contributor"
            minlength="1"
            placeholder="请留下您的用户名或昵称，以便我们记录贡献者，多位贡献者请用英文逗号分隔"
          ></el-input>
        </el-form-item>
        <el-form-item prop="c_id">
          <span slot="label">
            <el-tag type="danger" class="tag">词条分类：</el-tag>
          </span>
          <category-selector
            :value="form.c_id"
            @change="(nv) => (form.c_id = nv)"
          >
          </category-selector>
        </el-form-item>
        <el-form-item prop="is_nsfw">
          <span slot="label">
            <el-tag type="danger" class="tag">NSFW：</el-tag>
          </span>
          <el-switch v-model="form.is_nsfw"></el-switch>
          <span class="nsfw-span" style="color: #e66" v-show="form.is_nsfw"
            >　这是一个包含工作场所不宜内容的词条</span
          >
          <span
            class="nsfw-span"
            style="color: rgb(37, 151, 95)"
            v-show="!form.is_nsfw"
            >　这是一个任何场所安全的词条
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="roll_tag">换一个</el-button>
        </el-form-item>
      </el-form>

      <!-- <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>贡献指南</span>
              </div>
              <div class="text item">
                <strong>词条名：<br /></strong>
                是指导入数据库的Tag英文原名，软件可识别的词条/标签。
              </div>
              <div class="text item">
                <strong>词条译名：<br /></strong>
                是指词条翻译的中文名，或者贡献者修改的译名，最好是中文版AI可识别的译名。因为尚未校正，可能存在翻译错误。
              </div>
              <div class="text item">
                <strong>是否NSWF：<br /></strong>
                当前标签生成图片时是否会出现不适合工作场合的画面，包括不限于血腥暴力和敏感内容，如果是请打开此项。
              </div>
              <div class="text item">
                <strong>词条说明：<br /></strong>
                对于词条的补充和内容说明。对标签进行测试时，建议标明SD测试还是NF测试，两者会有些许差异。单独使用标签与实际混合标签时会产生不同效果，cfg参数会影响标签效果，标签数字权重与{}的增加也会标签产生的效果，建议多次测试确定效果。
              </div>
              <div class="text item">
                <strong>备注信息：<br /></strong>
                词条的来源和调查。词条的正确译名可能需要借助谷歌等搜索引擎，容易产生误解的是画师账号昵称和人名，并且可能由于关联搜索而出现奇怪的内容，导致内容与标签毫无关联，这取决于模型的收录程度，如果要强调画师或者风格，应该加上by_或者（style）
              </div>
              <div class="text item">
                <strong>贡献者：<br /></strong>
                所有参与词条编辑的人都可以填入贡献者名字，请使用常用的昵称或者数字字母，提交词条将计入贡献名单，优秀的内容提交者将在榜单上体现，请尊重自己和他人的劳动成果，恶意删改将会触发网站防御，并拉入AI绘画信息并联计划黑名单。
              </div>
            </el-card> -->
    </div>
  </div>
</template>

<script>
import categorySelector from "@/components/pe/categorySelector.vue";
export default {
  data() {
    return {
      // serverhost: 'www.morangames.xyz:3090',
      // serverhost: '127.0.0.1:3090',
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
      form_rule: {
        contributor: [
          { required: true, message: "请输您的昵称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 复制成功时的回调函数
    onCopy(e) {
      this.$message({
        title: "操作",
        message: "词条名已复制到剪切板！",
        type: "success",
      });
    },
    // 复制失败时的回调函数
    onError(e) {
      this.$message.error({
        title: "操作",
        message: "复制失败！",
      });
    },
    // 获取行信息
    getRow(row) {
      this.selRowData = JSON.parse(JSON.stringify(row));
    },
    // 提交tag
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
      let self = this;
      // 获取categories列表
      this.$http({
        method: "POST",
        url: `${self.$store.state.serverhost}/update_taginfo`,
        data: self.form,
      })
        .then((res) => {
          if (res.data.code == 200) {
            self.$message({
              title: "成功",
              message: res.data.msg,
              type: "success",
            });
          } else {
            self.$message.error({
              title: "错误",
              message: res.data.msg,
            });
          }
        })
        .catch((err) => {
          self.$message.error({
            title: "错误",
            message: "请求服务器发生错误",
          });
        });
    },
    // 获取随机tag
    roll_tag() {
      this.$message({
        title: "操作",
        message: "正在获取随机tag",
        type: "warning",
      });
      let self = this;
      // 获取categories列表
      this.$http({
        method: "GET",
        url: `${self.$store.state.serverhost}/get_random_tag`,
      })
        .then((res) => {
          if (res.data.code == 200) {
            self.$message({
              title: "成功",
              message: res.data.msg,
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
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          self.$message.error({
            title: "错误",
            message: "请求服务器发生错误",
          });
        });
    },
  },
  components: {
    categorySelector,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  justify-self: center;
}
.contributePage {
  width: 98%;
  margin-top: 20%;
}
.tag {
  width: 70px;
}
</style>
