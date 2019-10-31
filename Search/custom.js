// 检查输入框是否为空
function check() {
	return !!document.getElementById("word").value.replace(/^\s*|\s*$/g,"");
}
// 改变搜索引擎
function changeType(id) {
	var searchForm = document.getElementById("searchForm");
	var word = document.getElementById("word");
	var submit = document.getElementById("submit");
	if (id == "s_baidu") {
		searchForm.action = "https://www.baidu.com/s";
		word.name = "wd";
		submit.value = "百度一下";
		submit.style.backgroundColor = "#3385ff";
	} else if (id == "s_sougou") {
		searchForm.action = "https://www.sogou.com/web";
		word.name = "query";
		submit.value = "搜狗搜索";
		submit.style.backgroundColor = "#fd6853";
	} else if (id == "s_360") {
		searchForm.action = "https://www.so.com/s";
		word.name = "q";
		submit.value = "360搜索";
		submit.style.backgroundColor = "#19b955";
	} else if (id == "s_biying") {
		searchForm.action = "https://cn.bing.com/search";
		word.name = "q";
		submit.value = "必应搜索";
		submit.style.backgroundColor = "#00809d";
	}
}
// 添加收藏链接
function addUrl() {
	var reg = /^\s*\{\{\s*([\w\W]+?)\s*\}\}\s*\{\{\s*([\w\W]+?)\s*\}\}\s*$/g;
	var input = document.getElementById("word");
	var result = reg.exec(input.value);
	if (result != null && result.length == 3) {
		var urls = changeStorage(result[1], result[2]);
		if (urls != null) changeList(urls);
	} else {
		input.value = "{{}}{{}}"
	}
}
// 删除收藏链接
function removeUrl() {
	var reg = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/g;
	var input = document.getElementById("word");
	var result = reg.exec(input.value);
	if (result != null && result.length == 2) {
		var urls = changeStorage(result[1]);
		if (urls != null) changeList(urls);
	} else {
		input.value = "{{}}"
	}
}
// 存储功能
function changeStorage(name, url) {
	if (typeof(Storage) == "undefined") {
		console.log("抱歉！您的浏览器不支持 Web Storage ...");
		return;
	}
	var urls = localStorage.getItem("urls");
	if (urls == null) urls = [];
	else urls = JSON.parse(urls);
	if (name != null && url != null) {
		var flag = false;
		for (i = 0; i < urls.length; i++) {
			if (urls[i].name == name) {
				urls[i].url = url;
				flag = true;
			}
		}
		if (!flag) {
			urls.push({"name":name, "url":url});
		}
		localStorage.setItem("urls", JSON.stringify(urls));
		return urls;
	} else if (name != null && url == null) {
		for (i = 0; i < urls.length; i++) {
			if (urls[i].name == name) {
				urls.splice(i, 1);
				localStorage.setItem("urls", JSON.stringify(urls));
				return urls;
			}
		}
	} else if (name == null && url == null) {
		return urls;
	}
	return null;
}
// 更新收藏列表
function changeList(urls) {
	var ul = document.getElementById("div_ul");
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.firstChild);
	}
	for (i = 0; i < urls.length; i++) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.innerText = urls[i].name;
		a.href = urls[i].url;
		li.appendChild(a);
		ul.appendChild(li);
	}
}