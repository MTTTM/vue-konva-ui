/**
 * 更新-布局容器宽高
 */
import { getParentLinearLayout } from "../../utils/dom";
export default {
  methods: {
    //更新容器自身的宽
    mixinUpdateBoxWidth(i, item, len) {
      let childrens = this.$refs["slot"].$children;
      console.log("mixinUpdateBoxWidth parents",item)
      //计算容器的宽高
      if (this.width) {
        this.computedBoxWidth = this.endWidth;
        return;
      } 
      // else if (childrens.length > 0&&/LinearLayout/ig.test(item.componentName)) {
      //   //区分横竖布局
      //   if (this.flexDir == "row") {
      //     this.computedBoxWidth +=
      //       item.endWidth + item.endX + item.endMgl + item.endMgr;
      //   } else {
      //     if (item.endWidth > this.maxWidth) {
      //       this.maxWidth = item.endWidth;
      //     }
      //     if (i == len - 1) {
      //       this.computedBoxWidth = this.maxWidth;
      //     }
      //   }
      // } 
      else {
        if (/vLayer/gi.test(this.$parent.$vnode.tag)) {
          this.computedBoxWidth = this.$parent.getNode().width();
          return;
        } else {
          //获取最近的linearlayout的宽度
          let linearLayout = getParentLinearLayout(this);
          this.computedBoxWidth = linearLayout.endWidth;
          return;
        }
      }
    },
    //计算纵向容器的高度
    mixinUpdateColBoxHeight(i, item, len) {
      let childrens = this.$refs["slot"].$children;
      console.log(this.name, "updateColBoxHeight1");
      if (this.height) {
        this.computedBoxHeight = this.endHeight;
        return;
      }
      //  else if (childrens.length > 0&&/LinearLayout/ig.test(item.componentName)) {
      //   this.computedBoxHeight +=
      //     item.endHeight + item.endY + item.endMgt + item.endMgb;
      //   return;
      // } 
      else {
        if (/vLayer/gi.test(this.$parent.$vnode.tag)) {
          this.computedBoxHeight = this.$parent.getNode().height();
          return;
        } else {
          //获取最近的linearlayout的宽度
          let linearLayout = getParentLinearLayout(this);
          this.computedBoxHeight = linearLayout.endHeight;
          return;
        }
      }
    },
    //计算横向布局的容器高度
    mixinUpdateRowBoxHeight(i, item, len) {
      let childrens = this.$refs["slot"].$children;
      let maxHeight = 0;
      if (item.endHeight > maxHeight) {
        maxHeight = item.endHeight;
      }
      if (i == len - 1 && this.line == 1) {
        this.computedBoxHeight = maxHeight;
      }
    },
    //计算容器高度 入口
    mixinUpdateBoxHeight(i, item, len) {
      //  if (this.flexDir == "row"&&this.line==1) {
      //    this.mixinUpdateRowBoxHeight(i, item, len);
      //  }
      //  else {
        this.mixinUpdateColBoxHeight(i, item, len);
    //  }
    },
  }
}