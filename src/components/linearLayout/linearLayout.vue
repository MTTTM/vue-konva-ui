<template>
  <v-group :config="endConfig">
    <v-rect
      :config="holidConfig"
      @click="mouseoverfun"
      @tap="mouseoverfun"
      v-if="debugerStatus||debugerColor"
    />
    <v-group ref="slot" :config="slotConfig">
      <slot></slot>
    </v-group>
  </v-group>
</template>
<script>
import LayoutMixins from "../mixin/layout";
import linearLayoutSpaceBetween from "../mixin/linearLayoutSpaceBetween.js";
import linearLayoutSpaceAround from "../mixin/linearLayoutSpaceAround.js";
import { getParentLinearLayout } from "../../utils/dom";
export default {
  name: "LinearLayout",
  mixins: [LayoutMixins, linearLayoutSpaceBetween, linearLayoutSpaceAround],
  props: {
    flexDir: {
      default() {
        return "row"; // row column
      },
    },
    childArr: {
      default() {
        return [];
      },
    },
    name: {
      type: String,
    },
    debugerColor: {
      type: String,
    },
    justifyContent: {
      type: String,
      default: () => "flex-start",
    },
    alignItems: {
      type: String,
      default: () => "flex-start",
    },
  },
  watch: {
    flexDir(newV) {
      //更新容器宽高
      this.updateBoxWidthHeight();
      //更新子组件布局
      this.updateChildLayOut();
    },
  },
  data() {
    return {
      componentName: "LinearLayout",
      leftDis: 0,
      innerWidth: 0, //内部内容的宽度
      topDis: 0,
      innerHeight: 0, //容器的高度
      defaultConfig: {
        x: 0,
        y: 0,
        mgl: 0,
        mgt: 0,
        width: document.documentElement.clientWidth,
        height: this.$sizeW(44),
      },
      updateConfig: {}, //更新样式用
      strokeBackgroundColor: "black",
      show: 1,
      computedBoxWidth: 0, //容器内部元素加起来的宽
      computedBoxHeight: 0, //容器内部元素加起来的高
      maxWidth: 0, //最大宽度,临时数据
      maxHeight: 0, //最大高度，临时数据
    };
  },
  computed: {
    debugerStatus() {
      return this.$DEBUGER;
    },
    //实际样式
    endConfig() {
      let computedLayout = {
        x: this.endX,
        y: this.endY,
        // mgt:this.endMgt,
        // mgl:this.endMgl,
        width: this.endWidth,
        height: this.endHeight,
      };
      console.log(
        this.name,
        "computedLayout",
        computedLayout,
        "this.endMgt",
        this.endMgl
      );
      let obj = Object.assign(
        {},
        this.defaultConfig,
        computedLayout,
        this.updateConfig,
        {
          fill: "red",
        }
      );
      return obj;
    },
    holidConfig() {
      return {
        x: 0,
        y: 0,
        width: this.endWidth ? this.endWidth : this.defaultConfig.width,
        height: this.endHeight ? this.endHeight : this.defaultConfig.height,
        stroke: this.strokeBackgroundColor ? this.strokeBackgroundColor : "red",
        strokeWidth: 1,
        zIndex: 0,
      };
    },
    //内部元素容器布局
    slotConfig() {
      let obj = {};
      if (this.flexDir == "row") {
        if (this.justifyContent == "flex-start") {
          obj = { x: 0 };
        } else if (this.justifyContent == "flex-end") {
          obj = { x: this.endWidth - this.computedBoxWidth };
        } else if (this.justifyContent == "center") {
          obj = { x: (this.endWidth - this.computedBoxWidth) / 2 };
        }
        //交叉轴
        if (this.alignItems == "flex-start") {
          obj = Object.assign(obj, { y: 0 });
        } else if (this.alignItems == "flex-end") {
          obj = Object.assign(obj, {
            y: this.endHeight - this.computedBoxHeight,
          });
        } else if (this.alignItems == "center") {
          obj = Object.assign(obj, {
            y: (this.endHeight - this.computedBoxHeight) / 2,
          });
        }
        return obj;
      } else {
        if (this.justifyContent == "flex-start") {
          obj = { y: 0 };
        } else if (this.justifyContent == "flex-end") {
          obj = { y: this.endHeight - this.computedBoxHeight };
        } else if (this.justifyContent == "center") {
          obj = { y: (this.endHeight - this.computedBoxHeight) / 2 };
        }
        //交叉轴
        if (this.alignItems == "flex-start") {
          obj = Object.assign(obj, { x: 0 });
        } else if (this.alignItems == "flex-end") {
          obj = Object.assign(obj, {
            x:
              this.endWidth - this.computedBoxWidth - this.endMgl - this.endMgr,
          });
        } else if (this.alignItems == "center") {
          obj = Object.assign(obj, {
            x:
              (this.endWidth -
                this.computedBoxWidth -
                this.endMgl -
                this.endMgr) /
              2,
          });
        }
        return obj;
      }
    },
  },
  mounted() {
    this.strokeBackgroundColor = this.debugerColor;
    this.$nextTick(() => {
      //更新容器宽高
      this.updateBoxWidthHeight();
      console.log("this.innerHeight?????????", this.innerHeight);
      //更新子组件布局
      this.updateChildLayOut();
    });
    console.log("childArr", this.childArr);
  },
  methods: {
    mouseoverfun() {
      if (this.strokeBackgroundColor == "green") {
        this.strokeBackgroundColor = this.debugerColor
          ? this.debugerColor
          : "red";
      } else {
        this.strokeBackgroundColor = "green";
      }
      let obj = {
        config: this.config,
        endCofig: this.endCofig,
      };
      console.log(this.name, "debuger", obj);
    },
    updateRowLayout() {
      this.leftDis = 0;
      // this.innerWidth = 0;
      // this.innerHeight = 0;
      this.topDis = 0;
      this.$nextTick(() => {
        let childrens = this.$refs["slot"].$children;
        //获取space-between应该补充的间隙，已处理无效参数，包括非space-between
        let betweenMgl = 0;

        if (this.justifyContent == "space-between") {
          betweenMgl = this.mixinSpaceBetWeenPlusMgl(childrens);
        } else if (this.justifyContent == "space-around") {
          betweenMgl = this.mixinSpaceAroundPlusMgl(childrens);
        }

        for (let i = 0; i < childrens.length; i++) {
          let vm = childrens[i];
          if (vm.defaultConfig == undefined) {
            continue;
          }

          if (
            i == childrens.length - 1 &&
            this.justifyContent == "space-between"
          ) {
            let x = this.endWidth - vm.endMgr - vm.endWidth;
            vm.updateConfig = {
              x,
            };
            vm.updateTextConfig = {
              x,
            };
            continue;
          }
          // //拿到前一个容器的宽度
          let preVm = childrens[i - 1];
          let width = 0;
          if (preVm && preVm.defaultConfig) {
            width = preVm.endWidth ? preVm.endWidth : preVm.defaultConfig.width;
          } else {
            width = 0;
          }
          if (i > 0) {
            console.log(
              this.name,
              "before",
              i,
              "this.leftDis",
              this.leftDis,
              "vm.defaultConfig.x",
              vm.defaultConfig.x,
              "width:",
              width,
              "vm.mgl",
              vm.mgl,
              "vm.endMgl",
              vm.endMgl
            );

            this.leftDis +=
              width + vm.defaultConfig.x + (vm.endMgl ? vm.endMgl : 0);
            console.log(
              this.name,
              i,
              "after",
              "this.leftDis",
              this.leftDis,
              "vm.defaultConfig.x",
              vm.defaultConfig.x,
              "width:",
              width,
              "vm.mgl",
              vm.mgl,
              "this.$sizeW(mgl)",
              this.$sizeW(vm.mgl),
              "vm.endMgl",
              vm.endMgl
            );
          } else {
            this.leftDis += vm.defaultConfig.x + (vm.endMgl ? vm.endMgl : 0);
            console.log(
              this.name,
              i,
              "after",
              "this.leftDis",
              this.leftDis,
              "vm.defaultConfig.x",
              vm.defaultConfig.x,
              "width:",
              width,
              "vm.mgl",
              vm.mgl,
              "vm.endMgl",
              vm.endMgl
            );
          }
          // this.innerWidth = this.leftDis

          if (this.justifyContent == "space-between") {
            //第一个是贴边的，所以不需要加附加间距
            if (i > 0 && i != childrens.length - 1) {
              this.leftDis += betweenMgl;
            }
          } else if (this.justifyContent == "space-around") {
            if (i == 0) {
              this.leftDis += betweenMgl;
            } else {
              this.leftDis += betweenMgl * 2;
            }
          }

          vm.updateConfig = {};
          vm.updateConfig = {
            x: this.leftDis,
          };
          vm.updateTextConfig = {
            x: this.leftDis,
          };
        }
      });
    },
    //更正容器款高
    updateBoxWidthHeight() {
      let childrens = this.$refs["slot"].$children;
      for (let i = 0; i < childrens.length; i++) {
        let vm = childrens[i];
        if (vm.defaultConfig == undefined) {
          continue;
        }
        this.updateBoxWidth(i, vm, childrens.length); //计算容器宽度
        this.updateBoxHeight(i, vm, childrens.length); //计算容器高度
      }
    },
    //col布局，子元素布局
    updateColumnLayout() {
      console.log("LinearLayout", this.$refs["slot"].$children);
      this.leftDis = 0;
      // this.innerWidth = 0;
      // this.innerHeight = 0;
      this.topDis = 0;
      this.$nextTick(() => {
        let childrens = this.$refs["slot"].$children;
        //获取space-between应该补充的间隙，已处理无效参数，包括非space-between
        let betweenMgt = 0;

        if (this.justifyContent == "space-between") {
          betweenMgt = this.mixinSpaceBetWeenPlusMgt(childrens);
        } else if (this.justifyContent == "space-around") {
          betweenMgt = this.mixinSpaceAroundPlusMgt(childrens);
        }
        let mgt = this.endMgt;
        for (let i = 0; i < childrens.length; i++) {
          let vm = childrens[i];
          if (vm.defaultConfig == undefined) {
            continue;
          }
          if (
            i == childrens.length - 1 &&
            this.justifyContent == "space-between"
          ) {
            let y = this.endHeight - vm.endMgb - vm.endHeight;
            vm.updateConfig = {
              y,
            };
            vm.updateTextConfig = {
              y,
            };
            continue;
          }
          // this.updateBoxWidth(i, vm, childrens.length); //计算容器宽度
          // this.updateBoxHeight(i, vm, childrens.length); //计算容器高度
          let preVm = childrens[i - 1];
          //拿到前一个容器的高度
          let height = 0;
          if (preVm && preVm.defaultConfig) {
            height = preVm.endHeight
              ? preVm.endHeight
              : preVm.defaultConfig.height;
          } else {
            height = 0;
          }
          //拿到当前元素的endMgt
          mgt = vm.endMgt ? vm.endMgt : 0;
          console.log(
            this.name,
            "before-update",
            i,
            "y:",
            vm.defaultConfig.y,
            "x:",
            vm.defaultConfig.x,
            "height:",
            vm.defaultConfig.height,
            "mgt",
            vm.endMgt,
            "topDis",
            this.topDis
          );

          if (i > 0) {
            this.topDis += height + vm.defaultConfig.y + mgt;
            console.log(
              this.name,
              "index more than 0",
              height,
              vm.defaultConfig.y,
              mgt
            );
          } else {
            this.topDis += vm.defaultConfig.y + mgt;
            console.log(this.name, "zero:", height, vm.defaultConfig.y, mgt);
          }

          console.log(this.name, "y", i, this.topDis);

          //第一个是贴边的，所以不需要加附加间距
          if (this.justifyContent == "space-between") {
            if (i > 0 && i != childrens.length - 1) {
              this.topDis += betweenMgt;
            }
          }
          else if (this.justifyContent == "space-around") {
            if (i == 0) {
              this.topDis += betweenMgt;
            } else {
              this.topDis += betweenMgt * 2;
            }
          } 
          vm.updateConfig = {};
          vm.updateConfig = {
            y: this.topDis,
            x: vm.endMgl,
          };
          vm.updateTextConfig = {
            y: this.topDis,
            x: vm.endMgl,
          };

          console.log(
            this.name,
            "after-update",
            i,
            "y:",
            vm.updateConfig.y,
            "x:",
            vm.updateConfig.x,
            "height:",
            vm.updateConfig.height,
            "mgt",
            vm.endMgt,
            "topDis",
            this.topDis
          );
        }
        // this.innerHeight = this.topDis;
      });
    },
    //容器内部元素的布局排版
    updateChildLayOut() {
      if (this.flexDir == "column") {
        this.updateColumnLayout();
      } else {
        this.updateRowLayout();
      }
    },
    //更新容器自身的宽
    updateBoxWidth(i, item, len) {
      let childrens = this.$refs["slot"].$children;
      if (i == 0) {
        this.computedBoxWidth = 0;
        this.innerWidth = 0;
      }
      //因为计算的是容器内部元素的宽高，所以不使用容器宽
      // if (this.width) {
      //   this.computedBoxWidth = this.endWidth;
      //   return;
      // } else
      if (childrens.length > 0) {
        //区分横竖布局
        if (this.flexDir == "row") {
          this.innerWidth = this.computedBoxWidth +=
            item.endWidth + item.endX + item.endMgl + item.endMgr;
        } else {
          if (item.endWidth > this.maxWidth) {
            this.maxWidth = item.endWidth;
          }
          if (i == len - 1) {
            this.innerWidth = this.computedBoxWidth = this.maxWidth;
          }
        }
      } else {
        if (/vLayer/gi.test(this.$parent.$vnode.tag)) {
          this.computedBoxWidth = this.$parent.getNode().width();
          return;
        } else {
          //获取最近的linearlayout的宽度
          let linearLayout = getParentLinearLayout(this);
          this.computedBoxWidth = linearLayout.endWidth;
          return;
        }
      }
    },
    //计算纵向容器的高度
    updateColBoxHeight(i, item, len) {
      let childrens = this.$refs["slot"].$children;
      if (i == 0) {
        this.computedBoxHeight = 0;
        this.innerHeight = 0;
      }
      console.log(this.name, "updateColBoxHeight1");
      //如果有设置高度
      // if (this.height) {
      //   this.computedBoxHeight = this.endHeight;
      //   console.log(this.name, "updateColBoxHeight2");
      //   return;
      // } else
      if (childrens.length > 0) {
        this.innerHeight = this.computedBoxHeight +=
          item.endHeight + item.endY + item.endMgt + item.endMgb;
        console.log(
          this.name,
          "updateColBoxHeight3",
          this.computedBoxHeight,
          i,
          item.endHeight
        );
        return;
      } else {
        if (/vLayer/gi.test(this.$parent.$vnode.tag)) {
          this.computedBoxHeight = this.$parent.getNode().height();
          return;
        } else {
          //获取最近的linearlayout的宽度
          let linearLayout = getParentLinearLayout(this);
          this.computedBoxHeight = linearLayout.endHeight;
          return;
        }
      }
    },
    //计算横向布局的容器高度
    updateRowBoxHeight(i, item, len) {
      let childrens = this.$refs["slot"].$children;
      if (item.endHeight > this.maxHeight) {
        this.maxHeight = item.endHeight;
      }
      if (i == len - 1) {
        this.computedBoxHeight = this.maxHeight;
      }
      console.log(this.name, "this.computedBoxHeight", this.computedBoxHeight);
    },
    //计算容器高度 入口
    updateBoxHeight(i, item, len) {
      if (this.flexDir == "row") {
        this.updateRowBoxHeight(i, item, len);
      } else {
        console.log(this.name, "updateColBoxHeight rukou");
        this.updateColBoxHeight(i, item, len);
      }
    },
  },
};
</script>