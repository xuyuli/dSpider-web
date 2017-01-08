/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

eval("/**\n * Created by du on 16/12/8.\n */\nvar ah = __webpack_require__(1)\nlog = console.log.bind(console);\n\nprefix=\"/api/\"\nroot=\"/\"\nif(location.hostname.indexOf(\"dspider.\")==-1){\n    prefix = \"/dSpider-web/api/\"\n    root=\"/dSpider-web/\"\n}\n\nah.hookAjax({\n    onload: function (xhr) {\n        try {\n            //console.log(\"onload called: %O\", xhr)\n            if (xhr.status == 200) {\n                var ret = JSON.parse(xhr.responseText);\n                if (ret.code == 0) {\n                    xhr.response = xhr.responseText = ret.data;\n                } else {\n                    if (ret.code == -10) {\n                        location = root+\"login\"\n                        return true\n                    }else if(ret.code==404||ret.code==403){\n                        location= root+ret.code;\n                    }\n                    else {\n                        xhr.status = 4832;\n                        xhr.statusText = xhr.responseText;\n                    }\n                }\n            }\n        } catch (e) {}\n    }\n})\n\nvar _ajax = $.ajax;\n$.ajax = function (_, __) {\n    var ob = _ajax(_, __);\n    var hasErrorHandler = false;\n    var fail = ob.fail;\n    var _fail = function (callback) {\n        return fail.call(ob, function (xhr) {\n            if (xhr.status == 4832) {\n                var ret = JSON.parse(xhr.statusText)\n                callback(ret.msg, ret.code)\n            } else {\n                callback(xhr.statusText, xhr.status)\n            }\n        })\n    }\n    _fail(function (msg, status) {\n        if (hasErrorHandler) return;\n        alert(msg + \"<div style='color:lightcoral;padding-top: 10px;'>error code: \" + status + \"</div>\", \"出错了\")\n    })\n\n    ob.fail = function (callback) {\n        hasErrorHandler = true;\n        return _fail(callback)\n    }\n\n    ob.error=_fail;\n\n\n    return ob;\n}\n//全局对话框\ndialog = function (msg, title) {\n    var onOk, onCancel, onClose;\n    var okBtn = \"确定\", cancelBtn = \"\";\n    var wrapper=function(callback){\n        return function (){\n            $(\"#dlg-close\").off(\"click\",onClose);\n            $(\"#dlg-ok\").off(\"click\",onOk);\n            $(\"#dlg-cancel\").off(\"click\",onCancel);\n            callback&&callback();\n        }\n    }\n    return {\n        setOk: function (s, c) {\n            okBtn = s || okBtn\n            onOk = wrapper(c);\n            return this;\n        },\n        setCancel: function (s, c) {\n            cancelBtn = s\n            onCancel = wrapper(c);\n            return this;\n        },\n        setClose: function (c) {\n            onClose = wrapper(c);\n            return this;\n        },\n        show:function(){\n            var cancel = $(\"#dlg-cancel\")\n            if (cancelBtn) {\n                cancel.text(cancelBtn).click(onCancel).show();\n            } else {\n                cancel.hide()\n            }\n            $(\"#dlg-close\").click(onClose);\n            $(\"#dlg-ok\").text(okBtn).click(onOk)\n            $(\"#dlg-title\").text(title || \"提示\");\n            $(\"#alert-text\").html(msg || \"Hi, I am beautiful alert.\")\n            $(\"#alert\").modal(\"show\");\n            return this\n        },\n        hide:function(){\n            $(\"#alert\").modal(\"hide\");\n        }\n    }\n}\n\nvar _alert = alert;\nalert = function (msg, title) {\n    if ($ && $(\"#alert-text\")[0]) {\n        dialog(msg, title).show()\n    } else {\n        _alert(msg)\n    }\n}\n\nisJson = function (s, tip) {\n    try {\n        s = JSON.parse(s)\n        var t = typeof s;\n        if (Array.isArray(s)) {\n            t = \"Array\"\n        } else if (t == \"object\") {\n            return true;\n        }\n        s = '错误的类型:' + t + ' , 必须是Object {}';\n\n    } catch (e) {\n        s = e.message\n    }\n    tip !== undefined && alert(tip + \"<br><br>\" + s);\n    return false;\n}\n//解析权限为数组\nparseAccess = function (v) {\n    if (!v) return [];\n    var i = 0;\n    return v.toString(2)\n        .split(\"\")\n        .reverse()\n        .map(function (v) {\n            return Math.pow(2, i++) * v;\n        })\n}\n//合并权限\ngetAccess = function (v) {\n    return v.reduce(function (p, n) {\n        return parseInt(p) + parseInt(n)\n    }, 0);\n}\n\n//导航激活\n$(\".nav a\").filter(function(){\n    var h=location.href\n    var r=$(this).attr(\"href\")\n    return !(h.indexOf(r) && h.indexOf(r + \"?\"));\n\n}).parent().addClass(\"active\")\n\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL3V0aWwuanM/YTg0MCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgZHUgb24gMTYvMTIvOC5cbiAqL1xudmFyIGFoID0gcmVxdWlyZShcImFqYXgtaG9va1wiKVxubG9nID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcblxucHJlZml4PVwiL2FwaS9cIlxucm9vdD1cIi9cIlxuaWYobG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZihcImRzcGlkZXIuXCIpPT0tMSl7XG4gICAgcHJlZml4ID0gXCIvZFNwaWRlci13ZWIvYXBpL1wiXG4gICAgcm9vdD1cIi9kU3BpZGVyLXdlYi9cIlxufVxuXG5haC5ob29rQWpheCh7XG4gICAgb25sb2FkOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwib25sb2FkIGNhbGxlZDogJU9cIiwgeGhyKVxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKHJldC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dCA9IHJldC5kYXRhO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXQuY29kZSA9PSAtMTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gcm9vdCtcImxvZ2luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJldC5jb2RlPT00MDR8fHJldC5jb2RlPT00MDMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb249IHJvb3QrcmV0LmNvZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc3RhdHVzID0gNDgzMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zdGF0dXNUZXh0ID0geGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG59KVxuXG52YXIgX2FqYXggPSAkLmFqYXg7XG4kLmFqYXggPSBmdW5jdGlvbiAoXywgX18pIHtcbiAgICB2YXIgb2IgPSBfYWpheChfLCBfXyk7XG4gICAgdmFyIGhhc0Vycm9ySGFuZGxlciA9IGZhbHNlO1xuICAgIHZhciBmYWlsID0gb2IuZmFpbDtcbiAgICB2YXIgX2ZhaWwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIGZhaWwuY2FsbChvYiwgZnVuY3Rpb24gKHhocikge1xuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gNDgzMikge1xuICAgICAgICAgICAgICAgIHZhciByZXQgPSBKU09OLnBhcnNlKHhoci5zdGF0dXNUZXh0KVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJldC5tc2csIHJldC5jb2RlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4aHIuc3RhdHVzVGV4dCwgeGhyLnN0YXR1cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgX2ZhaWwoZnVuY3Rpb24gKG1zZywgc3RhdHVzKSB7XG4gICAgICAgIGlmIChoYXNFcnJvckhhbmRsZXIpIHJldHVybjtcbiAgICAgICAgYWxlcnQobXNnICsgXCI8ZGl2IHN0eWxlPSdjb2xvcjpsaWdodGNvcmFsO3BhZGRpbmctdG9wOiAxMHB4Oyc+ZXJyb3IgY29kZTogXCIgKyBzdGF0dXMgKyBcIjwvZGl2PlwiLCBcIuWHuumUmeS6hlwiKVxuICAgIH0pXG5cbiAgICBvYi5mYWlsID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGhhc0Vycm9ySGFuZGxlciA9IHRydWU7XG4gICAgICAgIHJldHVybiBfZmFpbChjYWxsYmFjaylcbiAgICB9XG5cbiAgICBvYi5lcnJvcj1fZmFpbDtcblxuXG4gICAgcmV0dXJuIG9iO1xufVxuLy/lhajlsYDlr7nor53moYZcbmRpYWxvZyA9IGZ1bmN0aW9uIChtc2csIHRpdGxlKSB7XG4gICAgdmFyIG9uT2ssIG9uQ2FuY2VsLCBvbkNsb3NlO1xuICAgIHZhciBva0J0biA9IFwi56Gu5a6aXCIsIGNhbmNlbEJ0biA9IFwiXCI7XG4gICAgdmFyIHdyYXBwZXI9ZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAkKFwiI2RsZy1jbG9zZVwiKS5vZmYoXCJjbGlja1wiLG9uQ2xvc2UpO1xuICAgICAgICAgICAgJChcIiNkbGctb2tcIikub2ZmKFwiY2xpY2tcIixvbk9rKTtcbiAgICAgICAgICAgICQoXCIjZGxnLWNhbmNlbFwiKS5vZmYoXCJjbGlja1wiLG9uQ2FuY2VsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrJiZjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldE9rOiBmdW5jdGlvbiAocywgYykge1xuICAgICAgICAgICAgb2tCdG4gPSBzIHx8IG9rQnRuXG4gICAgICAgICAgICBvbk9rID0gd3JhcHBlcihjKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBzZXRDYW5jZWw6IGZ1bmN0aW9uIChzLCBjKSB7XG4gICAgICAgICAgICBjYW5jZWxCdG4gPSBzXG4gICAgICAgICAgICBvbkNhbmNlbCA9IHdyYXBwZXIoYyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Q2xvc2U6IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBvbkNsb3NlID0gd3JhcHBlcihjKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBzaG93OmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgY2FuY2VsID0gJChcIiNkbGctY2FuY2VsXCIpXG4gICAgICAgICAgICBpZiAoY2FuY2VsQnRuKSB7XG4gICAgICAgICAgICAgICAgY2FuY2VsLnRleHQoY2FuY2VsQnRuKS5jbGljayhvbkNhbmNlbCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYW5jZWwuaGlkZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiI2RsZy1jbG9zZVwiKS5jbGljayhvbkNsb3NlKTtcbiAgICAgICAgICAgICQoXCIjZGxnLW9rXCIpLnRleHQob2tCdG4pLmNsaWNrKG9uT2spXG4gICAgICAgICAgICAkKFwiI2RsZy10aXRsZVwiKS50ZXh0KHRpdGxlIHx8IFwi5o+Q56S6XCIpO1xuICAgICAgICAgICAgJChcIiNhbGVydC10ZXh0XCIpLmh0bWwobXNnIHx8IFwiSGksIEkgYW0gYmVhdXRpZnVsIGFsZXJ0LlwiKVxuICAgICAgICAgICAgJChcIiNhbGVydFwiKS5tb2RhbChcInNob3dcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9LFxuICAgICAgICBoaWRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKFwiI2FsZXJ0XCIpLm1vZGFsKFwiaGlkZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIF9hbGVydCA9IGFsZXJ0O1xuYWxlcnQgPSBmdW5jdGlvbiAobXNnLCB0aXRsZSkge1xuICAgIGlmICgkICYmICQoXCIjYWxlcnQtdGV4dFwiKVswXSkge1xuICAgICAgICBkaWFsb2cobXNnLCB0aXRsZSkuc2hvdygpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgX2FsZXJ0KG1zZylcbiAgICB9XG59XG5cbmlzSnNvbiA9IGZ1bmN0aW9uIChzLCB0aXApIHtcbiAgICB0cnkge1xuICAgICAgICBzID0gSlNPTi5wYXJzZShzKVxuICAgICAgICB2YXIgdCA9IHR5cGVvZiBzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzKSkge1xuICAgICAgICAgICAgdCA9IFwiQXJyYXlcIlxuICAgICAgICB9IGVsc2UgaWYgKHQgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcyA9ICfplJnor6/nmoTnsbvlnos6JyArIHQgKyAnICwg5b+F6aG75pivT2JqZWN0IHt9JztcblxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcyA9IGUubWVzc2FnZVxuICAgIH1cbiAgICB0aXAgIT09IHVuZGVmaW5lZCAmJiBhbGVydCh0aXAgKyBcIjxicj48YnI+XCIgKyBzKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG4vL+ino+aekOadg+mZkOS4uuaVsOe7hFxucGFyc2VBY2Nlc3MgPSBmdW5jdGlvbiAodikge1xuICAgIGlmICghdikgcmV0dXJuIFtdO1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gdi50b1N0cmluZygyKVxuICAgICAgICAuc3BsaXQoXCJcIilcbiAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgaSsrKSAqIHY7XG4gICAgICAgIH0pXG59XG4vL+WQiOW5tuadg+mZkFxuZ2V0QWNjZXNzID0gZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdi5yZWR1Y2UoZnVuY3Rpb24gKHAsIG4pIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHApICsgcGFyc2VJbnQobilcbiAgICB9LCAwKTtcbn1cblxuLy/lr7zoiKrmv4DmtLtcbiQoXCIubmF2IGFcIikuZmlsdGVyKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGg9bG9jYXRpb24uaHJlZlxuICAgIHZhciByPSQodGhpcykuYXR0cihcImhyZWZcIilcbiAgICByZXR1cm4gIShoLmluZGV4T2YocikgJiYgaC5pbmRleE9mKHIgKyBcIj9cIikpO1xuXG59KS5wYXJlbnQoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3V0aWwuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports) {

eval("/*\n * author: wendu\n * email: 824783146@qq.com\n * source code: https://github.com/wendux/Ajax-hook\n **/\n!function (ob) {\n    var realXMLHttpRequest;\n    ob.hookAjax = function (funs) {\n        realXMLHttpRequest = realXMLHttpRequest || XMLHttpRequest\n        XMLHttpRequest = function () {\n            var this$1 = this;\n\n            this.xhr = new realXMLHttpRequest;\n            for (var attr in this.xhr) {\n                var type = \"\";\n                try {\n                    type = typeof this$1.xhr[attr]\n                } catch (e) {}\n                if (type === \"function\") {\n                    this$1[attr] = hookfun(attr);\n                } else {\n                    Object.defineProperty(this$1, attr, {\n                        get: getFactory(attr),\n                        set: setFactory(attr)\n                    })\n                }\n            }\n        }\n\n        function getFactory(attr) {\n            return function () {\n                return this[attr + \"_\"] || this.xhr[attr]\n            }\n        }\n\n        function setFactory(attr) {\n            return function (f) {\n                var xhr = this.xhr;\n                var that = this;\n                if (attr.indexOf(\"on\") != 0) {\n                    this[attr + \"_\"] = f;\n                    return;\n                }\n                if (funs[attr]) {\n                    xhr[attr] = function () {\n                        funs[attr](that) || f.apply(xhr, arguments);\n                    }\n                } else {\n                    xhr[attr] = f;\n                }\n            }\n        }\n\n        function hookfun(fun) {\n            return function () {\n                var args = [].slice.call(arguments)\n                if (funs[fun] && funs[fun].call(this, args, this.xhr)) {\n                    return;\n                }\n                this.xhr[fun].apply(this.xhr, args);\n            }\n        }\n        return realXMLHttpRequest;\n    }\n    ob.unHookAjax = function () {\n        if (realXMLHttpRequest)  XMLHttpRequest = realXMLHttpRequest;\n        realXMLHttpRequest = undefined;\n    }\n}(module.exports)\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9ub2RlX21vZHVsZXMvYWpheC1ob29rL2FqYXhob29rLmpzP2Y3NGMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIGF1dGhvcjogd2VuZHVcbiAqIGVtYWlsOiA4MjQ3ODMxNDZAcXEuY29tXG4gKiBzb3VyY2UgY29kZTogaHR0cHM6Ly9naXRodWIuY29tL3dlbmR1eC9BamF4LWhvb2tcbiAqKi9cbiFmdW5jdGlvbiAob2IpIHtcbiAgICB2YXIgcmVhbFhNTEh0dHBSZXF1ZXN0O1xuICAgIG9iLmhvb2tBamF4ID0gZnVuY3Rpb24gKGZ1bnMpIHtcbiAgICAgICAgcmVhbFhNTEh0dHBSZXF1ZXN0ID0gcmVhbFhNTEh0dHBSZXF1ZXN0IHx8IFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgIFhNTEh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy54aHIgPSBuZXcgcmVhbFhNTEh0dHBSZXF1ZXN0O1xuICAgICAgICAgICAgZm9yICh2YXIgYXR0ciBpbiB0aGlzLnhocikge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gdHlwZW9mIHRoaXMueGhyW2F0dHJdXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbYXR0cl0gPSBob29rZnVuKGF0dHIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBhdHRyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGdldEZhY3RvcnkoYXR0ciksXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IHNldEZhY3RvcnkoYXR0cilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRGYWN0b3J5KGF0dHIpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbYXR0ciArIFwiX1wiXSB8fCB0aGlzLnhoclthdHRyXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0RmFjdG9yeShhdHRyKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgICAgICB2YXIgeGhyID0gdGhpcy54aHI7XG4gICAgICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLmluZGV4T2YoXCJvblwiKSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbYXR0ciArIFwiX1wiXSA9IGY7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZ1bnNbYXR0cl0pIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyW2F0dHJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnVuc1thdHRyXSh0aGF0KSB8fCBmLmFwcGx5KHhociwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHhoclthdHRyXSA9IGY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaG9va2Z1bihmdW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgICAgICAgICAgICBpZiAoZnVuc1tmdW5dICYmIGZ1bnNbZnVuXS5jYWxsKHRoaXMsIGFyZ3MsIHRoaXMueGhyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMueGhyW2Z1bl0uYXBwbHkodGhpcy54aHIsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFsWE1MSHR0cFJlcXVlc3Q7XG4gICAgfVxuICAgIG9iLnVuSG9va0FqYXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChyZWFsWE1MSHR0cFJlcXVlc3QpICBYTUxIdHRwUmVxdWVzdCA9IHJlYWxYTUxIdHRwUmVxdWVzdDtcbiAgICAgICAgcmVhbFhNTEh0dHBSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIH1cbn0obW9kdWxlLmV4cG9ydHMpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbm9kZV9tb2R1bGVzL2FqYXgtaG9vay9hamF4aG9vay5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

eval("/**\n * Created by du on 16/12/8.\n */\nvar util=__webpack_require__(0)\n//测试log\nutil.log(\"xx\")\nvar prefix=\"api/\"\nfunction addScript(){\n    $.post(prefix+\"profile/spider/save\",{\n        name:\"test\",\n        content:\"dSpider(\\\"test\\\", function(session,env,$) {\\r\\nlog(session)\\r\\n})\" ,\n        description:\"测试脚本\",\n        startUrl:\"https://www.baidu.com\"\n    }).done(util.handle())\n}\nfunction addAppKey(){\n    $.post(prefix+\"profile/appkey/save\",{\n        name:\"小赢卡带\"\n    }).done(util.handle())\n}\n\n\n$(\"#spiders\").click(function(){\n    $.post(prefix+\"spiders\")\n        .done(util.handle())\n})//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwaVRlc3QuanM/MWQ2YyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgZHUgb24gMTYvMTIvOC5cbiAqL1xudmFyIHV0aWw9cmVxdWlyZShcIi4vdXRpbC5qc1wiKVxuLy/mtYvor5Vsb2dcbnV0aWwubG9nKFwieHhcIilcbnZhciBwcmVmaXg9XCJhcGkvXCJcbmZ1bmN0aW9uIGFkZFNjcmlwdCgpe1xuICAgICQucG9zdChwcmVmaXgrXCJwcm9maWxlL3NwaWRlci9zYXZlXCIse1xuICAgICAgICBuYW1lOlwidGVzdFwiLFxuICAgICAgICBjb250ZW50OlwiZFNwaWRlcihcXFwidGVzdFxcXCIsIGZ1bmN0aW9uKHNlc3Npb24sZW52LCQpIHtcXHJcXG5sb2coc2Vzc2lvbilcXHJcXG59KVwiICxcbiAgICAgICAgZGVzY3JpcHRpb246XCLmtYvor5XohJrmnKxcIixcbiAgICAgICAgc3RhcnRVcmw6XCJodHRwczovL3d3dy5iYWlkdS5jb21cIlxuICAgIH0pLmRvbmUodXRpbC5oYW5kbGUoKSlcbn1cbmZ1bmN0aW9uIGFkZEFwcEtleSgpe1xuICAgICQucG9zdChwcmVmaXgrXCJwcm9maWxlL2FwcGtleS9zYXZlXCIse1xuICAgICAgICBuYW1lOlwi5bCP6LWi5Y2h5bimXCJcbiAgICB9KS5kb25lKHV0aWwuaGFuZGxlKCkpXG59XG5cblxuJChcIiNzcGlkZXJzXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgJC5wb3N0KHByZWZpeCtcInNwaWRlcnNcIilcbiAgICAgICAgLmRvbmUodXRpbC5oYW5kbGUoKSlcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvYXBpVGVzdC5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);