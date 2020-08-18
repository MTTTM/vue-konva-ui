<template>
 <v-group ref="slot">
    <slot ></slot>
 </v-group>
</template>
<script>
export default {
    name:"LinearLayout",
    props:{
        flexDir:{
            default(){
                return "row";// row column
            }
        },
        width:{
            type:Number,
            require:true
        }
    },
    data(){
        return {
            componentName:'LinearLayout',
            leftDis:0,
            innerWidth:0,//内部内容的宽度
            topDis:0
        }
    },
    mounted(){
        console.log("LinearLayout",this.$refs['slot'].$children);
        let childrens=this.$refs['slot'].$children;
        this.$nextTick(()=>{
            for(let i=0;i<childrens.length;i++){
            //    console.log("childrens[i]",childrens[i].$children[0].getNode())
                let dom=childrens[i].$children[0].getNode();
                let vm=childrens[i];
                if(i>0){
                    this.leftDis+=vm.endConfig.width+vm.endConfig.x+vm.mgl;
                }
                else{
                     this.leftDis+=vm.endConfig.x+vm.mgl;
                }

                vm.updateConfig={
                    x:this.leftDis
                };
                vm.updateTextConfig={
                    x:this.leftDis
                }

               console.log(" dom.defaultConfig",childrens[i],this.leftDis)
                // let dom=childrens[i].getNode();
                // let mgl=dom.x;
                // console.log("mgl",mgl);
                // if(this.flexDir=="row"){
                //     this.leftDis
                // }
            }
            this.innerWidth=this.leftDis;
        })
    }
}
</script>