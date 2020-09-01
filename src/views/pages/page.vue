<template>
  <v-stage :config="configKonva">
       <v-layer ref="layer">
         <linear-layout :width="900" :height="600" flexDir="column" name="呵呵">
          <scroll-view :height="150" :width="400" debugerColor="blue"> 
              <linear-layout :width="1000" :height="44">
                      <kButton type="primary" :config="{mgl:10}" text="1"></kButton>
                      <kButton type="warning" :config="{mgl:10}" text="2"></kButton>
                      <kButton type="danger" :config="{mgl:10}" text="3"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="4"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="5"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="6"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="7"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="8"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="9"></kButton>
              </linear-layout>
          </scroll-view>
           <scroll-view :height="44" :width="400" :mgt="10" debugerColor="blue"> 
              <linear-layout :width="1000" :height="44">
                      <kButton type="primary" :config="{mgl:10}" text="122"></kButton>
                      <kButton type="warning" :config="{mgl:10}" text="2"></kButton>
                      <kButton type="danger" :config="{mgl:10,height:50}" text="3"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="4"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="5"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="6"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="7"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="8"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="9"></kButton>
              </linear-layout>
          </scroll-view>
          <scroll-view :height="44" :width="400" :mgt="10" debugerColor="blue"> 
              <linear-layout :width="1000" :height="44">
                      <kButton type="primary" :config="{mgl:10}" text="1"></kButton>
                      <kButton type="warning" :config="{mgl:10}" text="2"></kButton>
                      <kButton type="danger" :config="{mgl:10}" text="3"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="4"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="5"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="6"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="7"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="8"></kButton>
                      <kButton type="info" :config="{mgl:10}" text="9"></kButton>
              </linear-layout>
          </scroll-view>
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
    };
  },
};
</script>
