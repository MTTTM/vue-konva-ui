/**
 * 布局基本属性
 */
export default {
    props: {
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
            defaultConfig: {},//无用占位
            updateConfig: {},//更新样式用，给LinearLayout这种布局组件调用
            strokeBackgroundColor:"red"
        }
    },
    mounted() {
        if(this.debugerColor){
            this.strokeBackgroundColor=this.debugerColor;
        }
    },
    computed: {
        debugerStatus() {
            return this.$DEBUGER;
          },
        //实际样式,
        endConfig() {
            let obj = Object.assign(
                {},
                this.config,
                this.updateConfig
            );
            return obj;
        },
        endX() {
            //计算后的X
            return this.config.x ? this.$sizeW(this.config.x) : 0;
        },
        endY() {
            //计算后的Y
            return this.config.y ? this.$sizeW(this.config.y) : '0';
        },
        endWidth() {
            //计算后的width
            return this.$sizeW(this.config.width);
        },
        endHeight() {
            //计算后的高
            return this.$sizeW(this.config.height);
        }
    },
    methods: {
        mouseoverfun() {
            console.log("点击")
            if (this.strokeBackgroundColor == "green") {
                this.strokeBackgroundColor = this.debugerColor ? this.debugerColor : "red"
            }
            else {
                this.strokeBackgroundColor = "green";
            }
        },
    },
}