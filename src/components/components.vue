<template>
    <div>
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
                <li draggable="true" @dragstart="dragStart" data-name="SingleModule">
                    <!-- <mu-icon value="home" :size="48" type="default">
                    Module</mu-icon> -->
                
                    
                    <el-upload 
                      class="avatar-uploader"
                      :action="uploadUrl"
                      name="uploadFile"
                      type="drag"
                      :show-file-list="false"
                      :on-error="onError"
                      :on-success="onSuccess"
                      :on-preview="handlePictureCardPreview"
                      :before-upload="beforeUpload">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="imageUrl" alt>
                    </el-dialog>
                    <!-- <br>
                    <span >&nbspModule</span> -->
                    
                    
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
                <li draggable="true" @dragstart="dragStart" data-name="GroupTitle">
                    <p>GroupTitle</p>
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
    </div>
</template>
<script>
// import museUiList from './list/muse-ui'
import mintUiList from './list/mint-ui'
import {uploadUrl } from '../api/api'
// import iViewUiList from './list/iview-ui'
// http://192.168.64.175:8080/test/pic/upload
export default {
    name: 'components',
    data() {
        return {
            // uploadUrl,
            dialogVisible: false,
            uploadUrl: 'http://192.168.64.175:8080/test/pic/upload',
            imageUrl: '',
            value1: null,
            value2: null
        };
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
        },
        onSuccess(res, file) {
            this.$message.success('上传成功，地址为' + res.url)
            this.imageUrl = res.url
            // this.imageUrl = URL.createObjectURL(file.raw);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg'||'image/gif'||'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          onError(response, file) {
            this.$message.error('上传失败，请重试！' + this.uploadUrl)
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .single-module {
      width: 60px;
      height: 60px;
}
</style>
