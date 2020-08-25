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
            strokeBackgroundColor: "red"
        }
    },
    created() {
        if (this.debugerColor) {
            this.strokeBackgroundColor = this.debugerColor;
        }
        let computedLayout = {};
        for (let k in this.config) {
            if (!isNaN(Number(this.config[k]))) {
                computedLayout[k] = this.$sizeW(this.config[k]);
            } else {
                computedLayout[k] = this.config[k];
            }
        }
        console.log(this.name, "computedLayout22", computedLayout, "this.config", this.config)
        //单位转换后的配置   
        this.defaultConfig = Object.assign({}, this.defaultConfig, computedLayout);
        if (!this.defaultConfig.x) {
            this.defaultConfig.x = 0;
        }
        if (!this.defaultConfig.y) {
            this.defaultConfig.y = 0;
        }

      //  this.emitParentUpdateLayout();
    },
    beforeDestroy() {
        this.emitParentUpdateLayout();
    },
    computed: {
        debugerStatus() {
            return this.$DEBUGER;
        },
        //实际样式
        endConfig() {
            let obj = Object.assign(
                {},
                this.config,
                this.defaultConfig,
                this.updateConfig
            );
            return obj;
        },
        holidConfig() {
            let obj = {}
            for (let k in this.updateConfig) {
                if (k == "width" || k == "height") {
                    obj[k] = this.updateConfig[k];
                }
            }

            return {
                x: 0,//group内部元素的x，永远是0
                y: 0,//group内部元素的y，永远是0
                width: this.endWidth,
                height: this.endHeight,
                stroke: this.strokeBackgroundColor,
                strokeWidth: 1,
            };
        },
        endX() {
            //计算后的X
            return this.defaultConfig.x ? this.defaultConfig.x : 0;
        },
        endY() {
            //计算后的Y
            return this.defaultConfig.y ? this.defaultConfig.y : 0;
        },
        endWidth() {
            //计算后的width
            return this.defaultConfig.width ? this.defaultConfig.width : 0;
        },
        endHeight() {
            //计算后的高
            return this.defaultConfig.height ? this.defaultConfig.height : 0;
        },
        endMgr() {
            return this.defaultConfig.mgr ? this.defaultConfig.mgr : 0;
        },
        endMgl() {
            return this.defaultConfig.mgl ? this.defaultConfig.mgl : 0
        },
        endMgt() {
            return this.defaultConfig.mgt ? this.defaultConfig.mgt : 0
        },
        endMgb() {
            return this.defaultConfig.mgb ? this.defaultConfig.mgb : 0
        }
    },
    methods: {
        mouseoverfun() {
            if (this.strokeBackgroundColor == "green") {
                this.strokeBackgroundColor = this.debugerColor ? this.debugerColor : "red"
            }
            else {
                this.strokeBackgroundColor = "green";
            }
        },
        emitParentUpdateLayout() {
            let parent = this.$parent;
            let i = 0;
            while (parent) {
                i++;
                if (i > 100) {
                    break;
                }
                if (parent.componentName == "LinearLayout") {
                    parent.updateChildLayOut();
                    break;
                }
                parent = parent.$parent;
            }
        }
    },
}