<template>
  <div>
    <el-col :span="12">
      <el-menu
        :default-active="$route.meta.index"
        class="el-menu-vertical-demo"
        background-color="#363f52"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/published">
          <i class="el-icon-menu"></i>
          <span slot="title">已发布</span>
        </el-menu-item>
        <el-menu-item index="/count">
          <i class="el-icon-menu"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-check"></i>
          <span slot="title">发表文章</span>
        </el-menu-item>
        <el-menu-item index="/label">
          <i class="el-icon-setting"></i>
          <span slot="title">标签页</span>
        </el-menu-item>
        <el-menu-item index="/excel">
          <i class="el-icon-setting"></i>
          <span slot="title">导出excel</span>
        </el-menu-item>
        <el-menu-item index="/upload">
          <i class="el-icon-setting"></i>
          <span slot="title">图片上传</span>
        </el-menu-item>
        <el-menu-item index="/quit">
          <i class="el-icon-delete"></i>
          <span slot="title">退出系统</span>
        </el-menu-item>
      </el-menu>
    </el-col>
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
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.el-menu-vertical-demo {
  width: 200px;
}
</style>