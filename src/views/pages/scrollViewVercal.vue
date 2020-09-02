<template>
  <v-stage :config="configKonva">
       <v-layer ref="layer">
         <scroll-view :height="300" :width="100" orientation="vertical"> 
            <linear-layout flexDir="column" :width="100" :height="440" :y="1" :x="1">
                    <kButton type="primary" :config="{mgt:10}" text="1"></kButton>
                    <kButton type="warning" :config="{mgt:10}" text="2"></kButton>
                    <kButton type="danger" :config="{mgt:10}" text="3"></kButton>
                    <kButton type="info" :config="{mgt:10}" text="4"></kButton>
                    <kButton type="info" :config="{mgt:10}" text="5"></kButton>
                    <kButton type="info" :config="{mgt:10}" text="6"></kButton>
                    <kButton type="info" :config="{mgt:10}" text="7"></kButton>
                    <kButton type="info" :config="{mgt:10}" text="8"></kButton>
                    <kButton type="info" :config="{mgt:10}" text="9"></kButton>
            </linear-layout>
        </scroll-view>
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
