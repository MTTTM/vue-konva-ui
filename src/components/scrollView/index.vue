<template>
  <v-group ref="slot" :config="groupConfig">
      <slot></slot>
  </v-group>
</template>
<script>
export default {
  props: {
    flexDir: {
      default() {
        return "row"; //row column
      },
    },
  },
  name: "kScrollView",
  data() {
      let me=this;
    return {
      groupConfig: {
        x: 0,
        y: 0,
        draggable: true,
        dragBoundFunc: function (pos) {
          let lineLayoutChild=me.$refs['slot'].$children[0];
          let x=pos.x;  
          let wrapWidth=lineLayoutChild.width;
          let innerWidth=lineLayoutChild.innerWidth;
       //如果内容宽度比本组件的width小，就不允许滚动
        if(innerWidth<wrapWidth){
            x=0;
        }
        else if(x<-Math.abs(innerWidth-wrapWidth)){
            x= -(innerWidth-wrapWidth);
        }
        else if(x>=0){
            x=0;
        }
          return {
            x: x,
            y: this.absolutePosition().y,
          };
        },
      },
    };
  },
  mounted(){
      this.$nextTick(()=>{
          if(this.$refs['slot'].$children[0].componentName!="LinearLayout"){
              throw "children must be tag LinearLayout"
          }
          console.log("this.children",this.$refs['slot'].$children[0].width)
      });
  },
  methods: {},
};
</script>