<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="7"
        ><el-button type="danger" size="mini" @click="back"
          >返回</el-button
        ></el-col
      >
      <el-col :span="5"
        ><el-button type="primary" size="mini" @click="publish"
          >发布</el-button
        ></el-col
      >
    </el-row>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm mrt-20"
      size="medium"
    >
      <!-- 标题 -->
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <!-- 摘要 -->
      <el-form-item label="文章摘要" prop="abstract">
        <el-input v-model="ruleForm.abstract"></el-input>
      </el-form-item>
      <!-- 作者相关信息 -->
      <el-row>
        <el-col :span="5"
          ><el-form-item label="作者" prop="author">
            <el-input v-model="ruleForm.author"></el-input> </el-form-item
        ></el-col>
        <el-col :span="5">
          <el-form-item label="类目" required prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择">
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="React" value="React"></el-option>
              <el-option label="Node.js" value="Node.js"></el-option>
              <el-option label="性能优化" value="性能优化"></el-option>
              <el-option label="JavaScript" value="JavaScript"></el-option>
              <el-option label="JvER" value="JvER"></el-option>
              <el-option label="工具类" value="工具类"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="来源" required prop="source">
            <el-select v-model="ruleForm.source" placeholder="请选择">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与他人合作" value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="重要性" required prop="star">
            <el-select v-model="ruleForm.star" placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="发布时间" required prop="date">
            <el-time-picker
              type="date"
              placeholder="选择日期时间"
              v-model="ruleForm.date"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 内容 -->
      <div id="main">
        <mavon-editor v-model="ruleForm.text" prop="text" />
      </div>
    </el-form>
    <!-- 发布 -->
    <!-- <el-row type="flex" justify="center">
      <el-button type="primary" size="medium" @click="publish">发布</el-button>
    </el-row> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      ruleForm: {
        _id: "",
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        date: "",
        text: "",
      },
      rules: {
        title: {
          required: true,
          message: "标题不能为空",
          trigger: "blur",
        },
        abstract: {
          required: true,
          message: "摘要不能为空",
          trigger: "blur",
        },
        author: {
          required: true,
          message: "作者不能为空",
          trigger: "blur",
        },
        category: [
          { required: true, message: "请选择类目", trigger: "change" },
        ],
        source: [
          {
            required: true,
            message: "请选择来源",
            trigger: "change",
          },
        ],
        star: [
          {
            required: true,
            message: "请选择重要性",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        text: [
          {
            required: true,
            message: "请填写内容",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    publish() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/article/update", {
              id: this.ruleForm._id,
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              date: this.ruleForm.date,
              text: this.ruleForm.text,
            })
            .then((res) => {
              if (res.status === 200) {
                console.log(res);
                if (res.data.success === true) {
                  this.$message.success("修改成功");
                  this.$router.push("/published");
                }
              }
            })
            .catch((err) => {
              console.log("请求失败");
            });
        } else {
          this.$message.error("表单填写有误，请检查");
          return;
        }
      });
    },
    back() {
      this.$router.back();
    },
    getData() {
      axios
        .post("/api/article/article", {
          _id: this.ruleForm._id,
        })
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data);
            this.ruleForm = res.data.data;
            console.log(this.ruleForm);
          }
        })
        .catch((err) => {
          console.log(err, "请求失败");
        });
    },
  },
  mounted() {
    this.ruleForm._id = this.$route.query._id;
    // console.log(this.ruleForm._id);
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.caozuo {
  height: 35px;
}
.el-form {
  font-size: 12px;
}
.el-button--medium {
  margin-top: 20px;
}
.el-row {
  margin-top: 20px;
}
</style>