//避免全局变量 避免命名冲突
//1.单全局变量之命名空间
var YourGlobal = {
	namespace: function(ns) {
		var parts = ns.split("."),
		object = this,
		i, len;
		for (i=0,len=parts.length;i < len; i++) {
			if(!object[parts[i]]) {
				object[parts[i]] = {};
			}
			object = object[parts[i]];
		}
		return object;
	}
};

YourGlobal.namespace("Books.MaintainableJavaScript");
YourGlobal.Books.MaintainableJavaScript.author = "youyi";
YourGlobal.namespace("Books.HighPerformanceJavaScript");
//保持上面的YourGlobal.Books.MaintainableJavaScript原封不动
YourGlobal.Books.HighPerformanceJavaScript.name = "王宝强";
console.log(YourGlobal.Books.MaintainableJavaScript.author);//youyi
console.log(YourGlobal.Books.HighPerformanceJavaScript.name);//王宝强
//在方法调用之后立即给它添加属性
YourGlobal.namespace("Books").ANewBook = {};

//2.单全局变量之模块
//YUI模块 是将模块和命名空间概念合并在一起
YUI.add("my-module",function(Y) {
	//添加命令空间
	Y.namespace("Person.MaintainableJavascript");
	Y.Person.MaintainableJavascript.author = "xiaoma";
},"1.0.0",{requires:["dependency1","dependency2"]});

//YUI().use()传入想加载的模块名称来使用模块
YUI().use("my-module","another-module",function(Y) {
	console.log(Y.Person.MaintainableJavascript.author);
});

//异步模块 AMD
define("my-module2",["dependency1","dependency2"],function(dependency1,dependency2) {
	var Books = {};
	Books.MaintainableJavaScript = {
		author: "张歆艺"
	};
	return Books;
});

//AMD模块可以是匿名的，模块加载器可以将JavaScript文件名当作模块名称，所以如果有一个叫my-module2.js的文件，模块可以只通过模块加载器来加载

define(["dependency1","dependency2"],function(dependency1,dependency2) {
	var Books = {};
	Books.MaintainableJavaScript = {
		author: "张歆艺"
	};
	return Books;
});

//模块加载器
//1.使用AMD模块，需要一个与之兼容的模块加载器（Dojo），用Dojo可以向下面这样来加载
//Dojo同样自己也封装了AMD模块
var books = dojo.require("my-module2");
console.log(books.MaintainableJavaScript.author);

//2.RequireJs指定依赖和回调函数
//Jquery和Dojo都可以使用RequireJs来加载AMD模块
require(["my-module2"],function(books) {
	console.log(books.MaintainableJavaScript.author);
});

//零全局变量
//特殊情况下才会使用，脚本很短且不需要和其他代码产生交互的情况下使用
(function(win) {
	//"use strict"严格模式，避免创建全局变量
	var doc = win.document;
	//其他变量
	//其他相关代码
});
