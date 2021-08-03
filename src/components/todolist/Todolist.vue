<template>
  <el-card class="box-card todolist">
    <div slot="header" class="clearfix">
      <i class="el-icon-arrow-down el-icon--right"></i>
      <div style="float: right; padding: 3px 0" type="text">todolist</div>
    </div>
    <div class="item-todolist flex_c">
      <div v-if="num === 1">
        <div
          class="flex ai_c item"
          v-for="(item, index) in todolist"
          :key="index"
        >
          <div class="checked">
            <i
              class="iconfont icon-dagou1"
              :class="{ c_gray: item.checked === true }"
              @click="click(item, index)"
            ></i>
          </div>
          {{ item.title }}
          <i class="iconfont icon-chacha-copy" @click="del(item)"></i>
        </div>
      </div>
      <div v-else-if="num === 2">
        <div
          class="flex ai_c item"
          v-for="(item, index) in todolist.filter((item) => {
            return item.checked !== true;
          })"
          :key="index"
        >
          <div class="checked">
            <i
              class="iconfont icon-dagou1"
              :class="{ c_gray: item.checked === true }"
              @click="click(item, index)"
            ></i>
          </div>
          {{ item.title }}
          <i class="iconfont icon-chacha-copy" @click="del(item)"></i>
        </div>
      </div>
      <div v-else>
        <div
          class="flex ai_c item"
          v-for="(item, index) in todolist.filter((item) => {
            return item.checked === true;
          })"
          :key="index"
        >
          <div class="checked">
            <i
              class="iconfont icon-dagou1"
              :class="{ c_gray: item.checked === true }"
              @click="click(item, index)"
            ></i>
          </div>
          {{ item.title }}
          <i class="iconfont icon-chacha-copy" @click="del(item)"></i>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="flex flex_b total f12">
      <div>{{ left }} items left</div>
      <div @click="clickItem(1)" :class="{ border: num === 1 }">All</div>
      <div @click="clickItem(2)" :class="{ border: num === 2 }">Acitive</div>
      <div @click="clickItem(3)" :class="{ border: num === 3 }">Completed</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      todolist: [
        { title: "star this repository", checked: false },
        { title: "fork this repository", checked: false },
        { title: "follow author", checked: false },
        { title: "vue -admin", checked: false },
        { title: "vue", checked: false },
        { title: "element-ui", checked: false },
        { title: "axios", checked: true },
        { title: "webpack", checked: true },
      ],
      active: [],
      completed: [],
      num: 1,
    };
  },
  components: {},
  methods: {
    click(item, index) {
      item.checked = !item.checked;
    },
    clickItem(index) {
      this.num = index;
    },
    del(item) {
      this.todolist = this.todolist.filter((item1) => {
        return item1.title !== item.title;
      });
    },
    leftGo() {
      return this.todolist.filter((item) => {
        return item.checked === false;
      }).length;
    },
  },
  mounted() {},
  computed: {
    left() {
      return this.leftGo();
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.checked {
  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  border: 1px solid #8a8a8a;
  margin-right: 15px;
  .icon-dagou1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px !important;
    color: #ffffff;
  }
}
.c_gray {
  color: #8a8a8a !important;
}
.item {
  height: 35px;
  line-height: 35px;
  position: relative;
  &:hover {
    .icon-chacha-copy {
      display: block;
    }
  }
}
.icon-chacha-copy {
  position: absolute;
  top: 5px;
  right: 5px;
  display: none;
  // transform: translate(-50%, -3px);
}
.total > div {
  margin-top: -10px;
  margin: -10px 5px;
  padding: 0 1px;
  &:first-child {
    border: 0;
  }
}
.border {
  border: 1px solid #999;
}
</style>