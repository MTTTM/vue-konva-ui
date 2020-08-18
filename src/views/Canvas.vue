<template>

  <div>
       
  </div>
</template>
<script>
export default {
    name:"canvas-html",
    data(){
        return {
            parent:"外城容器"
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.$CanvasHtml({
                me:this
            });
        })
    },
    methods:{
        clicked() {
            this.idx = (this.idx + 1) % 3
            console.log("yy")
         }
    }
}
</script>