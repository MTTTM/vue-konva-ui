<template>
  <v-stage :config="configKonva">
    <v-layer ref="layer">
      <linear-layout flexDir="column" name="layout-out" :width="2000" :height="800">
        <!-- 多层嵌套1 ---[ -->
        <linear-layout name="layout1000" :mgt="10" :height="300" :key="3" debugerColor="red">
          <linear-layout
            flexDir="column"
            name="layout11"
            :mgt="10"
          >
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="info" :config="{mgt:index>0?10:0}" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>

          <linear-layout
            flexDir="column"
            name="layout11"
            :mgl="10"
            debugerColor="black"
          >
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="info" :config="{mgt:index>0?10:0}" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>

          <linear-layout
            flexDir="column"
            name="layout12"
            key="5"
            debugerColor="black"
            :mgl="10"
          >
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="primary" :config="{mgt:index>0?10:0}" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>
          <!-- 常见左图，右文字布局 】-->
        </linear-layout>
        <!-- 多层嵌套1 ---] -->
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
