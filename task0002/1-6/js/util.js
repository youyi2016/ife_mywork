/* 2.1-1
 * 实践判断各种数据类型的方法
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
	// your implement
	if(typeof Array.isArray === "function") {
		return Array.isArray(arr);
	} else {
		return Object.prototype.toString.call(arr) === "[object Array]";
	}
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
	// your implement
	return typeof fn === "function";
}

var a = [1, 2, 3];
var b = new Function();
//console.log(isArray(a));

/*
 * 2.1-2
 * 了解值类型和引用类型的区别，了解各种对象的读取、遍历方式
 */
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
	// your implement
	var clone = src;

	switch(Object.prototype.toString.call(src)) {
		case "[object Number]":
			clone = src;
			break;

		case "[object String]":
			clone = src;
			break;

		case "[object Boolean]":
			clone = new Boolean(src);
			break;

		case "[object Date]":
			clone = src;
			break;

		case "[object Array]":
			clone = [];
			// 也可以采用for-in来遍历
			for(var key = 0; key < src.length; key++) {
				clone[key] = src[key];
			}
			break;

		case "[object Object]":
			clone = {};
			//for-in语句可以用来枚举对象的属性
			for(var key in src) {
				//不复制原型属性中的值
				if(src.hasOwnProperty(key)) {
					clone[key] = src[key];
				}
			}
			break;

		default:
			break;
	}
	return clone;
}

// 测试用例：
//克隆对象
var srcObj = {
	a: 1,
	b: {
		b1: ["hello", "hi"],
		b2: "JavaScript",
		b3: new Date(1995, 3, 12)
	}
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);
var noClone = abObj;

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.b);
console.log(tarObj.a); // 1
console.log(tarObj.b.b1[0]); // "hello"
console.log(tarObj.b.b1[1]); // "hi"
console.log(tarObj.b.b2); // "JavaScript"
console.log(tarObj.b.b3); // Date 1995-04-11T16:00:00.000Z

console.log(noClone.a); // 2
console.log(noClone.b.b1[0]); // "Hello"

//克隆数组
var arr = [1, 2, 3, 4, 5, "heiei"];
var arrClone = cloneObject(arr);
arr[0] = 9;
console.log(arrClone);
console.log(arr[0]); //9
console.log(arrClone[0]); //1

/*
 * 2-1-3
 * 学习数组、字符串、数字等相关方法
 */
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
	// your implement
	var newArr = [],
		i, j;
	for(i = 0; i < arr.length; i++) {
		if(i === 0) {
			newArr.push(arr[i]);
		}
		for(j = 0; j < i; j++) {
			if(arr[i] === arr[j]) {
				break;
			}
			if(j === (i - 1)) {
				newArr.push(arr[i]);
			}
		}

	}
	return newArr;
}
// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
	// your implement
	var index1, index2,
		newStr = '';

	for(var i = 0; i < str.length; i++) {
		if(str[i] === " " && str[i + 1] !== " ") {
			index1 = i + 1;
			break;
		}
	}
	for(var j = 0; j < str.length; j++) {
		if(str[j + 1] === " " && str[j] !== " ") {
			index2 = j + 1;
			break;
		}
	}
	console.log(index1 + " " + index2); // 2 6 
	//根据下标裁剪字符串时，遵循含头不含尾的原则
	newStr = str.slice(index1, index2);
	return newStr;
}
var str = simpleTrim("  8888  ");
console.log("去除空格后的字符串" + str + "没有空格了");

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
	// your implement 
	var newStr = str.replace(/(^\s*)|(\s*$)/g, "");
	return newStr;
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log("去除空格后的字符串" + str + "没有空格了"); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
	// your implement
	for(var i = 0; i < arr.length; i++) {
		fn(arr[i], i);
	}
}
// 其中fn函数可以接受两个参数：item和index
// 使用示例
var arr = ['java', 'c', 'php', 'html'];

function output(item) {
	console.log(item)
}
each(arr, output); // java, c, php, html

// 使用示例
//var arr = ['java', 'c', 'php', 'html'];
//function output(item, index) {
//  console.log(index + ': ' + item)
//}
//each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	//通过for-in方法遍历对象中的属性
	var i = 0;
	for(var key in obj) {
		i++;
	}
	return i;
}
// 使用示例
var obj = {
	a: 1,
	b: 2,
	c: {
		c1: 3,
		c2: 4
	}
};
console.log(getObjectLength(obj)); // 3

/*
 * 2-1-4
 * 学习正则表达式
 */
// 判断是否为邮箱地址
function isEmail(emailStr) {
	// your implement
	var re = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	var bo = re.test(emailStr);
	return bo;
}

// 判断是否为手机号
function isMobilePhone(phone) {
	// your implement
}
console.log(isEmail("56646444@qq.com"));

/*
 *3. DOM
 */
function hasClass(element, newClassName) {
	return element.className.match(new RegExp('(\\s|^)' + newClassName + '(\\s|$)'));
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	console.log("1:" + hasClass(element, newClassName)); //1:null
	if(!hasClass(element, newClassName)) {
		element.className = newClassName; //所有浏览器都支持
		console.log("2:" + hasClass(element, newClassName)); //2:divstyle,,
	}
	//element.setAttribute("class",newClassName);//ie6/ie7不支持
	//element.setAttribute("className",newClassName);//ie6/ie7支持,其他不支持
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
	// your implement
	if(hasClass(element, oldClassName)) {
		var re = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
		element.className = element.className.replace(re, '');
		console.log("remove:" + element.className); // remove:
	}

}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	// your implement
	return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	// your implement
	var x = 0,
		y = 0;
	var current = element;

	if(current != null) {
		y = current.offsetTop;
		x = current.offsetLeft;
	}

	var scrollLeft = document.body.scrollLeft || window.pageXOffset || document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
	x -= scrollLeft;
	y -= scrollTop;
	console.log("实际距离：" + y + " " + "滚动高度：" + scrollTop);
	return {
		x: x,
		y: y
	}
}
// your implement
var div = document.getElementById("div1");
addClass(div, "divstyle");
//removeClass(div,"divstyle");
var div2 = document.getElementsByClassName("div2");
var div3 = document.getElementsByClassName("div3");
console.log(isSiblingNode(div2, div3));
var obj = getPosition(div);
console.log("元素相对于浏览器窗口的位置：" + obj.x + " " + obj.y);

//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，
//在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：
// 实现一个简单的Query
function $(selector) {
	var doc = document;
	var sel = selector.split(" ");
	// console.log(sel[0]+" "+sel.substring(1));
	for(var j = 0, size = sel.length; j < size; j++) {
		switch(sel[j][0]) { //第一个字符串的第一个字符
			case "#":
				doc = doc.getElementById(sel[j].substring(1));
				break;
			case ".":
				doc = doc.getElementsByClassName(sel[j].substring(1))[0];
				break;
			case "[":
				var eles = doc.getElementsByTagName("*"); //返回带有指定标签名的对象的集合（键值对形式）。
				var indexof = sel[j].indexOf("="); //字符串中不存在等号返回-1

				if(indexof !== -1) {
					for(var i = 0, len = eles.length; i < len; i++) {
						var key = sel[j].substring(1, indexof);
						// 			console.log("key："+key);
						var value = sel[j].substring(indexof + 1, sel[j].length - 1);
						// 			console.log("value："+value);
						if(eles[i][key] === value) {
							doc = eles[i];
							break;
						}
					}
				} else {
					for(var i = 0, len = eles.length; i < len; i++) {
						var key = sel[j].substring(1, sel[j].length - 1);
						// 			console.log("key2："+key);
						if(eles[i][key]) {
							doc = eles[i];
							break;
						}
					}
				}
				break;
			default:
				doc = doc.getElementsByTagName(sel[j])[0];
				break;
		}
		if(!doc) {
			doc = null;
		}
		return doc;
	}
}

// 可以通过id获取DOM对象，通过#标示，例如
console.log($("#adom")); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
console.log($("a")); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
console.log($(".classa")); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
console.log($("[data-log]")); // 返回第一个包含属性data-log的对象

console.log($("[data-time=2015]")); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
console.log($("#adom .classa")); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

/*
 * 4.事件
 */
//我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的util.js，实现以下函数

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	// your implement
	// listener = clicklistener;
	element.addEventListener(event, listener, false);
}
// 例如：
function clicklistener(event) {
	console.log("被点击了！");
}
addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
	// your implement
	element.removeEventListener(event, listener, false);
}

//接下来我们实现一些方便的事件方法
// 实现对click事件的绑定
function addClickEvent(element, listener) {
	// your implement
	addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	// your implement
	//  element.onkeydown = function(event) {//各大浏览器都支持onkeydown事件
	//  	var e = event || window.event;
	//  	var x = e.keyCode || e.which;
	//  	if(x === 13) {//enter键对应的数
	//  		console.log("ok");
	//  	}
	//  };
	addEvent(element, 'keydown', function(event) {
		var e = event || window.event;
		var x = e.keyCode || e.which;
		if(x === 13) { //enter键对应的数
			console.log("ok");
		}
	});
}
addEnterEvent($("#btn"), a);

//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
//addEvent(element, event, listener) -> $.on(element, event, listener);
//removeEvent(element, event, listener) -> $.un(element, event, listener);
//addClickEvent(element, listener) -> $.click(element, listener);
//addEnterEvent(element, listener) -> $.enter(element, listener);
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

//接下来考虑这样一个场景，我们需要对一个列表里所有的<li>增加点击事件的监听
//最笨的方法
function clickListener(event) {
	console.log(event);
}

//$.click($("#item1"), clickListener);
//$.click($("#item2"), clickListener);
//$.click($("#item3"), clickListener);

//稍微好一些的
each($("#list").getElementsByTagName('li'), function(li) {
	addClickEvent(li, clickListener);
});

//动态添加元素
function renderList() {
	$("#list").innerHTML = '<li>new item</li>';
}

function init() {
	each($("#list").getElementsByTagName('li'), function(item) {
		$.click(item, clickListener);
	});

	$.click($("#button"), renderList);
}
init();

//我们增加了一个按钮，当点击按钮时，改变list里面的项目，这个时候你再点击一下li，绑定事件不再生效了。
//那是不是我们每次改变了DOM结构或者内容后，都需要重新绑定事件呢？当然不会这么笨，接下来学习一下事件代理，然后实现下面新的方法：
// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
	// your implement
	addEvent(element, eventName, function(e) {
		console.log(e);
		var e1 = arguments[0] || window.event;
		var target = e.srcElement ? e.srcElement : e.target;
		alert(target.innerHTML);
		return false;
	});
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
$.delegate($("#list"), "li", "click");

////封装事件
//$.on(selector, event, listener) {
//  // your implement
// selector.addEventListener(event,listener,false);   
//}
//
//$.click(selector, listener) {
//  // your implement
//  addEvent(selector,'click',listener);
//}
//
//$.un(selector, event, listener) {
//  // your implement
//  selector.removeEventListener(event,listener,false);
//}
//
//$.delegate(selector, tag, event, listener) {
//  // your implement
//  addEvent(selector,event,function(e) {
//  	console.log(e);
//  	var e1 = arguments[0] || window.event;
//  	var target = e.srcElement ? e.srcElement : e.target;
//  	alert(target.innerHTML);
//  	return false;
//  });
//}
//
//// 使用示例：
//$.click("[data-log]", logListener);
//$.delegate('#list', "li", "click", liClicker);

/*
 * 5.BOM
 */
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	// your implement
	if(!+[1, ]) {
		alert("这是ie浏览器,版本号为：" + navigator.appVersion);
	} else {
		return -1;
	}　　
}

// 设置cookie
//escape()和unescape()是js中的一对编码解码函数,防止中文乱码
function setCookie(cookieName, cookieValue, expiredays) {
	// your implement
	//定义 Date 对象
	var exdate = new Date();
	//将日期设置成过期时间后的日期
	//如果增加天数会改变月份或者年份，那么日期对象会自动完成这种转换。
	exdate.setDate(exdate.getDate() + expiredays);
	//给cookie设置值 toUTCString()将本地日期转化成字符串
	document.cookie = cookieName + "=" + escape(cookieValue) +
		((expiredays === null) ? " " : "; expires=" + exdate.toUTCString());

}

// 获取cookie值
function getCookie(cookieName) {
	// your implement  
	if(document.cookie.length > 0) {
		c_start = document.cookie.indexOf(cookieName + "=");
		if(c_start !== -1) {
			c_start = c_start + cookieName.length + 1;
			//字符串中的indexOf的第一个参数是需检索的字符串值,第二个参数是可选项,指定从哪个字符串开始检索;
			//如果省略第二个参数默认从字符串的首字符开始检索
			c_end = document.cookie.indexOf(";", c_start);
			if(c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
		return "";
	}
}

setCookie("name","youyi",1000);
console.log("name:"+getCookie(name));//youyi

/*
 * 6.ajax
 */
//学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
function ajax(url, options) {
    // your implement
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);