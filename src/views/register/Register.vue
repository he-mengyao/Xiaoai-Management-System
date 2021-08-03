<template>
  <div class="box">
    <el-card class="box-card tac">
      <div class="title f18">欢迎来到小爱后台管理系统</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm mrt-20"
      >
        <el-form-item label="请输入用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="between">
            <el-col>
              <el-button type="primary" @click="register">立即注册</el-button>
            </el-col>
            <el-col>
              <el-button type="primary" @click="login">立即登录</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    let checkUsername = (rule, value, callback) => {
      if (/[\u4E00-\u9FA5]/g.test(value)) {
        return callback("账户名不能是中文");
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
          { validator: checkUsername, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度最少为6个字符", trigger: "blur" },
        ],
      },
    };
  },
  components: {},
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/user/register", this.ruleForm)
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this.$router.push("/login");
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              $this.$message.error("注册失败");
            });
        } else {
          $this.$message.error("表格填写有误，请检查");
          return;
        }
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  height: 100%;
  background-color: #cbebed;
}
.el-card {
  width: 500px;
  height: 280px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .title {
    height: 40px;
    border-bottom: 1px solid #eee;
  }
  .el-input {
    width: 280px;
  }
}
</style>