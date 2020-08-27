<template>
  <v-stage :config="configKonva">
    <v-layer ref="layer">
      <!-- <linear-layout justifyContent="space-between" name="layout12" :width="900" key="5" debugerColor="black" :mgl="10">
        <template v-for="item in [11,12,13,14]">
          <kButton type="primary" :config="{mgl:0}" :text="item" :key="item"></kButton>
        </template>
      </linear-layout>-->
      <!-- <linear-layout 
        name="layoue003" 
        flexDir="column" 
        justifyContent="space-between" 
        :height="600" :width="900" key="5" debugerColor="black" :mgl="10">
        <template v-for="item in [11,12,13,14]">
          <kButton type="primary" :config="{mgl:0}" :text="item" :key="item"></kButton>
        </template>
      </linear-layout>-->
      <!-- <linear-layout 
        name="layoue003" 
        justifyContent="space-around" 
        :height="600" :width="900" key="5" debugerColor="black" :mgl="10">
        <template v-for="item in [11,12,13,14]">
          <kButton type="primary" :config="{mgl:0}" :text="item" :key="item"></kButton>
        </template>
      </linear-layout>-->

      <linear-layout
        name="layoue003"
        flexDir="column"
        justifyContent="space-around"
        :height="600"
        :width="900"
        key="5"
        debugerColor="black"
        :mgl="10"
      >
        <template v-for="item in [11,12,13,14]">
          <kButton type="primary" :config="{mgl:0}" :text="item" :key="item"></kButton>
        </template>
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
