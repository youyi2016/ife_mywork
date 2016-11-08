window.onload = function() {
	var arr = ["Test", "Test222", "Test333", "Test4444"];
    var lis ;
	//当按下键盘中的键时触发
	$("#search").onkeyup = function(event) {
		var e = event || window.event;
		var x = e.keyCode || e.which;
		var search = $("#search").value;
		
		//表单为空时点击enter和backspace不搜索结果
		if(isInputNull(search)) {
			if((x === 8) || (x === 13)) {
				return;
			}
		}
		
		if(!$(".menu")) {
			var div = document.createElement("div");
			div.className = "menu";
			var ul = document.createElement("ul");
			ul.className = "result";
			for(var i = 0, len = arr.length; i < len; i++) {
				var li = document.createElement("li");
				var node = document.createTextNode(arr[i]);
				li.appendChild(node);
				ul.appendChild(li);
			}
			div.appendChild(ul);
			$("#container").appendChild(div);
			
			//给搜索到的每一个结果绑定一个事件
		    lis = $(".result").getElementsByTagName("li");
		    each(lis,function(item) {
		      $.click(item,function() {
			    var content = item.innerText;
			    $("#search").value = content;
			    removeMenu();
		      });
	       });
		
		} else {//已经有了搜索的结果，如果表单为空，就清除元素
			if(isInputNull(search)) {
			 removeMenu();
			}
		}
	};
};

//移除菜单
function removeMenu() {
	$("#container").removeChild($(".menu"));
}

//判断表单里面是否为空
function isInputNull(search) {
	return search === '' || search === null || search === undefined;
}
