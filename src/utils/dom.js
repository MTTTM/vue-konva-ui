export const getParentLinearLayout=(_this)=>{
  console.log("_this",_this)
    let parent = _this.$parent;
    let i = 0;
    while (parent) {
      i++;
      if (i > 500) {
        break;
      }
      if (parent.componentName == "LinearLayout") {
        break;
      }
      parent = parent.$parent;
    }
    return parent;
}