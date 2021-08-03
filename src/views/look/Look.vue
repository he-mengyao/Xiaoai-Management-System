<template>
  <div>
    <el-button type="primary" @click="back" size="mini">返回</el-button>
    <div class="title tac f20 fw">{{ obj.title }}</div>
    <div class="abstract tac mrt-15">{{ obj.abstract }}</div>
    <div class="date tac f14">发布于：{{ obj.date }}</div>
    <el-card class="box-card">
      {{ obj.text }}
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      obj: {},
      obj1: {},
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.back();
    },
    getData() {
      axios
        .post("/api/article/article", { _id: this.obj1._id })
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data.data);
            this.obj = res.data.data;
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
  },
  mounted() {
    this.obj1 = this.$route.query;
    // console.log(this.obj1);
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.el-button {
  margin-top: 20px;
}
.abstract {
  color: #000000;
}
.date {
  color: #cccccc;
  margin: 10px 0;
}
</style>