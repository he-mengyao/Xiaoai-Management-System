<template>
  <el-container class="home-container">
    <el-header>
      <headers></headers>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <navs></navs>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Headers from "../../components/headers/Headers.vue";
import Navs from "../../components/navs/Navs.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { Headers, Navs },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.home-container {
  height: 100%;
}
.el-header {
  padding: 0;
  background-color: #395d81;
}
.el-aside {
  background-color: #364052;
}
.main {
  padding: 0 20px;
  background-color: #f1f2f4;
}
</style>