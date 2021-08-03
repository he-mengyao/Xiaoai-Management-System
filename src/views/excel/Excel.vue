<template>
  <div>
    <el-row class="input">
      <el-col :span="6">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          clearable
          clear="getData"
        ></el-input>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <el-table style="100%" stripe :data="list1">
        <el-table-column
          align="center"
          label="名称"
          prop="NAME"
          width="250"
        ></el-table-column>
        <el-table-column
          align="center"
          label="商品编号"
          prop="GOODS_SERIAL_NUMBER"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          label="原价"
          prop="ORI_PRICE"
        ></el-table-column>
        <el-table-column
          align="center"
          label="现价"
          prop="PRESENT_PRICE"
          width="50"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEdit(scope.row.GOODS_SERIAL_NUMBER)"
              >修改</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改 -->
    <el-dialog :visible.sync="editDialogVisible" width="50%" right>
      <el-form
        :model="editlist"
        :rules="rules"
        ref="editlist"
        label-width="70px"
      >
        <el-form-item label="名称" prop="NAME">
          <el-input v-model="editlist.NAME"></el-input>
        </el-form-item>
        <el-form-item label="原价" prop="ORI_PRICE">
          <el-input v-model="editlist.ORI_PRICE"></el-input>
        </el-form-item>
        <el-form-item label="现价" prop="PRESENT_PRICE">
          <el-input v-model="editlist.PRESENT_PRICE"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsure">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block mrt-15">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      >
      </el-pagination>
    </div>
    <el-row class="mrt-15">
      <vueJsonExcel
        class="export-excel-wrapper"
        :data="list1"
        name="商品详情.xls"
      >
        <el-col :span="3"
          ><el-button type="primary">导出xls</el-button>
        </el-col>
      </vueJsonExcel>
      <vueJsonExcel
        class="export-excel-wrapper"
        :data="list1"
        name="商品详情.csv"
      >
        <el-col :span="3"><el-button type="danger">导出csv</el-button> </el-col>
      </vueJsonExcel>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import loadsh from "loadsh";
import vueJsonExcel from "vue-json-excel";
export default {
  name: "",
  props: {},
  data() {
    return {
      input: "",
      list: [],
      list1: [],
      listAll: [],
      editDialogVisible: false,
      pageSize: 10,
      currentPage: 1,
      name: "",
      pricey: null,
      currentPrice: null,
      editlist: {},
      rules: {
        NAME: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        ORI_PRICE: [
          { required: true, message: "价格不能为空", trigger: "blur" },
        ],
        PRESENT_PRICE: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    vueJsonExcel,
  },
  methods: {
    getData() {
      axios
        .get("/api/tableData")
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            this.listAll = res.data.data;
            this.list = res.data.data;
            this.list1 = this.list.slice(
              (this.currentPage - 1) * this.pageSize,
              this.pageSize * this.currentPage
            );
            // console.log(this.list);
          } else {
            console.log("获取数据失败");
          }
        })
        .catch((err) => {
          console.log("请求失败");
        });
    },
    showEdit(code) {
      this.editlist = this.list.filter((item) => {
        return item.GOODS_SERIAL_NUMBER === code;
      })[0];
      console.log(this.editlist);
      this.editDialogVisible = true;
    },
    editsure() {
      this.$refs.editlist.validate((valid) => {
        if (valid) {
          this.editDialogVisible = false;
        } else {
          this.$message.error("表单数据填写有误，请检查");
        }
      });
    },
    del(row) {
      // console.log(row);
      this.list.splice(row, 1);
      this.list1 = this.list.slice(0, this.pageSize);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.list1 = this.list.slice(
        (this.currentPage - 1) * val,
        val * this.currentPage
      );
      console.log(this.list1);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.list1 = this.list.slice(
        this.pageSize * (val - 1),
        this.pageSize * val
      );
    },
    searchinpt(val) {
      if (val === "") {
        this.list = this.listAll;
        this.list1 = this.listAll.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        );
      } else {
        this.list = this.list.filter((item) => {
          return item.NAME.split("").includes(val) === true;
        });
        console.log(this.list);
        this.list1 = this.list;
      }
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {
    input(val) {
      this.searchinpt(val);
    },
  },
};
</script>

<style lang='scss' scoped>
.input {
  margin-top: 15px;
}
.el-card {
  margin-top: 15px;
}
</style>