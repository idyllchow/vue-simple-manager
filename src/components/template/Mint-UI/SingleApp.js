import { getTemplate, getSlotContent, getStringTypeAttr } from '../'
var handle = function(_attr, _slots) {
    //定义默认属性
    let attributes = {
            label: {
                type: 'text',
                value: 'app'
            },
            plain:{
                type:'boolean',
                value:''
            },
            url:{
                type:'text',
                value:''
            },
            unreadMessage:{
                type:'text',
                value:''
            },
            group:{
                type: 'text',
                value:''
            }
        },
        slots = {
            default:[],
            icon:[]
        }

    //覆盖默认属性
    Object.assign(slots, _slots)
    Object.assign(attributes, _attr)

    //根据组件不同需要做的不同操作


    //获取插槽模板内容
    var subContent = getSlotContent(slots)

    //设置当前组件的slot
    if (attributes.slot && attributes.slot!=='default') {
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

    //字符串模板操作
    let stringAttr = getStringTypeAttr(attributes)
    let template = `<mu-icon value="home" :size="72" style="margin-left: 10px"
                        ${stringAttr}>${subContent}
                            ${attributes.label.value}
                        </mu-icon>

                        `
        //删除自定义非ui属性
    template = template.replace(`:label="${attributes.label.value}"`, '')
    return { template, attributes, slots }
}
export default handle
