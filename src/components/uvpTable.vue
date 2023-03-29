<template>
  <el-table
    :data="tableData" 
    stripe 
    border
    highlight-current-row 
    scrollbar-always-on
    class="uvpTable"
  >
    <template #empty>
      <div class="no-data">
        <img src="@/assets/images/no-data.png" alt="" />
        <p>暂无相关内容</p>
      </div>
    </template>
    <el-table-column type="index" width="100" label="编号" v-if="hasIndex" />
    <template v-for="(item,colIndex) in columns" :key="colIndex">
      <el-table-column
        :label="item.label"
        :width="item.width"
        :minWidth="item.minWidth"
        :show-overflow-tooltip="item.showTooltip"
      >
        <template #default="scope">
          <div v-if="item.imgSrc">
            <img :src="item.imgSrc" alt="" class="img">
          </div>
          <div v-if="item.type === 'link'" class="link">
            <a v-if="item.linkProp" :href="scope.row[item.linkProp]" target="_blank">{{ scope.row[item.prop] }}</a>
            <span v-else @click="cellClick(item, scope.row)">{{ scope.row[item.prop] }}</span>
          </div>
          <template v-else-if="item.type === 'arrayInline'">
            <el-tooltip placement="top" v-if="scope.row[item.prop]">
              <template #content>
                <div v-for="(cell, cellIndex) in scope.row[item.prop]" :key="cellIndex">
                  <div v-if="cellIndex < 3">{{ cell }}</div>
                </div>
              </template >
              <span>{{ scope.row[item.prop].slice(0,3).join(' | ') }}</span>
            </el-tooltip>
            <span v-else>--</span>
          </template>
          <div v-else-if="item.type === 'arrayBlock'" style="width: 100%; line-height: 30px;">
            <div v-for="(cell, cellIndex) in scope.row[item.prop]" :key="cellIndex">
              {{ cell }}
            </div>
          </div>
          <template v-else-if="item.type === 'arrayCollapse'">
            <div v-if="scope.row[item.prop]" class="arrayCollapse">
              <div class="collapseImg" @click="() => { scope.row.showAll = !scope.row.showAll }">
                <img 
                  v-if="scope.row[item.prop].length > 5"
                  src="@/assets/images/arrow.png" 
                  alt="" 
                  :class="{ rotate: !scope.row.showAll }"
                >
              </div>
              <div class="cellBox">
                <span 
                  v-for="(sub, subIndex) in scope.row.showAll ? scope.row[item.prop] : scope.row[item.prop].slice(0,5)" 
                  :key="subIndex"
                >
                  {{ sub }} 
                  <span 
                    class="line" 
                    v-if="subIndex < (scope.row.showAll ? (scope.row[item.prop].length - 1) : (scope.row[item.prop].slice(0,5).length - 1))"
                  >|</span>
                </span>
              </div>
            </div>
            <span v-else>--</span>
          </template>
          <div 
            v-else-if="item.hasBgcolor" 
            :class="['bgColor', scope.row[item.colorProp]]"
          >
            {{ scope.row[item.prop] || '--' }}
          </div>
          <div 
            v-else-if="item.hasTxtColor" 
            :class="[scope.row[item.colorProp]? 'green' : 'red']"
            >
            {{ scope.row[item.prop] || '--' }}
          </div>
          <span v-else>{{ scope.row[item.prop]  || '--' }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "uvpTable",
  components: {
    
  },
  props: {
    hasIndex: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
    };
  },
  computed:{
  },
  watch: {
  },
  methods: {
    cellClick(item, rowInfo) {
      if(item.fnName && rowInfo[item.prop]) {
        const res = {
          prop: item.prop,
          data: rowInfo
        }
        this.$emit(item.fnName, res)
      }
    }
  }
});
</script>

<style lang="less">
.uvpTable{
  &.el-table{
    th,td{
      padding: 0;
      border-bottom: none;
      .imgIcon{
        margin-right: 6px;
      }
    }
    td{
      border-right: none;
      border-color: #EEF0F1;
    }
    th > .cell,
    td > .cell {
      min-height: 48px;
      padding: 4px 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #000000;
      overflow-x: hidden;
      text-overflow: ellipsis; 
      white-space: nowrap;
      span {
        overflow: hidden;
        text-overflow: ellipsis; 
        white-space: nowrap;
      }
      a{
        color:#4971FF;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .nav-link{
        padding-left: 0;
        padding-right: 0;
      }
      .link{
        cursor: pointer;
        color:#4971FF;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .img{
        margin-right: 10px;
      }
      .bgColor{
        width: 34px;
        text-align: center;
        border-radius: 8px;
        height: 16px;
        line-height: 16px;
        &.CRITICAL{
          background-color: #FF0000;
          color: #ffffff;
        }
        &.HIGH{
          background-color: #FF9126;
          color: #ffffff;
        }
        &.MEDIUM{
          background-color: #EFCE18;
          color: #ffffff;
        }
        &.LOW{
          background-color: #67D68C;
          color: #ffffff;
        }
        &.NONE{
          background-color: #B5E1FF;
          color: #ffffff;
        }
      }
      .green{
        color: #15BC73;
      }
      .red{
        color: #FE4563;
      }
      .arrayCollapse{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: 100%;
        .collapseImg{
          cursor: pointer;
          height: 20px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: auto;
            height: auto;
            &.rotate{ 
              transform: rotate(-90deg);
            }
            transition: all 0.3s;
          }
        }
        .cellBox{
          width: calc(100% - 30px);
          display: flex;
          flex-wrap: wrap;
          line-height: 30px;
          .line{
            margin: 0 10px;
          }
        }
      }
    }
    .el-table__body {
      tr.el-table__row {
        td.cell-list .cell{
          flex-wrap: wrap;
          div{
            width: 100%;
            line-height: 24px;
            overflow-x: hidden;
            text-overflow: ellipsis; 
            white-space: nowrap;
          }
        } 
        &:hover td {
          background-color: #f2f4fc;
        }
      }
    }
    .el-table__header{
      // border: 1px solid #E2E3E8;
      tr th{
        background-color: #F3F4FC;
        font-weight: bold;
        color: #191A35;
      }
    }
    .el-table__empty-text{
      .no-data{
        color: #000000;
        font-size: 14px;
        p{
          margin-top: -20px;
        }
      }
    }
  }
}
</style>