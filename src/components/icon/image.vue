<template>
  <v-image :config="endConfig" />
</template>
<script>
import customLayout from "../mixin/customLayout";
import { sizeW, sizeH } from "../../utils/size";
export default {
  name: "k-icon",
  mixins: [customLayout],
  props: {
    // color: {
    //   type: String,
    // },
    // image: {
    //   type: String,
    //   default: require("../../assets/icons/1.png"),
    // },
    // w: {
    //   type: Number,
    //   required: true,
    // },
    // h: {
    //   type: Number,
    //   required: true,
    // },
    // debuger: {
    //   type: Boolean,
    //   default: () => false,
    // },
    // resizeMode: {
    //   type: [String, Array],
    //   default: () => "contain",
    //   validator: function (value) {
    //     // 这个值必须匹配下列字符串中的一个
    //     // 一，cover 保持宽高比情况下，最小边等于容器最小边，并完全填满，可以能出容器
    //     // 二 默认情况
    //     //1.contain 保持宽高比情况下，完全显示图片，最小边相对容器居中，最长边填满容器
    //     //2. contain-bottom 如果高是小编情况下，图片贴着底部，顶部空白
    //     //3. contain-top  如果图片高小于容器高情况下，图片贴着顶部，容器底部空白
    //     //4. contain-left 如果图片宽度小于容器宽度时候，图片贴着左边，右边空白
    //     //5. contain-right 如果图片宽度小于容器快递时候，图片贴着右边，左边留白
    //     //二，stretch 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。
    //     // 三
    //     // 1.repeat 重复平铺图片直到填满容器。图片会维持原始尺寸
    //     // 2. repeat-x x方向重复
    //     // 3. repeat-y y方向重复
    //     if (!Array.isArray(value)) {
    //       return (
    //         [
    //           "cover",
    //           "stretch",
    //           "contain",
    //           "contain-top",
    //           "contain-bottom",
    //           "contain-left",
    //           "contain-right",
    //           "center",
    //           "repeat",
    //         ].indexOf(value) !== -1
    //       );
    //     } else {
    //       let dirX = 0,
    //         dirY = 0; //方向统计
    //       let validItem = true; //是否都是有效数值
    //       let arr = Array.from(new Set(value)); //去重
    //       let obj = {};
    //       for (let i = 0; i < arr.length; i++) {
    //         if (arr[i] == "contain-top" || arr[i] == "contain-bottom") {
    //           dirY++;
    //         } else if (arr[i] == "contain-left" || arr[i] == "contain-right") {
    //           dirX++;
    //         }
    //       }
    //       let dirPass = dirX < 2 && dirY < 2; //没有同轴互斥方向
    //       return dirPass && arr.length <= 2;
    //     }
    //   },
    // },
    // x: {
    //   type: Number,
    //   default: 0,
    // },
    // y: {
    //   type: Number,
    //   default: 0,
    // },
  },
  data() {
    return {
      // config: {
      //   image: null,
      //   width: 200,
      //   height: 200,
      // },
      canvas: document.createElement("canvas"),
    };
  },
  created() {
    this.defaultConfig.image = null;
    this.beforeLoading().then((res) => {
      this.defaultConfig.image = res.image;
      this.drawImg()
        .then((res) => {
          this.defaultConfig.image = res.image;
        })
        .catch((e) => {
          console.log("eeeeeeeeeeeeeeeeeeeeeeeee", e);
        });
    });
    console.log("img this.paranet",this.$parent)
  },
  mounted() {},
  computed: {
    endConfig() {
      let obj = Object.assign({}, this.config, {
        x: this.x,
        y: this.y,
        width: this.w,
        height: this.h,
        ...this.defaultConfig,
      });
      console.log("obj", obj);
      return obj;
    },
  },
  watch: {
    endConfig() {
      // this.drawImg();
    },
  },
  methods: {
    drawImg() {
      return new Promise((resolve, reject) => {
        let canvas = this.canvas;
        //一定要设置宽高，应为canvas的默认宽高不满足我们的要求
        canvas.width = this.endConfig.width;
        canvas.height = this.endConfig.height;
        let img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        let me = this;
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = true;
        img.onload = function () {
          console.log("onload====================");
          let imgW = this.width;
          let imgH = this.height;
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
          } else if(resizeMode){
            type = resizeMode;
          }
          console.log("me.resizeMode 模式", type, subType);
          if (type == "contain") {
            //横向源图
            if (horizontalSourseImg) {
              //获取图片的比例
              let Proportion = me.endConfig.width / imgW;
              let drawHeight = Proportion * imgH;
              let drawWidth = me.endConfig.width;
              let yPos = (me.endConfig.height - drawHeight) / 2;
              let xPos = 0;
              if (subType == "top") {
                yPos = 0;
              } else if (subType == "bottom") {
                yPos = me.endConfig.height - drawHeight;
              }
              //img,裁剪位置X，裁剪位置Y,裁剪宽，裁剪高，绘制X，绘制Y，绘制宽，绘制高
              console.log(" me.context", me.context);
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
              debugger;
              let Proportion = me.endConfig.height / imgH;
              let drawHeight = me.endConfig.height;
              let drawWidth = Proportion * imgW;
              //竖向源图
              let xPos = (me.endConfig.width - drawWidth) / 2;
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

              let ProportionH = me.endConfig.height / imgH;
              let drawHeight = ProportionH * imgH;

              let ProportionW = me.w / imgW;
              let drawWidth = ProportionW * imgW;

              let yPos = (me.endConfig.height - drawHeight) / 2;
              let xPos = (me.w - drawWidth) / 2;
              //要用容器短边得到的比例限制另外一边
              if (me.w > me.endConfig.height) {
                drawWidth = ProportionH * imgW;
                xPos = (me.w - drawWidth) / 2;

                if (subType == "left") {
                  xPos = 0;
                } else if (subType == "right") {
                  xPos = me.w - drawWidth;
                }
              } else if (me.w < me.endConfig.height) {
                drawHeight = ProportionW * imgH;
                if (subType == "top") {
                  yPos = 0;
                } else if (subType == "bottom") {
                  yPos = me.endConfig.height - drawHeight;
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

          me.mask.call(this, me, canvas, resolve);
        };
        img.onerror = function () {
          console.error("erroo")
          let img2 = new Image();
          img2.src =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVGhD7ZjZdoIwEIb7/s/YuoIiKAq41ZuUn9PQIQ0g4cIwzsV3wCycfMlkMR+3+0O9EyLMHRHmjghzR4S5I8LcEWHuiDB3RJg7IjyEaJeo1TrsJtioQ3qq6+AdadaybRjfGIOzcJwc1Ods0ct8uVZZca7rBeHWWq6P2WKlsvzvO644C0fxvmrIJorVKStayYpLox5+28p1sVwFlTDe6bdcGC2Mpy2/OF+t6S4sy7D2VhhzDY1DHsI5N0bY5JmO8Vb4fLmpRRl+SAfrcr7SOhR0BDoE5RCyXR3jrTAapEcXfM2XKj1mjXoAcpDU5QBW48v1/q8s8FaYjpoGYlQE75CjZTTBJqrLUbyew8nhWI0s8vAMt7tGPkZc59vA3k7LA6+FAUYRjctbFqRtuZWZohp0RrJPG+W9F7aB/VeHNp7mHKZALj3ldV1vhXESMg8aAI1HgzGydVpPaFcntN+TlXfC19t3teDoxtJ5SxcyCNJVuyu0gd7H/RIuFxkqqwnLNOzL5opMV+2+0Aao75WwuQ1R0Ehb+pDQ1ngj7MLQ0AaTFgb4m6i/hcWpLRo0kx/hmOy12Hf7wnrSwtWWM/BSYNLC9F+U7fxt4+XCz17xmLiEM4DwS694wFOXeAYIX3rGdrkIHMMo4SkiwtwRYe6IMHdEmDsizB0R5o4Ic0eEuSPC3Hkz4Yf6AUaxdWr8fqkUAAAAAElFTkSuQmCC";
          img2.onload = () => {
            me.beforeLoading("error");
          };

        };
        img.src = this.config.image;
        console.log("this.config.image",this.config.image)
      });
    },
    beforeLoading(type = "loading") {
      return new Promise((resolve, reject) => {
        let canvas = this.canvas;
        //一定要设置宽高，应为canvas的默认宽高不满足我们的要求
        console.log("this.endConfig", this.endConfig, this.canvas);
        const width = this.endConfig.width;
        const height = this.endConfig.height;
        canvas.width = width;
        canvas.height = height;
        let img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        let me = this;
        this.context = canvas.getContext("2d");
        this.context.imageSmoothingEnabled = true;
        let img2 = new Image();
        img2.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIISURBVGhD7ZjZdoIwEIb7/s/YuoIiKAq41ZuUn9PQIQ0g4cIwzsV3wCycfMlkMR+3+0O9EyLMHRHmjghzR4S5I8LcEWHuiDB3RJg7IjyEaJeo1TrsJtioQ3qq6+AdadaybRjfGIOzcJwc1Ods0ct8uVZZca7rBeHWWq6P2WKlsvzvO644C0fxvmrIJorVKStayYpLox5+28p1sVwFlTDe6bdcGC2Mpy2/OF+t6S4sy7D2VhhzDY1DHsI5N0bY5JmO8Vb4fLmpRRl+SAfrcr7SOhR0BDoE5RCyXR3jrTAapEcXfM2XKj1mjXoAcpDU5QBW48v1/q8s8FaYjpoGYlQE75CjZTTBJqrLUbyew8nhWI0s8vAMt7tGPkZc59vA3k7LA6+FAUYRjctbFqRtuZWZohp0RrJPG+W9F7aB/VeHNp7mHKZALj3ldV1vhXESMg8aAI1HgzGydVpPaFcntN+TlXfC19t3teDoxtJ5SxcyCNJVuyu0gd7H/RIuFxkqqwnLNOzL5opMV+2+0Aao75WwuQ1R0Ehb+pDQ1ngj7MLQ0AaTFgb4m6i/hcWpLRo0kx/hmOy12Hf7wnrSwtWWM/BSYNLC9F+U7fxt4+XCz17xmLiEM4DwS694wFOXeAYIX3rGdrkIHMMo4SkiwtwRYe6IMHdEmDsizB0R5o4Ic0eEuSPC3Hkz4Yf6AUaxdWr8fqkUAAAAAElFTkSuQmCC";
        img2.onload = () => {
          let sourseImgSortSideHeight = 0; //容器最小边
          if (width > height) {
            sourseImgSortSideHeight = height;
          } else {
            sourseImgSortSideHeight = width;
          }
          let size = sourseImgSortSideHeight * 0.6; //错误图片的宽高
          let xPos = (width - size) / 2;
          let yPos = (height - size) / 2;

          me.context.save();
          me.context.fillStyle = "#f7f8fa";
          me.context.fillRect(0, 0, width, height);
          me.context.restore();
          //img,裁剪位置X，裁剪位置Y,裁剪宽，裁剪高，绘制X，绘制Y，绘制宽，绘制高
          me.context.drawImage(img2, 0, 0, size, size, xPos, yPos, size, size);
          me.mask.call(this, me, canvas, resolve);
        };
      });
    },
    /**
     * 添加蒙版
     */
    mask(me, canvas, resolve) {
      //debuger状态显示边框
      if (me.debuger) {
        me.context.strokeStyle = "#ff0000";
        me.context.strokeRect(0, 0, me.endConfig.width, me.endConfig.height);
        me.context.restore();
      }
      if (me.color) {
        me.context.save();
        me.context.globalCompositeOperation = "source-atop";
        me.context.fillStyle = "red";
        me.context.fillRect(0, 0, me.endConfig.width, me.endConfig.height);
        me.context.restore();
      }

      var image2 = new Image();
      image2.src = canvas.toDataURL("image/png");
      // me.defaultConfig.image=image2;
      console.log("resolve", resolve);
      if (resolve) {
        resolve({ image: image2 });
      }
    },
    resizeModeFn() {},
  },
};
</script>