<template>
  <v-stage :config="configKonva">
    <v-layer ref="layer">
      <linear-layout flexDir="column" name="layout-out" :height="800">
         <linear-layout name="layout1" :height="44">
          <template v-for="item in arr">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>
        <linear-layout name="layout2" :mgt="10" :height="44">
          <template v-for="item in arr">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>
        
        <linear-layout name="layout2" :mgt="10" :height="44" debugerColor="green">
          <template v-for="item in arr">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>
        </linear-layout> 


         <!-- <linear-layout flexDir="column" name="layout11" :mgt="10" :height="200" :width="44" key="1">
            <template v-for="item in [11,12,13,14]">
              <kButton type="info" :mgl="10" :mgt="10" :text="item" :key="item"></kButton>
            </template>
          </linear-layout> -->

         <linear-layout  name="layout10" :mgt="10" :height="216" :key="3" debugerColor="red">
           
          <linear-layout flexDir="column" name="layout11" :mgt="10" :height="180" :width="44" key="1">
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="info" :mgl="10" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>
         <linear-layout flexDir="column" name="layout11" :mgt="10" :height="180" :width="44" key="1">
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="info" :mgl="10" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>

           <linear-layout flexDir="column" name="layout12" :mgl="10" :height="180" :width="44" key="5">
            <template  v-for="(item,index) in [11,12,13,14]">
              <kButton type="primary" :mgl="10" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>
           <linear-layout flexDir="column" name="layout12" :mgl="10" :height="180" :width="44" key="6">
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="primary" :mgl="10" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
            </template>
          </linear-layout> 
        </linear-layout> 


      </linear-layout>
    </v-layer>
  </v-stage>
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
      layerConfig: {},
      arr: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   document.onclick = () => {
    //     this.arr.splice(0, 1);
    //     //  console.log("this.$parents",this.$parent)
    //   };
    // });
  },
};
</script>
<style lang="scss">
.konvajs-content {
  background: blue;
}
</style>