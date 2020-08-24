<template>
  <v-stage :config="configKonva">
    <v-layer ref="layer" >
      <linear-layout  name="layout11" :width="600" :height="400" debugerColor="yellow">
           <linear-layout name="layout021" flexDir="column"   debugerColor="black">
                <k-icon 
                      :config='{
                          x: 0,
                          y: 0,
                          image:require("../../assets/icons/2.png"),
                          width: 106,
                          height: 118,
                          resizeMode:"contain"
                      }'
                      />
                <k-text :config="config" />
          </linear-layout>

          <!-- <linear-layout flexDir="column" :width="310" :height="200">
                <k-icon 
                      :config='{
                          x: 0,
                          y: 0,
                          image:require("../../assets/icons/2.png"),
                          width: 106,
                          height: 118,
                          resizeMode:"contain"
                      }'
                      />
                <k-text :config="config" />
          </linear-layout> -->
        <!-- <linear-layout name="layout11" :height="44">
          <template v-for="item in [1,2]">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>

          <k-text :config="config1" />

          <template v-for="item in [4,5]">
            <kButton type="info" :mgl="10" :text="item" :key="item"></kButton>
          </template>
        </linear-layout>

        <linear-layout name="layout11" :height="900" :mgt="10">
          <linear-layout flexDir="column" name="layout11" :width="310" :height="900">
           <k-icon 
                   :config='{
                      x: 0,
                      y: 0,
                      image:require("../../assets/icons/2.png"),
                      width: 106,
                      height: 118,
                      resizeMode:"contain"
                   }'
                  />
            <k-text :config="config" />
            <k-text :config="config" />
          </linear-layout>
          <linear-layout flexDir="column" name="layout11" :mgl="10"  :width="310" :height="900">
            <k-text :config="config" />
            <k-text :config="config" />
            <k-text :config="config" />
          </linear-layout>
        </linear-layout> -->
      </linear-layout>
    </v-layer>
  </v-stage>
</template>
<script>
const width = window.innerWidth;
const height = window.innerHeight;
import kButton from "../../components/button/index";
export default {
  components: { kButton },
  data() {
    return {
      configKonva: {
        width: width,
        height: height,
      },
      config1: {
        x: 10,
        y: 0,
        text:
          "COMPLEX TEXT All the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
        fontSize: 18,
        fontFamily: "Calibri",
        fill: "black",
        width: 300,
        height: 44,
        padding: 10,
        align: "left",
        ellipsis: true,
        wrap: "none",
      },
      config: {
        x: 10,
        y: 10,
        text:
          "COMPLEX TEXT All the world's a stage, and all the men and women merely players. They have their exits and their entrances.",
        fontSize: 18,
        fontFamily: "Calibri",
        fill: "#333",
        width: 300,
        height: 100,
        padding: 10,
        align: "left",
        ellipsis: true,
        //wrap: "none",
      },
    };
  },
  mounted() {},
};
</script>
