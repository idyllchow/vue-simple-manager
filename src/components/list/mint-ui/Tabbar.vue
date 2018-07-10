<template>
    <mt-tabbar v-model="selected" class="mint-tabbar is-fixed">
      <mt-tab-item>
        Tabbar
      </mt-tab-item>
      <mt-tab-item >
        Tabbar
      </mt-tab-item>
      <mt-tab-item >
        Tabbar
      </mt-tab-item>
      <mt-tab-item>
        Tabbar
      </mt-tab-item>
    </mt-tabbar>
</template>
<!-- <mt-tabbar v-model="selected" class="mint-tabbar is-fixed">
      <mt-tab-item id="tab1">
        <img slot="icon" src="../../../assets/seedland_32.png">
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="../../../assets/seedland_32.png">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="../../../assets/seedland_32.png">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img slot="icon" src="../../../assets/seedland_32.png">
        tab4
      </mt-tab-item>
    </mt-tabbar> -->


<!-- @import '~muse-ui/src/styles/colors.less';
	.swipe{
		height:40px;
		div{
			text-align: center;
			background-color: #26a2ff;
			color:white;
		}
	} -->
<style scoped lang="less">

.mt-tabbar {
    background-image: -webkit-linear-gradient(top,#d9d9d9,#d9d9d9 50%,transparent 0);
    background-image: linear-gradient(180deg,#d9d9d9,#d9d9d9 50%,transparent 0);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    position: relative;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    text-align: center;
}

</style>
