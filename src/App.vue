<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <div class="header">
        <router-link to="/">
          <img src="@/assets/images/logo.png" alt="">
        </router-link>
        <div class="navList">
          <div 
            v-for="(nav,navIndex) in navList"
            :key="navIndex"
            class="navItem" 
            :class="{active: activeName === nav.value}"
            @click.exact="goPath(nav)"
          >
            <div class="link" :to="nav.path">{{ nav.label }}</div>
            <!-- <div class="Bottomborder"></div> -->
          </div>
        </div>
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from 'element-plus';
import { Download, Search, Expand } from '@element-plus/icons-vue'
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import { mapMutations, mapGetters} from 'vuex';
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider
  },
  data() {
    return {
      downloadIcon: Download,
      Search: Search,
      Expand: Expand,
      useRouter: useRouter,
      navList: [
        { label: '漏洞查询', path: '/vulnerabilityQuery', value: 'vulnerabilityQuery' }
      ],
      activeName: this.$route.name || '',
      isShow: false,
      thirdPart: false,
      locale: zhCn
    }
  },
  computed:{
    ...mapGetters([
      
    ])
  },
  methods: {
    goPath(nav: any) {
      this.$router.push({
        path: nav.path
      })
    },
    ...mapMutations(['setIsThirdPart'])

  },
  watch: {
    $route: {
      deep: true,
      handler(route) {
        //
      }
    },
  },

  provide() {
    return {
      
    }
  }
});
</script>

<style lang="less">
@import './assets/css/common.less';
#app{
  background-color: #F0F3F6;
  min-height: 100vh;
  min-width: 1400px;
  overflow: auto;
  .header{
    height: 73px;
    background-color: #191A35;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .navList{
      width:calc(100% - 320px);
      display: flex;
      align-items: center;
      // padding-top: 10px;
      .navItem{
        min-width: 60px;
        text-align: center;
        font-size: 16px;
        // font-weight: bold;
        color: #ffffff;
        cursor: pointer;
        .Bottomborder{
          height: 3px;
          background-color: transparent;
          width: 30px;
          margin: 10px auto 0;
        }
        .link{
          color: #ffffff;
          // opacity: 0.5;
          opacity: 1;
        }
        // &:hover,
        // &.active{
        //   .link{
        //     opacity: 1;
        //   }
        //   .Bottomborder{
        //     background-color: #fff;
        //   }
        // }
      }
    }
  }
}
</style>
