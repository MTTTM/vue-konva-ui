/**
 * 布局基本属性
 */
export default {
    props: {
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        mgt: {
            type: Number,
            default: 0
        },
        mgl: {
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
                width: this.$sizeW(100),
                height: this.$sizeW(44),
            },
            updateConfig: {},//更新样式用，给LinearLayout这种布局组件调用
        }
    },
    computed: {
        //实际样式
        endConfig() {
            let obj = Object.assign(
                {},
                this.defaultConfig,
                this.config,
                this.updateConfig
            );
            return obj;
        }
    }
}