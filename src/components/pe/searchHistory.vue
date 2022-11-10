<template>
  <el-row class="historyBox">
    <el-col :span="3">
      <span class="text"><i class="el-icon-time"></i></span>
    </el-col>
    <el-col :span="19">
      <div class="histories" :class="{ lh: extended }">
        <el-tag
          class="history-block"
          v-for="{ w, i } in datas"
          @click="
            $emit('select', $event.target.getAttribute('data-history-data'))
          "
          :data-history-data="w"
          :key="i"
          >{{ w }}
        </el-tag>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="control">
        <el-button
          icon="el-icon-arrow-up"
          circle
          v-if="!extended"
          @click="extended = 1"
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-arrow-down"
          circle
          v-if="extended"
          @click="extended = 0"
          size="small"
        ></el-button>
      </div>
      <div class="control">
        <el-button
          icon="el-icon-delete"
          circle
          @click="clearData"
          size="small"
        ></el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["datas"],
  emits: ["select", "clear"],
  data() {
    return {
      extended: true,
    };
  },
  methods: {
    clearData() {
      let _this = this;
      this.$confirm("确定删除历史记录吗？", "确认？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.$emit("clear");
        })
        .catch(() => {});
    },
  },
};
</script>
<style>
.historyBox {
  width: 100%;
  border: 1px solid #dcdfe6;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 5px;
}
.lh {
  height: 50px;
  overflow: hidden;
}
.control {
  text-align: right;
  padding: 3px;
}
.histories {
  padding: 5px;
  display: flex;
}
.history-block {
  margin: 3px;
  cursor: pointer;
}
.history-block:hover {
  text-decoration: underline;
}
.text{
  color: #475669;
}
</style>
