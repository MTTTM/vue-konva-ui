<template>
  <div>
    <div style="position:fixed;right:0;
   bottom:0;z-index:1000;">
      <button @click="()=>{justifyContent='flex-start';reverse=false}">flex-start</button>
      <button @click="()=>{justifyContent='flex-end';reverse=false}">flex-end</button>
      <button @click="()=>{justifyContent='center';reverse=false}">center</button>
      <button @click="()=>{justifyContent='space-between';reverse=false}">space-between</button>
       <button @click="()=>{justifyContent='space-around';reverse=false}">space-around</button>
    </div>
    <v-stage :config="configKonva">
      <v-layer ref="layer">
        <linear-layout name="layout2" v-if="show" :justifyContent="justifyContent" flexDir="row"  :mgt="10" :height="800" :width="1000">
          <template v-for="item in arr">
            <kButton type="info" :config="{mgl:10,mgt:10}" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>
      </v-layer>
    </v-stage>
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
     justifyContent:"flex-start",
      configKonva: {
        width: width,
        height: height,
      },
      layerConfig: {},
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
      reverse:false,
      show:true
    };
  },
  watch:{
    "reverse"(){
      this.show=false;
      this.arr=[...this.arr.reverse()];
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
    });
  },
};
</script>
