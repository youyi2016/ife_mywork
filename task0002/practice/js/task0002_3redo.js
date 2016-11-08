window.onload = function() {
	var imgs = $("#img-index");
	var lis = $("#circles").getElementsByTagName("li");
	var len = lis.length;
	var prev = $("#prev");
	var next = $("#next");
	var index = 0;//控制小圆点的显示
	showButton();
	//显示小圆点
	function showButton() {
		for(var i = 0;i<len;i++) {
			if(hasClass(lis[i],"light")) {
				removeClass(lis[i],"light");
			}
		}
		addClass(lis[index],"light");
	}
	
	//封装图片切换的方法
	function animate(offset) {
		//parseInt是将字符串转化成整数
		var newLeft = parseInt(imgs.style.left) + offset;
		//图片循环切换的关键步骤
		if(newLeft <= -2700) {
			imgs.style.left = 0+"px";
		} else if(newLeft >= 675) {
			imgs.style.left = -2025+"px";
		}else {
			imgs.style.left = newLeft +"px";
		}
	}
	
	next.onclick = function() {
		//如果小圆点点到最后一个，则下一次点击亮起第一个小圆点
		if(index === len-1){
			index = 0;
		} else {
		    index += 1;
		}
		showButton();
		//imgs.style.left = parseInt(imgs.style.left) - 675+"px";
	     animate(-675);
	}
	
	prev.onclick = function() {
		if(index === 0) {
		  index = len-1;
		} else {
	    index -= 1;
	    }
		showButton();
		//imgs.style.left = parseInt(imgs.style.left) + 675+"px";
	    animate(675);
	}
	
	//点击圆点切换图片
	for(var j = 0;j < len;j++) {
		lis[j].onclick = function() {
			//当前图片再次被点击时不再执行后面的方法
			if(hasClass(this,"light")) {
				return;
			}
			//获取当前点击的圆点的index属性值
			var thisIndex = parseInt(this.getAttribute("index"));
			//改变父容器的偏移量，切换图片
			var offset = -675 * (thisIndex - index);	
			animate(offset);
			index = thisIndex;	
			showButton();
		};
	}
  //	debugger;
};

var time;
//正序播放
function playAsc() {
	if(time) {
	 stop();	
	}
	var intervalTime = 1000;
	time = setInterval(function() {
		$("#next").onclick();
	},intervalTime);
}

//逆序播放
function playDesc() {
	if(time) {
	 stop();	
	}
	var intervalTime = 1000;
	time = setInterval(function() {
		$("#prev").onclick();
	},intervalTime);
}

//停止轮播
function stop() {
		clearInterval(time);
}