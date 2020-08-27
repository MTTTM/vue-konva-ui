/**
 * 布局基本属性
 * justify-content:space-between ;
 */
export default {
  methods: {
    /**
    * 容器 space-between 布局，给子元素补充，平均后的间距
    */
    mixinSpaceBetWeenPlusMgl(childrens) {
      let betweenMgl = 0;
      const wrapIsSpaceBetween = this.justifyContent == "space-between";
      if (wrapIsSpaceBetween) {
        let len = childrens.length - 2;
        betweenMgl =
          this.endWidth - this.innerWidth;

        if (len < 2) {
          betweenMgl = 0;
        }
        else {
          betweenMgl = betweenMgl / (len + 1);
        }
      }
      return betweenMgl;
    },
    /**
     * 容器 space-between 布局，给子元素补充，平均后的上间距
     */
    mixinSpaceBetWeenPlusMgt(childrens) {
      let betweenMgt = 0;
      const wrapIsSpaceBetween = this.justifyContent == "space-between";
      if (wrapIsSpaceBetween) {
        let len = childrens.length - 2;
        betweenMgt = this.endHeight - this.innerHeight;
        if (len < 2) {
          betweenMgt = 0;
        }
        else {
          betweenMgt = betweenMgt / (len + 1);
        }
      }
      console.log("this.innerHeight this.innerHeight", this.innerHeight, this.endHeight, this.endHeight - this.innerHeight, betweenMgt);
      return betweenMgt;
    },
  },
}