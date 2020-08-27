/**
 * 布局基本属性
 * justify-content:space-around ;
 */
export default {
  methods: {
    /**
    * 容器 space-around 布局，给子元素补充，平均后的间距
    */
    mixinSpaceAroundPlusMgl(childrens) {
      let betweenMgl = 0;
      const wrapIsSpaceAround = this.justifyContent == "space-around";
      if (wrapIsSpaceAround) {
        let len = childrens.length;
        betweenMgl =
          this.endWidth - this.innerWidth;

        if (len < 2) {
          betweenMgl = 0;
        }
        else {
          betweenMgl = betweenMgl / (len*2);
        }
      }
      return betweenMgl;
    },
    /**
     * 容器 space-around 布局，给子元素补充，平均后的上间距
     */
    mixinSpaceAroundPlusMgt(childrens) {
      let betweenMgt = 0;
      const wrapIsSpaceAround = this.justifyContent == "space-around";
      if (wrapIsSpaceAround) {
        let len = childrens.length;
        betweenMgt = this.endHeight - this.innerHeight;
        if (len < 2) {
          betweenMgt = 0;
        }
        else {
          betweenMgt = betweenMgt / (len *2);
        }
      }
      return betweenMgt;
    },
  },
}