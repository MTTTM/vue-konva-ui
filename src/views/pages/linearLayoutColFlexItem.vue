<template>
  <div>
    <v-stage :config="configKonva">
      <v-layer ref="layer">
        <linear-layout
          name="layout2"
          :height="600"
          :width="1000"
          flexDir="column"
        >
          <template v-for="(item,index) in arr">
            <kButton type="info" :config="{mgt:index>0?10:0,mgl:10,flex:index>0&&index<3?1:'none'}" :text="item" :key="item"></kButton>
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
      justifyContent: "flex-start",
      alignItems: "flex-start",
      configKonva: {
        width: width,
        height: height,
      },
      layerConfig: {},
      arr: [1, 2, 3,4],
      reverse: false,
      show: true,
    };
  },
  watch: {
    reverse() {
      this.show = false;
      this.arr = [...this.arr.reverse()];
      this.$nextTick(() => {
        this.show = true;
      });
    },
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
