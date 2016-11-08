var name = "The window";
var object = {
	name : "my object",
	getNameFunc : function() {
		var that = this;
		return function() {
		//	return this.name;//The window
          return that.name;//my object
		};
	}
//  getNameFunc : function() {
//	     return this.name;
//	}
};

//console.log(object.getNameFunc());
console.log(object.getNameFunc()());


function assignHandler() {
	var e = document.getElementById("someelement");
	var id = e.id;
	 e.onclick = function() {
 	console.log(id); 	
 	//console.log(e.id);
	 };
	 e = null;//减少对DOM对象的引用数
}
assignHandler();

//闭包模仿块级作用域 

//没有闭包的情况
function outputNumbers(count) {
	//for中定义的i相当于在for上方定义的i 所以在函数内i随处可见
	for(var i=0; i<count; i++) {
		console.log(i);
	}
	//var i;//这里定义同名变量结果仍然为 for:4，除非给这里的i赋值 最后的i的结果才会改变
	console.log("for:"+i);//计数  for:4
}
outputNumbers(4);

//使用闭包的情况
function outputNumbers2(count) {
	//创建私有作用域
	(function() {
	for(var i=0; i<count; i++) {
		console.log(i);
	}
	})();
	alert("for:"+i);//计数   Uncaught ReferenceError: i is not defined
}
outputNumbers2(4);

//全局变量和函数很容易导致命名冲突，通过创建私有作用域，每个开发人员即可以使用自己的变量，又不必担心搞乱全局作用域
(function() {
	var now = new Date();
	console.log(now.getMonth()+" "+now.getDate());
	if(now.getMonth() == 0 && now.getDate() == 1) {
		console.log("happy new year！！");
	}
})();

//JavaScript中的私有变量：函数的参数、局部变量、函数内部定义的其他函数

//通过闭包创建用于访问私有变量的公有方法

var compareNames = createComparisonFunction("name");
var result = compareNames({name:"youyi"},{name:"haha"});
console.log(result);//1

function createComparisonFunction(propertyName) {
	return function(object1,object2) {
	var value1 = object1[propertyName];
	var value2 = object2[propertyName];
	if(value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
	}else {
		return 0;
	}
	};
}

//function compare(value1,value2) {
//	if(value1 < value2) {
//		return -1;
//	} else if (value1 > value2) {
//		return 1;
//	}else {
//		return 0;
//	}
//}
//var result = compare(5,10);

//compareNames = null;//解除对匿名函数的引用

function createFunction() {
	var result = new Array();
	
	for(var i=0; i<10; i++) {
		result[i] = function(num) {
			return function() {
				return num;
			};
		}(i);
	}
	return result;
}
//alert("遍历结果："+createFunction());
var a = createFunction();
for(var j=0;j<a.length;j++) {
	console.log("遍历结果："+a[j]());
}

