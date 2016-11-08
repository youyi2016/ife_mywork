// function Person() {  	
// }
//
//  Person.prototype.name = "youyi";
//  Person.prototype.age = 21;
//  Person.prototype.money = "10000";
//  Person.prototype.sayName = function() {
//  	console.log(this.name);
//  }
//  
//  var person1 = new Person();
//  Person.prototype.sayName = function() {
//  	console.log("郭德光");
//  	console.log(this.age);
//  };
//  
//  Person.prototype.age = 70;
//  person1.sayName();
//  
//  
//  var person2 = new Person();
//  person2.sayName();
//console.log(person1.name);
//console.log(person2.name);
  
//console.log(person1.sayName === person2.sayName);
  
//console.log(Person.prototype.isPrototypeOf(person1));//true
//console.log(Person.prototype.isPrototypeOf(person2));//true

//console.log(Object.getPrototypeOf(person1) === Person.prototype);
//console.log(Object.getPrototypeOf(person1).name);
//
//var keys =Object.keys(Person.prototype);
//console.log(keys);
  
//function Person() {  	
// }
//
//  Person.prototype = {
//  	constructor: Person,
//  	name :  "范冰冰",
//  	age : 30,
//  	job : "演员",
//  	sayName : function() {
//  		console.log(this.name);
//  	}
//  };
//
//  
//  Person.prototype = {
//  	constructor: Person,
//  	name :  "李晨",
//  	age : 30,
//  	job : "演员",
//  	isName : function() {
//  		console.log(this.name);
//  	}
//  };
//  
//  var person3 = new Person();
//  person3.sayName();
//  
//  var person4= new Person();
//  person4.isName();
    
//    console.log(person3.constructor === Person);//true
//    console.log(person3.constructor === Object);//false
      


//function Person() {  	
// }
//
// var person5 = new Person();
   
// Person.prototype.sayName = function() {
// 	console.log("范冰冰");
// }
  
//  Person.prototype = {
//  	constructor: Person,
//  	name :  "范冰冰",
//  	age : 30,
//  	job : "演员",
//  	sayName : function() {
//  		console.log(this.name);
//  	}
//  };
//   person5.sayName();

//var student = {
//   count: 0,
//   related: null,
//   age: 1,
//   money: 1000,
//   str: ""
//};
//
////好的写法
//if("count" in student) {
//console.log("我是count，我会执行");
//}
//
////不好的写法
//if (student["count"]) {
// //代码不会执行
// console.log("我不会执行");
//}
//
////不好的写法
//if (student["age"]) {
// //代码会执行
// console.log("age我会执行");
//}
//
////不好的写法
//if (student["money"]) {
// //代码会执行
// console.log("money我会执行");
//}
//
////不好的写法
//if (student["str"]) {
// //代码不会执行
// console.log("str我不会执行");
//}
//
////好的写法
//if("related" in student) {
//console.log("我是related我会执行");
//}
//
////不好的写法
//if (student["related"] === null) {
// //代码不会执行
// console.log("我也会执行");
//}
//
//"use strict"
//function outer() {
//	inner();
//}
//function inner() {
//	//console.log(inner.caller);//报错
//	//console.log(arguments.caller);//报错
//	//console.log(arguments.callee.caller);//报错
//}
//outer();

//function sum(num1,num2) {
//	return num1+num2;
//}

//function applySum1(num1,num2) {
// return	sum.apply(this,arguments);
// 
//}
//
//function applySum2(num1,num2) {
// return	sum.apply(this,[num1,num2]);
// 
//}

//function callSum1() {
//	return sum.call(this);
//}
//console.log(callSum1(10,10));//20
//console.log(applySum1(10,10));//20
//console.log(applySum2(10,10));//20

//color = "red";
//var o = {color:"blue"};
//function sayColor() {
//	
//	console.log(this.color);
//}
//
////sayColor();//red
////o.sayColor();//报错
////o.sayColor = sayColor;//给对象o添加一个sayColor方法，然后让其指针指向全局作用域中的sayColor函数
////o.sayColor();//blue
//
////采用apply或call方法解决对象和方法耦合的问题
//sayColor.apply();//red
//sayColor.apply(o);//blue
////sayColor.apply(this);//undefined
////sayColor.apply(window);//window is not defined
//
//console.log(arguments.callee);

//var fun=function(){};
//var a = new fun();
//fun.prototype= {
//	info:{
//		name:'perter'
//	}
//};
//console.log(a.info);
//
//var a ={n:1};
//var b=a;
//a.x=a={n:2};
//console.log(a.x);//错解：object: {n:2}  正确结果：undefined
//console.log(b.x);//object: {n:2}


function foo(x, y, z) {
 
  // 声明的函数参数数量arguments (x, y, z)
  console.log(foo.length); // 3
 
  // 真正传进来的参数个数(only x, y)
  console.log(arguments.length); // 2
 
  // 参数的callee是函数自身
  console.log(arguments.callee === foo); // true
 
  // 参数共享
 
  console.log(x === arguments[0]); // true
  console.log(x); // 10
 
  arguments[0] = 20;
  console.log(x); // 20
 
  x = 30;
  console.log(arguments[0]); // 30
 
  // 不过，没有传进来的参数z，和参数的第3个索引值是不共享的

  z = 40;
  console.log(arguments[2]); // undefined
 
  arguments[2] = 50;
  console.log(z); // 40
 
}
 
foo(10, 20);



function foo(x, y, z) {
  arguments[0] = 20;
  console.log(x); 
 
  x = 30;
  console.log(arguments[0]); 
 

  z = 40;
  console.log(arguments[2]); 
 
  arguments[2] = 50;
  console.log(z); 
 
}
 
foo(10, 20);