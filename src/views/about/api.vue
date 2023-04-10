<template>
  <div class="api-container">
    <iframe
      src="/aboutApi.html"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "api",
  components: {},
  props: {
    
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
    
  },
});
</script>

<style lang="less" scoped>
.api-container{
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>