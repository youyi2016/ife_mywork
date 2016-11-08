var time;
var imgs = $("#img-index").getElementsByTagName("img");
var lis = $(".circles").getElementsByTagName("li");
var len = lis.length;
var this_img, this_li;
var i = 0;

function start() {
	console.log("ok11"+" "+i);
	//默认显示第一张图片
	this_img = imgs[i];
	addClass(this_img, "img_place");
	//给第一个按钮设置背景样式
	this_li = lis[i];
	addClass(this_li, "light");
	changeButton();
}

//切换按钮切换图片
function changeButton() {
	each(lis, function(item) {
		$.click(item, function(e) {
			removeClass(lis[i], "light");
			removeClass(imgs[i], "img_place");
			//获取当前点击的li元素的index值
			addClass(item, "light");
			i = item.getAttribute("index");
			this_img = imgs[i];
			addClass(this_img, "img_place");
			this_li = item;
		});
	});
}

//逆序播放
function playDesc() {
	console.log("哈哈");
	if(i !== len - 1) { //如果起始状态不是在最后一张图片位置
		removeClass(lis[i], "light");
		removeClass(imgs[i], "img_place");
		i = len - 1; //将位置调到最后一张图片的位置
		addClass(lis[i], "light");
		addClass(imgs[i], "img_place");
	}
	var timeInterval = 1000;
	time = setInterval(function() {
		var this_li = lis[i];
		var this_img = imgs[i];
		if(hasClass(this_li, "light")) {
			removeClass(this_li, "light");
			removeClass(this_img, "img_place");
		}
		i -= 1;
		if(i === 0) {
			stop();
			start();
			//playDesc();
		} else {
			var nextIi = lis[i];
			addClass(nextIi, "light");
			this_img = imgs[i];
			addClass(this_img, "img_place");
		}

	}, timeInterval);
}

//正序播放
function playAsc() {
	var timeInterval = 1000;
	time = setInterval(function() {
		if(i === len - 1) {
			//重置到起始状态
			removeClass(lis[i], "light");
			removeClass(imgs[i], "img_place");
			i = 0;
			start();
		}
		console.log("i:"+i);
		this_li = lis[i];
		this_img = imgs[i];
		if(hasClass(this_li, "light")) {
			removeClass(this_li, "light");
			removeClass(this_img, "img_place");
		}
			i += 1;
			if(i < len) {
				var nextIi = lis[i];
				addClass(nextIi, "light");
				var nextimg = imgs[i];
				addClass(nextimg, "img_place");
			
			}
			
	}, timeInterval);
}

//停止轮播
function stop() {
	if(time) {
		clearInterval(time);
	}
}