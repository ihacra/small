/****************************************************
 * AMC辅助工具
 * 
 * 包含功能：
 * 1、关闭加载界面后的密码修改弹窗
 * 2、关闭加载界面后的消息弹窗
 * 3、显示办理人并自动登录
 *
 * 包含函数：
 * 1、开启插件
 * 2、关闭密码弹窗
 * 3、关闭消息弹窗
 * 4、cookie管理
 * 5、初始化审批信息
 * 6、人员信息显示页面
 * 7、登录页面
 ****************************************************/

var AMC_PROC_ACCOUNT = null;		// 办理人账号
var AMC_PROC_FLAG = null;				// 运行标识

/****************************************************
 * 主方法
 ****************************************************/
$(document).ready(function() {
	initProcessData();
	startPlugin();
	logon();
})

/****************************************************
 * 1、开启插件
 ****************************************************/
function startPlugin() {
	$("#productName").click(function() {
		if (AMC_PROC_FLAG == "YES") {
			AMC_PROC_FLAG = "NO";
			cookieManage("MY_PROC_FLAG", "NO");
		}
		else {
			AMC_PROC_FLAG = "YES";
			cookieManage("MY_PROC_FLAG", "YES");
		}
		window.history.go(0);
	});
	$("[href='/a/logout']").click(function() {
		cookieManage("MY_USERNAME", "NO");
	});
}

/****************************************************
 * 2、关闭密码弹窗
 *
 * 关闭密码修改弹窗，先淡出弹窗再移除弹窗
 ****************************************************/
function closePasswordPopup() {
	$(".jbox-body").fadeOut(500, function() {
		$(this).remove();
	});
}

/****************************************************
 * 3、关闭消息弹窗
 *
 * 关闭消息提示弹窗，先淡出弹窗再移除弹窗
 ****************************************************/
function closeNewsPopup() {
	setTimeout(function() {
		$(".jbox-messager").fadeOut(500, function() {
			$(this).remove();
		});
		setTimeout(function() {
			$(".jbox-messager").fadeOut(500, function() {
				$(this).remove();
			});
		}, 300);
	}, 600);
}

/****************************************************
 * 4、cookie管理
 *
 * 依据参数信息进行保存或读取Cookie
 ****************************************************/
function cookieManage(name, value) {
	if (value != "") {  
    document.cookie = name + "=" + value + ";path=/";
	}
	else {
		var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		var arr = document.cookie.match(reg);
		if (arr) return unescape(arr[2]);
	}
	return "";
}

/****************************************************
 * 5、初始化审批信息
 ****************************************************/
function initProcessData() {
	AMC_PROC_ACCOUNT = [
		["Admin", 	"admin", 				""],
		["刘婷婷",	"liutingting0102",		"审咨1部"],
		["刘懿醇",	"liuyichun0225",		"审咨1部"],
		["邱倩慧",	"qiuqianhui0217",		"标准部"],
		["刘亚文",	"liuyawen",				"人资部"],
		["代美薇",	"daimeiwei",			"财务部"],
		["范向华",	"fanxianghua1101",		"综服部"],
		["郝明月",	"haomingyue",			"投合部"],
		["孙慧敏",	"sunhuimin",			"质量总监"],
		["张利真",	"zhanglizhen",			"执行总监"],
		["杨雅瑾",	"yangyajin",			"技术总监"],
		["王曼曼",	"wangmanman",			"副总经理"],
		["李旸",	"liyang01",				"平台部"],
		["杨洁",	"yangjie",				"高级总监"],
		["邱斌",	"lhgcqb",				"总经理"]
	];
	AMC_PROC_FLAG = cookieManage("MY_PROC_FLAG", "");
	AMC_PROC_FLAG = AMC_PROC_FLAG == "" ? "YES" : AMC_PROC_FLAG;
}

/****************************************************
 * 6、人员信息显示页面
 ****************************************************/
function addStatusView() {
	// 修改菜单栏背景颜色
	$("#header").children(":first").css("background-image", "linear-gradient(to bottom,#ac4545,#584dc0)");
	// 。
	var menu = $("#menu");
	var li = $("<li class='menu'></li>");
	li.css({"cursor":"pointer", "width":"5px", "height":"50px", "background-color":"#1684c2"});
	li.click(function() {
		$("#AMC_PROC_ACCOUNT").toggle();
		var nav = $("#header").children(":first");
		if (nav.css("background-image") === "none") nav.css("background-image", "linear-gradient(to bottom,#ac4545,#584dc0)");
		else nav.css("background-image", "none");
	})
	var li2 = $("<li class='menu'></li>");
	li2.css({"cursor":"pointer", "width":"5px", "height":"50px", "background-color":"#7bb33d"});
	li2.click(function() {
		$("#AMC_PROC_ACCOUNT").toggle();
	})
	menu.append(li).append(li2);
	// 人员信息显示页面
	var ul = $("<ul id='AMC_PROC_ACCOUNT'></ul>");
	for (var index in AMC_PROC_ACCOUNT) {
		var li = $("<li data-name='" + AMC_PROC_ACCOUNT[index][1] + "'>" + AMC_PROC_ACCOUNT[index][0] + "</li>");
		li.css("margin", "6px").css("cursor", "pointer").css("fontSize", "14px").css("color", "#7bb33d");
		li.attr("title", AMC_PROC_ACCOUNT[index][2]);
		li.hover(function() {
			$(this).css("color", "#2fa4e7");
		}, function() {
			$(this).css("color", "#7bb33d");
		});
		li.click(function() {
			cookieManage("MY_USERNAME", this.getAttribute("data-name"));
			window.location.href = "http://localhost:8080/a/logout";
		});
		ul.append(li);
	}
	ul.css("listStyle", "none").css("position", "absolute").css("right", "0");
	ul.css("marginRight", "40px").css("marginTop", "25px");
	$("#content").append(ul);
}

/****************************************************
 * 7、登录页面
 ****************************************************/
function logon() {
	if (AMC_PROC_FLAG == "YES") {
		var url = window.location.href;
		if (url == "http://localhost:8080/f") {
			window.location.href = "http://localhost:8080/a/login";
		}
		else if (url == "http://localhost:8080/a/login") {
			$("#loginForm").css("backgroundColor", "#555656");
			var username = cookieManage("MY_USERNAME", "");
			$("#password").val(username == "admin" ? "admin" : "123456").attr("type", "text");
			if (username != "" && username != "NO") {
				$("#username").val(username);
				$("#loginForm").submit();
			}
		}
		else if (url == "http://localhost:8080/a?login" || url == "http://localhost:8080/a") {
			closePasswordPopup();
			closeNewsPopup();
			addStatusView();
		}
	}
}