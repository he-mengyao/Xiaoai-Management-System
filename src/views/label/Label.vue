<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 未读 -->
      <el-tab-pane :label="label1" name="first">
        <el-card>
          <div v-for="(item, index) in readData" :key="index" class="item">
            <div class="flex ai_c flex_b">
              <div class="grid-content bg-purple" :span="12">
                {{ item.title }}
              </div>
              <div
                class="grid-content bg-purple-light"
                :span="12"
                align="right"
              >
                {{ item.time }}&nbsp;&nbsp;
                <el-button @click="read(item, index)">{{
                  item.text
                }}</el-button>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <el-button type="primary" @click="readAll">全部标为已读</el-button>
        </el-card>
      </el-tab-pane>
      <!-- 已读 -->
      <el-tab-pane :label="label2" name="second">
        <el-card>
          <div v-for="(item, index) in Reread" :key="index" class="item">
            <div class="flex ai_c flex_b">
              <div class="grid-content bg-purple" :span="12">
                {{ item.title }}
              </div>
              <div
                class="grid-content bg-purple-light"
                :span="12"
                align="right"
              >
                {{ item.time }}&nbsp;&nbsp;
                <el-button @click="Rereadclick(item, index)">{{
                  item.text
                }}</el-button>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <el-button type="danger" @click="Rereadall">删除全部</el-button>
        </el-card>
      </el-tab-pane>
      <!-- 回收站 -->
      <el-tab-pane :label="label3" name="three">
        <el-card>
          <div v-for="(item, index) in remove" :key="index" class="item">
            <div class="flex ai_c flex_b">
              <div class="grid-content bg-purple" :span="12">
                {{ item.title }}
              </div>
              <div
                class="grid-content bg-purple-light"
                :span="12"
                align="right"
              >
                {{ item.time }}&nbsp;&nbsp;
                <el-button type="warning" @click="removedata(item, index)">{{
                  item.text
                }}</el-button>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <el-button type="info" @click="removeall">清空回收站</el-button>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeName: "first",
      readData: [
        {
          title: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2018-04-19 20:00:00",
          text: "标为已读",
        },
        {
          title: "今晚12点整发大红包,先到先得",
          time: "2018-04-19 20:00:00",
          text: "标为已读",
        },
      ],
      Reread: [
        {
          title: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2018-04-19 20:00:00",
          text: "删除",
        },
      ],
      remove: [
        {
          title: "[系统通知]您的优惠券已经过期",
          time: "2018-04-19 20:00:00",
          text: "还原",
        },
      ],
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    read(item, index) {
      this.readData.splice(index, 1);
      item.text = "删除";
      this.Reread.push(item);
    },
    readAll() {
      this.readData.map((item) => {
        item.text = "删除";
        this.Reread.push(item);
      });
      this.readData = [];
    },
    Rereadclick(item, index) {
      this.Reread.splice(index, 1);
      item.text = "还原";
      this.remove.push(item);
    },
    Rereadall() {
      this.Reread.map((item) => {
        item.text = "还原";
        this.remove.push(item);
      });
      this.Reread = [];
    },
    removeall() {
      this.remove = [];
    },
    removedata(item, index) {
      this.Reread.push(item);
      item.text = "";
      this.remove.splice(index, 1);
    },
  },
  mounted() {},
  computed: {
    label1() {
      return `未读消息(${this.readData.length})`;
    },
    label2() {
      return `已读消息(${this.Reread.length})`;
    },
    label3() {
      return `回收站(${this.remove.length})`;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.el-row {
  padding-right: 30px;
}
</style>