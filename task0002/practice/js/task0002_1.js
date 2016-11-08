//单行
 function showHobby() {
 	var main = $(".main");
 	var btn = document.getElementsByTagName("button")[0];
	var content = $("#content");
	var str = content.value;
	var str2 = str.trim();
	var arr = str2.split(",");
	var arr2 = uniqArray(arr);
	console.log("ok:"+arr2.length+" "+arr2.valueOf());
	if(!$('.result')) {
	if(arr2[0] !== ''&& arr2.length<10) {
	//动态创建元素
	  if($(".erro").innerHTML!==' ') {
	  	$(".erro").innerHTML=' ';
	  }
	var result = document.createElement("div");
	result.className = "result";
	var hobbys = document.createElement("div");
	hobbys.style.display = 'inline';
	for(var i=0,len=arr2.length;i<len;i++) {
	  var input = document.createElement("input");
	  input.type = "checkbox";
	  hobbys.appendChild(input);
	  var node = document.createTextNode(arr2[i]+' ');
	  hobbys.appendChild(node);
	  
	}
	
	//var node = document.createTextNode(data);
	//appendchild参数是节点类型
	//hobbys.appendChild(node);
	var h3 = document.createElement("h3");
	h3.style.display = 'inline';
	h3.innerHTML = "您的爱好为：";
	result.appendChild(h3);
	result.appendChild(hobbys);
	//result.insertBefore(h3,hobbys);
	main.appendChild(result);
	} else if(arr2.length >= 10) {
		$(".erro").innerHTML ="爱好数量不能超过10个！";
	}
	else {
		$(".erro").innerHTML ="爱好不能为空！";
	}
	} else {
		$(".main").removeChild($('.result'));
	}
}
 
 //多行
function showHobby2() {
 	var main = $(".main2");
 	var btn = document.getElementsByTagName("button")[0];
	var ta = $("#ta");
	var str = ta.value;
//	var str1 = str.trim();
	var str2 = str.replace(/[\s,;]/g, " ");
	var arr = str2.split(" ");
	var arr2 = uniqArray(arr);
	console.log("ok:"+arr2.length+" "+arr2.valueOf());
	if(arr2[0] !== null) {
	//动态创建元素
	var result = document.createElement("div");
	result.className = "result";
	//创建文本节点
	var data = document.createTextNode(arr2.toString());
	//appendchild参数是节点类型
	var hobbys = document.createElement("div");
	hobbys.style.display = 'inline';
	hobbys.appendChild(data);
	var h3 = document.createElement("h3");
	h3.style.display = 'inline';
	h3.innerHTML = "您的爱好为：";
	result.appendChild(h3);
	result.appendChild(hobbys);
	//result.insertBefore(h3,hobbys);
	main.appendChild(result);
	} 
}