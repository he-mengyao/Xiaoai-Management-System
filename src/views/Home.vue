<template>
  <div>
    <div class="icon flex flex_b">
      <div
        class="icon1 flex_1 flex flex_b ai_c"
        v-for="(item, index) in arr"
        :key="index"
      >
        <img :src="item.src" alt="" />
        <div>
          <div class="title f14">{{ item.title }}</div>
          <div>{{ item.count }}</div>
        </div>
      </div>
    </div>
    <div class="zhexian" ref="zhexian"></div>
    <div class="flex flex_b two">
      <div class="flex_1" ref="leida"></div>
      <div class="flex_1" ref="pie"></div>
      <div class="flex_1" ref="bar"></div>
    </div>
    <div class="footer flex flex_b f14" ref="footer">
      <el-table :data="orderData" style="width: 100%" class="fl">
        <el-table-column prop="num" label="Order_No" width="280" align="center">
        </el-table-column>
        <el-table-column prop="price" label="Price" width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          filter-placement="bottom-end"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 0 ? 'danger' : 'success'"
              disable-transitions
              v-html="scope.row.status === 0 ? 'pending' : 'success'"
            ></el-tag>
          </template>
        </el-table-column>
      </el-table>
      <Todolist></Todolist>
      <div class="fr">
        <img
          src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
          alt=""
        />
        <div class="progress">
          <div>{{ progressName[0] }}</div>
          <el-progress :percentage="progress[0]"></el-progress>
          <div>{{ progressName[1] }}</div>
          <el-progress
            :percentage="progress[1]"
            :format="format"
            status="success"
          ></el-progress>
          <div>{{ progressName[2] }}</div>
          <el-progress :percentage="progress[2]"></el-progress>
          <div>{{ progressName[3] }}</div>
          <el-progress :percentage="progress[3]"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
import loadsh from "loadsh";
import { Axis } from "echarts";
import Todolist from "../components/todolist/Todolist.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: [],
      zhexianData: [],
      leidaData: [],
      date1: [],
      expected1: [],
      actual1: [],
      leidaName: [],
      leidaDatas: [],
      pieData: [],
      orderData: [],
      progress: [],
      progressName: [],
      checked: false,
    };
  },
  components: { Todolist },
  methods: {
    getData() {
      axios
        .get("/api/homeData")
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              // console.log(res);
              let data = res.data.data;
              // 封装用户统计
              let title1 = Object.keys(data);
              let count1 = Object.values(data);
              let src1 = [
                require("../assets/用户.png"),
                require("../assets/对话.png"),
                require("../assets/人民币.png"),
                require("../assets/购物 车.png"),
              ];
              title1.map((item, index) => {
                let obj = {};
                count1.map((item1, index1) => {
                  src1.map((item2, index2) => {
                    if (index === index1 && index1 === index2) {
                      obj.title = item;
                      obj.count = item1;
                      obj.src = item2;
                      this.arr.push(obj);
                    }
                  });
                });
              });
            } else {
              thi.$message.error(res.statusText);
            }
          }
        })
        .catch((er) => {
          console.log("请求失败");
        });
    },
    getDataZ() {
      axios
        .get("/api/homeChat")
        .then((res) => {
          if (res.data.code === 0) {
            this.zhexianData = res.data.data;
            this.zhexianData.map((item) => {
              this.date1.push(item.date);
              this.expected1.push(item.expected);
              this.actual1.push(item.actual);
            });
            // console.log(this.date1);
            // console.log(this.expected1);
            // console.log(this.actual1);
            this.zhexian();
            this.bar();
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    getLeida() {
      axios
        .get("/api/radarChat")
        .then((res) => {
          if (res.data.code === 0) {
            this.leidaData = res.data.data;
            let ldname = [];
            this.leidaData.map((item) => {
              ldname = Object.keys(item);
              // console.log(Object.values(item));
              this.leidaDatas.push(Object.values(item));
            });
            ldname.shift();
            ldname.map((item) => {
              let obj = {};
              obj.name = item;
              this.leidaName.push(obj);
            });
            // console.log(this.leidaName);
            // console.log(this.leidaDatas[1].slice(1, this.leidaDatas[1].length));
            this.leida();
          }
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    getPie() {
      axios
        .get("/api/ringChat")
        .then((res) => {
          if (res.data.code === 0) {
            // console.log(res.data.data);
            let data = res.data.data;
            Object.values(data).map((item, index) => {
              this.pieData.push(item);
            });
            this.pieData = this.pieData.map((item) => {
              return JSON.parse(JSON.stringify(item).replace(/data/g, "value"));
            });
            // console.log(this.pieData);
            this.pie();
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    getOrderData() {
      axios
        .get("/api/orderData")
        .then((res) => {
          if (res.data.code === 0) {
            this.orderData = res.data.data;
            this.orderData.map((item) => {
              item.price = `￥${item.price}`;
            });
          } else {
            this.$message.error(res.data.dat);
          }
        })
        .catch((error) => {
          console.log(err, "请求失败");
        });
    },
    getProgress() {
      axios
        .get("/api/progress")
        .then((res) => {
          if (res.data.code === 0) {
            // console.log(res.data.data);
            let data = res.data.data;
            data.map((item) => {
              item.progress = item.progress * 100;
              this.progress.push(item.progress);
              this.progressName.push(item.name);
            });
            // console.log(this.progress);
            // console.log(this.progressName);
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    zhexian() {
      var chartDom = this.$refs.zhexian;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          data: ["expected", "actual"],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.date1,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "expected",
            data: this.expected1,
            type: "line",
            smooth: true,
          },
          {
            name: "actual",
            data: this.actual1,
            type: "line",
            smooth: true,
            color: "#e93a61",
          },
        ],
      };

      option && myChart.setOption(option);
    },
    leida() {
      var chartDom = this.$refs.leida;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          // text: "基础雷达图",
        },
        legend: {
          // data: this.leidaTitle,
        },
        radar: {
          shape: "circle",
          indicator: this.leidaName,
          radius: 120,
        },
        series: [
          {
            // name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [
              {
                value: this.leidaDatas[0].slice(1, this.leidaDatas[0].length),
                name: this.leidaDatas[0][0],
              },
              {
                value: this.leidaDatas[1].slice(1, this.leidaDatas[1].length),
                name: this.leidaDatas[1][0],
              },
              {
                value: this.leidaDatas[2].slice(1, this.leidaDatas[2].length),
                name: this.leidaDatas[2][0],
              },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    pie() {
      var chartDom = this.$refs.pie;
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
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            // saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [20, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: this.pieData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    bar() {
      var chartDom = this.$refs.bar;
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          data: ["expected", "actual"],
        },
        xAxis: {
          type: "category",
          data: this.date1,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.expected1,
            type: "bar",
            name: "expected",
          },
          {
            data: this.actual1,
            type: "bar",
            name: "actual",
          },
        ],
      };

      option && myChart.setOption(option);
    },
    filterTag(value, row) {
      return row.status === value;
    },
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
  },
  mounted() {
    this.getData();
    this.getDataZ();
    this.getLeida();
    this.getPie();
    this.getOrderData();
    this.getProgress();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.icon {
  height: 100px;
  margin: 30px 0;
  img {
    height: 50px;
    width: 50px;
  }
  .title {
    color: #8e8e8f;
  }
  .icon1 {
    margin-right: 15px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 0 30px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.zhexian {
  height: 400px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.two {
  margin-top: 30px;
  height: 400px;
  div {
    margin-right: 15px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    &:last-child {
      margin-right: 0;
    }
  }
}
.footer {
  height: 450px;
  margin-top: 30px;
  .fl {
    flex: 2;
    background-color: #fff;
    margin-right: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .todolist {
    flex: 1;
    background-color: #fff;
    margin-right: 15px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .fr {
    flex: 1;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 15px;
    img {
      width: 100%;
    }
    .progress {
      margin-top: 15px;
    }
    .el-progress {
      height: 40px;
    }
  }
}
</style>