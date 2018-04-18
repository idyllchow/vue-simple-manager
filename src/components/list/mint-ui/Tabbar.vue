<template>
    <mt-tabbar v-model="selected" class="mttabbar">
      <mt-tab-item id="tab1">
        <img slot="icon" src="../../../assets/seedland-32.png">
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="../../../assets/seedland-32.png">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="../../../assets/seedland-32.png">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img slot="icon" src="../../../assets/seedland-32.png">
        tab4
      </mt-tab-item>
    </mt-tabbar>
</template>


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

.mttabbar {
  width:333px;
	height: 55px;
	color: red;
	text-align: center;
}

</style>
