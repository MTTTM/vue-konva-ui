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
import computedWidthHeight from "../mixin/linearLayoutUpdateComputedWidthHeight.js";

export default {
  name: "LinearLayout",
  mixins: [
    LayoutMixins,
    linearLayoutSpaceBetween,
    linearLayoutSpaceAround,
    computedWidthHeight,
  ],
  props: {
    flexDir: {
      default() {
        return "row"; // row column
      },
    },
    flexWrap: {
      type: Boolean,
      default() {
        return false;
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
      this.entry();
    },
  },
  data() {
    return {
      componentName: "LinearLayout",
      leftDis: 0,
      innerWidth: 0, //内部内容的宽度
      innerHeight: 0, //容器的高度
      topDis: 0,
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
      line: 1, //计算行数||列数
      rows: [], //一个二维数组格式[[行1列1，行一列二],[]]，line》1才有效
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
        width: this.endWidth ? this.endWidth : this.innerWidth,
        height: this.endHeight ? this.endHeight : this.innerHeight,
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
          obj = { x: this.endWidth - this.innerWidth };
        } else if (this.justifyContent == "center") {
          obj = { x: (this.endWidth - this.innerWidth) / 2 };
        }
        //交叉轴
        if (this.alignItems == "flex-start") {
          obj = Object.assign(obj, { y: 0 });
        } else if (this.alignItems == "flex-end") {
          obj = Object.assign(obj, {
            y: this.computedBoxHeight - this.innerHeight + this.endMgt,
          });
        } else if (this.alignItems == "center") {
          obj = Object.assign(obj, {
            y: (this.computedBoxHeight - this.innerHeight) / 2,
          });
          console.log(
            "this.computedBoxHeight - this.innerHeight",
            this.computedBoxHeight,
            this.innerHeight
          );
        }
        return obj;
      } else {
        if (this.justifyContent == "flex-start") {
          obj = { y: 0 };
        } else if (this.justifyContent == "flex-end") {
          obj = { y: this.endHeight - this.innerHeight };
        } else if (this.justifyContent == "center") {
          obj = { y: (this.endHeight - this.innerHeight) / 2 };
        }
        //交叉轴
        if (this.alignItems == "flex-start") {
          obj = Object.assign(obj, { x: 0 });
        } else if (this.alignItems == "flex-end") {
          obj = Object.assign(obj, {
            x: this.endWidth - this.innerWidth + this.endMgl,
          });
        } else if (this.alignItems == "center") {
          obj = Object.assign(obj, {
            x: (this.endWidth - this.innerWidth) / 2,
          });
        }
        return obj;
      }
    },
  },
  mounted() {
    this.strokeBackgroundColor = this.debugerColor;
    this.entry();
  },
  methods: {
    entry() {
      this.$nextTick(() => {
        //获取到父容器的宽高，--》才能判断是否换行--》获取到行列数，才能计算内部元素宽高

        //不换行，需要在布局前计算内部元素宽高
        if (this.flexWrap == false) {
          //计算内部元素的堆叠起来的宽高
          this.updateInnerWidthHeight();
        }
        //更新容器宽高
        this.updateBoxWidthHeight();
        //更新子组件布局
        this.updateChildLayOut();
        //换行，需要在布局后计算内部宽高
        if (this.flexWrap) {
          //  //计算内部元素的堆叠起来的宽高
          this.updateInnerWidthHeight();
        }
      });
    },
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
    /**
     * 依据子元素的 flex 来计算份额
     * @returns {objcet}
     * @description
     *  partCount flex加起来有多少份
     *  onePart   flex:1 等于多少值
     */
    computedFlexItemInfo(childrens) {
      let partCount = 1; //flex item的flex相加总和
      let flexItemArr = childrens.filter(
        (item) => item.endFlex != "none"
      );
      if (flexItemArr.length > 0) {
        partCount = flexItemArr.reduce((a, b) => a.endFlex + b.endFlex);
      }
      let flexNoneItemArr = childrens.filter((item) => item.endFlex == "none");
      let flexNoneItemWidth = 0;

      if(flexNoneItemArr.length){
        flexNoneItemWidth = flexNoneItemArr.reduce(
        (a, b) =>
          a.endMgr + a.endMgl + a.endWidth + (b.endWidth + b.endMgl + b.endMgr)
      );
      }
      let t= {
        partCount,
        onePart: flexNoneItemWidth>0?(this.endWidth - flexNoneItemWidth) / partCount:0,
      };
      return t;
    },
    /**
     * column布局 子元素包含flex
     * 依据子元素的 flex 来计算份额
     * @returns {objcet}
     * @description
     *  partCount flex加起来有多少份
     *  onePart   flex:1 等于多少值
     */
    computedColumnFlexItemInfo(childrens) {
      let partCount = 1; //flex item的flex相加总和
      let flexItemArr = childrens.filter(
        (item) => item.endFlex != "none"
      );
      if (flexItemArr.length > 0) {
        partCount = flexItemArr.reduce((a, b) => a.endFlex + b.endFlex);
      }
      let flexNoneItemArr = childrens.filter((item) => item.endFlex == "none");
      let flexNoneItemHeight = 0;

      if(flexNoneItemArr.length){
        flexNoneItemHeight = flexNoneItemArr.reduce(
        (a, b) =>
          a.endMgt + a.endMgb + a.endHeight + (b.endHeight + b.endMgb + b.endMgt)
      );
      }
      let t= {
        partCount,
        onePart: flexNoneItemHeight>0?(this.endHeight - flexNoneItemHeight) / partCount:0,
      };
      return t;
    },
    updateRowLayout() {
      this.leftDis = 0;
      this.topDis = 0;
      this.line = 0;
      this.$nextTick(() => {
        let childrens = this.$refs["slot"].$children;
        //获取space-between应该补充的间隙，已处理无效参数，包括非space-between
        let betweenMgl = 0;

        if (this.justifyContent == "space-between") {
          betweenMgl = this.mixinSpaceBetWeenPlusMgl(childrens);
        } else if (this.justifyContent == "space-around") {
          betweenMgl = this.mixinSpaceAroundPlusMgl(childrens);
        }

        //获取子元素flex的相关信息
        let flexInfo = this.computedFlexItemInfo(childrens);
        console.log("flexInfo", flexInfo);
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
          let height = 0;
          if (preVm && preVm.defaultConfig) {
            // width = preVm.endWidth ? preVm.endWidth : preVm.defaultConfig.width;
            console.log("preVm",preVm.end)
            if (preVm.endConfig && preVm.endConfig.width) {
              width = preVm.endConfig.width;
            } else if (preVm.endWidth) {
              width = preVm.endWidth;
            } else {
              width = preVm.defaultConfig.width;
            }
            height = preVm.endHeight
              ? preVm.endHeight
              : preVm.defaultConfig.height;
          } else {
            width = 0;
            height = 0;
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
              vm.endMgl,
              vm
            );

            this.leftDis +=
              width + vm.defaultConfig.x + (vm.endMgl ? vm.endMgl : 0);
            if (vm.componentName == "LinearLayout" && this.flexDir == "row") {
              vm.updateConfig.width = this.innerWidth;
              console.log(
                this.name,
                "this.innerWidth234433243223",
                this.innerWidth
              );
            }

            //换行
            if (this.flexWrap) {
              if (
                this.leftDis + vm.endWidth + vm.endMgl + vm.endMgr >
                this.computedBoxWidth
              ) {
                this.leftDis = vm.defaultConfig.x + (vm.endMgl ? vm.endMgl : 0);
                this.topDis +=
                  height + vm.defaultConfig.y + (vm.endMgt ? vm.endMgt : 0);
                this.line++;
                console.log("this.line", this.line);
              }
            }
            // console.log(
            //   this.name,
            //   i,
            //   "after",
            //   "this.leftDis",
            //   this.leftDis,
            //   "vm.defaultConfig.x",
            //   vm.defaultConfig.x,
            //   "width:",
            //   width,
            //   "vm.mgl",
            //   vm.mgl,
            //   "this.$sizeW(mgl)",
            //   this.$sizeW(vm.mgl),
            //   "vm.endMgl",
            //   vm.endMgl,
            //   "vm.endConfig.width",
            //   vm.endConfig.width
            // );
          } else {
            this.line = 1;
            this.leftDis += vm.defaultConfig.x + (vm.endMgl ? vm.endMgl : 0);
            // console.log(
            //   this.name,
            //   i,
            //   "after",
            //   "this.leftDis",
            //   this.leftDis,
            //   "vm.defaultConfig.x",
            //   vm.defaultConfig.x,
            //   "width:",
            //   width,
            //   "vm.mgl",
            //   vm.mgl,
            //   "vm.endMgl",
            //   vm.endMgl
            // );
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

          //换行
          if (this.flexWrap) {
            if (
              this.leftDis + vm.endWidth + vm.endMgl + vm.endMgr >
              this.computedBoxWidth
            ) {
              this.leftDis = vm.defaultConfig.x + (vm.endMgl ? vm.endMgl : 0);

              this.topDis +=
                height + vm.defaultConfig.y + (vm.endMgt ? vm.endMgt : 0);
              this.line++;
            }
          }

          vm.updateConfig = {};
          vm.updateConfig = {
            x: this.leftDis,
            y: this.topDis,
          };

          vm.updateTextConfig = {
            x: this.leftDis,
            y: this.topDis,
          };

          if (vm.endFlex != "none"&&flexInfo.onePart>0) {
            let width = {
              width: flexInfo.onePart * vm.endFlex - vm.endMgl - vm.endMgr,
            };
            console.log("flex width", width);
            vm.updateConfig = Object.assign({}, vm.updateConfig, width);
            vm.updateTextConfig = Object.assign({}, vm.updateTextConfig, width);
          }

          // console.log(
          //     this.name,
          //     i,
          //     "after",
          //     "this.leftDis",
          //     this.leftDis,
          //     "vm.defaultConfig.x",
          //     vm.defaultConfig.x,
          //     "width:",
          //     width,
          //     "vm.mgl",
          //     vm.mgl,
          //     "this.$sizeW(mgl)",
          //     this.$sizeW(vm.mgl),
          //     "vm.endMgl",
          //     vm.endMgl,
          //     "vm.endConfig.width",
          //     vm.endConfig.width,
          //     width
          //   );

          //添加行列
          if (!this.rows[this.line]) {
            this.rows[this.line] = [];
          }
          this.rows[this.line].push(vm);
          this.updateInnerWidthHeight();
        }
      });
    },
    updateLinearChildWidth() {},
    //更正容器款高
    updateBoxWidthHeight() {
      let childrens = this.$refs["slot"].$children;
      for (let i = 0; i < childrens.length; i++) {
        let vm = childrens[i];
        if (vm.defaultConfig == undefined) {
          continue;
        }
        this.mixinUpdateBoxWidth(i, vm, childrens.length); //计算容器宽度
        this.mixinUpdateBoxHeight(i, vm, childrens.length); //计算容器高度
      }
    },
    //col布局，子元素布局
    updateColumnLayout() {
      console.log("LinearLayout", this.$refs["slot"].$children);
      this.leftDis = 0;
      // this.innerWidth = 0;
      // this.innerHeight = 0;
      this.topDis = 0;
      this.rows = [];

      let childrens = this.$refs["slot"].$children;
      //获取space-between应该补充的间隙，已处理无效参数，包括非space-between
      let betweenMgt = 0;
      let mgt = this.endMgt;

      let flexInfo = this.computedColumnFlexItemInfo(childrens);
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
        let width = 0;
        if (preVm && preVm.defaultConfig) {
          // height = preVm.endHeight
          //   ? preVm.endHeight
          //   : preVm.defaultConfig.height;
          if(preVm.endConfig&&preVm.endConfig.height){
            height=preVm.endConfig.height;
          }
          else if(preVm.defaultConfig.height){
            height=preVm.defaultConfig.height;
          }
          else{
            heights=preVm.endHeight;
          }

          width = preVm.endWidth ? preVm.endWidth : preVm.defaultConfig.width;
        } else {
          height = 0;
          width = 0;
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
          this.topDis,
          vm
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

        if (this.justifyContent == "space-between") {
          betweenMgt = this.mixinSpaceBetWeenPlusMgt(childrens);
        } else if (this.justifyContent == "space-around") {
          betweenMgt = this.mixinSpaceAroundPlusMgt(childrens);
        }
        //第一个是贴边的，所以不需要加附加间距
        if (this.justifyContent == "space-between") {
          if (i > 0 && i != childrens.length - 1) {
            this.topDis += betweenMgt;
          }
        } else if (this.justifyContent == "space-around") {
          if (i == 0) {
            this.topDis += betweenMgt;
          } else {
            this.topDis += betweenMgt * 2;
          }
        }

        //换行
        if (this.flexWrap) {
          if (
            this.topDis + vm.endHeight + vm.endMgt + vm.endMgb >
            this.computedBoxHeight
          ) {
            this.topDis = vm.defaultConfig.y + (vm.endMgt ? vm.endMgt : 0);
            this.leftDis +=
              width + vm.defaultConfig.x + (vm.endMgl ? vm.endMgl : 0);
            this.line++;
            console.log("this.line1", this.line, i, this.leftDis);
          }
        }

        vm.updateConfig = {};
        vm.updateConfig = {
          y: this.topDis,
          // x: vm.endMgl,
          x: this.leftDis,
        };
        vm.updateTextConfig = {
          y: this.topDis,
          // x: vm.endMgl,
          x: this.leftDis,
        };

        if (vm.endFlex != "none"&&flexInfo.onePart>0) {
            let height = {
              height: flexInfo.onePart * vm.endFlex - vm.endMgt - vm.endMgb,
            };
            console.log("flex height", height);
            vm.updateConfig = Object.assign({}, vm.updateConfig, height);
            vm.updateTextConfig = Object.assign({}, vm.updateTextConfig, height);
        }

        //添加行列
        if (!this.rows[this.line]) {
          this.rows[this.line] = [];
        }
        this.rows[this.line].push(vm);
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
          this.topDis,
          vm,
          "endConfig.width",
          vm.endConfig.width
        );
      }
    },
    //容器内部元素的布局排版
    updateChildLayOut() {
      if (this.flexDir == "column") {
        this.updateColumnLayout();
      } else {
        this.updateRowLayout();
      }
    },
    updateInnerWidthHeight() {
      let childrens = this.$refs["slot"].$children;
      this.innerWidth = 0;
      this.innerHeight = 0;
      console.log("this.line 5", this.line);
      if (childrens.length > 0) {
        console.log(
          this.name,
          "this.innerWidth thsi line ",
          this.innerWidth,
          this.line
        );
        if (this.line == 1) {
          if (this.flexDir == "row") {
            let maxHeight = 0;
            childrens.forEach((item, index) => {
              this.innerWidth +=
                item.endWidth + item.endX + item.endMgl + item.endMgr;
              console.log(this.name, "this.innerWidth", item);
              if (item.endHeight > this.maxWidth) {
                maxHeight = item.endHeight;
              }
            });
            console.log(this.name, "this.innerWidth", this.innerWidth);
            this.innerHeight = maxHeight;
          } else if (this.flexDir == "column") {
            let maxWidth = 0;
            childrens.forEach((item) => {
              this.innerHeight +=
                item.endHeight + item.endY + item.endMgt + item.endMgb;
              if (item.endWidth > maxWidth) {
                maxWidth = item.endWidth;
              }
            });
            this.innerWidth = maxWidth;
          }
        } else {
          if (this.flexDir == "row") {
            //这里的宽是包括mgt mgl的
            let heights = [];
            this.rows.forEach((elements, i) => {
              let maxHeight = 0;
              elements.forEach((item) => {
                let mgHeight = item.endHeight + item.endMgt + item.endMgb;
                if (mgHeight && mgHeight > maxHeight) {
                  heights[i - 1] = mgHeight;
                }
                maxHeight = mgHeight;
              });
            });
            this.innerHeight = heights.reduce((a, b) => a + b);
          } else {
            //这里的宽是包括mgl mgr的
            let widths = [];
            this.rows.forEach((elements, i) => {
              let maxWidth = 0;
              elements.forEach((item) => {
                let mgWidth = item.endWidth + item.endMgr + item.endMgl;
                if (mgWidth && mgWidth > maxWidth) {
                  widths[i - 1] = mgWidth;
                }
                maxWidth = mgWidth;
              });
            });
            this.innerWidth = widths.reduce((a, b) => a + b);
          }
        }
      }
    },
  },
};
</script>