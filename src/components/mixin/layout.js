/**
 * 布局基本属性
 */
export default {
    props: {
        width: {
            type: Number,
            default:()=>0
        },
        height: {
            type: Number,
            default:()=>0
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        mgt: {
            type: Number,
            default: 0
        },
        mgb: {
            type: Number,
            default: 0
        },
        mgl: {
            type: Number,
            default: 0
        },
        mgr: {
            type: Number,
            default: 0
        },
        name: {
            type: String
        },
        config: {
            required: false,
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            //默认配置
            defaultConfig: {
                x: 0,
                y: 0,
                width: this.$sizeW(44),
                height: this.$sizeW(44),
            },
            updateConfig: {},//更新样式用，给LinearLayout这种布局组件调用
        }
    },
 
    computed: {
        //实际样式,
        endConfig() {
            let obj = Object.assign(
                {},
                this.defaultConfig,
                this.config,
                this.updateConfig
            );
            return obj;
        },
        endX(){
            //计算后的X
            return this.$sizeW(this.x);
        },
        endY(){
            //计算后的Y
            return this.$sizeW(this.y);
        },
        endMgt(){
            //计算后的margin-top
             return this.$sizeW(this.mgt);
        },
        endMgr(){
            //计算后的margin-left
            return this.$sizeW(this.mgr);
        },
        endMgl(){
            //计算后的margin-left
            return this.$sizeW(this.mgl);
        },
        endWidth(){
            //计算后的width
             let t=this.$sizeW(this.width)?this.$sizeW(this.width):this.boxInnerWidth;
             console.log("endWidth",t)
             return t;
            
        },
        endHeight(){
            //计算后的高
            return this.$sizeW(this.height)?this.$sizeW(this.height):this.boxInnerHeight;
        }
    }
}