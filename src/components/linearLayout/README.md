# 关于linearLayout 相关属性的说明

## data
* componentName 组件名字
* leftDis 临时变量
* topDis  临时变量
* innerWidth 内部元素的宽度（包括mgl mgr）和
* innerHeight 内部元素的高度（包括mgb mgt）和
* defaultConfig 默认的样式
* updateConfig 用于更新样式
* strokeBackgroundColor  debuger的边框颜色
* computedBoxWidth 计算后的容器宽(对设置了width height属性或者没有设置 做了基本的处理)
* computedBoxHeight 计算后的容器高度(对是否设置了width height属性 或者没有设置  做了基本的处理)
* maxWidth  //最大宽度,临时数据
* maxHeight //最大高度，临时数据
* line // 列数(相对主轴方向而已)
* rows 二维数组

## computed
* debugerStatus debuger 状态
* endConfig 实际内容的样式
* holidConfig 占位符的样式(现在是debuger的展示元素)
* endConfig 最外层的布局定位
* slotConfig 子元素的布局定位容器
