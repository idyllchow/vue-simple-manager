<template>
  <section >
  	<div class="container" ></div>
  	<div class="phone">
  		<iframe  frameborder="0" class="demo-page">
	  		
	  		<div class="page-swipe">
	  		<!-- <mt-swipe :auto="4000">
			  <mt-swipe-item>1</mt-swipe-item>
			  <mt-swipe-item>2</mt-swipe-item>
			  <mt-swipe-item>3</mt-swipe-item>
			</mt-swipe> -->
			</div>
	  		<mt-button @click.native="handleClick">按钮</mt-button>
  		</iframe>
  	</div>
  </section>
</template>

<style>

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  height: 100%;
  width: 100%;
  margin: 0px;
}

.phone {
	margin: 20px 20px 0;
    background-image: url(../assets/phone.1804041120.png);
    background-repeat: no-repeat;
    background-size: 100%;
    height: 800px;
    padding: 100px 16px;
    box-sizing: border-box;
    width: 365px;
}
.demo-page {
    width: 100%;
    height: 580px;
    background-color: #fff;
}

</style>