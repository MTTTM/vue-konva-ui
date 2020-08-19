<template>
  <v-stage :config="configKonva">
       <v-layer ref="layer">
     
                 <k-icon 
                 :image="require('../../assets/image/recordG.png')" 
                 :w="138"
                  :h="138"
                  :debuger="true"
                  color="#fd0e1d"
                  />
                
                <k-icon 
                 :image="require('../../assets/icons/img2.png')" 
                 :w="138"
                  :h="138"
                  :debuger="true"
                  :x="200"
                  :y="200"
                  />

           
       </v-layer>
  </v-stage>
  <!-- <canvas id="canvas" width="200" height="200" /> -->
</template>
<script>
let width = window.outerWidth;
let height = window.outerHeight;
import kButton from "../../components/button/index";
export default {
  components: { kButton },
  data() {
    return {
      configKonva: {
        width: width,
        height: height,
      },
      reactConfig: {
        x: 200,
        y: 100,
        width: 50,
        height: 50,
        fill: "green",
        draggable: true,
      },
      layerConfig: {},
      context:"",
      imgData:"",
      imgDataResult:"",//被操作的数据
    };
  },
  mounted(){
    //   this.$nextTick(()=>{
    //       this.loadImg();
    //   })
  },
  methods: {
    loadImg() {
    //   var img = new Image();
    //   let me=this;
    //   this.context=document.querySelector("#canvas").getContext('2d');
    //   this.context.imageSmoothingEnabled=true;
    //   let w=200;
    //   let h=200;
    //   let imgData;
    //   img.onload = function () {
    //     me.context.drawImage(this, 0, 0);
    //     me.context.globalCompositeOperation="source-atop";
    //     me.context.fillStyle="#900b09"; 
    //     me.context.fillRect(0,0,200,200);
    //   };
    //   img.src = require("../../assets/icons/1.png");
    },
    replaceColor(_this){
            // 像素点色值
        var rgba = '[0,0,0,1]';
        // 容差大小
        var tolerance = 100;
        // 基于原始图片数据处理
        for (var index = 0; index < _this.imgData.data.length; index += 4) {
            var r = _this.imgData.data[index];
            var g = _this.imgData.data[index + 1];
            var b = _this.imgData.data[index + 2];
            
            if (Math.sqrt(
                (r - rgba[0]) * (r - rgba[0]) + 
                (g - rgba[1]) * (g - rgba[1]) + 
                (b - rgba[2]) * (b - rgba[2])) <= tolerance
            ) {
                _this.imgDataResult.data[index] = 0;
                _this.imgDataResult.data[index + 1] = 0;
                _this.imgDataResult.data[index + 2] = 0;
                _this.imgDataResult.data[index + 3] = 0;
            } else {
                _this.imgDataResult.data[index] = r;
                _this.imgDataResult.data[index + 1] = g;
                _this.imgDataResult.data[index + 2] = b;
                _this.imgDataResult.data[index + 3] = _this.imgData.data[index + 3];
            }
        }
        // put数据
        _this.context.putImageData(_this.imgDataResult, 0, 0);
    }
  },
};
</script>
<style lang="scss">
.konvajs-content {
  background: blue;
}
</style>