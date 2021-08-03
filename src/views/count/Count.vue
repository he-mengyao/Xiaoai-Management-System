<template>
  <div>
    <!--  总统计-->
    <div class="box mrt-20 flex">
      <div class="item publish flex_1 col-center pr">
        <div>今日发布</div>
        <div>{{ todayNum }}</div>
        <i class="iconfont el-icon-check"></i>
      </div>
      <div class="item article flex_1 col-center pr">
        <div>原创文章</div>
        <div>{{ orNum }}</div>
        <i class="iconfont el-icon-tickets"></i>
      </div>
      <div class="item leaveMessage flex_1 col-center pr">
        <div>新留言</div>
        <div>0</div>
        <i class="iconfont el-icon-bell"></i>
      </div>
      <div class="item message flex_1 col-center pr">
        <div>新消息</div>
        <div>0</div>
        <i class="iconfont el-icon-phone-outline"></i>
      </div>
    </div>
    <div class="middle flex flex_b mrt-20">
      <div class="flex_1 fl" ref="fl"></div>
      <div class="flex_1" ref="fr"></div>
    </div>
    <div class="footer" ref="footer"></div>
  </div>
</template>

<script>
import lodash from "loadsh";
import axios from "axios";
import dayjs from "dayjs";
import * as echarts from "echarts";

export default {
  name: "",
  props: {},
  data() {
    return {
      todayNum: 0,
      orNum: 0,
      category: [],
      data: [],
      categoryData: [],
      sourceData: [],
      time_name: [],
      time_value: [],
      time_value_re: [],
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              // console.log(res.data.data);
              this.data = res.data.data;
              // console.log(this.data);
              // 计算今日发布数
              let nowTime = new Date();
              this.todayNum = res.data.data.filter((item) => {
                return (
                  dayjs(item.date).format("YYYY年MM月DD日") ===
                  dayjs(nowTime).format("YYYY年MM月DD日")
                );
              }).length;
              // 计算原创数
              this.orNum = res.data.data.filter((item1) => {
                return item1.source === "原创";
              }).length;
              // 得到类目
              this.category = lodash.groupBy(this.data, "category");
              // console.log(this.category);
              // 类目名称
              let name1 = Object.keys(this.category);
              // 类目对应数量
              let value1 = Object.values(this.category);
              value1 = value1.map((item) => {
                return item.length;
              });
              // 得到categoryData
              name1.map((item, index) => {
                let obj = {
                  value: 0,
                  name: "",
                };
                value1.map((item1, index1) => {
                  if (index === index1) {
                    obj.name = item;
                    obj.value = item1;
                    // console.log(obj);
                    this.categoryData.push(obj);
                  }
                });
              });
              this.countCategory();
              // 得到来源
              let source = lodash.groupBy(this.data, "source");
              let source_name = Object.keys(source);
              let source_value = Object.values(source);
              // console.log(source_value);
              source_value = source_value.map((item) => {
                return item.length;
              });
              // console.log(source_name);
              source_value.map((item, index) => {
                let obj = {};
                source_name.map((item1, index1) => {
                  if (index === index1) {
                    obj.name = item1;
                    obj.value = item;
                    this.sourceData.push(obj);
                  }
                });
              });
              this.countSource();
              // 得到时间
              this.data.map((item) => {
                item.date = dayjs(item.date).format("YYYY年MM月DD日");
              });
              let time = lodash.groupBy(this.data, "date");
              this.time_name = Object.keys(time);
              this.time_name.unshift("总计");
              this.time_value = Object.values(time);
              this.time_value = this.time_value.map((item) => {
                return item.length;
              });
              let sum = this.data.length;
              this.time_value.map((item) => {
                this.time_value_re.push(sum - item);
                sum = sum - item;
              });
              this.time_value.unshift(this.data.length);
              this.time_value_re.unshift(0);
              // console.log(this.time_value);
              // console.log(this.time_value_re);
              this.countDate();
            } else {
              this.$message.error(res.statusText);
            }
          }
        })
        .catch((err) => {
          console.log("请求失败");
        });
    },
    countCategory() {
      let chartDom = this.$refs.fl;
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          // orient: "vertical",
          left: "center",
        },
        series: [
          {
            name: "类目",
            type: "pie",
            radius: "50%",
            data: this.categoryData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    countSource() {
      var chartDom = this.$refs.fr;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          top: "top",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: [20, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 4,
            },
            data: this.sourceData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    countDate() {
      var chartDom = this.$refs.footer;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          // text: "深圳月最低生活费组成（单位:元）",
          subtext: "数量",
          // sublink: "http://e.weibo.com/1341556070/AjQH99che",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: function (params) {
          //   var tar = params[1];
          //   return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          // },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: this.time_name,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)",
            },
            // label: {
            //   show: true,
            //   position: "top",
            // },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: this.time_value_re,
          },
          {
            name: "发布文章数量",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "top",
            },
            data: this.time_value,
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    dayjs,
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 60px;
  width: 100%;
  color: #fff;
  .item {
    height: 60px;
    i {
      position: absolute;
      right: 30px;
      top: 25px;
    }
  }
  .publish {
    background-color: #8ec8bf;
  }
  .article {
    background-color: #db8e8a;
  }
  .leaveMessage {
    background-color: #8076a0;
  }
  .message {
    background-color: #a8ccc1;
  }
}
.middle {
  height: 350px;
}
.footer {
  height: 400px;
}
</style>