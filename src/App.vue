<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <div class="header" v-if="isShow">
        <div class="logo">
          <div class="txt" @click="goPath({path: '/'})">
            <img src="@/assets/images/logo.png" alt="">
            <span>Unified Vulnerability Platform</span> 
          </div>
        </div>
        
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
        { label: '漏洞库', path: '/vulnerabilityQuery', value: 'vulnerabilityQuery' },
        { label: '关于', path: '/about', value: 'about' },
      ],
      activeName: this.$route.name || '',
      isShow: false,
      locale: zhCn,
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
    ...mapMutations([])

  },
  watch: {
    $route: {
      deep: true,
      handler(route) {
        this.isShow = !route.path.includes('api') 
        if(this.isShow) {
          this.activeName = route.name || ''
        }
      },
    }
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
    .logo{
      height: 100%;
      display: flex;
      align-items: center;
      border-right: 1px solid #000000;
      padding-right: 30px;
      .txt{
        display: flex;
        align-items: flex-end;
        cursor: pointer;
        span{
          font-size: 12px;
          font-weight: 600;
          color: #4971FF;
          margin-left: 15px;
        }
      }
    }
    .navList{
      width:calc(100% - 320px);
      display: flex;
      align-items: center;
      // padding-top: 10px;
      .navItem{
        min-width: 60px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
        margin-right: 80px;
        .Bottomborder{
          height: 3px;
          background-color: transparent;
          width: 30px;
          margin: 10px auto 0;
        }
        &:hover,
        &.active{
          color: #819DFF;
        }
      }
    }
  }
}
</style>
