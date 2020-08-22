<template>
  <v-stage :config="configKonva">
    <v-layer ref="layer">
      <linear-layout flexDir="column" name="layout-out" :width="2000" :height="800">
        <linear-layout name="layout11" :height="44">
          <template v-for="item in arr" :width="500">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>
        <linear-layout name="layout2" :mgt="10" :height="44">
          <template v-for="item in arr">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>

        <linear-layout name="layout2" :mgt="10" :height="44">
          <template v-for="item in arr">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>

        <linear-layout
          flexDir="column"
          name="layout11"
          :mgt="10"
          :mgl="10"
          :height="206"
          :width="110"
        >
          <template v-for="(item,index) in [11,12,13,14]">
            <kButton type="info" :mgl="10" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>

        <!-- 多层嵌套1 ---[ -->

        <linear-layout name="layout10" :mgt="10" :height="216" :key="3" debugerColor="red">
          <linear-layout
            flexDir="column"
            name="layout11"
            :mgt="10"
            :mgl="10"
            :height="206"
            :width="120"
          >
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="info" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>
          <linear-layout
            flexDir="column"
            name="layout11"
            :mgt="10"
            :mgl="10"
            :height="206"
            :width="120"
            debugerColor="black"
          >
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="info" :mgl="10" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>

          <linear-layout
            flexDir="column"
            name="layout12"
            :mgl="10"
            :height="206"
            :width="110"
            key="5"
            debugerColor="black"
          >
            <template v-for="(item,index) in [11,12,13,14]">
              <kButton type="primary" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
            </template>
          </linear-layout>

          <!-- 常见左图，右文字布局 【-->
          <linear-layout name="layout12" :mgl="10" :height="206" :width="330">
            <linear-layout flexDir="column" :height="206" :width="100">
              <template v-for="(item,index) in [11,12,13,14]">
                <kButton type="primary" :mgt="index>0?10:0" :text="item" :key="item"></kButton>
              </template>
            </linear-layout>
            <linear-layout flexDir="column" :mgl="10" :height="206" :width="210">
              <linear-layout name="layout13" :height="44" :width="210">
                <template v-for="(item,index) in [11,12]">
                  <kButton type="info" :mgl="index>0?10:0" :text="item" :key="item"></kButton>
                </template>
              </linear-layout>

              <linear-layout name="layout13" :mgt="10" :height="44" :width="210">
                <template v-for="(item,index) in [11,12]">
                  <kButton type="info" :mgl="index>0?10:0" :text="item" :key="item"></kButton>
                </template>
              </linear-layout>

              <linear-layout name="layout13" :mgt="10" :height="44" :width="210">
                <template v-for="(item,index) in [11,12]">
                  <kButton type="info" :mgl="index>0?10:0" :text="item" :key="item"></kButton>
                </template>
              </linear-layout>
              <linear-layout name="layout13" :mgt="10" :height="44" :width="210">
                <template v-for="(item,index) in [11,12]">
                  <kButton type="info" :mgl="index>0?10:0" :text="item" :key="item"></kButton>
                </template>
              </linear-layout>

            </linear-layout>
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
<style lang="scss">
.konvajs-content {
  background: blue;
}
</style>