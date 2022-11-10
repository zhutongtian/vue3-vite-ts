<!-- 表格 -->
<template>
  <div class="c-table">
    <div class="c-table__content card">
      <el-table
        ref="tableInstance"
        class="c-table__table"
        :data="tableData"
        :size="size"
        style="width: 100%"
        v-bind="$attrs"
      >
        <slot />
        <template #empty>
          <div flex="dir:column align:center justify:center">
            <p>暂无数据</p>
          </div>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  // 表格尺寸
  size: {
    type: String,
    default: "small",
  },
});

let state = reactive({
  tableData: [], // 表格数据
});

let { tableData } = toRefs(state);
// 获取ElTable实例，暴露到外部
let tableInstance = ref(null);
// 暴露出去事件、数据
defineExpose({
  tableData: tableData,
  elTable: tableInstance,
});
</script>
<style lang="scss">
.c-table {
  .c-table__content {
    padding: 0 0 30px 0;
    transform: translateZ(0);
  }

  .c-table__pagination {
    margin-top: 30px;
  }
  .c-table__table.el-table {
    th {
      background-color: #f9f9f9 !important;
      line-height: 24px;
      padding: 10px 0;
    }
    td {
      padding: 10px 0;
    }
    .cell {
      padding: 0 15px;
    }
    &::before {
      content: none;
    }
  }
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #fff5f1;
  }
  .el-table__body tr.hover-row > td {
    background-color: #fff5f1;
  }
}
</style>
