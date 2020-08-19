<template>
  <v-image :config="endConfig" />
</template>
<script>
export default {
  name: "k-icon",
  props: {
    color: {
      type: String,
    },
    image: {
      type: String,
      default: require("../../assets/icons/1.png"),
    },
    w: {
      type: Number,
      required: true,
    },
    h: {
      type: Number,
      required: true,
    },
    debuger: {
      type: Boolean,
      default: () => false,
    },
    resizeMode: {
      type: [String,Array],
      default: () => "contain",
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        // 一，cover 保持宽高比情况下，最小边等于容器最小边，并完全填满，可以能出容器
        // 二 默认情况
        //1.contain 保持宽高比情况下，完全显示图片，最小边相对容器居中，最长边填满容器
        //2. contain-bottom 如果高是小编情况下，图片贴着底部，顶部空白
        //3. contain-top  如果图片高小于容器高情况下，图片贴着顶部，容器底部空白
        //4. contain-left 如果图片宽度小于容器宽度时候，图片贴着左边，右边空白
        //5. contain-right 如果图片宽度小于容器快递时候，图片贴着右边，左边留白
        //二，stretch 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。
        // 三
        // 1.repeat 重复平铺图片直到填满容器。图片会维持原始尺寸
        // 2. repeat-x x方向重复
        // 3. repeat-y y方向重复
        if(!Array.isArray(value)){
            return (
            [
              "cover",
              "stretch",
              "contain",
              "contain-top",
              "contain-bottom",
              "contain-left",
              "contain-right",
              "center",
              "repeat",
            ].indexOf(value) !== -1
          );
        }
        else{
           let dirX=0,dirY=0;//方向统计
           let validItem=true;//是否都是有效数值
           let arr=Array.from(new Set(value));//去重
           let obj={

           };
           for(let i=0;i<arr.length;i++){
              if(arr[i]=="contain-top"||arr[i]=="contain-bottom"){
                dirY++;
              }
              else if(arr[i]=="contain-left"||arr[i]=="contain-right"){
                dirX++;
              }
           }
           let dirPass=dirX<2&&dirY<2;//没有同轴互斥方向
           return dirPass&&arr.length<=2;
        }
        
      },
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      config: {
        image: null,
        width: 200,
        height: 200,
      },
    };
  },
  computed: {
    endConfig() {
      let obj = Object.assign({}, this.config, {
        x: this.x,
        y: this.y,
        width: this.w,
        height: this.h,
      });
      console.log("obj", obj);
      return obj;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawImg();
    });
  },
  methods: {
    drawImg() {
      let canvas = document.createElement("canvas");
      //一定要设置宽高，应为canvas的默认宽高不满足我们的要求
      canvas.width = this.w;
      canvas.height = this.h;
      let img = new Image();
      let me = this;
      this.context = canvas.getContext("2d");
      this.context.imageSmoothingEnabled = true;
      img.onload = function () {
        let imgW = this.width;
        let imgH = this.height;
        //   me.context.drawImage(img, 0, 0, me.w, me.h, 0, 0, imgW, imgH);
        //contain
        console.log("me.resizeMode", me.resizeMode, "???", imgH, imgW);
        let horizontalSourseImg = imgW > imgH ? true : false; //横向图
        let verticalSourseImg = imgW < imgH ? true : false; //横向图
        let squareSourseImg = imgW == imgH ? true : false; //等比宽高
        //图片的缩放比例
        let resizeMode = me.resizeMode;
        let type = "contain";
        let subType;
        //分解大分类和小分类
        if (/-/gi.test(resizeMode)) {
          let typeArr = resizeMode.split("-");
          type = typeArr[0];
          subType = typeArr[1];
          console.log("subType", typeArr, subType);
        } else {
          type = resizeMode;
        }

        if (type == "contain") {
          //横向源图
          if (horizontalSourseImg) {
            //获取图片的比例
            let Proportion = me.w / imgW;
            let drawHeight = Proportion * imgH;
            let drawWidth = me.w;
            let yPos = (me.h - drawHeight) / 2;
            let xPos = 0;
            if (subType == "top") {
              yPos = 0;
            } else if (subType == "bottom") {
              yPos = me.h - drawHeight;
            }
            //img,裁剪位置X，裁剪位置Y,裁剪宽，裁剪高，绘制X，绘制Y，绘制宽，绘制高
            me.context.drawImage(
              img,
              0,
              0,
              imgW,
              imgH,
              xPos,
              yPos,
              drawWidth,
              drawHeight
            );
          } else if (verticalSourseImg) {
            let Proportion = me.h / imgH;
            let drawHeight = me.h;
            let drawWidth = Proportion * imgW;
            //竖向源图
            let xPos = (me.w - drawWidth) / 2;
            let yPos = 0;

            if (subType == "left") {
              xPos = 0;
            } else if (subType == "right") {
              xPos = me.w - drawWidth;
            }
            //img,裁剪位置X，裁剪位置Y,裁剪宽，裁剪高，绘制X，绘制Y，绘制宽，绘制高
            me.context.drawImage(
              img,
              0,
              0,
              imgW,
              imgH,
              xPos,
              yPos,
              drawWidth,
              drawHeight
            );
          } else {
            //宽高相等
            //获取图片的比例

            let ProportionH = me.h / imgH;
            let drawHeight = ProportionH * imgH;

            let ProportionW = me.w / imgW;
            let drawWidth = ProportionW * imgW;

            let yPos = (me.h - drawHeight) / 2;
            let xPos = (me.w - drawWidth) / 2;
            //要用容器短边得到的比例限制另外一边
            if (me.w > me.h) {
              drawWidth = ProportionH * imgW;
              xPos = (me.w - drawWidth) / 2;

              if (subType == "left") {
                xPos = 0;
              } else if (subType == "right") {
                xPos = me.w - drawWidth;
              }
              
            } else if (me.w < me.h) {
              drawHeight = ProportionW * imgH;
              if (subType == "top") {
                yPos = 0;
              } else if (subType == "bottom") {
                yPos = me.h - drawHeight;
              }
            }
            //img,裁剪位置X，裁剪位置Y,裁剪宽，裁剪高，绘制X，绘制Y，绘制宽，绘制高
            me.context.drawImage(
              img,
              0,
              0,
              imgW,
              imgH,
              xPos,
              yPos,
              drawWidth,
              drawHeight
            );
          }
        }
        //debuger状态显示边框
        if (me.debuger) {
          me.context.strokeRect(0, 0, me.w, me.h);
        }

        me.mask.call(this, me, canvas);
      };
      img.src = this.image;
    },
    /**
     * 添加蒙版
     */
    mask(me, canvas) {
      me.context.globalCompositeOperation = "source-atop";
      if (me.color) {
        me.context.fillStyle = me.color;
        me.context.fillRect(0, 0, me.w, me.h);
      }

      var image2 = new Image();
      image2.src = canvas.toDataURL("image/png");
      me.config.image = image2;
    },
    resizeModeFn() {},
  },
};
</script>