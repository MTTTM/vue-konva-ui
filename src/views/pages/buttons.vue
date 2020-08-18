<template>
  <v-stage :config="configKonva">
       <v-layer ref="layer">
           <linear-layout>
                <kButton type="info" :mgl="10">主要按钮</kButton>
                <kButton type="info" :mgl="10">主要按钮</kButton>
                 <kButton type="info" :mgl="10">主要按钮</kButton>
           </linear-layout>
           
       </v-layer>
  </v-stage>
</template>
<script>
let width = window.outerWidth;
let height = window.outerHeight;
import kButton from "../../components/button/index"
export default {
    components:{kButton},
  data() {
    return {
      configKonva: {
        width: width,
        height: height,
      },
      layerConfig: {},
    //   defaultConfig:{
    //             x: 20,
    //             y: 80,
    //             width: 100,
    //             height: 100,
    //             fill: 'green',
    //             shadowBlur: 10
    //         }
    };
  },
};
</script>
<style lang="scss">
    .konvajs-content{
        background:blue;
    }
</style>