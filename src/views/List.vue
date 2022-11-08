<template>
  <div class="main">
    <div class="box">
      <vueBarChartRace :option="option"></vueBarChartRace>
    </div>
  </div>
</template>
<script>
import vueBarChartRace from "vue-bar-chart-race";
export default {
  components: {
    vueBarChartRace,
  },
  data() {
    return {
      option: {
        loop: false, //循环
        background: "rgba(255, 255, 255, 1)",
        speed: 500, //速度
        barNumber: 10, //柱子数量
        barGap: 20, //柱间距离
        margin: {
          //画布边距
          top: 50,
          bottom: 10,
          left: 80,
          right: 100,
        },
        dateStyle: {
          color: "#000",
          fontSize: 20,
        },
        data: {
          date: [
            "总数量：2012",
            "总数量：20319",
            "总数量：202326",
            "总数量：202402",
            "总数量：20409",
            "总数量：2020416",
            "总数量：202023",
            "总数量：2020430",
            "总数量：20207",
            "总数量：2020514",
            "总数量：202521",
            "总数量：20528",
            "总数量：202604",
            "总数量：202611",
            "总数量：20618",
            "总数量：2020625",
            "总数量：202628",
          ],
          valueList: [
            {
              name: "用户1",
              data: [
                "15113",
                "41035",
                "80589",
                "115242",
                "143626",
                "168941",
                "189973",
                "205463",
                "215858",
                "223096",
                "228006",
                "231732",
                "234013",
                "236142",
                "238159",
                "239706",
                "240136",
              ],
            },
            {
              name: "用户2",
              data: [
                "52",
                "621",
                "2985",
                "8044",
                "18092",
                "30425",
                "50036",
                "87187",
                "135773",
                "203165",
                "310087",
                "438238",
                "614941",
                "802828",
                "978142",
                "1228114",
                "1313667",
              ],
            },
            {
              name: "用户3",
              data: [
                "15113",
                "41035",
                "80589",
                "11524",
                "14362",
                "16894",
                "18997",
                "20546",
                "21585",
                "123096",
                "22800",
                "23173",
                "234013",
                "236142",
                "21585",
                "123096",
                "22800",
              ],
            },
          ],
        },
        barOption: {
          //柱色域
          type: true, //true 随机 //false 自定义颜色
          rgb: [
            [0, 0],
            [0, 128],
            [0, 128],
          ], //随机色域取值范围//true
          colorList: ["#f00", "#fff", "#00f"], //自定义颜色
          textStyle: {
            color: "#000",
            fontSize: 15,
          },
        },
        axisLine: {
          //x轴线
          color: "#000", //轴线刻度文字颜色
          lengths: 7, //轴线数量
          padding: 10, //x轴文字距离轴线的距离
          marklength: 5, //刻度线长度
        },
      },
    };
  },
};
</script>
<style scoped>
.main {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0);
}
.box {
  overflow: hidden;
  width: 50%;
  height: 50%;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
}
</style>
