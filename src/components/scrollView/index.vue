<template>
  <v-group :config="endConfig">
    <v-rect :config="holidConfig" />
    <v-group ref="slot" :config="groupConfig">
      <slot></slot>
    </v-group>
    <v-line
      :config="{
        x: 0,
        y: 0,
        points: [0, 0, endWidth, 0, endWidth, endHeight,0,endHeight,0,0],
        closed: false,
        stroke: 'black',
        lineCap: 'round',
        lineJoin: 'round',
        globalCompositeOperation: 'source-over',
      }"
    />
  </v-group>
</template>
<script>
import customLayout from "../mixin/customLayout";
import { sizeW, sizeH } from "../../utils/size";
export default {
  mixins: [customLayout],
  props: {
    orientation: {
      type:String,
      default() {
        return "horizontal"; //horizontal  vertical
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
    groupConfig() {
      let me=this;
      return {
        x: 0,
        y: 0,
        globalCompositeOperation: "source-atop",
        draggable: true,
        dragBoundFunc: function (pos) {
          let lineLayoutChild = me.$refs["slot"].$children[0];
          console.log("this.orientation",this.orientation)
          if (me.orientation == "horizontal") {
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
          } else {
            let y = pos.y;
            let wrapHeight = me.endHeight;
            let innerHeight = lineLayoutChild.endHeight;
            //如果内容宽度比本组件的width小，就不允许滚动
            // console.log(
            //   "lineLayoutChild",
            //   innerHeight,
            //   wrapHeight,
            //   innerHeight - wrapHeight
            // );
            if (innerHeight < wrapHeight) {
              y = 0;
            } else if (y < -Math.abs(innerHeight - wrapHeight)) {
              y = -(innerHeight - wrapHeight);
            } else if (y >= 0) {
              y = 0;
            }
            return {
              x: this.absolutePosition().x,
              y: y,
            };
          }
          return {
            x:0,
            y:0
          }
        },
      };
    },
  },
  data() {
    let me = this;
    return {
      defaultConfig: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        opacity: 1,
      },

      strokeBackgroundColor: "green",
      updateConfig: {}, //更新样式用
    };
  },
  created() {
    this.defaultConfig.height = sizeW(this.height);
    this.defaultConfig.width = sizeW(this.width);
    this.defaultConfig = Object.assign({}, this.defaultConfig, {
      height: sizeW(this.height),
      width: sizeW(this.width),
      mgl: sizeW(this.mgl),
      mgr: sizeW(this.mgr),
      mgt: sizeW(this.mgt),
      mgb: sizeW(this.mgb),
    });
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