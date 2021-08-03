<template>
  <div class="box">
    <div class="f22 title">支持拖拽</div>
    <div class="info">Element UI自带上传组件</div>
    <div>
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <div class="f22 title">支持剪裁</div>
    <div class="info">vue-image-crop-upload</div>
    <div id="image">
      <!--上传图片的按钮-->
      <el-tag @click="toggleShow" effect="dark" class="pic cursor btn"
        >上传图片</el-tag
      >
      <!--组件主体-->
      <my-upload
        field="file"
        @crop-success="cropSuccess"
        v-model="show"
        :width="400"
        :height="200"
        img-format="jpg"
        :size="size"
        url="/api/Upload"
      ></my-upload>
      <!-- <img :src="avatar" /> -->
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload/upload-2.vue";

export default {
  name: "",
  props: {},
  data() {
    return {
      avatar: "", //用于存储剪切完图片的base64Data和显示回调图片
      show: false, //剪切框显示和隐藏的flag
      size: 2.1,
    };
  },
  components: {
    myUpload,
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 < 500;
      console.log(file.size);

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式或者png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500kb!");
      }
      return isJPG && isLt2M;
    },
    toggleShow() {
      this.show = !this.show;
    },
    //剪切成功后的回调函数
    cropSuccess(imgDataUrl) {
      //  imgDataUrl其实就是图片的base64data码
      this.avatar = imgDataUrl;
      console.log(imgDataUrl); //这里打印出来的是base64格式的资源
    },
  },
};
</script>

<style lang='scss' scoped>
.box {
  height: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
  .info {
    width: 90%;
    height: 40px;
    line-height: 40px;
    background-color: #eeefed;
    padding-left: 20px;
    color: #303233;
  }
  .title {
    color: #303134;
  }
  div {
    margin-top: 20px;
  }
  .pic {
    width: 80px;
    text-align: center;
  }
}
</style>