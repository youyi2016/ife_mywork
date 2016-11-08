/*
 * 鼠标移动的距离就是元素要移动的距离，所以关键点就是要得到鼠标点击元素时的
 * 坐标和鼠标移动以后释放时的鼠标的坐标
 */
window.onload = function() {
	var mouseoffsetX = 0;
	var mouseoffsetY = 0;
	var isDrag = false;
	var piatchs = $("#container1").getElementsByClassName("pitach");
	var this_item;

	each(piatchs, function(item) {
		//1.点击元素事件处理，确定移动元素和鼠标的位置
		item.onmousedown = function(event) {
			//window.event是为了兼容ie
			this_item = this;//保存当前的元素
			var e = window.event || event;
			console.log("shijian"+e);
			//e.pageX、e.pageY 获取鼠标当前位置的坐标
			//item.offsetLeft 、item.offsetTop获取当前元素的偏移量
			mouseoffsetX = e.pageX;
			mouseoffsetY = e.pageY;
//          mouseoffsetX = e.clientX;
//			mouseoffsetY = e.clientY;
			isDrag = true;
			console.log("ok" + mouseoffsetX + " " + mouseoffsetY + " " + isDrag);

			//2.鼠标移动时的事件处理
			document.onmousemove = function(event) {
				var e = window.event || event;
				var mouseX = e.pageX;
				var mouseY = e.pageY;
				var moveX = 0;
				var moveY = 0;
				if(isDrag) {
					moveX = mouseX - mouseoffsetX;
					moveY = mouseY - mouseoffsetY;
					this_item.style.left = moveX + "px";
					this_item.style.top = moveY + "px";
					console.log("oh" + moveX + " " + moveY);
				}
			};

		};
	});

	//3.松开元素的事件处理
	document.onmouseup = function() {
		isDrag = false;
	};

};