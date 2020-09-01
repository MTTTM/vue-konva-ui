<template>
  <v-group :config="endConfig">
    <v-rect :config="holidConfig" />
    <v-group ref="slot" :config="groupConfig">
      <slot></slot>
    </v-group>
  </v-group>
</template>
<script>
import customLayout from "../mixin/customLayout";
import {sizeW,sizeH} from "../../utils/size"
export default {
  mixins: [customLayout],
  props: {
    flexDir: {
      default() {
        return "row"; //row column
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
    width: {
      type: Number,
      default: () => 100,
    },
    height: {
      type: Number,
      default: () => 44,
    },
  },
  name: "kScrollView",
  computed: {
    // holidConfig() {
    //   let t = {
    //     x: 0,
    //     y: 0,
    //     width: this.$sizeW(this.width),
    //     height: this.$sizeW(this.height),
    //     stroke: "green",
    //     strokeWidth: 1,
    //   };
    //   console.log("ttttt", t);
    //   return t;
    // },
    debugerStatus() {
      return this.$DEBUGER;
    },
    endConfig() {
      let obj = Object.assign({}, this.config, {
        x: this.x,
        y: this.y,
        width: this.w,
        height: this.h,
        ...this.defaultConfig,
         ...this.updateConfig,
      });
      console.log("obj", obj);
      return obj;
    },
  },
  data() {
    let me = this;
    console.log("lineLayoutChild me", me.width);
    return {
      defaultConfig: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        opacity: 1,
      },
      groupConfig: {
        x: 0,
        y: 0,
        globalCompositeOperation: 'source-atop',
        draggable: true,
        dragBoundFunc: function (pos) {
          let lineLayoutChild = me.$refs["slot"].$children[0];
          let x = pos.x;
          let wrapWidth = me.width;
          let innerWidth = lineLayoutChild.endWidth;
          //如果内容宽度比本组件的width小，就不允许滚动
          console.log(
            "lineLayoutChild",
            innerWidth,
            wrapWidth,
            innerWidth - wrapWidth
          );
          if (innerWidth < wrapWidth) {
            x = 0;
          } else if (x < -Math.abs(innerWidth - wrapWidth)) {
            x = -(innerWidth - wrapWidth);
          } else if (x >= 0) {
            x = 0;
          }
          return {
            x: x,
            y: this.absolutePosition().y,
          };
        },
      },
      strokeBackgroundColor: "green",
      updateConfig: {}, //更新样式用
    };
  },
  created(){
      this.defaultConfig.height=sizeW(this.height);
      this.defaultConfig.width=sizeW(this.width);
      this.defaultConfig=Object.assign({}, this.defaultConfig,{
        height:sizeW(this.height),
        width:sizeW(this.width),
        mgl:sizeW(this.mgl),
        mgr:sizeW(this.mgr),
        mgt:sizeW(this.mgt),
        mgb:sizeW(this.mgb)
      })
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["slot"].$children[0].componentName != "LinearLayout") {
        throw "children must be tag LinearLayout";
      }
      console.log("this.children", this.$refs["slot"].$children[0].width);
    });
  },
  methods: {},
};
</script>