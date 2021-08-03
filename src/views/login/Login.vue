<template>
  <div class="box">
    <el-card class="box-card">
      <div class="title f18 tac">欢迎来到小爱后台管理系统</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm mrt-20"
      >
        <el-form-item label="请输入用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码" prop="code">
          <div class="flex code">
            <div>
              <el-input v-model="ruleForm.code" class="yanzheng"></el-input>
            </div>
            <div class="yanzheng tac" v-html="msg" @click="update"></div>
          </div>
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
      msg: "",
      ruleForm: {
        username: "",
        password: "",
        code: "",
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
        yanzheng: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components: {},
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("/api/user/login", this.ruleForm)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                if (res.data.code === 200) {
                  this.$message.success(res.data.message);
                  let user = {
                    name: this.ruleForm.username,
                    psd: this.ruleForm.password,
                  };
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("date", res.headers.date);
                  this.$router.push("/");
                } else {
                  this.$message.error(res.data.message);
                }
              }
            })
            .catch((err) => {
              console.log("请求失败");
            });
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    register() {
      this.$router.push("/register");
    },
    update() {
      this.getData();
    },
    getData() {
      axios
        .get("/api/captcha")
        .then((res) => {
          if (res.status === 200) {
            this.msg = res.data;
          } else {
            this.$message.error(res.statusText);
          }
        })
        .catch((err) => {
          console.log("请求失败");
        });
    },
  },
  mounted() {
    this.getData();
  },
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
  height: 350px;
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
  .yanzheng {
    width: 150px;
  }
}
</style>