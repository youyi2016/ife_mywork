var name = "youyi";
function getName() {
	//函数在被执行之前会先创建一个活动对象，
	//js先会预编译var关键字，也就是说会将name变量声明提前
	alert(name);//undefined
	var name = "hello";
}
getName();

//函数运行在函数被定义时的作用域里，而不是运行时的作用域里
function factory() {
   var username = 'laruence';
     var intro = function(){
          alert('I am ' + username);// I am laruence
     }
     return intro;
}
 
function app(para){
     var username = para;
     var func = factory();
     func();
}

app("hahaha");
