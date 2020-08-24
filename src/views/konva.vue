<template>
  <v-stage :config="configKonva" :key="key">
    <v-layer ref="layer" :config="layerConfig">
      <v-circle :config="configCircle" @tap="roate"></v-circle>
      <v-rect :config="reactConfig" />
       <v-rect :config="reactConfig2" />
    </v-layer>
  </v-stage>
</template>
<script>
let width = window.outerWidth;
let height = window.outerHeight;
export default {
  data() {
    return {
      key: 1,
      configKonva: {
        width: width,
        height: height,
        fill: "green",
      },
      layerConfig: {
        x: width / 2,
        y: height / 2,
        offset: {
          x: width / 2, //定位点
          y: height / 2,
        },
      },
      reactConfig: {
        x: 200,
        y: 100,
        width: 50,
        height: 50,
        fill: "green",
        draggable: true,
      },
      reactConfig2: {
        x: 200,
        y: 150,
        width: 50,
        height: 50,
        fill: "red",
        draggable: true,
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
      },
      layer: null,
    };
  },
  mounted() {
    this.init();
    
    window.onresize = () => {
      this.init();
    };
    document.querySelector("#nav").style.display="none";
  },
  methods: {
    init() {
      let width = document.body.clientWidth;
      let height = document.body.clientHeight;
      let dom = this.$refs["layer"].getNode();
      console.log(
        'this.$refs["layer"].getNode()',
        this.$refs["layer"].getNode()
      );
      this.configKonva = {
        width: width,
        height: height,
      };
      this.layerConfig = {
        x: width / 2,
        y: height / 2,
        offset: {
          x: width / 2, //定位点
          y: height / 2,
        },
      };

      if (height > width) {
        this.layerConfig = {
          x: width / 2,
          y: height / 2,
          offset: {
            x: height / 2, //定位点 的x，y的宽高需要和定位的width，height反过来
            y: width / 2, //
          },
        };
        if (dom.attrs.rotation != 90) {
          dom.rotate(90);
        }

        dom.draw();
      } else {
        console.log("横ping");
        if (dom.attrs.rotation == 90) {
          dom.rotate(-90);
        }
        dom.draw();
        console.log("横ping", dom.attrs.rotation);
      }
    },
    roate() {
      let dom = this.$refs["layer"].getNode();
      console.log("点击");
      if(this.isFullScreen()){
            this.exitFullscreen();
        }
        else{
             this.launchFullScreen();
        }
     
      //   dom.rotate(180);
      //   dom.draw();
    },
    launchFullScreen() {
        let doc=document.documentElement;
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if (doc.mozRequestFullScreen) {
        doc.mozRequestFullScreen();
      } else if (doc.webkitRequestFullscreen) {
        doc.webkitRequestFullscreen();
      } else if (doc.msRequestFullscreen) {
        doc.msRequestFullscreen();
      }
    },
    exitFullscreen() {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
    },
   isFullScreen() {
        return  !! (
            document.fullscreen || 
            document.mozFullScreen ||                         
            document.webkitIsFullScreen ||       
            document.webkitFullScreen || 
            document.msFullScreen 
        );
    }
  }

  
};
</script>
<style lang="scss">
// .konvajs-content {
//   background: blue;
// }
// @media screen and (orientation:portrait) {
//  .konvajs-content{
//      background:red;
//      transform: rotate(180deg);
//      transform-origin: 50vw 50vh;
//  }
// }

// @media screen and (orientation:landscape) {

// }
</style>