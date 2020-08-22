<template>
  <v-group :config="endConfig">
    <v-rect :config="holidConfig"  v-if="debugerStatus||debugerColor" />
    <v-text :config="textConfig" @click="mouseoverfun"/>
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
      textConfig(){
          //group标签内，的元素 x,y永远为0
          let obj = Object.assign(
                {},
                this.defaultConfig,
                this.config,
                this.updateConfig,
                {x:this.defaultConfig.x,y:this.defaultConfig.y},
            );
            console.log("obj????",obj)
            return obj;
      }
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