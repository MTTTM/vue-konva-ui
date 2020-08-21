<template>
  <div>
    <select v-model="selected" style="width:200px;height:20px;position:fixed;left:0;top:0;z-index:20;">
      <option v-for="item in selectArray" :key="item" :value="item">{{item}}</option>
    </select>
      <v-stage :config="configKonva" ref="stage">
       <v-layer ref="layer">
                 <k-icon 
                  :image="require('../../assets/icons/img2.png')" 
                  :w="138"
                  :h="138"
                  :debuger="true"
                  :x="20"
                  :y="40"
                  v-if="selected=='default'"
                  :key="1"
                  />

                  <k-icon 
                 :image="require('../../assets/icons/img1.png')" 
                 :w="138"
                  :h="138"
                  :debuger="true"
                  :x="20"
                  :y="40"
                  v-else-if="selected=='default1'"
                  :key="2"
                  /> 
                  <k-icon 
                 :image="require('../../assets/icons/img3.png')" 
                  :w="138"
                  :h="200"
                  :debuger="true"
                  :x="10"
                  :y="40"
                  v-else-if="selected=='垂直容器正方形-顶部'"
                  :key="3"
                  />  

               <k-icon 
                 :image="require('../../assets/icons/img2.png')" 
                 :w="138"
                  :h="138"
                  :debuger="true"
                  :x="10"
                  :y="40"
                  resizeMode="contain-bottom"
                  v-else-if="selected=='contain-bottom-2'"
                   :key="4"
                  /> 

                   <k-icon 
                 :image="require('../../assets/icons/img2.png')" 
                 :w="138"
                  :h="138"
                  :debuger="true"
                  :x="10"
                  :y="40"
                  resizeMode="contain-top"
                   v-else-if="selected=='contain-top-1'"
                    :key="5"
                  />

                   <k-icon 
                 :image="require('../../assets/icons/img1.png')" 
                 :w="138"
                  :h="138"
                  :debuger="true"
                  :x="10"
                  :y="40"
                  resizeMode="contain-left"
                  v-else-if="selected=='contain-left-2'"
                  :key="6"
                  />

                   <k-icon 
                 :image="require('../../assets/icons/img1.png')" 
                 :w="138"
                  :h="138"
                  :debuger="true"
                  :x="0"
                  :y="40"
                  resizeMode="contain-right"
                   v-else-if="selected=='contain-right-1'"
                   :key="7"
                  /> 


                  <k-icon 
                 :image="require('../../assets/icons/img3.png')" 
                  :w="200"
                  :h="138"
                  :debuger="true"
                  :x="0"
                  :y="40"
                  resizeMode="contain-left"
                  v-else-if="selected=='contain-left-1'"
                    :key="8"
                  /> 
                  <k-icon 
                 :image="require('../../assets/icons/img3.png')" 
                  :w="200"
                  :h="138"
                  :debuger="true"
                  :x="20"
                  :y="40"
                    v-else-if="selected=='default2'"
                      :key="9"
                  />

                  <k-icon 
                 :image="require('../../assets/icons/img3.png')" 
                  :w="138"
                  :h="200"
                  :debuger="true"
                  :x="0"
                  :y="40"
                  resizeMode="contain-bottom"
                   v-else-if="selected=='contain-bottom-1'"
                    :key="10"
                  />   
                  <!-- <k-icon 
                  image="/cat465464654.jpeg" 
                  :w="138"
                  :h="200"
                  :debuger="true"
                  :x="0"
                  :y="40"
                  resizeMode="contain"
                  
                  />  
                   <k-icon 
                  image="https://picb.zhimg.com/80/v2-bb0dac1079dc1d3a1584fc0e3aab08d7_720w.jpg" 
                  :w="138"
                  :h="200"
                  :debuger="true"
                  :x="0"
                  :y="40"
                  resizeMode="contain"
                  
                  />  
                  -->
           
       </v-layer>
  </v-stage>
  </div>

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
      selected: "网络加载失败",
      selectArray:[
        "",
        "default",
        "default1",
        "default2",
        '垂直容器正方形-顶部',
        'contain-bottom-2',
        'contain-top-1',
        'contain-left-2',
        'contain-right-1',
        'contain-left-1',
        'contain-bottom-1',
         "网络加载失败",

      ]
    };

  },
  watch:{
    "selected"(){
     // this.$refs['layer'].getNode().draw();
    }
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