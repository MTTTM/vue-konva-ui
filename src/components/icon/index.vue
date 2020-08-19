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
      type: String,
      default: () => "contain",
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        // 一，cover 保持宽高比情况下，最小边等于容器最小边，并完全填满，可以能出容器
        // 二
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
        return (
          ["cover", "stretch", "contain", "center", "repeat"].indexOf(value) !==
          -1
        );
      }
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
      });
      console.log("obj",obj)
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
        me.context.drawImage(img, 0, 0, me.w, me.h, 0, 0, imgW, imgH);
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