<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer ref="layer">
        <linear-layout
          name="layoue003"
          :flexWrap="true"
          :alignItems="alignItems"
          flexDir="column"
          :height="600"
          :width="900"
          key="5"
          debugerColor="black"
          :mgl="10"
           v-if="show"
        >
          <template v-for="item in arr">
            <kButton type="primary" :config="{mgl:10,mgt:10}" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>
      </v-layer>
    </v-stage>
    <div class="opate">
      <p>alignItems</p>
      <button @click="()=>{alignItems='flex-start';reverse=!reverse}">flex-start</button>
      <button @click="()=>{alignItems='center';reverse=!reverse}">center</button>
      <button @click="()=>{alignItems='flex-end';reverse=!reverse}">flex-end</button>
      <button @click="()=>{alignItems='space-between';reverse=!reverse}" disabled>space-between</button>
      <button @click="()=>{alignItems='space-around';reverse=!reverse}" disabled>space-around</button>
    </div>
  </div>
</template>
<script>
let width = window.outerWidth;
let height = window.outerHeight;
import kButton from "../../components/button/index";
export default {
  components: { kButton },
  data() {
    return {
      configKonva: {
        width: width,
        height: height,
      },
      alignItems:"flex-start",
      reverse:true,
      show:true,
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    };
  },
    watch:{
    "reverse"(){
      this.show=false;
       this.$nextTick(()=>{
        this.show=true;
       })
    }
  },
  mounted() {
    this.$nextTick(() => {
      // document.onclick = () => {
      //   this.arr.splice(0, 1);
      //   //  console.log("this.$parents",this.$parent)
      // };
      console.log(
        "layer",
        this.$refs["layer"].$vnode.tag,
        this.$refs["layer"].$
      );
    });
  },
};
</script>
<style lang="scss">
.opate{
  position: fixed;
  left:0;
  bottom:0;
  z-index:2000;
}
</style>
