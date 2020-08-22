<template>
  <v-stage :config="configKonva">
       <v-layer ref="layer" >
          
          <linear-layout name="layout11" :height="44" >
            <template v-for="item in [1,2]" >
                <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
            </template>

             <k-text :config="config"/> 
             
             <template v-for="item in [4,5]" >
                <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
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
      config:{
        x: 10,
        y: 0,
        text:"COMPLEX TEXT All the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#555',
        width: 300,
        height:44,
        padding: 10,
        align: 'left',
        ellipsis:true,
        wrap:"none"
      }
    };
  },
  mounted(){
    
  }
};
</script>
<style lang="scss">
    .konvajs-content{
        background:blue;
    }
</style>