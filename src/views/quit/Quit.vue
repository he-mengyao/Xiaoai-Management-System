<template>
  <div class="flex col ai_c quit">
    <div class="f22 fw">期待您的下次光临</div>
    <br />
    <div>
      <el-tag
        effect="dark"
        size="medium"
        class="fw sure tac cursor"
        @click="open"
        >退出</el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    // click() {
    //   localStorage.removeItem("username");
    //   localStorage.removeItem("logintime");
    //   this.$router.push("/login");
    // },
    open() {
      this.$alert("确定退出？", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `退出成功`,
          });
          localStorage.removeItem("user");
          this.$router.push("/login");
        },
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.quit {
  width: 200px;
  margin: 160px auto;
  .sure {
    width: 80px;
    height: 30px;
    line-height: 30px;
  }
}
</style>