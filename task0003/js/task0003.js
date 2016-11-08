/*
 * 数据格式
 */
//cateText、cate 代表分类;
//cateSubText、cateSub代表子分类;
//taskText、task代表任务;
var cateText = '['
+  "{"
+  '"id":0,'
+  '"taskname":"百度前端技术学院",'
+  '"childId": [0,1,2]'
+  "}"
+ ']';

var cateSubText = '['
+ "{"
+  '"subid": 0,'
+  '"fatherId": 0,'
+  '"subname": "task0001",'
+  '"childId": [0,1,2]'
+ "},"

+ "{"
+  '"subid": 1,'
+  '"fatherId": 0,'
+  '"subname": "task0002",'
+  '"childId": [3,4,5]'
+  "},"

+ "{"
+  '"subid":2,'
+  '"fatherId": 0,'
+  '"subname":"task0003",'
+  '"childId": [6]'
+  "}"
+ ']';

var taskText = '['
+ "{"
+  '"id": 0,'
+  '"fatherId": 0,'
+  '"title": "to-do-1",'
+  '"finish": true,'
+  '"date": "2016-07-08",'
+  '"content": "百度前端技术学院任务完成1"'
+  "},"

+ "{"
+  '"id": 1,'
+  '"fatherId": 0,'
+  '"title": "to-do-2",'
+  '"finish": true,'
+  '"date": "2016-07-09",'
+  '"content": "百度前端技术学院任务完成"'
+  "},"

+ "{"
+  '"id": 2,'
+  '"fatherId": 0,'
+  '"title": "to-do-3",'
+  '"finish": false,'
+  '"date": "2016-07-09",'
+  '"content": "百度前端技术学院任务完成2"'
+ "},"

+ "{"
+  '"id": 3,'
+  '"fatherId": 0,'
+  '"title": "to-do-4",'
+  '"finish": true,'
+  '"date": "2016-07-08",'
+  '"content": "简历"'
+ "},"

+ "{"
+  '"id": 4,'
+  '"fatherId": 0,'
+  '"title": "to-do-5",'
+  '"finish": true,'
+  '"date": "2016-07-09",'
+  '"content": "百度前端技术学院任务完成"'
+  "},"

+ "{"
+  '"id": 5,'
+  '"fatherId": 0,'
+  '"title": "to-do-6",'
+  '"finish": false,'
+  '"date": "2016-07-09",'
+  '"content": "百度前端技术学院任务完成2"'
+  "},"

+ "{"
+  '"id": 6,'
+  '"fatherId": 0,'
+  '"title": "to-do-7",'
+  '"finish": false,'
+  '"date": "2016-07-09",'
+  '"content": "百度前端技术学院任务完成2"'
+ "}"
+ ']';

var cate,
    cateSub,
    task;
   
/*
 * 生成分类列表
 */
function makeType() {
	
	var  childIds;
	var  child;
	var  html = '';
	    
	for (var i=0,len=cate.length; i<len; i++) {
		    html += '<li class="li_list" bigid='+ cate[i].id +'>'
		         + '<i class="icon-folder-open" bigid='+ cate[i].id +'>'
		         +  cate[i].taskname
		         + '(<span class="all_count">'+ getCateCount(cate[i].childId) +'</span>)' 
				 + '</i>'
				 + '<div class="delete">'
				 + '<i class="icon-cancel" id='+ cate[i].id +'></i>'
				 + '</div>'
				 + '</li>';
				
				childIds = cate[i].childId;
				html += '<ul class="sub_type">';
				for (var j=0,len2=childIds.length; j<len2; j++) {
				   child = getObjBykey(cateSub,"subid",childIds[j]);
					
					if (child) {
						html  += '<li class="li_list" id='+ child.subid +'>'
							  + '<i class="icon-doc"  id='+ child.subid +'>'
							  +	child.subname
							  + '</i><div class="delete">'
							  + '<i class="icon-cancel" id='+ child.subid +'></i>'
							  +	'</div></li>';	
				   } 
				   else { //子类被删除 从列表中移除删除了的子类
//                    cate[i].childId.splice(j, 1);
				   }
				}
				html += '</ul>';		
	}
	
	$(".sub_list").innerHTML = html;
	showAllTask();
	//初始化默认分类
	showDefaultTask();
	//重新给分类绑定delete按钮
	showDeleteBtn("sub_list");
}

function getCateCount(cateArr) {
	
	var obj = {};
	var count = 0;
	    
	for (var i=cateArr.length-1; i>=0; i--) {
		obj = getObjBykey(cateSub,"subid",cateArr[i]);
		console.log("obj:"+JSON.stringify(obj));
		if (obj) {
			count++;
			console.log("count:"+count);
		}
	}
	
	return count;
}

/*
 * 显示默认分类任务
 */
 function showDefaultTask() {
 	var taskObjArr = [];
 	for (var i=task.length-1; i>=0; i--) {
	  if (isNaN(task[i].fatherId) || 
		 (task[i].fatherId === null) ||
		 (task[i].fatherId === -1)) {
 			taskObjArr.push(task[i]);
 		}
 	}
 	//显示默认分类的任务数量
    setDefaultTaskCount(taskObjArr);
 	console.log("showDefaultTask:"+JSON.stringify(taskObjArr));
 	getTaskList(taskObjArr);
 }
 
 //默认分类的任务数量
 function setDefaultTaskCount(taskObjArr) {
 	var count = 0;
 	for (var i=taskObjArr.length-1; i>=0; i--) {
 		if (taskObjArr[i].finish === false) {
 			count++ ;
 		}
 	}
 	$(".default_count").innerHTML = count;
 }
 
/*
 * 展现所有的任务
 */
function showAllTask() {

  //为所有任务项设置选中样式
  var li = $(".list_wrap").getElementsByTagName("li")[0];
  if (li.className === "all_list") {
  	 li.className = "all_list on";
  }
  if (localStorage.bigTaskId) {
	localStorage.removeItem("bigTaskId");
  }
   //删除被选择的子分类id
   localStorage.chooseId = '';	
   //计算所有任务的数量
    setAllTaskCount();
	//获取所有的任务  task_titles
	getTaskList(task);
	//初始化状态
	initTask();
}

//计算所有任务的数量
function setAllTaskCount() {
	var count = $(".default_count").innerHTML;
    $(".all_count").innerHTML = cateSub.length + parseInt(count);
}

/*
 * 每次选中第一个任务
 */
function initTask() {
	var parent = $(".subtask_wrap").getElementsByTagName("ul")[0];
	if (parent) {
	var target = parent.getElementsByTagName("li")[0];	
	changeDom(target);
	makeDetailTask(target.id,"show");
	}
}

/*
 * 根据某对象的某属性得到某对象
 * @param {object} obj 对象
 * @param {string} key 键
 * @return {object} 
 */
function getObjBykey(obj, key, value) {
	for (var i=0,len=obj.length; i<len; i++) {
		if (obj[i][key] === value) {
			return obj[i];
		}
	}
}

/*
 *将数组按升序排列
 */
function sortArry(arr) {
	return arr.sort(
		function (a,b) {
			return a.replace(/-/g,'') - b.replace(/-/g,'');
		}
	);
}

/*
 * 获取任务列表信息
 * @param {Array} taskObjArr 当前子类下的所有的任务
 */
function getTaskList(taskObjArr) {
	var date = [],
	     html = '';
	 
   if ($(".active")) {
   	  if ($(".active").innerHTML === "所有") {
		for (var i=taskObjArr.length-1; i>=0;i--) {
			date.push(taskObjArr[i].date);
		}
		
		date = uniqArray(date);	
		date = sortArry(date);
		
		for (var j=0,len=date.length; j<len; j++) {
			 html += '<li>'
			     +  date[j]  
			     +  '</li>'
				 +	'<ul class="task_titles">';
		 for (var k=0,len2=taskObjArr.length; k<len2; k++)  {
		 	     if (date[j] === taskObjArr[k].date) {
		 	     	if (taskObjArr[k].finish === false) {
		 	     		
		 	     	  html += '<li class="task_title" id='+taskObjArr[k].id+'>'+taskObjArr[k].title
		 	     	       +  '<div class="delete">'
				           +  '<i class="icon-cancel" id='+taskObjArr[k].id+'></i>'
				           +  '</div>'
		 	     	       +  '</li>';
		 	     	} else {
		 	     		
				      html += '<li class="finished_style task_title" id='+taskObjArr[k].id+'>'+taskObjArr[k].title
				           +  '<div class="delete">'
				           +  '<i class="icon-cancel" id='+taskObjArr[k].id+'></i>'
				           +  '</div>'
				           +  '</li>';
				 
		 	     	}

		 	     }
		 }
		 html += '</ul>';
		}
	
    }
   	
		if ($(".active").innerHTML === "未完成") {
			for (var i=taskObjArr.length-1; i>=0;i--) {
			   if (taskObjArr[i].finish === false) {
			     date.push(taskObjArr[i].date);
			   }
		    }
			
			date = uniqArray(date);	
			date = sortArry(date);
			
			for (var j=0,len=date.length; j<len; j++) {
				 html += '<li>'
				     +  '<h4>'+date[j]+ '</h4>'    
				     +  '</li>'
					 +	'<ul class="task_titles">';
			 for (var k=0,len2=taskObjArr.length; k<len2; k++)  {
			 	     if ((date[j] === taskObjArr[k].date) && (taskObjArr[k].finish === false)) {
					  html += '<li class="task_title" id='+taskObjArr[k].id+'>'+taskObjArr[k].title
					       +  '<div class="delete">'
				           +  '<i class="icon-cancel" id='+taskObjArr[k].id+'></i>'
				           +  '</div>'
					       +'</li>';
					 }
			 }
			 html += '</ul>';
			}
		}	
		
	if ($(".active").innerHTML === "已完成") {
	
		for (var i=taskObjArr.length-1; i>=0;i--) {
		   if (taskObjArr[i].finish === true) {
		      date.push(taskObjArr[i].date);
		   }
	    }
		
		    date = uniqArray(date);	
			date = sortArry(date);
			
			for (var j=0,len=date.length; j<len; j++) {
				html += '<li>'
				     +  '<h4>'+date[j]+ '</h4>'    
				     +  '</li>'
					 +	'<ul class="task_titles">';
			 for (var k=0,len2=taskObjArr.length; k<len2; k++)  {
			 	     if ((date[j] === taskObjArr[k].date) && (taskObjArr[k].finish === true)) {
					  html += '<li class="task_title" id='+taskObjArr[k].id+'>'+taskObjArr[k].title
					       +  '<div class="delete">'
				           +  '<i class="icon-cancel" id='+taskObjArr[k].id+'></i>'
				           +  '</div>'
					       +'</li>';
					 }
			 }
			 html += '</ul>';
			}
	}	
	}
	
	
	$(".subtask_wrap").innerHTML = '';
	$(".subtask_wrap").innerHTML = html;
	initTask();
	//任务加载完后加载删除按钮
	showDeleteBtn("subtask_wrap");
}

/*
 * 通过分类id获取对应的所有的任务
 * @param {Number} chooseId 被点击的分类id 
 */
function getTaskObjArr(chooseId) {
	        var taskObjArr = [],
			    taskObj ,  
			    childIds;
	         var typeObj = getObjBykey(cateSub,"subid",chooseId);
				   //获取点击的当前分类的所有子任务id		      
				  if (typeObj) {
				      childIds = typeObj.childId;     
				
				  for (var i=childIds.length-1; i>=0; i--) {
				  	  taskObj = getObjBykey(task,"id",childIds[i]);
				  	 //将所有任务的对象存放到数组中
				  	 if (taskObj) {
				       taskObjArr.push(taskObj);
				     }
				  	 else {//如果当前的任务不存在，说明已经被删除；将任务从子分类中移除
//				  	    childIds.splice(i, 1);
//				  	    alert(JSON.stringify(childIds));
				  	 }
				  }
				 }
				  return taskObjArr;
}

/* 对数据进行操作
 * 生成任务列表
 * @param {String} className 
 * @id {String} id
 */
function makeTask(className, id) {
	
	var taskObjArr=[];  
	var className = className;
	var id = id;
	
	console.log("makeTask："+className);
	switch (className) {
		 case "sub_type" :
                 var chooseId = parseInt(id);
                 //保存当前点击的子类id
		         localStorage.setItem("chooseId",chooseId);
		         //取消所有任务的选中
		         removeAllCateStyle();
				  //通过分类id获取点击的当前分类的对象
				 taskObjArr = getTaskObjArr(chooseId);
				 getTaskList(taskObjArr);
				 break;
				  
		 case "d_list" : //默认分类
		        //保存当前点击的子类id
		         localStorage.setItem("chooseId",id);
		         removeAllCateStyle();       
	             showDefaultTask();     
		         break;
		        
		 case "task_btn" :
		         //获取当前点击的分类id
		         var chooseId = localStorage.chooseId;
		         if (chooseId && (chooseId !== "-1")) {
		             taskObjArr = getTaskObjArr(parseInt(chooseId));  
		             getTaskList(taskObjArr);
		         }
		         //默认分类
		         if (chooseId === "-1") { 	
		         	 showDefaultTask();
		         }
				  break;			   
		 default :
		        break;
	}
  
    
     
}

/*
 * 通过任务id获取任务详细信息
 * @param {Number} taskId 当前点击的任务的id 
 * @param {String} type 类型
 */
function makeDetailTask(taskId,type) {
	
	var id = parseInt(taskId);
	var taskObj = getObjBykey(task,"id",id);
	
	if (type === "show") {
		$(".task_name").innerHTML = taskObj.title;
		$(".task_time").innerHTML ="任务日期：" +taskObj.date;
		$(".task_content").innerHTML = taskObj.content;
	}
	else if (type === "edit") {
		if ($(".add")) {
			$(".add").value = "保存";
			$(".add").setAttribute("class","confirm") ;
			//$(".add").className = 'confirm';
		}
		
		$(".i_taskname").value = taskObj.title;
		$(".i_tasktime").value = taskObj.date;
		$(".t_taskcontent").value = taskObj.content;
	}	
	else if (type === "add") {
		$(".confirm").value = "添加";
		$(".confirm").setAttribute("class","add");
		$(".i_taskname").value = '';
		$(".i_tasktime").value = '';
		$(".t_taskcontent").value = '';
	} 
}

/*
 * 添加任务
 */
function addTask(taskObj) {
	
	var taskObj = taskObj;
	taskObj.id = task.length;
	task.push(taskObj);
	
	if (taskObj.fatherId && taskObj.fatherId !== -1) {
	   updateSubCate(taskObj);
	}
	save();
	showAllTask();
}

/*
 * 更新子类下的任务
 */
function updateSubCate(taskObj) {

	for (var i=cateSub.length-1; i>=0; i--) {
		if (cateSub[i].subid === taskObj.fatherId) {
			cateSub[i].childId.push(taskObj.id);
			return;
		}
	}
}

/*
 * 删除数据
 */
function deleteDataById(id, class_name) {
   
	var class_name = class_name;
	var id = parseInt(id);
	
	switch (class_name) {
		 case "task_titles" : //删除任务     
		        for (var i=0,len=task.length; i<len; i++) {
		    	 if (task[i].id === id) {
		    	 	task.splice(i,1);//删除子分类中的任务
		    	 	break;
		    	 }
		       }
		         save();
		         makeType();  
		         showAllTask();	
		         break;
		       
		case "sub_type" : //删除子分类
		    var obj = getObjBykey(cateSub,"subid", id); 
		    var childId = obj.childId;//子分类中的任务的id
		    
		    for (var k=childId.length; k>=0; k--) {
		    	//删除任务
		       deleteDataById(childId[k] , "task_titles");   
		    }
		    
		    for (var j=0,len2=cateSub.length; j<len2; j++) {
		      	 if (cateSub[j].subid === id) {
		      	 	cateSub.splice(j,1);
		      	 	break;
		      	 }
		      }
		    
		   save();
		   makeType();  
		   showAllTask();		   
		break;
		
		case "sub_list" : //删除大分类
		      var obj = getObjBykey(cate,"id", id); 
		      var childId = obj.childId;//大分类中的子分类的id
		      
		      for (var j=0,len2=cate.length; j<len2; j++) {
		      	 if (cate[j].id === id) {
		      	 	cate.splice(j,1);
		      	 	break;
		      	 }
		      }
		      
		     for (var k=childId.length; k>=0; k--) {
		      for (var i=0,len=cateSub.length; i<len; i++) {
		    	 if (cateSub[i].subid === childId[k]) {
                    //删除子分类
		    	 	deleteDataById(cateSub[i].subid , "sub_type");
		    	 	break;
		    	 }
		      }      
		     }
		       
		       save();
		       makeType();  
		       showAllTask();
		       break;
		
		default:
		break;
   }

}

/*
 * 修改任务详细信息
 * @param {obj} taskObj 当前的任务对象
 */
function updateDataById(taskObj) {
	
	var this_id = parseInt(taskObj.id);
	
	for (var i=task.length-1; i>=0; i--) {
		if (task[i]['id'] === this_id) {
			task[i]['title'] = taskObj.title;
			task[i]['date'] = taskObj.date;
			task[i]['content'] = taskObj.content;
			task[i]['finish'] = taskObj.finish;
			break;
		}
	}
	save();
}

/*
 * 添加分类
 */
function addCate(cateObj) {
	var cateObj = cateObj;
	var i = cate.length;
	
    cateObj.id = i;
    cateObj.taskname = cateObj.taskname;
    cate.push(cateObj);
    save();
}

/*
 * 更新分类的详细信息
 * @param {int} bigTaskId 分类id
 * @param {int} subId 子分类id
 */
function updateCate(bigTaskId,subId) {
	
	for (var j=cate.length-1; j>=0; j--) {
		if (cate[j].id === bigTaskId) {
			cate[j].childId.push(subId);
		}
	}
	save();	
}

/*
 * 添加子分类
 */
function addSubCate(subCateObj,bigTaskId) {
	
	var subCateObj = subCateObj;
	var bigTaskId = parseInt(bigTaskId);
	var i = cateSub.length;
	
	subCateObj.subid = i;
	subCateObj.fatherId = bigTaskId;
	subCateObj.subname = subCateObj.taskname;
	cateSub.push(subCateObj);
	updateCate(bigTaskId,i);
	save();	
}

//刷新分类列表
function refreshList(chooseId) {
	
	  if (chooseId) {
 			if (chooseId === "-1") {
 				makeTask("d_list",-1);
 				//计算所有任务的数量
 				setAllTaskCount();
 			}
 		    else {
 		     makeTask("sub_type",chooseId);
 		    }
 		} 
 		else {
 			showDefaultTask();//先刷新默认分类
 			showAllTask();//再刷新所有任务
 		}
}

/*
 * 检查要增加的分类名称是否已经存在
 */
function checkTitle(title) {
	
	for (var i=cate.length-1; i>=0; i--) { 
	  if (cate[i].taskname === title) {
	  	  return false;
	  }
	}
	
	return true;
}

/*
 * 点击事件
 */
(function () {  	
  //验证表单
  validate();	
 //点击分类
//不能为动态添加的元素绑定事件，但是可以通过绑定父元素来获取当前被点击的子元素
   $(".list_wrap").onclick = function(e) {	
   	
		var e1 = arguments[0] || window.event;
		var target = e.srcElement ? e.srcElement : e.target;
		var bigTaskId = target.getAttribute("bigid");
		var class_Name = target.className;
	
		if (localStorage.bigTaskId) {
			localStorage.removeItem("bigTaskId");
			return;
		}
		
		//选中了大分类，保存大分类id
		if (bigTaskId) {
			localStorage.setItem("bigTaskId",bigTaskId);
			changeDom(target);
			return;
		}
		
		if (class_Name !== "icon-cancel") {
			 changeDom(target);
		}  
	
		switch (class_Name) {	
			case "d_list" : //点击默认分类
			      makeTask("d_list","-1");
			      changeDom(target);
			      break;
			      
			case "all_list" : //选中了所有任务，显示所有任务
			     showAllTask();
			     break;
			   
			case "li_list" : //选中小分类的情况
			      makeTask(target.parentElement.className,target.id);
			      break;
			      
			case "icon-cancel" :
			      if(confirm("删除不可逆,确定要删除分类吗？")) {
			      	
			      var class_name = target.parentElement.parentElement.parentElement.className;
			        deleteDataById(target.id,class_name);
			      }
			      break;
			      
			default: break;
		}
		   
		return false;
   };
   
    
  //点击任务按钮
	$(".task_btn").onclick = function(e) {	
		
		var e1 = arguments[0] || window.event;
		var target = e.srcElement ? e.srcElement : e.target;
		
        changeDom(target);
        if(!localStorage.chooseId) {//未选中子分类的情况，显示所有的任务
        	getTaskList(task);
        } 
        else {//点击了子分类的情况
	     makeTask(target.parentElement.className,target.id);
	    }
		return false;
   };


  //点击任务标题
	$(".subtask_wrap").onclick = function(e) {
		
		var e1 = e || window.event;
		var target = e1.srcElement ? e1.srcElement : e1.target;
		//获取当前状态
		var type = localStorage.getItem("type");
	
		if ((target.className === "task_title")  
		   || (target.className === "finished_style task_title")) {
			
			changeDom(target);	
			if (type === "edit") {
			  makeDetailTask(target.id,"edit");
			} 
			else {
			  makeDetailTask(target.id,"show");
			}
			//保存当前选择的任务id
			localStorage.setItem("this_taskid",target.id);
		}	
		
		if (target.className === "icon-cancel") {
			if (confirm("删除不可逆,确定要删除分类吗？")) {	
			      var class_name = target.parentElement.parentElement.parentElement.className;
			      deleteDataById(target.id,class_name);
			}
		}
	};

 //点击编辑按钮
	$(".icon-edit").onclick = function() {
		
		$(".show").style.display = 'none';
		$(".edit").style.display = 'block';
		makeDetailTask(localStorage.this_taskid,"edit");
		validate();
		//保存当前的内容显示状态
		localStorage.setItem("type","edit");
	};
   
 //点击取消按钮 
   $(".cancel").onclick = function() {
   	
   	    $(".show").style.display = 'block';
		$(".edit").style.display = 'none';
		makeDetailTask(localStorage.this_taskid,"show");
		//保存当前的内容显示状态
		localStorage.setItem("type","show");
   };
   
 //点击改变任务状态按钮
   $(".icon-check-1").onclick = function() {
   	
   	  var chooseId = localStorage.chooseId;
   	  var id = parseInt(localStorage.this_taskid);
	  var taskobj = getObjBykey(task,"id",id);
	  var isfinished = taskobj.finish;
	  
	  if(!isfinished) {
	   	  if(confirm("确定要将此任务设置成已完成？")) {   	 
			  taskobj.finish = true;
	   	  }
   	 }
	  else {
	  	if (confirm("确定要将此任务设置成未完成？")) {   	 
			  taskobj.finish = false;
	   	  }
	  }
	   updateDataById(taskobj);
	   //刷新任务列表
	   refreshList(chooseId);
//	   makeTask("sub_type",localStorage.chooseId); 
   };
   
   //点击新增分类按钮
 $(".icon-plus").onclick = function() {
 
 	var bigTaskId = localStorage.bigTaskId;
   	var title = prompt("新增分类","请输入分类标题");
   	
   	if (title) {
   	 if (checkTitle(title)) {
   	 	
	   	var newCate = {};
	   	newCate.taskname = title;
	   	newCate.childId = [];
	   	
	   	if (bigTaskId) {  	
	   		addSubCate(newCate,bigTaskId);
	   	} 
	   	else {   	
	   		addCate(newCate);
	   	}  	
	   	makeType();	
     }
   	 else {
   	 	alert("分类已经存在！");
   	 }
   	}
   };
 
 //点击新增任务按钮
 $(".add_task").onclick = function() {	
 	
 	$(".show").style.display = 'none';
	$(".edit").style.display = 'block';
	if(localStorage.bigTaskId) {
		alert("只能为子分类创建任务，请重新选择~");
	}
	else {	
 	 makeDetailTask("0","add");	
 	}
 };
 
 //点击保存或添加按钮
   $(".btns").onclick = function(e) {
   	
   	  var e1 = e || window.event;
	  var target = e1.srcElement ? e1.srcElement : e1.target;
	  var class_name = target.className;
	  
	 if (check())  {    
	 if (class_name === "confirm") {//点击保存按钮
	  
	  	if (confirm("确定修改吗？")) {
	  		
	    var chooseId = localStorage.chooseId;
	    var id = parseInt(localStorage.this_taskid);
	    var taskobj = getObjBykey(task,"id",id);
	 
	    taskobj.title = $(".i_taskname").value;
	    taskobj.date = $(".i_tasktime").value;
	    //textarea 这里无法通过$(".t_taskcontent").innerHTML或innerText来取得内容
	     taskobj.content = $(".t_taskcontent").value;
	     updateDataById(taskobj);
	    //刷新任务列表
	     refreshList(chooseId);
	   }
	  
	 
	 } 
	 
	 else if (class_name === "add") {//点击添加按钮
	 	if (confirm("确定增加吗？")) {
	 		
 		var chooseId = localStorage.chooseId;
 		var taskObj = {};
 		
	    taskObj.title = $(".i_taskname").value;
	    taskObj.date = $(".i_tasktime").value;
	   //textarea 这里无法通过$(".t_taskcontent").innerHTML或innerText来取得内容
	    taskObj.content = $(".t_taskcontent").value;	
 		taskObj.finish = false;
 		taskObj.fatherId = parseInt(chooseId);
 		addTask(taskObj);
 		//刷新任务列表
 		refreshList(chooseId);
      }
	 }
	}
   };
   
})();


function validate() {
	//验证表单
   //验证标题字数
   $(".i_taskname").onkeyup = function(e) {
   	
   	var value = $(".i_taskname").value;
   	var tip = $(".tip_name");
   	
   	  if (value.length > 10) {
   	  	tip.innerHTML = "字数不能超过10个字符";
   	  } 
   	  else {
   	  	tip.innerHTML = '';
   	  }	  
   };
   
   //fixfox不支持onfocusout 
   $(".i_taskname").onblur = function() {
   	
   	  var value = $(".i_taskname").value;
   	  var tip = $(".tip_name");
   	  
   	  if (value === '' || value === undefined) {
   	  	tip.innerHTML = "必须填写标题";
   	  }
   };
   
   //验证日期
   $(".i_tasktime").onblur = function() {
   	
   	  var value = $(".i_tasktime").value;
   	  var tip = $(".tip_time");
   	  
   	  if (value === '' || value === undefined) {
   	  	tip.innerHTML = "必须填写日期"; 
   	  }
   	  else {
	   	  if (!isDate(value)) {
	   	  	tip.innerHTML = "输入日期格式不正确";
	   	  }
	   	  else {
	   	  	tip.innerHTML = "";
	   	  }
   	  }
   };
   
   $(".t_taskcontent").onblur = function() {
   	
   	   var value = $(".t_taskcontent").value;
   	   var tip = $(".tip_error");
   	   
   	   if (value === '' || value === undefined) {
   	  	tip.innerHTML = "必须输入任务";
   	   }
   	   else {
   	   	 if(value.length > 20) {
   	  	    tip.innerHTML = "字数不能超过20个字符";
   	      } 
   	     else {
   	  	  tip.innerHTML = '';
   	     }	  
   	   }
   };
}

//检查表单是否都输入正确
function check() {
	
	var title =  $(".i_taskname").value;
	var date = $(".i_tasktime").value;
	var content = $(".t_taskcontent").value;
	
   	var arr = [$(".tip_name"), $(".tip_time"), $(".tip_error")];
    var values = [title, date, content];
    
    for (var j=values.length-1; j>=0; j--) {
   	 	if (!values[j]) {
   	 		arr[j].innerHTML = "必须输入内容";
   	 	}
   	 }
    
   	 for (var i=arr.length-1; i>=0; i--) {
   	 	if (arr[i].innerHTML) {
   	 		//表单有错误设置按钮为禁用状态
   	 	    setDisBtnStyle();
   	 		return false;
   	 	}
   	 }
   	 	 
   	 //表单都输入无误 设置按钮为可点击状态
   	  removeDisBtnStyle();
   	  return true;
}

//设置编辑按钮的禁用样式
function setDisBtnStyle() {
	
	    if ($(".confirm")) {
   	 		$(".confirm").setAttribute("disabled",true);
   	 	   }
   	 	   else {
   	 	   	$(".add").setAttribute("disabled",true);
   	 	   }
}

//移除编辑按钮的禁用样式
function removeDisBtnStyle() {
	
	if ($(".confirm")) {
   	 if ($(".confirm").disabled) {
   	   $(".confirm").removeAttribute("disabled");
   	 }
   	}
   	else {
   		if($(".add").disabled) {
   	     $(".add").removeAttribute("disabled");
   	    }
   	}
}
/*
 * 显示删除按钮
 * 数据加载完再显示
 */
function showDeleteBtn(class_name) {
	
	var ul = $("."+class_name);
	var lis = ul.getElementsByTagName("li");
	
	each(lis, function(item) {
		item.onmouseover = function() {
			var div = item.getElementsByTagName("div")[0];	
			if(div) {
				div.style.display = 'block';
			}
//	      $(".icon-cancel").onclick = function() {
//			confirm("确定要删除该分类吗？");
//	      };
		};
		
		item.onmouseout = function() {
		var div = item.getElementsByTagName("div")[0];
		
		if (div) {
			div.style.display = 'none';
		}
	    };
	});
}

/*
 * 移除所有分类项的样式
 */
function removeAllCateStyle() {
	//取消所有任务的选中
    if ($(".all_list").className === "all_list on") {
	   $(".all_list").setAttribute("class","all_list");
    }   
}

/*
 * 移除子分类的选中样式
 */
function removeCateStyle(target) {
	
	var parentElement = target.parentElement;
    var li_lists;
    
    if (target.className === "all_list") {
      li_lists = parentElement.getElementsByTagName("li");
    }
    else {
      li_lists = parentElement.parentElement.getElementsByTagName("li");		
    }
    
    for (var i=li_lists.length-1; i>=0; i--) {
		if (li_lists[i].className === "li_list on") {
			 li_lists[i].className = "li_list";
	   }
    }
}

//默认分类项的样式单独处理
function removeDcateStyle() {	
	
	 if ($(".d_list").className === "d_list on") {
	  	   $(".d_list").setAttribute("class","d_list"); 
	 }
}

/*
 * 改变dom样式
 */
function changeDom(target) {
	
	   // 因为要改变当前元素的样式，所以这里不要将target.className，用另外的局部变量来代替
	   var class_Name = target.className;//不能这样替换   
	   console.log("className:"+class_Name);
	   
	  if (target.className === "all_list") {//所有分类选项
	  	  //$(".all_list").className === "all_list on";在firfox中失效
	  	  $(".all_list").setAttribute("class","all_list on");
	  	  //移除默认分类项的样式
	  	  removeDcateStyle();
	  	  removeCateStyle(target);
	  }
	  
	  if (target.className === "d_list") {//默认分类选项
	  	  //$(".all_list").className === "all_list on";在firfox中失效
	  	  $(".d_list").setAttribute("class","d_list on");  	
	  	  removeCateStyle(target);
	  }
	  
	  if (target.className === "li_list") { //分类选项   
	  	    removeAllCateStyle();
	  	    //移除默认分类项的样式
	  	    removeDcateStyle();
	  	    //移除分类被选中样式 并重新设置选中样式
			removeCateStyle(target);
			target.className = "li_list on";
	  }
	  
	  if ((target.className === "task_title")  
	     || (target.className === "finished_style task_title")
	    ) {//任务标题选项
	    	
	    var parentElement = target.parentElement;
	    var  li_lists = parentElement.parentElement.getElementsByTagName("li");		 
		
		    for (var i=li_lists.length-1; i>=0; i--) {
			 	if (li_lists[i].className === "task_title on") {
			 		li_lists[i].className = "task_title";
			 	}
			    if (li_lists[i].className === "finished_style task_title on") {
			 		li_lists[i].className = "finished_style task_title";
			 	}
			 }
			 
			 if (target.className === "task_title") {
			    target.className = "task_title on";
			} 
			 else if (target.className === "finished_style task_title"){
			 	target.className = "finished_style task_title on";
			 }
	  }
	  
	  if (target.parentElement.className === "task_btn") {//任务分类按钮
	  	
	  	   var parentElement = target.parentElement;
	       var li_lists = parentElement.getElementsByTagName("li");
	       
	        for (var i=li_lists.length-1; i>=0; i--) {
			 	if ((li_lists[i].className === "active")
			 	   || (li_lists[i].className === "all active")
			      ) {
			 		li_lists[i].className = " ";
			 	 }
			 }
	        
		target.className = "active"; 
	  }
	  
}

/*
 *保存数据
 */
function save() {
	
	localStorage.cate = JSON.stringify(cate);
	localStorage.cateSub = JSON.stringify(cateSub);
	localStorage.task = JSON.stringify(task);
}

/*
 * 初始化数据
 */
function init() {
	
//	localStorage.removeItem("cate");
//  localStorage.removeItem("cateSub");
//  localStorage.removeItem("task");
    localStorage.removeItem("childIds");
    localStorage.removeItem("chooseId");
    localStorage.removeItem("type");
    localStorage.removeItem("bigTaskId");
}

window.onload = function () {
	
	init();
	if (!localStorage.getItem("cate")) {
		localStorage.setItem("cate",cateText);
		localStorage.setItem("cateSub",cateSubText);
		localStorage.setItem("task",taskText);
	}
	
	cate = JSON.parse(localStorage.cate);
	cateSub = JSON.parse(localStorage.cateSub);
	task = JSON.parse(localStorage.task);
//  cate = eval(localStorage.cate);
//	cateSub = eval(localStorage.cateSub);
//	task = eval(localStorage.task);
	makeType();
	showAllTask();
};
