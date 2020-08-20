<template>
  <v-group ref="slot" :config="endConfig">
    <slot></slot>
  </v-group>
</template>
<script>
export default {
  name: "LinearLayout",
  props: {
    flexDir: {
      default() {
        return "row"; // row column
      },
    },
    width: {
      type: Number,
      require: true,
    },
    mgt:{
      type:Number,
      default:0
    },
    mgl:{
        type:Number,
      default:0
    },
    name:{
      type:String
    }
  },
  data() {
    return {
      componentName: "LinearLayout",
      leftDis: 0,
      innerWidth: 0, //内部内容的宽度
      topDis: 0,
      innerHeight:0,//容器的高度
      
      
      
      defaultConfig: {
          x: 0,
          y: 0,
          width: document.documentElement.clientWidth,
          height: this.$sizeW(44),
        },
      updateConfig: {},//更新样式用  
    };
  },
  computed:{
      //实际样式
    endConfig() {
      let obj = Object.assign(
        {},
        this.defaultConfig,
        this.updateConfig
      );
      return obj;
    },
  },
  mounted() {
    this.updateChildLayOut();
    
  },
  methods: {
    updateRowLayout() {
      console.log("LinearLayout", this.$refs["slot"].$children);
      this.leftDis = 0;
      this.innerWidth = 0;
      this.innerHeight=0;
      this.topDis = 0;
      this.$nextTick(() => {
        let childrens = this.$refs["slot"].$children;
        for (let i = 0; i < childrens.length; i++) {
          //    console.log("childrens[i]",childrens[i].$children[0].getNode())
          let dom = childrens[i].$children[0].getNode();
          let vm = childrens[i];
          if (i > 0) {
            this.leftDis +=
              vm.defaultConfig.width + vm.defaultConfig.x + vm.mgl;
          } else {
            this.leftDis += vm.defaultConfig.x + vm.mgl;
            // console.log(
            //   "000000000000////788---",
            //   i,
            //   vm.defaultConfig.x,
            //   vm.mgl
            // );
          }
          console.log("*/*//", i, this.leftDis);
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
      this.innerHeight=0;
      this.topDis = 0;
      this.$nextTick(() => {
        let childrens = this.$refs["slot"].$children;
        for (let i = 0; i < childrens.length; i++) {
              console.log("childrens[i]",childrens[i].$children[0].getNode())
          let dom = childrens[i].$children[0].getNode();
          let vm = childrens[i];
          if (i > 0) {
            this.topDis +=
              vm.defaultConfig.height + vm.defaultConfig.y + vm.mgt;
          } else {
            this.topDis += vm.defaultConfig.y + vm.mgt;
            
          }
          console.log(
            this.name,
              "000000000000////788---",
              i,
              vm.defaultConfig.y,
              "height",
              vm.defaultConfig.height,
              "mgt",
              vm.mgt
            );
          console.log("*/*//", i, this.topDis);
          vm.updateConfig = {};
          vm.updateConfig = {
            y: this.topDis,
          };
          vm.updateTextConfig = {
            y: this.topDis,
          };
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
    },
  },
};
</script>