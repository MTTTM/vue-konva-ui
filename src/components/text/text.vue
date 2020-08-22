<template>
  <v-group :config="endConfig">
    <v-rect :config="holidConfig"  v-if="debugerStatus||debugerColor" />
    <v-text :config="endConfig" @click="mouseoverfun"/>
  </v-group>
</template>
<script>
import Var from "../var";
import customLayout from "../mixin/customLayout";
import { sizeW, sizeH } from "../../utils/size";
export default {
  name: "kText",
  mixins: [customLayout],
  data() {
    return {
      updateConfig: {}, //更新样式用
    };
  },
  computed: {
    
    //实际样式
    endConfig() {
      let computedLayout = {};
      for (let k in this.config) {
        if (!isNaN(Number(this.config[k]))) {
          computedLayout[k] = sizeW(this.config[k]);
        } else {
          computedLayout[k] = this.config[k];
        }
      }

      let obj = Object.assign(
        {},
        this.defaultConfig,
        this.config,
        computedLayout, //适配后的尺寸
        this.updateConfig
      );
      return obj;
    },
    holidConfig() {
      return {
        x: 0,
        y: 0,
        width: this.endConfig.width,
        height: this.endConfig.height,
        stroke: this.strokeBackgroundColor,
        strokeWidth: 1,
      };
    },
  },
  created() {
    //console.log("按钮组件", this.$VAL);
  },
  beforeDestroy() {
    //  console.log("按钮组件销毁",this.$parent.$parent.componentName)
    let parent = this.$parent;
    let i = 0;
    while (parent) {
      i++;
      if (i > 2) {
        break;
      }
      if (parent.componentName == "LinearLayout") {
        parent.updateChildLayOut();
        break;
      }
      parent = parent.$parent;
    }
  },
  methods: {},
};
</script>