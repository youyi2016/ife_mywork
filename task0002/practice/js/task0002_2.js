function remainDays() {
	var date = new Date();
	var end = new Date();
	var input = $(".endtime");
	var value = input.value;
	var values = value.split("-");
	if(values.length !== 3) {
		$(".error").innerHTML = '请按格式输入日期';
	} else {
	//将表单控件中获得的字符串的值转化成date类型
	//设置年月日
	end.setFullYear(values[0],values[1]-1,values[2]);
	 //设置时分秒
	end.setHours(0,0,0,0);
	
	//计算差值，得到毫秒数
	var difftime = end-date;
	console.log(difftime);
	if(difftime < 0) {
		$(".error").innerHTML = '请输入一个未来时间的日期';
	} 
	else if(difftime === 0) {
		clearTimeout(t);
	}
	else {
	$(".error").innerHTML = ' ';
	var t = setTimeout('remainDays()',1000);
	//求相差多少天
	var diff_days = difftime/(24*60*60*1000);
	//获取小于diffdays的最小整数
	var diffdays = Math.floor(diff_days); 
	//求相差的小时
	var diff_hour = (diff_days - diffdays)*24;
	var diffhour = Math.floor(diff_hour);
	//求相差的分钟
	var diff_minute = (diff_hour - diffhour)*60;
	var diffminute = Math.floor(diff_minute);
	//求相差的秒
	var diff_secound = (diff_minute - diffminute)*60;
	var diffsecound = Math.floor(diff_secound);
	if($(".timestyle")) {
		$(".timestyle").remove();
	}
    var element = document.createElement("div");
    element.className = "timestyle";
    var h3 = document.createElement("h3");
    h3.style.display = "inline";
    h3.style.color = "#f00";
    var content = document.createTextNode("距离");
    h3.appendChild(content);
    element.appendChild(h3);
    //var p = document.createElement("p");
    var text = values[0] + "年" + values[1] + "月" + values[2] + "日";
    var node = document.createTextNode(text);
    element.appendChild(node);
    
    var h2 = document.createElement("h2");
    var text2 =document.createTextNode("还剩");
    h2.style.display = "inline";
    h2.style.color = "#f00";
    h2.appendChild(text2);
    element.appendChild(h2);
    
    var text3 = diffdays + "天" + diffhour +  "小时" + diffminute + "分" + diffsecound + "秒";
    var node2 = document.createTextNode(text3);
    //p.appendChild(node);
    element.appendChild(node2);
    $("#time").appendChild(element);
  }
}
    
//	//获取当前时间
//	var nowyear = date.getFullYear();
//	var nowmonth = date.getMonth()+1;
//	var nowDay = date.getDate();
//	var nowTime = date.getHours();
//	var nowMinute = date.getMinutes();
//	var nowSecound = date.getSeconds();
//	console.log(nowyear+"年"+nowmonth+"月"+nowDay+"日"+nowTime+"时"
//	+nowMinute+"分"+nowSecound+"秒");
}
