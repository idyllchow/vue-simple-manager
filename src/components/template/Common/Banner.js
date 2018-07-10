import { getTemplate, getSlotContent, getStringTypeAttr } from '../'

var handle = function(_attr, _slots) {
    //定义默认属性
    let attributes = {
            src: {
                type: 'text',
                // value: './src/assets/image_banner.png'
                value: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528101544&di=d32eee071cf74b62d6cf04ff151704ff&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f92757ce2d9f0000012e7eb316bb.jpg%40900w_1l_2o_100sh.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528101544&di=d32eee071cf74b62d6cf04ff151704ff&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f92757ce2d9f0000012e7eb316bb.jpg%40900w_1l_2o_100sh.jpg']
            },
            alt:{
                type:'text',
                value:''
            },
            width:{
                type:'text',
                value:'380px'
            },
            height:{
                type:'text',
                value:'200px'
            }
        },
        slots = {}

    //覆盖默认属性
    Object.assign(slots, _slots)
    Object.assign(attributes, _attr)

    //根据组件不同需要做的不同操作


    //获取插槽模板内容
    var subContent = getSlotContent(slots) || '&nbsp;'
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

    //字符串模板操作
    let stringAttr = getStringTypeAttr(attributes)
    let template = `<img ${stringAttr} />`

    return { template, attributes, slots }
}
export default handle
