import {
    getTemplate,
    getSlotContent,
    getStringTypeAttr,
    handleShopAvatarScucess,
    beforeAvatarUpload
} from '../'
var handle = function(_attr, _slots) {
    //定义默认属性
    let attributes = {
            src: {
                type: 'text',
                value: 'https://avatars1.githubusercontent.com/u/10448994?s=40&v=4'
            },
            label: {
                type: 'text',
                value: 'app'
            },
            width: {
                type: 'text',
                value: '60px'
            },
            height: {
                type: 'text',
                value: '60px'
            },
            action: {
                type: 'text',
                value: 'https://avatars1.githubusercontent.com/u/10448994?s=40&v=4'
            },
            url: {
                type: 'text',
                value: ''
            },
            unreadMessage: {
                type: 'text',
                value: ''
            },
            group: {
                type: 'text',
                value: ''
            }
        },
        slots = {
            default: [],
            icon: []
        }

    //覆盖默认属性
    Object.assign(slots, _slots)
    Object.assign(attributes, _attr)

    //根据组件不同需要做的不同操作


    //获取插槽模板内容
    var subContent = getSlotContent(slots)

    //设置当前组件的slot
    if (attributes.slot && attributes.slot !== 'default') {
        attributes.slot = {
            type: 'text',
            value: attributes.slot
        }
    } else {
        attributes.slot = {
            type: 'text',
            value: ''
        }
    }
    let imageUrl = ''
    let onSuccess = function(res, file) {
        this.imageUrl = res.url
        this.$message.success('图片上传成功，地址为' + this.imageUrl)
    }
    let beforeUpload = function(file) {
        const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isRightType) {
            this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isRightType && isLt2M;
    }
    let onError = function(res, file) {
        console.log('上传失败，请重试！' + this.uploadUrl)
    }
    let handlePictureCardPreview = function(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    }

    //字符串模板操作
    let stringAttr = getStringTypeAttr(attributes)
    let template = `el-upload`
    // let template = `<img style="margin-left: 18px; margin-top: 10px"
    //                     ${stringAttr}>${subContent}
    //                         ${attributes.label.value}
    //                     </img>

    //                     `
    // let template = `<div> <el-upload
    //                   class="avatar-uploader"
    //                   action="http://192.168.64.175:8080/test/pic/upload"
    //                   name="uploadFile"
    //                   :show-file-list="false"
    //                   :on-error="${onError}"
    //                   :on-success="${onSuccess}"
    //                   :on-preview="${handlePictureCardPreview}"
    //                   :before-upload="${beforeUpload}"
    //                   >
                      
    //                   <i  class="el-icon-plus avatar-uploader-icon"></i>
    //                 </el-upload>
                    
    //                 </div>
    //                     `

    //删除自定义非ui属性
    template = template.replace(`:label="${attributes.label.value}"`, '')
    return {
        template,
        attributes,
        slots
    }
}
export default handle