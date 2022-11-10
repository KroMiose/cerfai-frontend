<template>
  <div class="main">
    <div :class="home" v-if="show">
      <lottie
        class="lottie"
        :options="defaultOptions"
        :height="400"
        :width="400"
        v-on:animCreated="handleAnimation"
      />
      <div class="menu">
        <div class="text">
          <h1>Novel AI</h1>
          <h1>Creatior Contributor</h1>
          <h1>共创者榜单</h1>
          <el-divider></el-divider>
          <p>感谢陪伴Novel AI成长并默默做出贡献的用户。</p>
          <p>以优质的贡献和共创促使Novel AI词条百科共享站不断完善。</p>
          <p>官方翻译组：</p>
          <span v-for="item in text">{{ item }} / </span>
        </div>
      </div>
      <el-button type="text" class="next" @click="next"
        ><i class="el-icon-arrow-down"></i
      ></el-button>
    </div>

    <div class="list animate__animated animate__fadeInUp" v-else>
      <div class="box">
        <vueBarChartRace v-if="num != ''" :option="option"></vueBarChartRace>
      </div>
    </div>
  </div>
</template>
<script>
import vueBarChartRace from "vue-bar-chart-race";
import * as animationData from "@/assets/list.json";
export default {
  components: {
    vueBarChartRace,
  },
  data() {
    return {
      defaultOptions: {
        renderer: "svg", //渲染方式，svg、canvas、html（轻量版仅svg渲染）
        loop: false, //是否循环播放，true表示循环，false表示不循环
        autoplay: false, //是否自动播放，true表示自动播放
        animationData: animationData, //需要引入的json动画对象
      },
      num: [],
      data: [],
      show: true,
      text: [
        "smzh",
        "winder",
        "芸镜阿巧",
        "好好怪",
        "雀鹰",
        "姬川岗坂",
        "是我是我是我",
        "草原",
        "北极0523",
        "madecon",
        "alleoha",
        "琼茗",
        "洬洬",
        "巨大黑洞",
        "雪枫",
        "安达樱",
        "奈白不弍",
        "TCPLwhy?",
        "北北",
        "爱丽丝·里德尔",
        "日爻三火",
        "lic",
        "厚实表皮",
        "Lesson 5",
        "哼哼~啊啊啊啊",
        "YplusO",
        "依文洛华小咸鱼",
        "好好怪",
        "乙木",
        "祈",
        "丿空丶格灬",
        "萌新(RhineSky)",
        "松实玄",
        "失眠症患者马修",
        "HKO2006",
        "凋叶淙",
        "终末的EVE",
        "hujilo",
        "涧鸣",
        "P.",
        "穿九",
        "猫毛",
        "code404",
        "叮叮与弯弯",
        "wcx",
        "哲明044",
        "粉色妖精小姐",
        "lehres洛儿",
        "赫尔梅斯",
        "吉王吉君",
      ],
      home: "home",
    };
  },
  computed: {
    option() {
      return {
        loop: false, //循环
        background: "rgba(255, 255, 255, 1)",
        speed: 300, //速度
        barNumber: 25, //柱子数量
        barGap: 10, //柱间距离
        margin: {
          //画布边距
          top: 50,
          bottom: 10,
          left: 90,
          right: 50,
        },
        dateStyle: {
          color: "#000",
          fontSize: 20,
        },
        data: {
          date: JSON.parse(JSON.stringify(this.num)),
          valueList: JSON.parse(JSON.stringify(this.data)),
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
            fontSize: 12,
          },
        },
        axisLine: {
          //x轴线
          color: "#000", //轴线刻度文字颜色
          lengths: 3, //轴线数量
          padding: 10, //x轴文字距离轴线的距离
          marklength: 10, //刻度线长度
        },
      };
    },
  },
  mounted() {},
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
      setTimeout(() => {
        this.anim.play();
      }, 1000);
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    next() {
      this.home = "home animate__animated animate__fadeOutUp";
      setTimeout(() => {
        this.show = !this.show;
        var self = this;
        this.$http({
          method: "GET",
          url: `${self.$store.state.serverhost}/get_categories`,
        }).then((res) => {
          let cd = res.data.contributor;
          var num = 0;
          for (let key in cd) {
            num = num + cd[key];
            if (cd[key] >= 5) {
              self.data.push({
                name: key,
                data: [
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  self.random(1, cd[key]),
                  cd[key],
                ],
              });
            }
          }
          self.num = [
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + self.random(1, num),
            "词条总数：" + num,
          ];
        });
        this.$message({
          title: "提示",
          message: "仅显示贡献数量前25名的用户",
          type: "success",
        });
      }, 200);
    },
  },
};
</script>
<style scoped>
.main {
  background: rgba(0, 0, 0, 0);
  overflow-x: hidden;
}
.list {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 95%;
  height: 80%;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
}
.but {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.but:hover,
.but:focus {
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.3);
  background: rgb(255, 255, 255);
  color: #475669;
}
.animation {
  width: 100px;
  height: 100px;
  background-color: antiquewhite;
}
.home {
  margin-top: 10vh;
  width: 80%;
  margin-left: -10%;
}
.lottie {
  position: relative;
  left: -200px;
  top: 0;
}
.el-divider {
  background-color: black;
}
.menu {
  position: relative;
  left: 0;
  top: -400px;
}
.text {
  border-radius: 20px;
  padding: 30px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.3),
    rgba(0, 0, 0, 0)
  );
  backdrop-filter: blur(20px);
  width: 100%;
  text-align: left;
}

.next {
  position: relative;
  top: -390px;
  left: 50%;
  font-size: 40px;
  color: #475669;
}
</style>
