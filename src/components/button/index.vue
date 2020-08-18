<template>
  <v-group ref="slot">
    <v-rect :config="endConfig"></v-rect>
    <v-text :config="textEndConfig" />
  </v-group>
</template>
<script>
import Var from "../var";
export default {
  name: "kButton",
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
  },
  data() {
    return {
      defaultConfig: {
        x: 0,
        y: 0,
        width: 100,
        height: 44,
        fill: "#07c160",
        shadowBlur: 10,
      },
      updateConfig: {},//更新样式用
      textConfig: {
        text: "1",
        fontSize: 15,
        color: "#fff",
        height:44,
        width:100,
        align: 'center',
        verticalAlign:"middle",
        fill: 'green',
      },
      updateTextConfig: {},//更新字体样式用
    };
  },
  computed: {
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
      let obj = Object.assign(
        {},
        this.defaultConfig,
        endStyles,
        this.config,
        this.updateConfig
      );
      //更新字体样式
      this.textConfig = Object.assign({},this.textConfig,{
        x: obj.x,
        height:obj.height
      });

      return obj;
    },
    textEndConfig() {
      let obj = Object.assign(
        {},
       this.textConfig,
        this.updateTextConfig
      );
      return obj;
    },
  },
  created() {
    console.log("按钮组件", this.$VAL);
  },
  methods: {},
};
</script>