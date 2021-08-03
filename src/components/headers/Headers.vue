<template>
  <div class="head flex flex_b f16 ai_c">
    <div>欢迎 {{ username.name }} 来到小爱后台管理系统</div>
    <div>
      {{ time }}，亲爱的 {{ username.name }} 上次登录时间: {{ nowDate }}
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      nowDate: "",
    };
  },
  components: {},
  methods: {},
  mounted() {
    this.username = JSON.parse(localStorage.getItem("user"));
    this.nowDate = dayjs(localStorage.getItem("date")).format(
      `YYYY年MM月DD日 HH时mm分ss秒`
    );
  },
  computed: {
    time() {
      let hour = dayjs(new Date()).format(`HH`);
      if (hour <= 6) {
        return "该睡觉了";
      } else if (hour <= 12) {
        return "早上好";
        console.log(11);
      } else if (hour <= 14) {
        return "中午好";
      } else if (hour <= 18) {
        return "下午好";
      } else {
        return "晚上好";
      }
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  height: 60px;
  color: #ffffff;
  padding: 0 30px;
  background-color: #395e82;
}
</style>