<template>
  <!-- <div style="position:fixed;left:0;top:0;width:100%;height:300px;background:red;z-index:100;">
            001
  </div>-->
  <div>
    <scene :resolution="[containerStyle[0], containerStyle[1]]" id="container">
      <layer ref="scene"  >
        <s-group  :anchor="[0.5, 0.5]" :rotate="45" >
            <sprite
            :size="[containerStyle[0], containerStyle[1]]"
            :bgcolor="'#f50'"
            @click="clicked"
            ></sprite>
            <s-label :font="font" :pos="[300, 300]" anchor="0">{{messages[idx]}}</s-label>
            <s-label :font="font" :pos="[300, 150]" anchor="0">{{me.parent}}</s-label>
            </s-group>
      </layer>
    </scene>
  </div>
</template>
<script>
export default {
  props: {
    me: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      messages: ["Hello World", "Hello Vue", "Hello Sprite"],
      idx: 0,
      font: "48px Arial",
      containerStyle: [667, 375],
    };
  },
  mounted() {
    //  this.$refs['scene'].attr({
    //         rotate: 90,
    //         anchor: [0.5, 0.5],
    //          transformOrigin: ["50%","50%"],
    //     })
    this.$nextTick(() => {
      //   this.$refs['scene']
      this.fixSize();
      window.onresize=()=>this.fixSize();
    });
  },
  methods: {
    fixSize() {
    //   let w = screen.availWidth;
    //   let h = screen.availHeight;
    //   let rat=window.devicePixelRatio;
    //   let endW, endH;
    //   if (w > h) {
    //     endW = w*rat;
    //     endH = h*rat;
    //   } else {
    //     endW = h*rat;
    //     endH = w*rat;
    //   }

    //   document.querySelector("#container").style.height = `${endH}px`;
    //   document.querySelector("#container").style.width = `${endW}px`;
    //   this.containerStyle = [endW, endH];
    },
    clicked() {
      this.idx = (this.idx + 1) % 3;
    },
  },
};
</script>
<style lang="scss">
#container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: red;
}

@media screen and (orientation: landscape) {
  //  #container {
  //   width: 100vw;
  //   height: 100vh;
  //   position: relative;
  //   background: red;
  // }
}
//竖屏
// @media screen and (orientation: portrait) {
//   // some css code
//   #container {
//     transform: rotate(95deg);
//     transform-origin: center center;
//   }
// }
</style>