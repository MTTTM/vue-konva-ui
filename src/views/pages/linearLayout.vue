<template>
  <v-stage :config="configKonva">
       <v-layer ref="layer">
           <linear-layout ref="linearLayout" flexDir ="column">
             <template v-for="item in arr">
                 <kButton type="info" :mgt="10" :mgl="10" :text="item" :key="item"></kButton>
             </template>   
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
      arr:[1,2,3,4,5,6,7,8]
    };
  },
  mounted(){
    this.$nextTick(()=>{
        document.onclick=()=>{
           this.arr.splice(0,1);
          //  console.log("this.$parents",this.$parent)
        }
    })
  }
};
</script>
