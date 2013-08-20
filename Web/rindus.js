function scrollListener(dat){
	var self = this;
	var scrollInterval = 50;
	this.scrollObj = $(dat.scrollObj);
	this.outterObj = $(dat.outterObj);
	this.loadingDOMCSS = dat.loadingCss;
	this.lastDOMCSS = dat.lastCss;
	this.loadingDOM = null;
	this.lastDOM = null;
	this.page = 1;
	this.loadJS = dat.loadJS;
	this.prepareLoad = dat.prepareLoad;
	this.historyReminder = null;
	this.isLoading = false;
	this.isLast = false;
	this.isInitalize = false;
	console.log(this.scrollObj);
	this.manualFinishLoad = function(isLast){
		
		self.isLast = isLast;
		$(self.loadingDOM).remove();
		self.isLoading = false;
		if(self.prepareLoad && !self.isInitialize){
			self.isInitialize = true;
		}
	}
	this.didScroll = function(evt){
		if(self.isInitialize){
			if(!self.isLoading){
				if(self.historyReminder == null){
					self.historyReminder = self.scrollObj.height() - $(window).height();
				}
				
				var scrollReminder = (self.scrollObj.height() - self.scrollObj.scrollTop()) - $(window).height();
				if(scrollReminder < scrollInterval){
					if(!self.isLast){
						page++;
						self.outterObj.append(self.loadingDOM);
						self.isLoading = true;
						console.log(self.loadJS);
						if(self.loadJS != null){
							self.loadJS.call();
						}
					}
				}
			}
		}
		//console.log(evt);
		//console.log(self.outterObj);
		//console.log(self.scrollObj.scrollTop() + ":" + self.scrollObj.height() + ":" + $(window).height() + ":" + ((self.scrollObj.height() - self.scrollObj.scrollTop()) - $(window).height()) );
	}
	function init(){                                    
		self.loadingDOM = document.createElement("li");
		self.loadingDOM.style.height = "30px"
		var subDom = document.createElement("div");
		if(self.loadingDOMCSS == ""){
			subDom.style.height = "30px";
			subDom.style.lineHeight = "30px";
			subDom.style.marginLeft = "10px";
		}else{
			subDom.className = self.loadingDOMCSS;
		}
		subDom.innerHTML = "로딩중입니다..";
		self.loadingDOM.appendChild(subDom);
		
		self.lastDOM = document.createElement("li");
		var subDoml = document.createElement("div");
		subDoml.className = self.lastDOMCSS;
		subDoml.innerHTML = "리스트의 마지막 입니다";
		self.lastDOM.appendChild(subDoml);
		
		if(self.prepareLoad){
			page = 1;
		}else{
			self.isInitalize = true;
		}
		self.scrollObj.bind("scroll", self.didScroll);
	}
	init();
	this.start = function(){
		if(self.prepareLoad && !self.isInitalize){
			self.loadJS.call();
		}else{
			
		}
	}
}

var scPager = null;


function loadScheduleList(){
	if(scPager == null){
		page = 0;
		scPager = new scrollListener( { scrollObj : document, outterObj : "ul#schedulelistUL", loadingCss:'', lastCss:'', loadJS:loadScheduleList, prepareLoad:true} );
		scPager.start();
		return;
	}
	$.mobile.showPageLoadingMsg();
		$.ajax({
			url: WEB_ROOT + "kubs/schedule/getList/",
			dataType : "json",
			type: "POST",
			data: ( {"srhval":scheduleSearchVal, "page":page, "count":10}),
			contentType : "application/x-www-form-urlencoded;charset=UTF-8",
			success:function(obj){
				$.mobile.hidePageLoadingMsg();
				var lastIdx = lastScheduleIdx;
				if(obj.result == 1){
					var objul = document.getElementById("schedulelistUL");
					objul.innerHTML = '';
					for(var i = 0; i < obj.items.length; i++){
						var item = obj.items[i];
						var scheduleItem = makeScheduleItem(item.id, item.title, item.userid, item.text, item.view_cnt, item.cdate);
						objul.appendChild(scheduleItem);
						lastIdx = item.id;
						pageCount = obj.pageCnt;
					}
					lastScheduleIdx = lastIdx;
					pageCount = obj.pageCnt;
					if(scPager != null){
						scPager.manualFinishLoad( page >= pageCount );
					}
					
				}
			},
			error: function(){
				$.mobile.hidePageLoadingMsg();
				scPager.manualFinishLoad( true );	
			}
		});

}