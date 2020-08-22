<template>
  <v-group  :config="endConfig">
    <v-rect :config="holidConfig"    @click="mouseoverfun" v-if="debugerStatus||debugerColor"/>
    <v-group ref="slot">
     <slot></slot>
    </v-group>
  </v-group>
</template>
<script>
import LayoutMixins from "../mixin/layout"
export default {
  name: "LinearLayout",
  mixins:[LayoutMixins],
  props: {
    flexDir: {
      default() {
        return "row"; // row column
      },
    },
    // width: {
    //   type: Number,
    // },
    // height: {
    //   type: Number,
    //   required: true,
    // },
    // mgt: {
    //   type: Number,
    //   default: 0,
    // },
    // mgl: {
    //   type: Number,
    //   default: 0,
    // },
    name: {
      type: String,
    },
    debugerColor: {
      type: String
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
        gml: 0,
        mgt: 0,
        width: document.documentElement.clientWidth,
        height: this.$sizeW(44),
      },
      updateConfig: {}, //更新样式用
      strokeBackgroundColor: "black",
      show:1,
    };
  },
  computed: {
    debugerStatus(){
      return this.$DEBUGER
    },
    //实际样式
    endConfig() {
       let computedLayout={
          x:this.endX,
          y:this.endY,
          // mgt:this.endMgt,
          // mgl:this.endMgl,
          width:this.endWidth,
          height:this.endHeight
        };
      console.log(this.name,"computedLayout",computedLayout)
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
        width: this.endWidth?this.endWidth : this.defaultConfig.width,
        height: this.endHeight?this.endHeight:this.defaultConfig.height,
        stroke: this.strokeBackgroundColor?this.strokeBackgroundColor:'red',
        strokeWidth: 1,
        zIndex:0
      };
    },
  },
  mounted() {
    this.strokeBackgroundColor=this.debugerColor;
    this.updateChildLayOut();
  },
  methods: {
    mouseoverfun() {
      if(this.strokeBackgroundColor=="green"){
        this.strokeBackgroundColor=this.debugerColor?this.debugerColor:"red"
      }
      else{
        this.strokeBackgroundColor="green";
      }
      // this.$refs['react'].getNode().stroke('yellow');
      // this.$parent.getNode().draw()
      // console.log("hover");
      // this.show=!this.show;
      // if(this.show){
      //    this.$refs['react'].getNode().hide();
      // }
      // else{
      //    this.$refs['react'].getNode().show();
      // }
     
      // this.$parent.getNode().draw()
      console.log("点击了容器")
    },
    updateRowLayout() {
      this.leftDis = 0;
      this.innerWidth = 0;
      this.innerHeight = 0;
      this.topDis = 0;
      this.$nextTick(() => {
        let childrens = this.$refs["slot"].$children;
        console.log(this.name,"childrens", childrens,childrens[0].defaultConfig);
        for (let i = 0; i < childrens.length; i++) {
          let vm = childrens[i];
          if(vm.defaultConfig==undefined){
            continue;
          }
          // //拿到前一个容器的宽度
          let preVm = childrens[i - 1];
          let width = 0;
          if (preVm&&preVm.defaultConfig) {
            width=preVm.endWidth
              ? preVm.endWidth
              : preVm.defaultConfig.width;
          } else {
            width = 0;
          }
          if (i > 0) {
             console.log(this.name,
             "before",
              i,
              "this.leftDis",
              this.leftDis,
              "vm.defaultConfig.x",vm.defaultConfig.x ,
              "width:",width,
              "vm.mgl",vm.mgl,
              "vm.endMgl",vm.endMgl)
            this.leftDis += width + vm.defaultConfig.x + vm.endMgl;
             console.log(this.name,
              i,
              "after",
              "this.leftDis",
              this.leftDis,
              "vm.defaultConfig.x",vm.defaultConfig.x ,
              "width:",width,
              "vm.mgl",vm.mgl,
              "vm.endMgl",vm.endMgl)
          } else {
            this.leftDis += vm.defaultConfig.x + vm.endMgl;
            console.log(this.name,
              i,
              "this.leftDis",
              this.leftDis,
              "vm.defaultConfig.x",vm.defaultConfig.x ,
              "width:",width,
              "vm.mgl",vm.mgl,
              "vm.endMgl",vm.endMgl)
          }
        
          vm.updateConfig = {};
          vm.updateConfig = {
            x: this.leftDis,
          };
          vm.updateTextConfig = {
            x: this.leftDis,
          };
        }
        this.innerWidth = this.leftDis;
      });
    },
    updateColumnLayout() {
      console.log("LinearLayout", this.$refs["slot"].$children);
      this.leftDis = 0;
      this.innerWidth = 0;
      this.innerHeight = 0;
      this.topDis = 0;
      this.$nextTick(() => {
        let childrens = this.$refs["slot"].$children;
        let mgt=this.endMgt;
        for (let i = 0; i < childrens.length; i++) {
          let vm = childrens[i];
          if(vm.defaultConfig==undefined){
            continue;
          }
          let preVm = childrens[i - 1];
          //拿到前一个容器的高度
          let height = 0;
          if (preVm&&preVm.defaultConfig) {
            height=preVm.height
              ? preVm.height
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
          vm.updateConfig = {};
          vm.updateConfig = {
            y: this.topDis,
            x:vm.endMgl
          };
          vm.updateTextConfig = {
            y: this.topDis,
             x:vm.endMgl
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
        this.innerHeight = this.topDis;
      });
    },
    updateChildLayOut() {
      if (this.flexDir == "column") {
        this.updateColumnLayout();
      } else {
        this.updateRowLayout();
      }
    }
  },
};
</script>