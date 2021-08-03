<template>
  <div>
    <template>
      <el-table :data="arr1" style="width: 100%" class="mrt-20">
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column prop="title" label="标题" width="200" align="center">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="category"
          label="类目"
          width="120"
          align="center"
          :filters="[
            { text: 'Vue', value: 'Vue' },
            { text: 'React', value: 'React' },
            { text: 'Node.js', value: 'Node.js' },
            { text: '性能优化', value: '性能优化' },
            { text: 'JavaScript', value: 'JavaScript' },
            { text: '/JvER', value: '/JvER' },
            { text: '工具类', value: '工具类' },
            { text: '其他', value: '其他' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.category === 'React'"
              type="info"
              disable-transitions
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              v-else-if="scope.row.category === 'JavaScript'"
              type="warning"
              disable-transitions
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              v-else-if="scope.row.category === '工具类'"
              type="danger"
              disable-transitions
              >{{ scope.row.category }}</el-tag
            >
            <el-tag v-else disable-transitions>{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源" align="center" width="80">
        </el-table-column>
        <el-table-column prop="star" label="重要性" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.star" disabled text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="发布时间" align="center">
        </el-table-column>
        <el-table-column label="操作" width="220px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleLook(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block mrt-15">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="arr.length"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: [],
      arr1: [],
      currentPage: 1,
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/article/allArticle ")
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.arr = res.data.data;
              this.arr1 = this.arr.slice(0, 10);
              this.arr.map((item) => {
                item.star = Number(item.star);
              });
            }
          } else {
            this.$message.error(res.statusText);
          }
        })
        .catch((err) => {
          console.log("请求失败");
        });
    },
    handleEdit(index, row) {
      // console.log(row);
      this.$router.push({
        path: "/edit",
        query: {
          _id: row._id,
        },
      });
    },
    handleDelete(index, row) {
      axios
        .post("/api/article/delete", { _id: row._id })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.getData();
            }
          } else {
            this.$message.error(res.statusText);
          }
        })
        .catch((err) => {
          console.log("请求失败");
        });
    },
    handleLook(index, row) {
      this.$router.push({
        path: "/look",
        query: row,
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.arr1 = this.arr.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10
      );
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
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
</style>