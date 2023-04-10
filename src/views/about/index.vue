<template>
  <div class="VulnerabilityAbout-container">
    <div class="topPart">
      <div class="main">
        <div class="left">
          <div class="txt">
            UVP(统一漏洞平台，Unified Vulnerability Platform)聚合多漏洞源数据，以<span @click="goPath(ssfHref)">OpenSSF OSV</span>格式为项目提供开源软件漏洞检索和诊断服务
          </div>
          <div class="btns">
            <el-button type="primary" v-for="(btn, index) in btns" :key="index" @click="goPath(btn.href, btn.type)">
              {{ btn.label }}
            </el-button>
          </div>
        </div>
        <div class="right">
          <img src="@/assets/images/aboutLogo.png" alt="">
        </div>
      </div>
    </div>
    <div class="bottomPart">
      <div class="img">
        <div class="txt">服务架构图</div>
        <img src="@/assets/images/aboutOrg1.png" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "about",
  components: {},
  props: {
    
  },
  data() {
    return {
      ssfHref: 'https://ossf.github.io/osv-schema/',
      btns: [
        { label: '源代码', href: 'https://github.com/opensourceways/uvp' },
        { label: '文档', href: 'https://github.com/opensourceways/uvp/blob/main/README.md' },
        { label: 'API', href: '/api', type: 'api' },
      ]
    };
  },
  computed:{
  },
  watch: {
  },
  methods: {
    goPath(info, type) {
      let url = info
      if(type && type === 'api') {
        const { href } = this.$router.resolve({
          path: info,
        })
        url = href
      }
      window.open(url, '_blank')
    }
  },
});
</script>

<style lang="less" scoped>
.VulnerabilityAbout-container{
  .topPart{
    width: 100%;
    background-color: #E0EAFC;
    border-radius: 4px;
    height: 340px;
    .main{
      width: 1260px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left{
        .txt{
          font-size: 20px;
          font-weight: bold;
          color: #000000;
          line-height: 39px;
          width: 690px;
          word-spacing: 8px;
          span{
            color: #4971FF;
            cursor: pointer;
          }
        }
        .btns{
          margin-top: 60px;
          .el-button{
            width: 82px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            background-color: #4971FF;
            border: 1px solid #4971FF;
            border-radius: 4px;
            margin-right: 30px;
          }
        }
      }
      .right{
        img{
          width: 423px;
          height: 253px;
        }
      }
    }
  }
  .bottomPart{
    padding-top: 20px;
    background-color: #fff;
    width: 100%;
    .img{
      width: 1260px;
      margin: 0 auto;
      .txt{
        font-size: 16px;
        font-weight: bold;
        color: #333333;
        // margin-bottom: 30px;
      }
    }
    img{
      width: 100%;
    }
  }
}
</style>