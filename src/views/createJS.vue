<template>
    <div>
     
  <easel-canvas width="500" height="100" >
         <easel-container :rotation="180" :align="['vertical', 'horizontal']">
            <easel-shape
                form="rect"
                :dimensions="[500,100]"
                :x="0"
                :y="0"
                fill="#CCCCFF"
            >
            </easel-shape>
            <easel-text
                text="This is so easy!"
                :x="0"
                :y="0"
                font="70px Calibri"
                color="white"
                :shadow="['#000088',3,2,3]"
            
            >
            </easel-text>
     </easel-container>
</easel-canvas>
       
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>