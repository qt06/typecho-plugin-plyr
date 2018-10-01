(function() {
	var jsloader = {};
	jsloader.loaded = []; // 已经加载的JS
	jsloader.load = function() {
		var args = null;
		if (typeof arguments[0] == 'object') {
			args = arguments[0];
			if (arguments[1]) args.push(arguments[1]);
		} else {
			args = arguments;
		}

		// 去除重复
		//args; // 参数列表
		this.load = function(args, i) {
			if (typeof args[i] == 'string') {
				var js = args[i];
				if (jsloader.loaded.indexOf && jsloader.loaded.indexOf(js) != -1) {
					if (i < args.length) {
						this.load(args, i + 1);
					}
					return;
				}
				jsloader.loaded.push(js);

				var script = document.createElement("script");
				script.src = js;
				// recall next
				if (i < args.length) {
					var _this = this;
					if (/msie/.test(window.navigator.userAgent.toLowerCase())) {
						script.onreadystatechange = function() {
							if (script.readyState == 'loaded' || script.readyState == 'complete') {
								_this.load(args, i + 1);
								script.onreadystatechange = null;
							}
						};
						script.onerror = function() {
							alert('script load error:' + js);
						}
					} else {
						script.onload = function() {
							_this.load(args, i + 1);
						};
						script.onerror = function() {
							alert('script load error:' + js);
						}
					}
				}
				document.getElementsByTagName('head')[0].appendChild(script);

			} else if (typeof args[i] == 'function') {
				var f = args[i];
				f();
				if (i < args.length) {
					this.load(args, i + 1);
				}
			} else {}
		};
		this.load(args, 0);
	}

	function loadCSS(filename) {
		// 判断重复加载
		var tags = document.getElementsByTagName('link');
		for(var i=0; i<tags.length; i++) {
			if(tags[i].href.indexOf(filename) != -1) {
				return false;
			}
		}
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = filename;
		document.getElementsByTagName('head')[0].appendChild(link);
	}

var eles = document.querySelectorAll("audio, video");
if(eles.length > 0) {
var su = document.querySelector('script[data-qt-plyr-url]');
var urlPre = su !== null ? su.getAttribute('data-qt-plyr-url') : '';
loadCSS(urlPre + 'plyr.css');
jsloader.load(urlPre + 'plyr.polyfilled.min.js', function() {
var eles = document.querySelectorAll("audio, video");
var players = [];
for(var i = 0, len = eles.length; i < len; i++) {
players.push(new Plyr(eles[i], {
  //autoplay: true,
i18n: {
    restart: "重新开始",
    rewind: "后退 {seektime} 秒",
    play: "播放",
    pause: "暂停",
    fastForward: "快进 {seektime} 秒",
    seek: "进度",
    played: "Played",
    buffered: "缓冲",
    currentTime: "当前时间",
    duration: "持续",
    volume: "音量",
    mute: "静音",
    unmute: "取消静音",
    enableCaptions: "启用字幕",
    disableCaptions: "禁用字幕",
    enterFullscreen: "进入全屏",
    exitFullscreen: "退出全屏",
    frameTitle: "Player for {title}",
    captions: "字幕",
    settings: "设置",
    speed: "速度",
    normal: "正常",
    quality: "品质",
    loop: "循环",
    start: "开始",
    end: "结束",
    all: "全部",
    reset: "重置",
    disabled: "Disabled",
    advertisement: "广告"
}
}));
}
});
}
	//end
})();