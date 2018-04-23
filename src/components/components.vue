<template>
    <section>
        <mu-content-block style="display:flex;">
            <mu-select-field :value="activeUI" @change="handleTabChange" autoWidth>                
                <mu-menu-item title="特殊组件" value="Mint-UI">
                </mu-menu-item>
                <mu-menu-item title="通用组件" value="Common">
                </mu-menu-item>
            </mu-select-field>
            <mu-sub-header style="white-space:nowrap;"> 组件选择</mu-sub-header>
        </mu-content-block>
        <!-- <div v-if="activeUI === 'Muse-UI'">
            
        </div> -->
        <div v-if="activeUI === 'Mint-UI'">
            <ul class="components-list">
                <li draggable="true" @dragstart="dragStart" data-name="Header">
                    <mt-header fixed title="Header"></mt-header>
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Navbar">
                    <mt-navbar>
                        <mt-tab-item id="1">option A</mt-tab-item>
                        <mt-tab-item id="2">option B</mt-tab-item>
                        <mt-tab-item id="3">option C</mt-tab-item>
                    </mt-navbar>
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="SingleApp">
                    <mu-icon value="home" :size="48" type="default">
                    App</mu-icon><br>
                    <span >&nbspApp</span>
                </li>
                
                <li draggable="true" @dragstart="dragStart" data-name="Swipe">
                    <mint-swipe>Banner</mint-swipe>
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Tabbar">
                    <mt-tabbar>Tabbar</mt-tabbar>
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Grid">
                    <mu-grid-list>Grid</mu-grid-list>
                </li>

                <!-- <li draggable="true" @dragstart="dragStart" data-name="Range">
                    <mt-range />
                </li> -->
                <!-- <li draggable="true" @dragstart="dragStart" data-name="Cell">
                    <mt-cell title="Cell" value="..."></mt-cell>
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Switch">
                    <mt-switch>Switch</mt-switch>
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Field">
                    <mt-field label="Field" placeholder="placeholder"></mt-field>
                </li> -->
                <!-- <li draggable="true" @dragstart="dragStart" data-name="Badge">
                    <mt-badge type="primary">Badge</mt-badge>
                </li> -->
                
            </ul>
        </div>
        <div v-if="activeUI === 'Element-UI'">
            <ul class="components-list">
                <!--                 
                <li draggable="true" @dragstart="dragStart" data-name="Header">
                    <mt-header fixed title="Header"></mt-header>
                </li> 
                -->
            </ul>
        </div>
        <div v-if="activeUI==='Common'">
            <ul class="components-list">
                <li draggable="true" @dragstart="dragStart" data-name="Text">
                    <mu-icon value="text_fields" style="vertical-align:middle;" /> 文本
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="A">
                    <mu-icon value="link" style="vertical-align:middle;" /> 链接
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Img">
                    <mu-icon value="image" /> 图片
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Br">
                    <mu-icon value="keyboard_return" /> 换行
                </li>
                <li draggable="true" @dragstart="dragStart" data-name="Div">
                    <mu-icon value="check_box_outline_blank" /> div
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
// import museUiList from './list/muse-ui'
import mintUiList from './list/mint-ui'
// import iViewUiList from './list/iview-ui'
export default {
    name: 'components',
    data() {
        return {}
    },
    mounted() {

    },
    methods: {
        handleTabChange(val) {
            this.activeUI = val
        },
        getComponent(e) {
            if (!e)
                return
            if (e.localName !== 'li')
                return this.getComponent(e.parentElement)
            else
                return e
        },
        removeDom(e) {
            if (e && e.parentElement)
                e.parentElement.removeChild(e)
        },
        dragStart(e) {
            let componentName = e.target.getAttribute('data-name')
            let info = {
                name: componentName,
                ui: this.activeUI
            }
            e.dataTransfer.setData('info', JSON.stringify(info))
        }
    },
    computed: {
        activeUI: {
            get() {
                return this.$store.state.activeUI
            },
            set(val) {
                this.$store.commit('setState', {
                    activeUI: val
                })
            }
        }
    },
    components: {
        // museUiList,
        mintUiList
        // iViewUiList
    }
}
</script>
<style lang="less" scoped>
.divcss5{text-align:center} 
.components-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.components-list * {
    cursor: move!important;
}

.components-list>li {
    min-height: 36px;
    font-size: 18px;
    -webkit-user-select: none;
    transform: scale(0.7)translateX(-15%);
    padding-bottom: 10px;
    transition: transform .2s;
    &:hover {
        transform: scale(1)translateX(5%);
    }
    i {
        vertical-align: middle;
    }
}

.components-list.iview-ui >li {
    transform: scale(0.8)translateX(-5%);
    &:hover {
        transform: scale(1.1)translateX(10%);
    }
}
</style>
