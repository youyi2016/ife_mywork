//function SupType() {
//	this.property = true;
//}
//
//SupType.prototype.getSupvalue = function() {
//	return this.property;
//};
//
//function SubType() {
//	this.subproperty = false;
//}
//
////原型对象等于一个类型的实例
//SubType.prototype = new SupType();
//
////SubType.prototype.getSupvalue = function() {
////	return false;
////};
//
////SubType.prototype.getSubValue = function() {
////	return this.subproperty;
////};
//
//SubType.prototype = {
//	getSubvalue: function() {
//		return this.subproperty;
//	}
//};
//
//var instance = new SubType();
//
//alert(instance.getSubvalue());// instance.getSubValue is not a function

//function F() {
//	console.log("2333333");
//}
//Object.prototype.a = function() {
//	console.log("11");
//};
//
//Function.prototype.b = function() {
//	console.log("22");
//};
//
//var f =new F();
//F.a();//11
//F.b();//22
//f.a();//11
//f.b();//f.b is not a function

//js中的几种继承
//原型链的问题，包含引用类型的原型属性会被实例共享，子类型无法给超类型传递参数
//function SuperType() {
//	this.colors = ["red","blue","green"];
//}
//
//function SubType() {	
//}
//
//SubType.prototype = new SuperType();
//var instance1 = new SubType();
//instance1.colors.push("black");
////alert(instance1.colors);//red,blue,green,black
//var instance2 = new SubType();//red,blue,green,black
////alert(instance2.colors);

////1.借用构造函数
////在构造函数中定义属性，而不是在原型对象中定义属性
//function SuperType() {
//	this.colors = ["red","blue","green"];
//	function getColors() {
//		return colors;
//	}
//}
//
//function SubType() {
//	//每个实例都会有一个colors属性的副本
//	SuperType.call(this);//构造函数中继承了SuperType
//}
//
////SubType.prototype = new SuperType();
////SuperType.prototype.getColors = function() {
////	return this.colors;
////};
//var instance1 = new SubType();
//instance1.colors.push("black");
//alert(instance1.colors);//red,blue,green,black
////alert(instance1.getColors());//red,blue,green,black
//var instance2 = new SubType();
//alert(instance2.colors);//red,blue,green
////alert(instance2.getColors());//red,blue,green

////2.组合继承 最常用的继承模式
////也叫伪经典继承，组合了原型链和借用构造函数的技术的一种继承方式
////通过结合构造函数定义属性的方式，还可以为超类型传递参数；采用原型链就不用将方法写在构造函数里面
//function SuperType(name) {
//	this.colors = ["red","blue","green"];
//	this.name = name;
//	//alert("我被调用");
//}
//
//function SubType(name) {
//	//每个实例都会有一个colors属性的副本
//	SuperType.call(this,name);//第二次调用SuperType()
//}
//
//SubType.prototype = new SuperType();//第一次调用SuperType()
//SuperType.prototype.getColors = function() {
//	return this.colors;
//};
//var instance1 = new SubType("youyi");
////alert(instance1.name);//youyi
//var instance2 = new SubType("xiaobai");
////alert(instance2.name);//xiaobai

////3.原型式继承
////没有严格意义上的构造函数，借用原型基于已有的对象创建新对象
//function object(o) {
//	function F(){}
//	F.prototype = o;
//	return new F();
//}
//
////var person = {
////	name: "youyi",
////	friends: ["小花","小白","小明"]
////};
////
////var anotherPerson1 = object(person);
////anotherPerson1.name = "王宝强";
////anotherPerson1.friends.push("小马");
////
////var anotherPerson2 = object(person);
////anotherPerson2.name = "陈思成";
////anotherPerson2.friends.push("宝宝");
//
////console.log(person.friends);//["小花", "小白", "小明", "小马", "宝宝"]
////console.log(person.name);//youyi
//
////与object()方法行为相同的object.create()
//var person = {
//	name: "youyi",
//	friends: ["小花","小白","小明"]
//};
//
//var anotherPerson1 = Object.create(person);
//anotherPerson1.name = "王宝强";
//anotherPerson1.friends.push("小马");
//
//var anotherPerson2 = Object.create(person);
//anotherPerson2.name = "陈思成";
//anotherPerson2.friends.push("宝宝");
//
////console.log(person.friends);//["小花", "小白", "小明", "小马", "宝宝"]
//console.log(anotherPerson1.name);//王宝强
//console.log(person.name);//youyi
//
////object.create()方法的第二个参数是通过自己的描述符定义的，该属性会覆盖原型对象上的同名属性
//var person = {
//	name: "youyi",
//	friends: ["小花","小白","小明"]
//};
//
//var anotherPerson1 = Object.create(person,{
//	name: {
//		value: "王宝强"
//	}
//});
//
//anotherPerson1.friends.push("小马");
//
//var anotherPerson2 = Object.create(person);
//anotherPerson2.name = "陈思成";
//anotherPerson2.friends.push("宝宝");
//console.log(person.friends);//["小花", "小白", "小明", "小马", "宝宝"]
//console.log(anotherPerson1.name);//王宝强
//console.log(person.name);//youyi

////4.寄生式继承
////缺点是，因为函数不能复用而降低效率，这点与构造函数模式类似
//function createAnother(original) {
//	var clone = object(original);
// //var clone = {};
//	clone.sayHi = function() {
//		console.log("hi");
//	};
//	return clone;
//}
//
////没有严格意义上的构造函数，借用原型基于已有的对象创建新对象
//function object(o) {
//	function F(){}
//	F.prototype = o;
//	return new F();
//}
//
//var person = {
//	name: "youyi",
//	friends: ["小花","小白","小明"]
//};
//
//var anotherPerson3 = createAnother(person);
//anotherPerson3.sayHi();//hi
//
////5.寄生组合式继承  
////效率更高的一种继承模式,通过构造函数来继承属性，通过原型链的混成形式来继承方法
////组合继承中会两次调用SuperType()
////寄生组合式继承相当于是对组合继承模式的一种优化
//
////原理还是要让子类型的原型等于一个超类型的实例
//function inheritPrototype(subType,superType) {
//	var  prototype = object(superType.prototype);
//	prototype.constructor = subType;
//	subType.prototype = prototype;
//}
//
////没有严格意义上的构造函数，借用原型基于已有的对象创建新对象
//function object(o) {
//	function F(){}
//	F.prototype = o;
//	return new F();
//}
//
//function SuperType(name) {
//	this.colors = ["red","blue","green"];
//	this.name = name;
//	alert("我被调用2");
//}
//
//function SubType(name) {
//	//每个实例都会有一个colors属性的副本
//	SuperType.call(this,name);//调用SuperType() 只调用一次
//}
//
////SubType.prototype = new SuperType();//第一次调用SuperType()
////优化上面的方法
//
//inheritPrototype(SubType,SuperType);
//
//SuperType.prototype.getColors = function() {
//	return this.colors;
//};
//var instance1 = new SubType("youyi");
//alert(instance1.name);//youyi
////var instance2 = new SubType("xiaobai");
////alert(instance2.name);//xiaobai
//
