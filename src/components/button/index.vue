<template>
  <v-group ref="slot">
    <v-rect :config="endConfig"></v-rect>
    <v-text
      :config="textEndConfig"
      @touchstart="mouseoverfun"
      @touchend="mouseup"
      @mousedown="mouseoverfun"
      @mouseup="mouseup"
    />
  </v-group>
</template>
<script>
import Var from "../var";
import LayoutMixins from "../mixin/customLayout.js";
import {sizeW,sizeH} from "../../utils/size"
export default {
  name: "kButton",
  mixins: [LayoutMixins],
  props: {
    config: {
      required: false,
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ["primary", "info", "warning", "danger"].indexOf(value) !== -1;
      },
    },
    mgl: {
      type: Number,
      default() {
        return 0;
      },
    },
    mgt: {
      type: Number,
      default() {
        return 0;
      },
    },
    text: {
      required: true,
      type: [String, Number],
    },
    width: {
      type: Number,
      default: () => 100,
    },
    height: {
      type: Number,
      default: () => 44,
    },
  },
  data() {
    return {
      defaultConfig: {
        x: 0,
        y: 0,
        width: 100,
        height: 44,
        fill: "#07c160",
        opacity: 1,
      },
      updateConfig: {}, //更新样式用
      textConfig: {
        text: "1",
        fontSize: 15,
        height: 44,
        width: 100,
        align: "center",
        verticalAlign: "middle",
        fill: "#fff",
      },
      updateTextConfig: {}, //更新字体样式用
    };
  },
  computed: {
    //实际样式
    endConfig() {
      let types = {
        primary: {
          fill: this.$VAL.green,
        },
        info: {
          fill: this.$VAL.blue,
        },
        warning: {
          fill: this.$VAL.orange,
        },
        danger: {
          fill: this.$VAL.red,
        },
      };
      let endStyles = types[this.type] ? types[this.type] : types["primary"];
      let computedLayout = {
        x: this.endX,
        y: this.endY,
        width: this.endWidth,
        height: this.endHeight,
        mgl:this.endMgl,
        mgr:this.endMgr
      };
    //  console.log("computedLayout",this.width,this.$sizeW(this.width))
      let obj = Object.assign(
        {},
        this.defaultConfig,
        endStyles,
        this.config,
        computedLayout, //适配后的尺寸
        this.updateConfig
      );
      //更新字体样式
      this.textConfig = Object.assign({}, 
      this.textConfig,
      computedLayout, //适配后的尺寸
      this.updateTextConfig
      );

      return obj;
    },
    //实际字体样式
    textEndConfig() {
      let obj = Object.assign(
        {},
        this.textConfig,
        { text: this.text },
        this.updateTextConfig
      );
      return obj;
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
  methods: {
    mouseoverfun() {
      this.defaultConfig.opacity = 0.5;
      console.log("点击");
    },
    mouseup() {
      this.defaultConfig.opacity = 1;
    },
  },
};
</script>