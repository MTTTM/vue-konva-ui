<template>
  <v-group  >
      <v-rect
        :config="holidConfig"
       
      />
      <v-group ref="slot" :config="groupConfig" >
       <slot ></slot>
      </v-group> 
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
    width:{
      type:Number,
      required:true
    },
    height:{
      type:Number,
      required:true
    }
  },
  name: "kScrollView",
  computed:{
    "holidConfig"(){
      let t= {
         x:0,
         y:0,
         width:this.$sizeW(this.width),
         height:this.$sizeW(this.height),
         stroke:  "green",
         strokeWidth: 1,
      }
      console.log("ttttt",t)
      return t;
    },
    debugerStatus() {
      return this.$DEBUGER;
    }
  },
  data() {
      let me=this;
      console.log("lineLayoutChild me",me.width)
    return {
      groupConfig: {
        x: 0,
        y: 0,
        draggable: true,
        dragBoundFunc: function (pos) {
          let lineLayoutChild=me.$refs['slot'].$children[0];
          let x=pos.x;  
          let wrapWidth=me.width;
          let innerWidth=lineLayoutChild.endWidth;
       //如果内容宽度比本组件的width小，就不允许滚动
       console.log("lineLayoutChild",innerWidth,wrapWidth,innerWidth-wrapWidth)
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
      strokeBackgroundColor:"green"
    };
  },
  mounted(){
      this.$nextTick(()=>{
        // console.log("bbbbbbbb",this.$refs["slot"])
          if(this.$refs['slot'].$children[0].componentName!="LinearLayout"){
              throw "children must be tag LinearLayout"
          }
          console.log("this.children",this.$refs['slot'].$children[0].width)
      });
  },
  methods: {},
};
</script>