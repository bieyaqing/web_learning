/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);

// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.4
Copyright (c) 2011-2014 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(this,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;r=n.extend({},n.fn[g].defaults,r);if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;if(e==null){e={}}if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.load(function(){return n[m]("refresh")})})}).call(this);
/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function(e){"use strict";e.fn.counterUp=function(t){var n=e.extend({time:400,delay:10},t);return this.each(function(){var t=e(this),r=n,i=function(){var e=[],n=r.time/r.delay,i=t.text(),s=/[0-9]+,[0-9]+/.test(i);i=i.replace(/,/g,"");var o=/^[0-9]+$/.test(i),u=/^[0-9]+\.[0-9]+$/.test(i),a=u?(i.split(".")[1]||[]).length:0;for(var f=n;f>=1;f--){var l=parseInt(i/n*f);u&&(l=parseFloat(i/n*f).toFixed(a));if(s)while(/(\d+)(\d{3})/.test(l.toString()))l=l.toString().replace(/(\d+)(\d{3})/,"$1,$2");e.unshift(l)}t.data("counterup-nums",e);t.text("0");var c=function(){t.text(t.data("counterup-nums").shift());if(t.data("counterup-nums").length)setTimeout(t.data("counterup-func"),r.delay);else{delete t.data("counterup-nums");t.data("counterup-nums",null);t.data("counterup-func",null)}};t.data("counterup-func",c);setTimeout(t.data("counterup-func"),r.delay)};t.waypoint(i,{offset:"100%",triggerOnce:!0})})}})(jQuery);

/**
 * Author Christopher Blum
 * Based on the idea of Remy Sharp, http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 *
 * License: WTFPL
 */
(function(b){function t(){var e,a={height:k.innerHeight,width:k.innerWidth};a.height||!(e=l.compatMode)&&b.support.boxModel||(e="CSS1Compat"===e?f:l.body,a={height:e.clientHeight,width:e.clientWidth});return a}function u(){var e=b(),g,q=0;b.each(m,function(a,b){var c=b.data.selector,d=b.$element;e=e.add(c?d.find(c):d)});if(g=e.length)for(d=d||t(),a=a||{top:k.pageYOffset||f.scrollTop||l.body.scrollTop,left:k.pageXOffset||f.scrollLeft||l.body.scrollLeft};q<g;q++)if(b.contains(f,e[q])){var h=b(e[q]),n=h.height(),p=h.width(),c=h.offset(),r=h.data("inview");if(!a||!d)break;c.top+n>a.top&&c.top<a.top+d.height&&c.left+p>a.left&&c.left<a.left+d.width?(p=a.left>c.left?"right":a.left+d.width<c.left+p?"left":"both",n=a.top>c.top?"bottom":a.top+d.height<c.top+n?"top":"both",c=p+"-"+n,r&&r===c||h.data("inview",c).trigger("inview",[!0,p,n])):r&&h.data("inview",!1).trigger("inview",[!1])}}var m={},d,a,l=document,k=window,f=l.documentElement,s=b.expando,g;b.event.special.inview={add:function(a){m[a.guid+"-"+this[s]]={data:a,$element:b(this)};g||b.isEmptyObject(m)||(g=setInterval(u,250))},remove:function(a){try{delete m[a.guid+"-"+this[s]]}catch(d){}b.isEmptyObject(m)&&(clearInterval(g),g=null)}};b(k).bind("scroll resize",function(){d=a=null});!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){a=null})})(jQuery);

/* jquery.nicescroll 3.5.4 InuYaksa*2013 MIT http://areaaperta.com/nicescroll */
(function (e) {
    "function" === typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
})(function (e) {
    var y = !1,
        C = !1,
        J = 5E3,
        K = 2E3,
        x = 0,
        F = ["ms", "moz", "webkit", "o"],
        s = window.requestAnimationFrame || !1,
        v = window.cancelAnimationFrame || !1;
    if (!s)
        for (var L in F) {
            var D = F[L];
            s || (s = window[D + "RequestAnimationFrame"]);
            v || (v = window[D + "CancelAnimationFrame"] || window[D + "CancelRequestAnimationFrame"])
        }
    var z = window.MutationObserver || window.WebKitMutationObserver || !1,
        G = {
            zindex: "auto",
            cursoropacitymin: 0,
            cursoropacitymax: 1,
            cursorwidth: "5px",
            cursorborder: "1px solid #fff",
            cursorborderradius: "5px",
            scrollspeed: 60,
            mousescrollstep: 24,
            touchbehavior: !1,
            hwacceleration: !0,
            usetransition: !0,
            boxzoom: !1,
            dblclickzoom: !0,
            gesturezoom: !0,
            grabcursorenabled: !0,
            autohidemode: !0,
            background: "",
            iframeautoresize: !0,
            cursorminheight: 32,
            preservenativescrolling: !0,
            railoffset: !1,
            bouncescroll: !0,
            spacebarenabled: !0,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            disableoutline: !0,
            horizrailenabled: !0,
            railalign: "right",
            railvalign: "bottom",
            enabletranslate3d: !0,
            enablemousewheel: !0,
            enablekeyboard: !0,
            smoothscroll: !0,
            sensitiverail: !0,
            enablemouselockapi: !0,
            cursorfixedheight: !1,
            directionlockdeadzone: 6,
            hidecursordelay: 400,
            nativeparentscrolling: !0,
            enablescrollonselection: !0,
            overflowx: !0,
            overflowy: !0,
            cursordragspeed: 0.3,
            rtlmode: "auto",
            cursordragontouch: !1,
            oneaxismousemode: "auto",
            scriptpath: function () {
                var e = document.getElementsByTagName("script"),
                    e = e[e.length - 1].src.split("?")[0];
                return 0 < e.split("/").length ? e.split("/").slice(0, -1).join("/") + "/" : ""
            }()
        },
        E = !1,
        M = function () {
            if (E) return E;
            var e = document.createElement("DIV"),
                b = {
                    haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
                };
            b.isopera = "opera" in window;
            b.isopera12 = b.isopera && "getUserMedia" in navigator;
            b.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini);
            b.isie = "all" in document && "attachEvent" in e && !b.isopera;
            b.isieold = b.isie && !("msInterpolationMode" in e.style);
            b.isie7 = b.isie && !b.isieold && (!("documentMode" in document) || 7 == document.documentMode);
            b.isie8 = b.isie && "documentMode" in document && 8 == document.documentMode;
            b.isie9 = b.isie && "performance" in window && 9 <= document.documentMode;
            b.isie10 = b.isie && "performance" in window && 10 <= document.documentMode;
            b.isie9mobile = /iemobile.9/i.test(navigator.userAgent);
            b.isie9mobile && (b.isie9 = !1);
            b.isie7mobile = !b.isie9mobile && b.isie7 && /iemobile/i.test(navigator.userAgent);
            b.ismozilla = "MozAppearance" in e.style;
            b.iswebkit = "WebkitAppearance" in e.style;
            b.ischrome = "chrome" in window;
            b.ischrome22 = b.ischrome && b.haspointerlock;
            b.ischrome26 = b.ischrome && "transition" in e.style;
            b.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;
            b.hasmstouch = window.navigator.msPointerEnabled || !1;
            b.ismac = /^mac$/i.test(navigator.platform);
            b.isios = b.cantouch && /iphone|ipad|ipod/i.test(navigator.platform);
            b.isios4 = b.isios && !("seal" in Object);
            b.isandroid = /android/i.test(navigator.userAgent);
            b.trstyle = !1;
            b.hastransform = !1;
            b.hastranslate3d = !1;
            b.transitionstyle = !1;
            b.hastransition = !1;
            b.transitionend = !1;
            for (var h = ["transform",
                "msTransform", "webkitTransform", "MozTransform", "OTransform"
            ], k = 0; k < h.length; k++)
                if ("undefined" != typeof e.style[h[k]]) {
                    b.trstyle = h[k];
                    break
                }
            b.hastransform = !1 != b.trstyle;
            b.hastransform && (e.style[b.trstyle] = "translate3d(1px,2px,3px)", b.hastranslate3d = /translate3d/.test(e.style[b.trstyle]));
            b.transitionstyle = !1;
            b.prefixstyle = "";
            b.transitionend = !1;
            for (var h = "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "), l = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "),
                q = "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "), k = 0; k < h.length; k++)
                if (h[k] in e.style) {
                    b.transitionstyle = h[k];
                    b.prefixstyle = l[k];
                    b.transitionend = q[k];
                    break
                }
            b.ischrome26 && (b.prefixstyle = l[1]);
            b.hastransition = b.transitionstyle;
            a: {
                h = ["-moz-grab", "-webkit-grab", "grab"];
                if (b.ischrome && !b.ischrome22 || b.isie) h = [];
                for (k = 0; k < h.length; k++)
                    if (l = h[k], e.style.cursor = l, e.style.cursor == l) {
                        h = l;
                        break a
                    }
                h = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"
            }
            b.cursorgrabvalue =
                h;
            b.hasmousecapture = "setCapture" in e;
            b.hasMutationObserver = !1 !== z;
            return E = b
        },
        N = function (g, b) {
            function h() {
                var c = a.win;
                if ("zIndex" in c) return c.zIndex();
                for (; 0 < c.length && 9 != c[0].nodeType;) {
                    var b = c.css("zIndex");
                    if (!isNaN(b) && 0 != b) return parseInt(b);
                    c = c.parent()
                }
                return !1
            }

            function k(c, b, f) {
                b = c.css(b);
                c = parseFloat(b);
                return isNaN(c) ? (c = w[b] || 0, f = 3 == c ? f ? a.win.outerHeight() - a.win.innerHeight() : a.win.outerWidth() - a.win.innerWidth() : 1, a.isie8 && c && (c += 1), f ? c : 0) : c
            }

            function l(c, b, f, e) {
                a._bind(c, b, function (a) {
                    a =
                        a ? a : window.event;
                    var e = {
                        original: a,
                        target: a.target || a.srcElement,
                        type: "wheel",
                        deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
                        deltaX: 0,
                        deltaZ: 0,
                        preventDefault: function () {
                            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                            return !1
                        },
                        stopImmediatePropagation: function () {
                            a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.cancelBubble = !0
                        }
                    };
                    "mousewheel" == b ? (e.deltaY = -0.025 * a.wheelDelta, a.wheelDeltaX && (e.deltaX = -0.025 * a.wheelDeltaX)) : e.deltaY = a.detail;
                    return f.call(c, e)
                }, e)
            }

            function q(c, b, f) {
                var e, d;
                0 == c.deltaMode ? (e = -Math.floor(c.deltaX * (a.opt.mousescrollstep / 54)), d = -Math.floor(c.deltaY * (a.opt.mousescrollstep / 54))) : 1 == c.deltaMode && (e = -Math.floor(c.deltaX * a.opt.mousescrollstep), d = -Math.floor(c.deltaY * a.opt.mousescrollstep));
                b && (a.opt.oneaxismousemode && 0 == e && d) && (e = d, d = 0);
                e && (a.scrollmom && a.scrollmom.stop(), a.lastdeltax += e, a.debounced("mousewheelx", function () {
                    var c = a.lastdeltax;
                    a.lastdeltax = 0;
                    a.rail.drag || a.doScrollLeftBy(c)
                }, 15));
                if (d) {
                    if (a.opt.nativeparentscrolling && f && !a.ispage && !a.zoomactive)
                        if (0 >
                            d) {
                            if (a.getScrollTop() >= a.page.maxh) return !0
                        } else if (0 >= a.getScrollTop()) return !0;
                    a.scrollmom && a.scrollmom.stop();
                    a.lastdeltay += d;
                    a.debounced("mousewheely", function () {
                        var c = a.lastdeltay;
                        a.lastdeltay = 0;
                        a.rail.drag || a.doScrollBy(c)
                    }, 15)
                }
                c.stopImmediatePropagation();
                return c.preventDefault()
            }
            var a = this;
            this.version = "3.5.4";
            this.name = "nicescroll";
            this.me = b;
            this.opt = {
                doc: e("body"),
                win: !1
            };
            e.extend(this.opt, G);
            this.opt.snapbackspeed = 80;
            if (g)
                for (var p in a.opt) "undefined" != typeof g[p] && (a.opt[p] = g[p]);
            this.iddoc =
                (this.doc = a.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
            this.ispage = /^BODY|HTML/.test(a.opt.win ? a.opt.win[0].nodeName : this.doc[0].nodeName);
            this.haswrapper = !1 !== a.opt.win;
            this.win = a.opt.win || (this.ispage ? e(window) : this.doc);
            this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win;
            this.body = e("body");
            this.iframe = this.isfixed = this.viewport = !1;
            this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
            this.istextarea = "TEXTAREA" == this.win[0].nodeName;
            this.forcescreen = !1;
            this.canshowonmouseevent =
                "scroll" != a.opt.autohidemode;
            this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
            this.scroll = {
                x: 0,
                y: 0
            };
            this.scrollratio = {
                x: 0,
                y: 0
            };
            this.cursorheight = 20;
            this.scrollvaluemax = 0;
            this.observerremover = this.observer = this.scrollmom = this.scrollrunning = this.isrtlmode = !1;
            do this.id = "ascrail" + K++; while (document.getElementById(this.id));
            this.hasmousefocus =
                this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1;
            this.visibility = !0;
            this.hidden = this.locked = !1;
            this.cursoractive = !0;
            this.wheelprevented = !1;
            this.overflowx = a.opt.overflowx;
            this.overflowy = a.opt.overflowy;
            this.nativescrollingarea = !1;
            this.checkarea = 0;
            this.events = [];
            this.saved = {};
            this.delaylist = {};
            this.synclist = {};
            this.lastdeltay = this.lastdeltax = 0;
            this.detected = M();
            var d = e.extend({}, this.detected);
            this.ishwscroll = (this.canhwscroll = d.hastransform && a.opt.hwacceleration) &&
                a.haswrapper;
            this.istouchcapable = !1;
            d.cantouch && (d.ischrome && !d.isios && !d.isandroid) && (this.istouchcapable = !0, d.cantouch = !1);
            d.cantouch && (d.ismozilla && !d.isios && !d.isandroid) && (this.istouchcapable = !0, d.cantouch = !1);
            a.opt.enablemouselockapi || (d.hasmousecapture = !1, d.haspointerlock = !1);
            this.delayed = function (c, b, f, e) {
                var d = a.delaylist[c],
                    h = (new Date).getTime();
                if (!e && d && d.tt) return !1;
                d && d.tt && clearTimeout(d.tt);
                if (d && d.last + f > h && !d.tt) a.delaylist[c] = {
                    last: h + f,
                    tt: setTimeout(function () {
                        a && (a.delaylist[c].tt =
                            0, b.call())
                    }, f)
                };
                else if (!d || !d.tt) a.delaylist[c] = {
                    last: h,
                    tt: 0
                }, setTimeout(function () {
                    b.call()
                }, 0)
            };
            this.debounced = function (c, b, f) {
                var d = a.delaylist[c];
                (new Date).getTime();
                a.delaylist[c] = b;
                d || setTimeout(function () {
                    var b = a.delaylist[c];
                    a.delaylist[c] = !1;
                    b.call()
                }, f)
            };
            var r = !1;
            this.synched = function (c, b) {
                a.synclist[c] = b;
                (function () {
                    r || (s(function () {
                        r = !1;
                        for (c in a.synclist) {
                            var b = a.synclist[c];
                            b && b.call(a);
                            a.synclist[c] = !1
                        }
                    }), r = !0)
                })();
                return c
            };
            this.unsynched = function (c) {
                a.synclist[c] && (a.synclist[c] = !1)
            };
            this.css = function (c, b) {
                for (var f in b) a.saved.css.push([c, f, c.css(f)]), c.css(f, b[f])
            };
            this.scrollTop = function (c) {
                return "undefined" == typeof c ? a.getScrollTop() : a.setScrollTop(c)
            };
            this.scrollLeft = function (c) {
                return "undefined" == typeof c ? a.getScrollLeft() : a.setScrollLeft(c)
            };
            BezierClass = function (a, b, f, d, e, h, k) {
                this.st = a;
                this.ed = b;
                this.spd = f;
                this.p1 = d || 0;
                this.p2 = e || 1;
                this.p3 = h || 0;
                this.p4 = k || 1;
                this.ts = (new Date).getTime();
                this.df = this.ed - this.st
            };
            BezierClass.prototype = {
                B2: function (a) {
                    return 3 * a * a * (1 -
                        a)
                },
                B3: function (a) {
                    return 3 * a * (1 - a) * (1 - a)
                },
                B4: function (a) {
                    return (1 - a) * (1 - a) * (1 - a)
                },
                getNow: function () {
                    var a = 1 - ((new Date).getTime() - this.ts) / this.spd,
                        b = this.B2(a) + this.B3(a) + this.B4(a);
                    return 0 > a ? this.ed : this.st + Math.round(this.df * b)
                },
                update: function (a, b) {
                    this.st = this.getNow();
                    this.ed = a;
                    this.spd = b;
                    this.ts = (new Date).getTime();
                    this.df = this.ed - this.st;
                    return this
                }
            };
            if (this.ishwscroll) {
                this.doc.translate = {
                    x: 0,
                    y: 0,
                    tx: "0px",
                    ty: "0px"
                };
                d.hastranslate3d && d.isios && this.doc.css("-webkit-backface-visibility",
                    "hidden");
                var t = function () {
                    var c = a.doc.css(d.trstyle);
                    return c && "matrix" == c.substr(0, 6) ? c.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
                };
                this.getScrollTop = function (c) {
                    if (!c) {
                        if (c = t()) return 16 == c.length ? -c[13] : -c[5];
                        if (a.timerscroll && a.timerscroll.bz) return a.timerscroll.bz.getNow()
                    }
                    return a.doc.translate.y
                };
                this.getScrollLeft = function (c) {
                    if (!c) {
                        if (c = t()) return 16 == c.length ? -c[12] : -c[4];
                        if (a.timerscroll && a.timerscroll.bh) return a.timerscroll.bh.getNow()
                    }
                    return a.doc.translate.x
                };
                this.notifyScrollEvent = document.createEvent ? function (a) {
                    var b = document.createEvent("UIEvents");
                    b.initUIEvent("scroll", !1, !0, window, 1);
                    a.dispatchEvent(b)
                } : document.fireEvent ? function (a) {
                    var b = document.createEventObject();
                    a.fireEvent("onscroll");
                    b.cancelBubble = !0
                } : function (a, b) {};
                d.hastranslate3d && a.opt.enabletranslate3d ? (this.setScrollTop = function (c, b) {
                        a.doc.translate.y = c;
                        a.doc.translate.ty = -1 * c + "px";
                        a.doc.css(d.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                        b || a.notifyScrollEvent(a.win[0])
                    },
                    this.setScrollLeft = function (c, b) {
                        a.doc.translate.x = c;
                        a.doc.translate.tx = -1 * c + "px";
                        a.doc.css(d.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
                        b || a.notifyScrollEvent(a.win[0])
                    }) : (this.setScrollTop = function (c, b) {
                    a.doc.translate.y = c;
                    a.doc.translate.ty = -1 * c + "px";
                    a.doc.css(d.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                    b || a.notifyScrollEvent(a.win[0])
                }, this.setScrollLeft = function (c, b) {
                    a.doc.translate.x = c;
                    a.doc.translate.tx = -1 * c + "px";
                    a.doc.css(d.trstyle,
                        "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
                    b || a.notifyScrollEvent(a.win[0])
                })
            } else this.getScrollTop = function () {
                return a.docscroll.scrollTop()
            }, this.setScrollTop = function (c) {
                return a.docscroll.scrollTop(c)
            }, this.getScrollLeft = function () {
                return a.docscroll.scrollLeft()
            }, this.setScrollLeft = function (c) {
                return a.docscroll.scrollLeft(c)
            };
            this.getTarget = function (a) {
                return !a ? !1 : a.target ? a.target : a.srcElement ? a.srcElement : !1
            };
            this.hasParent = function (a, b) {
                if (!a) return !1;
                for (var f = a.target ||
                    a.srcElement || a || !1; f && f.id != b;) f = f.parentNode || !1;
                return !1 !== f
            };
            var w = {
                thin: 1,
                medium: 3,
                thick: 5
            };
            this.getOffset = function () {
                if (a.isfixed) return {
                    top: parseFloat(a.win.css("top")),
                    left: parseFloat(a.win.css("left"))
                };
                if (!a.viewport) return a.win.offset();
                var c = a.win.offset(),
                    b = a.viewport.offset();
                return {
                    top: c.top - b.top + a.viewport.scrollTop(),
                    left: c.left - b.left + a.viewport.scrollLeft()
                }
            };
            this.updateScrollBar = function (c) {
                if (a.ishwscroll) a.rail.css({
                    height: a.win.innerHeight()
                }), a.railh && a.railh.css({
                    width: a.win.innerWidth()
                });
                else {
                    var b = a.getOffset(),
                        f = b.top,
                        d = b.left,
                        f = f + k(a.win, "border-top-width", !0);
                    a.win.outerWidth();
                    a.win.innerWidth();
                    var d = d + (a.rail.align ? a.win.outerWidth() - k(a.win, "border-right-width") - a.rail.width : k(a.win, "border-left-width")),
                        e = a.opt.railoffset;
                    e && (e.top && (f += e.top), a.rail.align && e.left && (d += e.left));
                    a.locked || a.rail.css({
                        top: f,
                        left: d,
                        height: c ? c.h : a.win.innerHeight()
                    });
                    a.zoom && a.zoom.css({
                        top: f + 1,
                        left: 1 == a.rail.align ? d - 20 : d + a.rail.width + 4
                    });
                    a.railh && !a.locked && (f = b.top, d = b.left, c = a.railh.align ?
                        f + k(a.win, "border-top-width", !0) + a.win.innerHeight() - a.railh.height : f + k(a.win, "border-top-width", !0), d += k(a.win, "border-left-width"), a.railh.css({
                            top: c,
                            left: d,
                            width: a.railh.width
                        }))
                }
            };
            this.doRailClick = function (c, b, f) {
                var d;
                a.locked || (a.cancelEvent(c), b ? (b = f ? a.doScrollLeft : a.doScrollTop, d = f ? (c.pageX - a.railh.offset().left - a.cursorwidth / 2) * a.scrollratio.x : (c.pageY - a.rail.offset().top - a.cursorheight / 2) * a.scrollratio.y, b(d)) : (b = f ? a.doScrollLeftBy : a.doScrollBy, d = f ? a.scroll.x : a.scroll.y, c = f ? c.pageX - a.railh.offset().left :
                    c.pageY - a.rail.offset().top, f = f ? a.view.w : a.view.h, d >= c ? b(f) : b(-f)))
            };
            a.hasanimationframe = s;
            a.hascancelanimationframe = v;
            a.hasanimationframe ? a.hascancelanimationframe || (v = function () {
                a.cancelAnimationFrame = !0
            }) : (s = function (a) {
                return setTimeout(a, 15 - Math.floor(+new Date / 1E3) % 16)
            }, v = clearInterval);
            this.init = function () {
                a.saved.css = [];
                if (d.isie7mobile || d.isoperamini) return !0;
                d.hasmstouch && a.css(a.ispage ? e("html") : a.win, {
                    "-ms-touch-action": "none"
                });
                a.zindex = "auto";
                a.zindex = !a.ispage && "auto" == a.opt.zindex ?
                    h() || "auto" : a.opt.zindex;
                !a.ispage && "auto" != a.zindex && a.zindex > x && (x = a.zindex);
                a.isie && (0 == a.zindex && "auto" == a.opt.zindex) && (a.zindex = "auto");
                if (!a.ispage || !d.cantouch && !d.isieold && !d.isie9mobile) {
                    var c = a.docscroll;
                    a.ispage && (c = a.haswrapper ? a.win : a.doc);
                    d.isie9mobile || a.css(c, {
                        "overflow-y": "hidden"
                    });
                    a.ispage && d.isie7 && ("BODY" == a.doc[0].nodeName ? a.css(e("html"), {
                        "overflow-y": "hidden"
                    }) : "HTML" == a.doc[0].nodeName && a.css(e("body"), {
                        "overflow-y": "hidden"
                    }));
                    d.isios && (!a.ispage && !a.haswrapper) && a.css(e("body"), {
                        "-webkit-overflow-scrolling": "touch"
                    });
                    var b = e(document.createElement("div"));
                    b.css({
                        position: "relative",
                        top: 0,
                        "float": "right",
                        width: a.opt.cursorwidth,
                        height: "0px",
                        "background-color": a.opt.cursorcolor,
                        border: a.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": a.opt.cursorborderradius,
                        "-moz-border-radius": a.opt.cursorborderradius,
                        "border-radius": a.opt.cursorborderradius
                    });
                    b.hborder = parseFloat(b.outerHeight() - b.innerHeight());
                    a.cursor = b;
                    var f = e(document.createElement("div"));
                    f.attr("id", a.id);
                    f.addClass("nicescroll-rails");
                    var u, k, g = ["left", "right"],
                        l;
                    for (l in g) k = g[l], (u = a.opt.railpadding[k]) ? f.css("padding-" + k, u + "px") : a.opt.railpadding[k] = 0;
                    f.append(b);
                    f.width = Math.max(parseFloat(a.opt.cursorwidth), b.outerWidth()) + a.opt.railpadding.left + a.opt.railpadding.right;
                    f.css({
                        width: f.width + "px",
                        zIndex: a.zindex,
                        background: a.opt.background,
                        cursor: "default"
                    });
                    f.visibility = !0;
                    f.scrollable = !0;
                    f.align = "left" == a.opt.railalign ? 0 : 1;
                    a.rail = f;
                    b = a.rail.drag = !1;
                    a.opt.boxzoom && (!a.ispage &&
                        !d.isieold) && (b = document.createElement("div"), a.bind(b, "click", a.doZoom), a.zoom = e(b), a.zoom.css({
                        cursor: "pointer",
                        "z-index": a.zindex,
                        backgroundImage: "url(" + a.opt.scriptpath + "zoomico.png)",
                        height: 18,
                        width: 18,
                        backgroundPosition: "0px 0px"
                    }), a.opt.dblclickzoom && a.bind(a.win, "dblclick", a.doZoom), d.cantouch && a.opt.gesturezoom && (a.ongesturezoom = function (c) {
                        1.5 < c.scale && a.doZoomIn(c);
                        0.8 > c.scale && a.doZoomOut(c);
                        return a.cancelEvent(c)
                    }, a.bind(a.win, "gestureend", a.ongesturezoom)));
                    a.railh = !1;
                    if (a.opt.horizrailenabled) {
                        a.css(c, {
                            "overflow-x": "hidden"
                        });
                        b = e(document.createElement("div"));
                        b.css({
                            position: "relative",
                            top: 0,
                            height: a.opt.cursorwidth,
                            width: "0px",
                            "background-color": a.opt.cursorcolor,
                            border: a.opt.cursorborder,
                            "background-clip": "padding-box",
                            "-webkit-border-radius": a.opt.cursorborderradius,
                            "-moz-border-radius": a.opt.cursorborderradius,
                            "border-radius": a.opt.cursorborderradius
                        });
                        b.wborder = parseFloat(b.outerWidth() - b.innerWidth());
                        a.cursorh = b;
                        var m = e(document.createElement("div"));
                        m.attr("id", a.id + "-hr");
                        m.addClass("nicescroll-rails");
                        m.height = Math.max(parseFloat(a.opt.cursorwidth), b.outerHeight());
                        m.css({
                            height: m.height + "px",
                            zIndex: a.zindex,
                            background: a.opt.background
                        });
                        m.append(b);
                        m.visibility = !0;
                        m.scrollable = !0;
                        m.align = "top" == a.opt.railvalign ? 0 : 1;
                        a.railh = m;
                        a.railh.drag = !1
                    }
                    a.ispage ? (f.css({
                        position: "fixed",
                        top: "0px",
                        height: "100%"
                    }), f.align ? f.css({
                        right: "0px"
                    }) : f.css({
                        left: "0px"
                    }), a.body.append(f), a.railh && (m.css({
                        position: "fixed",
                        left: "0px",
                        width: "100%"
                    }), m.align ? m.css({
                        bottom: "0px"
                    }) : m.css({
                        top: "0px"
                    }), a.body.append(m))) : (a.ishwscroll ?
                        ("static" == a.win.css("position") && a.css(a.win, {
                            position: "relative"
                        }), c = "HTML" == a.win[0].nodeName ? a.body : a.win, a.zoom && (a.zoom.css({
                            position: "absolute",
                            top: 1,
                            right: 0,
                            "margin-right": f.width + 4
                        }), c.append(a.zoom)), f.css({
                            position: "absolute",
                            top: 0
                        }), f.align ? f.css({
                            right: 0
                        }) : f.css({
                            left: 0
                        }), c.append(f), m && (m.css({
                            position: "absolute",
                            left: 0,
                            bottom: 0
                        }), m.align ? m.css({
                            bottom: 0
                        }) : m.css({
                            top: 0
                        }), c.append(m))) : (a.isfixed = "fixed" == a.win.css("position"), c = a.isfixed ? "fixed" : "absolute", a.isfixed || (a.viewport = a.getViewport(a.win[0])),
                            a.viewport && (a.body = a.viewport, !1 == /fixed|relative|absolute/.test(a.viewport.css("position")) && a.css(a.viewport, {
                                position: "relative"
                            })), f.css({
                                position: c
                            }), a.zoom && a.zoom.css({
                                position: c
                            }), a.updateScrollBar(), a.body.append(f), a.zoom && a.body.append(a.zoom), a.railh && (m.css({
                                position: c
                            }), a.body.append(m))), d.isios && a.css(a.win, {
                            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                            "-webkit-touch-callout": "none"
                        }), d.isie && a.opt.disableoutline && a.win.attr("hideFocus", "true"), d.iswebkit && a.opt.disableoutline &&
                        a.win.css({
                            outline: "none"
                        }));
                    !1 === a.opt.autohidemode ? (a.autohidedom = !1, a.rail.css({
                        opacity: a.opt.cursoropacitymax
                    }), a.railh && a.railh.css({
                        opacity: a.opt.cursoropacitymax
                    })) : !0 === a.opt.autohidemode || "leave" === a.opt.autohidemode ? (a.autohidedom = e().add(a.rail), d.isie8 && (a.autohidedom = a.autohidedom.add(a.cursor)), a.railh && (a.autohidedom = a.autohidedom.add(a.railh)), a.railh && d.isie8 && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "scroll" == a.opt.autohidemode ? (a.autohidedom = e().add(a.rail), a.railh && (a.autohidedom =
                        a.autohidedom.add(a.railh))) : "cursor" == a.opt.autohidemode ? (a.autohidedom = e().add(a.cursor), a.railh && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "hidden" == a.opt.autohidemode && (a.autohidedom = !1, a.hide(), a.locked = !1);
                    if (d.isie9mobile) a.scrollmom = new H(a), a.onmangotouch = function (c) {
                        c = a.getScrollTop();
                        var b = a.getScrollLeft();
                        if (c == a.scrollmom.lastscrolly && b == a.scrollmom.lastscrollx) return !0;
                        var f = c - a.mangotouch.sy,
                            d = b - a.mangotouch.sx;
                        if (0 != Math.round(Math.sqrt(Math.pow(d, 2) + Math.pow(f, 2)))) {
                            var n = 0 >
                                f ? -1 : 1,
                                e = 0 > d ? -1 : 1,
                                h = +new Date;
                            a.mangotouch.lazy && clearTimeout(a.mangotouch.lazy);
                            80 < h - a.mangotouch.tm || a.mangotouch.dry != n || a.mangotouch.drx != e ? (a.scrollmom.stop(), a.scrollmom.reset(b, c), a.mangotouch.sy = c, a.mangotouch.ly = c, a.mangotouch.sx = b, a.mangotouch.lx = b, a.mangotouch.dry = n, a.mangotouch.drx = e, a.mangotouch.tm = h) : (a.scrollmom.stop(), a.scrollmom.update(a.mangotouch.sx - d, a.mangotouch.sy - f), a.mangotouch.tm = h, f = Math.max(Math.abs(a.mangotouch.ly - c), Math.abs(a.mangotouch.lx - b)), a.mangotouch.ly = c, a.mangotouch.lx =
                                b, 2 < f && (a.mangotouch.lazy = setTimeout(function () {
                                    a.mangotouch.lazy = !1;
                                    a.mangotouch.dry = 0;
                                    a.mangotouch.drx = 0;
                                    a.mangotouch.tm = 0;
                                    a.scrollmom.doMomentum(30)
                                }, 100)))
                        }
                    }, f = a.getScrollTop(), m = a.getScrollLeft(), a.mangotouch = {
                        sy: f,
                        ly: f,
                        dry: 0,
                        sx: m,
                        lx: m,
                        drx: 0,
                        lazy: !1,
                        tm: 0
                    }, a.bind(a.docscroll, "scroll", a.onmangotouch);
                    else {
                        if (d.cantouch || a.istouchcapable || a.opt.touchbehavior || d.hasmstouch) {
                            a.scrollmom = new H(a);
                            a.ontouchstart = function (c) {
                                if (c.pointerType && 2 != c.pointerType) return !1;
                                a.hasmoving = !1;
                                if (!a.locked) {
                                    if (d.hasmstouch)
                                        for (var b =
                                            c.target ? c.target : !1; b;) {
                                            var f = e(b).getNiceScroll();
                                            if (0 < f.length && f[0].me == a.me) break;
                                            if (0 < f.length) return !1;
                                            if ("DIV" == b.nodeName && b.id == a.id) break;
                                            b = b.parentNode ? b.parentNode : !1
                                        }
                                    a.cancelScroll();
                                    if ((b = a.getTarget(c)) && /INPUT/i.test(b.nodeName) && /range/i.test(b.type)) return a.stopPropagation(c);
                                    !("clientX" in c) && "changedTouches" in c && (c.clientX = c.changedTouches[0].clientX, c.clientY = c.changedTouches[0].clientY);
                                    a.forcescreen && (f = c, c = {
                                            original: c.original ? c.original : c
                                        }, c.clientX = f.screenX, c.clientY =
                                        f.screenY);
                                    a.rail.drag = {
                                        x: c.clientX,
                                        y: c.clientY,
                                        sx: a.scroll.x,
                                        sy: a.scroll.y,
                                        st: a.getScrollTop(),
                                        sl: a.getScrollLeft(),
                                        pt: 2,
                                        dl: !1
                                    };
                                    if (a.ispage || !a.opt.directionlockdeadzone) a.rail.drag.dl = "f";
                                    else {
                                        var f = e(window).width(),
                                            n = e(window).height(),
                                            h = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                                            k = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                                            n = Math.max(0, k - n),
                                            f = Math.max(0, h - f);
                                        a.rail.drag.ck = !a.rail.scrollable && a.railh.scrollable ? 0 < n ? "v" : !1 : a.rail.scrollable &&
                                            !a.railh.scrollable ? 0 < f ? "h" : !1 : !1;
                                        a.rail.drag.ck || (a.rail.drag.dl = "f")
                                    }
                                    a.opt.touchbehavior && (a.isiframe && d.isie) && (f = a.win.position(), a.rail.drag.x += f.left, a.rail.drag.y += f.top);
                                    a.hasmoving = !1;
                                    a.lastmouseup = !1;
                                    a.scrollmom.reset(c.clientX, c.clientY);
                                    if (!d.cantouch && !this.istouchcapable && !d.hasmstouch) {
                                        if (!b || !/INPUT|SELECT|TEXTAREA/i.test(b.nodeName)) return !a.ispage && d.hasmousecapture && b.setCapture(), a.opt.touchbehavior ? (b.onclick && !b._onclick && (b._onclick = b.onclick, b.onclick = function (c) {
                                            if (a.hasmoving) return !1;
                                            b._onclick.call(this, c)
                                        }), a.cancelEvent(c)) : a.stopPropagation(c);
                                        /SUBMIT|CANCEL|BUTTON/i.test(e(b).attr("type")) && (pc = {
                                            tg: b,
                                            click: !1
                                        }, a.preventclick = pc)
                                    }
                                }
                            };
                            a.ontouchend = function (c) {
                                if (c.pointerType && 2 != c.pointerType) return !1;
                                if (a.rail.drag && 2 == a.rail.drag.pt && (a.scrollmom.doMomentum(), a.rail.drag = !1, a.hasmoving && (a.lastmouseup = !0, a.hideCursor(), d.hasmousecapture && document.releaseCapture(), !d.cantouch))) return a.cancelEvent(c)
                            };
                            var q = a.opt.touchbehavior && a.isiframe && !d.hasmousecapture;
                            a.ontouchmove =
                                function (c, b) {
                                    if (c.pointerType && 2 != c.pointerType) return !1;
                                    if (a.rail.drag && 2 == a.rail.drag.pt) {
                                        if (d.cantouch && "undefined" == typeof c.original) return !0;
                                        a.hasmoving = !0;
                                        a.preventclick && !a.preventclick.click && (a.preventclick.click = a.preventclick.tg.onclick || !1, a.preventclick.tg.onclick = a.onpreventclick);
                                        c = e.extend({
                                            original: c
                                        }, c);
                                        "changedTouches" in c && (c.clientX = c.changedTouches[0].clientX, c.clientY = c.changedTouches[0].clientY);
                                        if (a.forcescreen) {
                                            var f = c;
                                            c = {
                                                original: c.original ? c.original : c
                                            };
                                            c.clientX = f.screenX;
                                            c.clientY = f.screenY
                                        }
                                        f = ofy = 0;
                                        if (q && !b) {
                                            var n = a.win.position(),
                                                f = -n.left;
                                            ofy = -n.top
                                        }
                                        var h = c.clientY + ofy,
                                            n = h - a.rail.drag.y,
                                            k = c.clientX + f,
                                            u = k - a.rail.drag.x,
                                            g = a.rail.drag.st - n;
                                        a.ishwscroll && a.opt.bouncescroll ? 0 > g ? g = Math.round(g / 2) : g > a.page.maxh && (g = a.page.maxh + Math.round((g - a.page.maxh) / 2)) : (0 > g && (h = g = 0), g > a.page.maxh && (g = a.page.maxh, h = 0));
                                        if (a.railh && a.railh.scrollable) {
                                            var l = a.rail.drag.sl - u;
                                            a.ishwscroll && a.opt.bouncescroll ? 0 > l ? l = Math.round(l / 2) : l > a.page.maxw && (l = a.page.maxw + Math.round((l - a.page.maxw) /
                                                2)) : (0 > l && (k = l = 0), l > a.page.maxw && (l = a.page.maxw, k = 0))
                                        }
                                        f = !1;
                                        if (a.rail.drag.dl) f = !0, "v" == a.rail.drag.dl ? l = a.rail.drag.sl : "h" == a.rail.drag.dl && (g = a.rail.drag.st);
                                        else {
                                            var n = Math.abs(n),
                                                u = Math.abs(u),
                                                m = a.opt.directionlockdeadzone;
                                            if ("v" == a.rail.drag.ck) {
                                                if (n > m && u <= 0.3 * n) return a.rail.drag = !1, !0;
                                                u > m && (a.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()))
                                            } else if ("h" == a.rail.drag.ck) {
                                                if (u > m && n <= 0.3 * u) return a.rail.drag = !1, !0;
                                                n > m && (a.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()))
                                            }
                                        }
                                        a.synched("touchmove",
                                            function () {
                                                a.rail.drag && 2 == a.rail.drag.pt && (a.prepareTransition && a.prepareTransition(0), a.rail.scrollable && a.setScrollTop(g), a.scrollmom.update(k, h), a.railh && a.railh.scrollable ? (a.setScrollLeft(l), a.showCursor(g, l)) : a.showCursor(g), d.isie10 && document.selection.clear())
                                            });
                                        d.ischrome && a.istouchcapable && (f = !1);
                                        if (f) return a.cancelEvent(c)
                                    }
                                }
                        }
                        a.onmousedown = function (c, b) {
                            if (!(a.rail.drag && 1 != a.rail.drag.pt)) {
                                if (a.locked) return a.cancelEvent(c);
                                a.cancelScroll();
                                a.rail.drag = {
                                    x: c.clientX,
                                    y: c.clientY,
                                    sx: a.scroll.x,
                                    sy: a.scroll.y,
                                    pt: 1,
                                    hr: !!b
                                };
                                var f = a.getTarget(c);
                                !a.ispage && d.hasmousecapture && f.setCapture();
                                a.isiframe && !d.hasmousecapture && (a.saved.csspointerevents = a.doc.css("pointer-events"), a.css(a.doc, {
                                    "pointer-events": "none"
                                }));
                                a.hasmoving = !1;
                                return a.cancelEvent(c)
                            }
                        };
                        a.onmouseup = function (c) {
                            if (a.rail.drag && (d.hasmousecapture && document.releaseCapture(), a.isiframe && !d.hasmousecapture && a.doc.css("pointer-events", a.saved.csspointerevents), 1 == a.rail.drag.pt)) return a.rail.drag = !1, a.hasmoving && a.triggerScrollEnd(),
                                a.cancelEvent(c)
                        };
                        a.onmousemove = function (c) {
                            if (a.rail.drag && 1 == a.rail.drag.pt) {
                                if (d.ischrome && 0 == c.which) return a.onmouseup(c);
                                a.cursorfreezed = !0;
                                a.hasmoving = !0;
                                if (a.rail.drag.hr) {
                                    a.scroll.x = a.rail.drag.sx + (c.clientX - a.rail.drag.x);
                                    0 > a.scroll.x && (a.scroll.x = 0);
                                    var b = a.scrollvaluemaxw;
                                    a.scroll.x > b && (a.scroll.x = b)
                                } else a.scroll.y = a.rail.drag.sy + (c.clientY - a.rail.drag.y), 0 > a.scroll.y && (a.scroll.y = 0), b = a.scrollvaluemax, a.scroll.y > b && (a.scroll.y = b);
                                a.synched("mousemove", function () {
                                    a.rail.drag && 1 == a.rail.drag.pt &&
                                        (a.showCursor(), a.rail.drag.hr ? a.doScrollLeft(Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollTop(Math.round(a.scroll.y * a.scrollratio.y), a.opt.cursordragspeed))
                                });
                                return a.cancelEvent(c)
                            }
                        };
                        if (d.cantouch || a.opt.touchbehavior) a.onpreventclick = function (c) {
                            if (a.preventclick) return a.preventclick.tg.onclick = a.preventclick.click, a.preventclick = !1, a.cancelEvent(c)
                        }, a.bind(a.win, "mousedown", a.ontouchstart), a.onclick = d.isios ? !1 : function (c) {
                            return a.lastmouseup ? (a.lastmouseup = !1, a.cancelEvent(c)) :
                                !0
                        }, a.opt.grabcursorenabled && d.cursorgrabvalue && (a.css(a.ispage ? a.doc : a.win, {
                            cursor: d.cursorgrabvalue
                        }), a.css(a.rail, {
                            cursor: d.cursorgrabvalue
                        }));
                        else {
                            var p = function (c) {
                                if (a.selectiondrag) {
                                    if (c) {
                                        var b = a.win.outerHeight();
                                        c = c.pageY - a.selectiondrag.top;
                                        0 < c && c < b && (c = 0);
                                        c >= b && (c -= b);
                                        a.selectiondrag.df = c
                                    }
                                    0 != a.selectiondrag.df && (a.doScrollBy(2 * -Math.floor(a.selectiondrag.df / 6)), a.debounced("doselectionscroll", function () {
                                        p()
                                    }, 50))
                                }
                            };
                            a.hasTextSelected = "getSelection" in document ? function () {
                                    return 0 < document.getSelection().rangeCount
                                } :
                                "selection" in document ? function () {
                                    return "None" != document.selection.type
                                } : function () {
                                    return !1
                                };
                            a.onselectionstart = function (c) {
                                a.ispage || (a.selectiondrag = a.win.offset())
                            };
                            a.onselectionend = function (c) {
                                a.selectiondrag = !1
                            };
                            a.onselectiondrag = function (c) {
                                a.selectiondrag && a.hasTextSelected() && a.debounced("selectionscroll", function () {
                                    p(c)
                                }, 250)
                            }
                        }
                        d.hasmstouch && (a.css(a.rail, {
                            "-ms-touch-action": "none"
                        }), a.css(a.cursor, {
                            "-ms-touch-action": "none"
                        }), a.bind(a.win, "MSPointerDown", a.ontouchstart), a.bind(document,
                            "MSPointerUp", a.ontouchend), a.bind(document, "MSPointerMove", a.ontouchmove), a.bind(a.cursor, "MSGestureHold", function (a) {
                            a.preventDefault()
                        }), a.bind(a.cursor, "contextmenu", function (a) {
                            a.preventDefault()
                        }));
                        this.istouchcapable && (a.bind(a.win, "touchstart", a.ontouchstart), a.bind(document, "touchend", a.ontouchend), a.bind(document, "touchcancel", a.ontouchend), a.bind(document, "touchmove", a.ontouchmove));
                        a.bind(a.cursor, "mousedown", a.onmousedown);
                        a.bind(a.cursor, "mouseup", a.onmouseup);
                        a.railh && (a.bind(a.cursorh,
                            "mousedown", function (c) {
                                a.onmousedown(c, !0)
                            }), a.bind(a.cursorh, "mouseup", a.onmouseup));
                        if (a.opt.cursordragontouch || !d.cantouch && !a.opt.touchbehavior) a.rail.css({
                            cursor: "default"
                        }), a.railh && a.railh.css({
                            cursor: "default"
                        }), a.jqbind(a.rail, "mouseenter", function () {
                            if (!a.win.is(":visible")) return !1;
                            a.canshowonmouseevent && a.showCursor();
                            a.rail.active = !0
                        }), a.jqbind(a.rail, "mouseleave", function () {
                            a.rail.active = !1;
                            a.rail.drag || a.hideCursor()
                        }), a.opt.sensitiverail && (a.bind(a.rail, "click", function (c) {
                            a.doRailClick(c, !1, !1)
                        }), a.bind(a.rail, "dblclick", function (c) {
                            a.doRailClick(c, !0, !1)
                        }), a.bind(a.cursor, "click", function (c) {
                            a.cancelEvent(c)
                        }), a.bind(a.cursor, "dblclick", function (c) {
                            a.cancelEvent(c)
                        })), a.railh && (a.jqbind(a.railh, "mouseenter", function () {
                            if (!a.win.is(":visible")) return !1;
                            a.canshowonmouseevent && a.showCursor();
                            a.rail.active = !0
                        }), a.jqbind(a.railh, "mouseleave", function () {
                            a.rail.active = !1;
                            a.rail.drag || a.hideCursor()
                        }), a.opt.sensitiverail && (a.bind(a.railh, "click", function (c) {
                            a.doRailClick(c, !1, !0)
                        }), a.bind(a.railh,
                            "dblclick", function (c) {
                                a.doRailClick(c, !0, !0)
                            }), a.bind(a.cursorh, "click", function (c) {
                            a.cancelEvent(c)
                        }), a.bind(a.cursorh, "dblclick", function (c) {
                            a.cancelEvent(c)
                        })));
                        !d.cantouch && !a.opt.touchbehavior ? (a.bind(d.hasmousecapture ? a.win : document, "mouseup", a.onmouseup), a.bind(document, "mousemove", a.onmousemove), a.onclick && a.bind(document, "click", a.onclick), !a.ispage && a.opt.enablescrollonselection && (a.bind(a.win[0], "mousedown", a.onselectionstart), a.bind(document, "mouseup", a.onselectionend), a.bind(a.cursor,
                            "mouseup", a.onselectionend), a.cursorh && a.bind(a.cursorh, "mouseup", a.onselectionend), a.bind(document, "mousemove", a.onselectiondrag)), a.zoom && (a.jqbind(a.zoom, "mouseenter", function () {
                            a.canshowonmouseevent && a.showCursor();
                            a.rail.active = !0
                        }), a.jqbind(a.zoom, "mouseleave", function () {
                            a.rail.active = !1;
                            a.rail.drag || a.hideCursor()
                        }))) : (a.bind(d.hasmousecapture ? a.win : document, "mouseup", a.ontouchend), a.bind(document, "mousemove", a.ontouchmove), a.onclick && a.bind(document, "click", a.onclick), a.opt.cursordragontouch &&
                            (a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mousemove", a.onmousemove), a.cursorh && a.bind(a.cursorh, "mousedown", function (c) {
                                a.onmousedown(c, !0)
                            }), a.cursorh && a.bind(a.cursorh, "mousemove", a.onmousemove)));
                        a.opt.enablemousewheel && (a.isiframe || a.bind(d.isie && a.ispage ? document : a.win, "mousewheel", a.onmousewheel), a.bind(a.rail, "mousewheel", a.onmousewheel), a.railh && a.bind(a.railh, "mousewheel", a.onmousewheelhr));
                        !a.ispage && (!d.cantouch && !/HTML|^BODY/.test(a.win[0].nodeName)) && (a.win.attr("tabindex") ||
                            a.win.attr({
                                tabindex: J++
                            }), a.jqbind(a.win, "focus", function (c) {
                                y = a.getTarget(c).id || !0;
                                a.hasfocus = !0;
                                a.canshowonmouseevent && a.noticeCursor()
                            }), a.jqbind(a.win, "blur", function (c) {
                                y = !1;
                                a.hasfocus = !1
                            }), a.jqbind(a.win, "mouseenter", function (c) {
                                C = a.getTarget(c).id || !0;
                                a.hasmousefocus = !0;
                                a.canshowonmouseevent && a.noticeCursor()
                            }), a.jqbind(a.win, "mouseleave", function () {
                                C = !1;
                                a.hasmousefocus = !1;
                                a.rail.drag || a.hideCursor()
                            }))
                    }
                    a.onkeypress = function (c) {
                        if (a.locked && 0 == a.page.maxh) return !0;
                        c = c ? c : window.e;
                        var b = a.getTarget(c);
                        if (b && /INPUT|TEXTAREA|SELECT|OPTION/.test(b.nodeName) && (!b.getAttribute("type") && !b.type || !/submit|button|cancel/i.tp) || e(b).attr("contenteditable")) return !0;
                        if (a.hasfocus || a.hasmousefocus && !y || a.ispage && !y && !C) {
                            b = c.keyCode;
                            if (a.locked && 27 != b) return a.cancelEvent(c);
                            var f = c.ctrlKey || !1,
                                n = c.shiftKey || !1,
                                d = !1;
                            switch (b) {
                            case 38:
                            case 63233:
                                a.doScrollBy(72);
                                d = !0;
                                break;
                            case 40:
                            case 63235:
                                a.doScrollBy(-72);
                                d = !0;
                                break;
                            case 37:
                            case 63232:
                                a.railh && (f ? a.doScrollLeft(0) : a.doScrollLeftBy(72), d = !0);
                                break;
                            case 39:
                            case 63234:
                                a.railh &&
                                    (f ? a.doScrollLeft(a.page.maxw) : a.doScrollLeftBy(-72), d = !0);
                                break;
                            case 33:
                            case 63276:
                                a.doScrollBy(a.view.h);
                                d = !0;
                                break;
                            case 34:
                            case 63277:
                                a.doScrollBy(-a.view.h);
                                d = !0;
                                break;
                            case 36:
                            case 63273:
                                a.railh && f ? a.doScrollPos(0, 0) : a.doScrollTo(0);
                                d = !0;
                                break;
                            case 35:
                            case 63275:
                                a.railh && f ? a.doScrollPos(a.page.maxw, a.page.maxh) : a.doScrollTo(a.page.maxh);
                                d = !0;
                                break;
                            case 32:
                                a.opt.spacebarenabled && (n ? a.doScrollBy(a.view.h) : a.doScrollBy(-a.view.h), d = !0);
                                break;
                            case 27:
                                a.zoomactive && (a.doZoom(), d = !0)
                            }
                            if (d) return a.cancelEvent(c)
                        }
                    };
                    a.opt.enablekeyboard && a.bind(document, d.isopera && !d.isopera12 ? "keypress" : "keydown", a.onkeypress);
                    a.bind(document, "keydown", function (c) {
                        c.ctrlKey && (a.wheelprevented = !0)
                    });
                    a.bind(document, "keyup", function (c) {
                        c.ctrlKey || (a.wheelprevented = !1)
                    });
                    a.bind(window, "resize", a.lazyResize);
                    a.bind(window, "orientationchange", a.lazyResize);
                    a.bind(window, "load", a.lazyResize);
                    if (d.ischrome && !a.ispage && !a.haswrapper) {
                        var r = a.win.attr("style"),
                            f = parseFloat(a.win.css("width")) + 1;
                        a.win.css("width", f);
                        a.synched("chromefix",
                            function () {
                                a.win.attr("style", r)
                            })
                    }
                    a.onAttributeChange = function (c) {
                        a.lazyResize(250)
                    };
                    !a.ispage && !a.haswrapper && (!1 !== z ? (a.observer = new z(function (c) {
                        c.forEach(a.onAttributeChange)
                    }), a.observer.observe(a.win[0], {
                        childList: !0,
                        characterData: !1,
                        attributes: !0,
                        subtree: !1
                    }), a.observerremover = new z(function (c) {
                        c.forEach(function (c) {
                            if (0 < c.removedNodes.length)
                                for (var b in c.removedNodes)
                                    if (c.removedNodes[b] == a.win[0]) return a.remove()
                        })
                    }), a.observerremover.observe(a.win[0].parentNode, {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (a.bind(a.win, d.isie && !d.isie9 ? "propertychange" : "DOMAttrModified", a.onAttributeChange), d.isie9 && a.win[0].attachEvent("onpropertychange", a.onAttributeChange), a.bind(a.win, "DOMNodeRemoved", function (c) {
                        c.target == a.win[0] && a.remove()
                    })));
                    !a.ispage && a.opt.boxzoom && a.bind(window, "resize", a.resizeZoom);
                    a.istextarea && a.bind(a.win, "mouseup", a.lazyResize);
                    a.lazyResize(30)
                }
                if ("IFRAME" == this.doc[0].nodeName) {
                    var I = function (c) {
                        a.iframexd = !1;
                        try {
                            var b = "contentDocument" in this ? this.contentDocument :
                                this.contentWindow.document
                        } catch (f) {
                            a.iframexd = !0, b = !1
                        }
                        if (a.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
                        a.forcescreen = !0;
                        a.isiframe && (a.iframe = {
                            doc: e(b),
                            html: a.doc.contents().find("html")[0],
                            body: a.doc.contents().find("body")[0]
                        }, a.getContentSize = function () {
                            return {
                                w: Math.max(a.iframe.html.scrollWidth, a.iframe.body.scrollWidth),
                                h: Math.max(a.iframe.html.scrollHeight, a.iframe.body.scrollHeight)
                            }
                        }, a.docscroll = e(a.iframe.body));
                        !d.isios && (a.opt.iframeautoresize &&
                            !a.isiframe) && (a.win.scrollTop(0), a.doc.height(""), c = Math.max(b.getElementsByTagName("html")[0].scrollHeight, b.body.scrollHeight), a.doc.height(c));
                        a.lazyResize(30);
                        d.isie7 && a.css(e(a.iframe.html), {
                            "overflow-y": "hidden"
                        });
                        a.css(e(a.iframe.body), {
                            "overflow-y": "hidden"
                        });
                        d.isios && a.haswrapper && a.css(e(b.body), {
                            "-webkit-transform": "translate3d(0,0,0)"
                        });
                        "contentWindow" in this ? a.bind(this.contentWindow, "scroll", a.onscroll) : a.bind(b, "scroll", a.onscroll);
                        a.opt.enablemousewheel && a.bind(b, "mousewheel", a.onmousewheel);
                        a.opt.enablekeyboard && a.bind(b, d.isopera ? "keypress" : "keydown", a.onkeypress);
                        if (d.cantouch || a.opt.touchbehavior) a.bind(b, "mousedown", a.ontouchstart), a.bind(b, "mousemove", function (c) {
                            a.ontouchmove(c, !0)
                        }), a.opt.grabcursorenabled && d.cursorgrabvalue && a.css(e(b.body), {
                            cursor: d.cursorgrabvalue
                        });
                        a.bind(b, "mouseup", a.ontouchend);
                        a.zoom && (a.opt.dblclickzoom && a.bind(b, "dblclick", a.doZoom), a.ongesturezoom && a.bind(b, "gestureend", a.ongesturezoom))
                    };
                    this.doc[0].readyState && "complete" == this.doc[0].readyState &&
                        setTimeout(function () {
                            I.call(a.doc[0], !1)
                        }, 500);
                    a.bind(this.doc, "load", I)
                }
            };
            this.showCursor = function (c, b) {
                a.cursortimeout && (clearTimeout(a.cursortimeout), a.cursortimeout = 0);
                if (a.rail) {
                    a.autohidedom && (a.autohidedom.stop().css({
                        opacity: a.opt.cursoropacitymax
                    }), a.cursoractive = !0);
                    if (!a.rail.drag || 1 != a.rail.drag.pt) "undefined" != typeof c && !1 !== c && (a.scroll.y = Math.round(1 * c / a.scrollratio.y)), "undefined" != typeof b && (a.scroll.x = Math.round(1 * b / a.scrollratio.x));
                    a.cursor.css({
                        height: a.cursorheight,
                        top: a.scroll.y
                    });
                    a.cursorh && (!a.rail.align && a.rail.visibility ? a.cursorh.css({
                        width: a.cursorwidth,
                        left: a.scroll.x + a.rail.width
                    }) : a.cursorh.css({
                        width: a.cursorwidth,
                        left: a.scroll.x
                    }), a.cursoractive = !0);
                    a.zoom && a.zoom.stop().css({
                        opacity: a.opt.cursoropacitymax
                    })
                }
            };
            this.hideCursor = function (c) {
                !a.cursortimeout && (a.rail && a.autohidedom && !(a.hasmousefocus && "leave" == a.opt.autohidemode)) && (a.cursortimeout = setTimeout(function () {
                    if (!a.rail.active || !a.showonmouseevent) a.autohidedom.stop().animate({
                            opacity: a.opt.cursoropacitymin
                        }),
                        a.zoom && a.zoom.stop().animate({
                            opacity: a.opt.cursoropacitymin
                        }), a.cursoractive = !1;
                    a.cursortimeout = 0
                }, c || a.opt.hidecursordelay))
            };
            this.noticeCursor = function (c, b, f) {
                a.showCursor(b, f);
                a.rail.active || a.hideCursor(c)
            };
            this.getContentSize = a.ispage ? function () {
                return {
                    w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }
            } : a.haswrapper ? function () {
                return {
                    w: a.doc.outerWidth() + parseInt(a.win.css("paddingLeft")) +
                        parseInt(a.win.css("paddingRight")),
                    h: a.doc.outerHeight() + parseInt(a.win.css("paddingTop")) + parseInt(a.win.css("paddingBottom"))
                }
            } : function () {
                return {
                    w: a.docscroll[0].scrollWidth,
                    h: a.docscroll[0].scrollHeight
                }
            };
            this.onResize = function (c, b) {
                if (!a || !a.win) return !1;
                if (!a.haswrapper && !a.ispage) {
                    if ("none" == a.win.css("display")) return a.visibility && a.hideRail().hideRailHr(), !1;
                    !a.hidden && !a.visibility && a.showRail().showRailHr()
                }
                var f = a.page.maxh,
                    d = a.page.maxw,
                    e = a.view.w;
                a.view = {
                    w: a.ispage ? a.win.width() : parseInt(a.win[0].clientWidth),
                    h: a.ispage ? a.win.height() : parseInt(a.win[0].clientHeight)
                };
                a.page = b ? b : a.getContentSize();
                a.page.maxh = Math.max(0, a.page.h - a.view.h);
                a.page.maxw = Math.max(0, a.page.w - a.view.w);
                if (a.page.maxh == f && a.page.maxw == d && a.view.w == e) {
                    if (a.ispage) return a;
                    f = a.win.offset();
                    if (a.lastposition && (d = a.lastposition, d.top == f.top && d.left == f.left)) return a;
                    a.lastposition = f
                }
                0 == a.page.maxh ? (a.hideRail(), a.scrollvaluemax = 0, a.scroll.y = 0, a.scrollratio.y = 0, a.cursorheight = 0, a.setScrollTop(0), a.rail.scrollable = !1) : a.rail.scrollable = !0;
                0 == a.page.maxw ? (a.hideRailHr(), a.scrollvaluemaxw = 0, a.scroll.x = 0, a.scrollratio.x = 0, a.cursorwidth = 0, a.setScrollLeft(0), a.railh.scrollable = !1) : a.railh.scrollable = !0;
                a.locked = 0 == a.page.maxh && 0 == a.page.maxw;
                if (a.locked) return a.ispage || a.updateScrollBar(a.view), !1;
                !a.hidden && !a.visibility ? a.showRail().showRailHr() : !a.hidden && !a.railh.visibility && a.showRailHr();
                a.istextarea && (a.win.css("resize") && "none" != a.win.css("resize")) && (a.view.h -= 20);
                a.cursorheight = Math.min(a.view.h, Math.round(a.view.h * (a.view.h /
                    a.page.h)));
                a.cursorheight = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorheight);
                a.cursorwidth = Math.min(a.view.w, Math.round(a.view.w * (a.view.w / a.page.w)));
                a.cursorwidth = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorwidth);
                a.scrollvaluemax = a.view.h - a.cursorheight - a.cursor.hborder;
                a.railh && (a.railh.width = 0 < a.page.maxh ? a.view.w - a.rail.width : a.view.w, a.scrollvaluemaxw = a.railh.width - a.cursorwidth - a.cursorh.wborder);
                a.ispage ||
                    a.updateScrollBar(a.view);
                a.scrollratio = {
                    x: a.page.maxw / a.scrollvaluemaxw,
                    y: a.page.maxh / a.scrollvaluemax
                };
                a.getScrollTop() > a.page.maxh ? a.doScrollTop(a.page.maxh) : (a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y)), a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)), a.cursoractive && a.noticeCursor());
                a.scroll.y && 0 == a.getScrollTop() && a.doScrollTo(Math.floor(a.scroll.y * a.scrollratio.y));
                return a
            };
            this.resize = a.onResize;
            this.lazyResize = function (c) {
                c = isNaN(c) ? 30 : c;
                a.delayed("resize", a.resize,
                    c);
                return a
            };
            this._bind = function (c, b, f, d) {
                a.events.push({
                    e: c,
                    n: b,
                    f: f,
                    b: d,
                    q: !1
                });
                c.addEventListener ? c.addEventListener(b, f, d || !1) : c.attachEvent ? c.attachEvent("on" + b, f) : c["on" + b] = f
            };
            this.jqbind = function (c, b, f) {
                a.events.push({
                    e: c,
                    n: b,
                    f: f,
                    q: !0
                });
                e(c).bind(b, f)
            };
            this.bind = function (c, b, f, e) {
                var h = "jquery" in c ? c[0] : c;
                "mousewheel" == b ? "onwheel" in a.win ? a._bind(h, "wheel", f, e || !1) : (c = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", l(h, c, f, e || !1), "DOMMouseScroll" == c && l(h, "MozMousePixelScroll",
                    f, e || !1)) : h.addEventListener ? (d.cantouch && /mouseup|mousedown|mousemove/.test(b) && a._bind(h, "mousedown" == b ? "touchstart" : "mouseup" == b ? "touchend" : "touchmove", function (a) {
                    if (a.touches) {
                        if (2 > a.touches.length) {
                            var c = a.touches.length ? a.touches[0] : a;
                            c.original = a;
                            f.call(this, c)
                        }
                    } else a.changedTouches && (c = a.changedTouches[0], c.original = a, f.call(this, c))
                }, e || !1), a._bind(h, b, f, e || !1), d.cantouch && "mouseup" == b && a._bind(h, "touchcancel", f, e || !1)) : a._bind(h, b, function (c) {
                    if ((c = c || window.event || !1) && c.srcElement) c.target =
                        c.srcElement;
                    "pageY" in c || (c.pageX = c.clientX + document.documentElement.scrollLeft, c.pageY = c.clientY + document.documentElement.scrollTop);
                    return !1 === f.call(h, c) || !1 === e ? a.cancelEvent(c) : !0
                })
            };
            this._unbind = function (a, b, f, d) {
                a.removeEventListener ? a.removeEventListener(b, f, d) : a.detachEvent ? a.detachEvent("on" + b, f) : a["on" + b] = !1
            };
            this.unbindAll = function () {
                for (var c = 0; c < a.events.length; c++) {
                    var b = a.events[c];
                    b.q ? b.e.unbind(b.n, b.f) : a._unbind(b.e, b.n, b.f, b.b)
                }
            };
            this.cancelEvent = function (a) {
                a = a.original ? a.original :
                    a ? a : window.event || !1;
                if (!a) return !1;
                a.preventDefault && a.preventDefault();
                a.stopPropagation && a.stopPropagation();
                a.preventManipulation && a.preventManipulation();
                a.cancelBubble = !0;
                a.cancel = !0;
                return a.returnValue = !1
            };
            this.stopPropagation = function (a) {
                a = a.original ? a.original : a ? a : window.event || !1;
                if (!a) return !1;
                if (a.stopPropagation) return a.stopPropagation();
                a.cancelBubble && (a.cancelBubble = !0);
                return !1
            };
            this.showRail = function () {
                if (0 != a.page.maxh && (a.ispage || "none" != a.win.css("display"))) a.visibility = !0,
                    a.rail.visibility = !0, a.rail.css("display", "block");
                return a
            };
            this.showRailHr = function () {
                if (!a.railh) return a;
                if (0 != a.page.maxw && (a.ispage || "none" != a.win.css("display"))) a.railh.visibility = !0, a.railh.css("display", "block");
                return a
            };
            this.hideRail = function () {
                a.visibility = !1;
                a.rail.visibility = !1;
                a.rail.css("display", "none");
                return a
            };
            this.hideRailHr = function () {
                if (!a.railh) return a;
                a.railh.visibility = !1;
                a.railh.css("display", "none");
                return a
            };
            this.show = function () {
                a.hidden = !1;
                a.locked = !1;
                return a.showRail().showRailHr()
            };
            this.hide = function () {
                a.hidden = !0;
                a.locked = !0;
                return a.hideRail().hideRailHr()
            };
            this.toggle = function () {
                return a.hidden ? a.show() : a.hide()
            };
            this.remove = function () {
                a.stop();
                a.cursortimeout && clearTimeout(a.cursortimeout);
                a.doZoomOut();
                a.unbindAll();
                d.isie9 && a.win[0].detachEvent("onpropertychange", a.onAttributeChange);
                !1 !== a.observer && a.observer.disconnect();
                !1 !== a.observerremover && a.observerremover.disconnect();
                a.events = null;
                a.cursor && a.cursor.remove();
                a.cursorh && a.cursorh.remove();
                a.rail && a.rail.remove();
                a.railh && a.railh.remove();
                a.zoom && a.zoom.remove();
                for (var c = 0; c < a.saved.css.length; c++) {
                    var b = a.saved.css[c];
                    b[0].css(b[1], "undefined" == typeof b[2] ? "" : b[2])
                }
                a.saved = !1;
                a.me.data("__nicescroll", "");
                var f = e.nicescroll;
                f.each(function (c) {
                    if (this && this.id === a.id) {
                        delete f[c];
                        for (var b = ++c; b < f.length; b++, c++) f[c] = f[b];
                        f.length--;
                        f.length && delete f[f.length]
                    }
                });
                for (var h in a) a[h] = null, delete a[h];
                a = null
            };
            this.scrollstart = function (c) {
                this.onscrollstart = c;
                return a
            };
            this.scrollend = function (c) {
                this.onscrollend =
                    c;
                return a
            };
            this.scrollcancel = function (c) {
                this.onscrollcancel = c;
                return a
            };
            this.zoomin = function (c) {
                this.onzoomin = c;
                return a
            };
            this.zoomout = function (c) {
                this.onzoomout = c;
                return a
            };
            this.isScrollable = function (a) {
                a = a.target ? a.target : a;
                if ("OPTION" == a.nodeName) return !0;
                for (; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                    var b = e(a),
                        b = b.css("overflowY") || b.css("overflowX") || b.css("overflow") || "";
                    if (/scroll|auto/.test(b)) return a.clientHeight != a.scrollHeight;
                    a = a.parentNode ? a.parentNode : !1
                }
                return !1
            };
            this.getViewport =
                function (a) {
                    for (a = a && a.parentNode ? a.parentNode : !1; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
                        var b = e(a);
                        if (/fixed|absolute/.test(b.css("position"))) return b;
                        var f = b.css("overflowY") || b.css("overflowX") || b.css("overflow") || "";
                        if (/scroll|auto/.test(f) && a.clientHeight != a.scrollHeight || 0 < b.getNiceScroll().length) return b;
                        a = a.parentNode ? a.parentNode : !1
                    }
                    return a ? e(a) : !1
                };
            this.triggerScrollEnd = function () {
                if (a.onscrollend) {
                    var c = a.getScrollLeft(),
                        b = a.getScrollTop();
                    a.onscrollend.call(a, {
                        type: "scrollend",
                        current: {
                            x: c,
                            y: b
                        },
                        end: {
                            x: c,
                            y: b
                        }
                    })
                }
            };
            this.onmousewheel = function (c) {
                if (!a.wheelprevented) {
                    if (a.locked) return a.debounced("checkunlock", a.resize, 250), !0;
                    if (a.rail.drag) return a.cancelEvent(c);
                    "auto" == a.opt.oneaxismousemode && 0 != c.deltaX && (a.opt.oneaxismousemode = !1);
                    if (a.opt.oneaxismousemode && 0 == c.deltaX && !a.rail.scrollable) return a.railh && a.railh.scrollable ? a.onmousewheelhr(c) : !0;
                    var b = +new Date,
                        f = !1;
                    a.opt.preservenativescrolling && a.checkarea + 600 < b && (a.nativescrollingarea = a.isScrollable(c), f = !0);
                    a.checkarea =
                        b;
                    if (a.nativescrollingarea) return !0;
                    if (c = q(c, !1, f)) a.checkarea = 0;
                    return c
                }
            };
            this.onmousewheelhr = function (c) {
                if (!a.wheelprevented) {
                    if (a.locked || !a.railh.scrollable) return !0;
                    if (a.rail.drag) return a.cancelEvent(c);
                    var b = +new Date,
                        f = !1;
                    a.opt.preservenativescrolling && a.checkarea + 600 < b && (a.nativescrollingarea = a.isScrollable(c), f = !0);
                    a.checkarea = b;
                    return a.nativescrollingarea ? !0 : a.locked ? a.cancelEvent(c) : q(c, !0, f)
                }
            };
            this.stop = function () {
                a.cancelScroll();
                a.scrollmon && a.scrollmon.stop();
                a.cursorfreezed = !1;
                a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
                a.noticeCursor();
                return a
            };
            this.getTransitionSpeed = function (b) {
                var d = Math.round(10 * a.opt.scrollspeed);
                b = Math.min(d, Math.round(b / 20 * a.opt.scrollspeed));
                return 20 < b ? b : 0
            };
            a.opt.smoothscroll ? a.ishwscroll && d.hastransition && a.opt.usetransition ? (this.prepareTransition = function (b, e) {
                var f = e ? 20 < b ? b : 0 : a.getTransitionSpeed(b),
                    h = f ? d.prefixstyle + "transform " + f + "ms ease-out" : "";
                if (!a.lasttransitionstyle || a.lasttransitionstyle != h) a.lasttransitionstyle =
                    h, a.doc.css(d.transitionstyle, h);
                return f
            }, this.doScrollLeft = function (b, d) {
                var f = a.scrollrunning ? a.newscrolly : a.getScrollTop();
                a.doScrollPos(b, f, d)
            }, this.doScrollTop = function (b, d) {
                var f = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
                a.doScrollPos(f, b, d)
            }, this.doScrollPos = function (b, e, f) {
                var h = a.getScrollTop(),
                    g = a.getScrollLeft();
                (0 > (a.newscrolly - h) * (e - h) || 0 > (a.newscrollx - g) * (b - g)) && a.cancelScroll();
                !1 == a.opt.bouncescroll && (0 > e ? e = 0 : e > a.page.maxh && (e = a.page.maxh), 0 > b ? b = 0 : b > a.page.maxw && (b = a.page.maxw));
                if (a.scrollrunning && b == a.newscrollx && e == a.newscrolly) return !1;
                a.newscrolly = e;
                a.newscrollx = b;
                a.newscrollspeed = f || !1;
                if (a.timer) return !1;
                a.timer = setTimeout(function () {
                    var f = a.getScrollTop(),
                        h = a.getScrollLeft(),
                        g, k;
                    g = b - h;
                    k = e - f;
                    g = Math.round(Math.sqrt(Math.pow(g, 2) + Math.pow(k, 2)));
                    g = a.newscrollspeed && 1 < a.newscrollspeed ? a.newscrollspeed : a.getTransitionSpeed(g);
                    a.newscrollspeed && 1 >= a.newscrollspeed && (g *= a.newscrollspeed);
                    a.prepareTransition(g, !0);
                    a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                    0 < g && (!a.scrollrunning && a.onscrollstart && a.onscrollstart.call(a, {
                        type: "scrollstart",
                        current: {
                            x: h,
                            y: f
                        },
                        request: {
                            x: b,
                            y: e
                        },
                        end: {
                            x: a.newscrollx,
                            y: a.newscrolly
                        },
                        speed: g
                    }), d.transitionend ? a.scrollendtrapped || (a.scrollendtrapped = !0, a.bind(a.doc, d.transitionend, a.onScrollTransitionEnd, !1)) : (a.scrollendtrapped && clearTimeout(a.scrollendtrapped), a.scrollendtrapped = setTimeout(a.onScrollTransitionEnd, g)), a.timerscroll = {
                        bz: new BezierClass(f, a.newscrolly, g, 0, 0, 0.58, 1),
                        bh: new BezierClass(h, a.newscrollx, g, 0, 0, 0.58,
                            1)
                    }, a.cursorfreezed || (a.timerscroll.tm = setInterval(function () {
                        a.showCursor(a.getScrollTop(), a.getScrollLeft())
                    }, 60)));
                    a.synched("doScroll-set", function () {
                        a.timer = 0;
                        a.scrollendtrapped && (a.scrollrunning = !0);
                        a.setScrollTop(a.newscrolly);
                        a.setScrollLeft(a.newscrollx);
                        if (!a.scrollendtrapped) a.onScrollTransitionEnd()
                    })
                }, 50)
            }, this.cancelScroll = function () {
                if (!a.scrollendtrapped) return !0;
                var b = a.getScrollTop(),
                    e = a.getScrollLeft();
                a.scrollrunning = !1;
                d.transitionend || clearTimeout(d.transitionend);
                a.scrollendtrapped = !1;
                a._unbind(a.doc, d.transitionend, a.onScrollTransitionEnd);
                a.prepareTransition(0);
                a.setScrollTop(b);
                a.railh && a.setScrollLeft(e);
                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                a.timerscroll = !1;
                a.cursorfreezed = !1;
                a.showCursor(b, e);
                return a
            }, this.onScrollTransitionEnd = function () {
                a.scrollendtrapped && a._unbind(a.doc, d.transitionend, a.onScrollTransitionEnd);
                a.scrollendtrapped = !1;
                a.prepareTransition(0);
                a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
                a.timerscroll = !1;
                var b =
                    a.getScrollTop(),
                    e = a.getScrollLeft();
                a.setScrollTop(b);
                a.railh && a.setScrollLeft(e);
                a.noticeCursor(!1, b, e);
                a.cursorfreezed = !1;
                0 > b ? b = 0 : b > a.page.maxh && (b = a.page.maxh);
                0 > e ? e = 0 : e > a.page.maxw && (e = a.page.maxw);
                if (b != a.newscrolly || e != a.newscrollx) return a.doScrollPos(e, b, a.opt.snapbackspeed);
                a.onscrollend && a.scrollrunning && a.triggerScrollEnd();
                a.scrollrunning = !1
            }) : (this.doScrollLeft = function (b, d) {
                var f = a.scrollrunning ? a.newscrolly : a.getScrollTop();
                a.doScrollPos(b, f, d)
            }, this.doScrollTop = function (b, d) {
                var f =
                    a.scrollrunning ? a.newscrollx : a.getScrollLeft();
                a.doScrollPos(f, b, d)
            }, this.doScrollPos = function (b, d, f) {
                function e() {
                    if (a.cancelAnimationFrame) return !0;
                    a.scrollrunning = !0;
                    if (p = 1 - p) return a.timer = s(e) || 1;
                    var b = 0,
                        c = sy = a.getScrollTop();
                    if (a.dst.ay) {
                        var c = a.bzscroll ? a.dst.py + a.bzscroll.getNow() * a.dst.ay : a.newscrolly,
                            f = c - sy;
                        if (0 > f && c < a.newscrolly || 0 < f && c > a.newscrolly) c = a.newscrolly;
                        a.setScrollTop(c);
                        c == a.newscrolly && (b = 1)
                    } else b = 1;
                    var d = sx = a.getScrollLeft();
                    if (a.dst.ax) {
                        d = a.bzscroll ? a.dst.px + a.bzscroll.getNow() *
                            a.dst.ax : a.newscrollx;
                        f = d - sx;
                        if (0 > f && d < a.newscrollx || 0 < f && d > a.newscrollx) d = a.newscrollx;
                        a.setScrollLeft(d);
                        d == a.newscrollx && (b += 1)
                    } else b += 1;
                    2 == b ? (a.timer = 0, a.cursorfreezed = !1, a.bzscroll = !1, a.scrollrunning = !1, 0 > c ? c = 0 : c > a.page.maxh && (c = a.page.maxh), 0 > d ? d = 0 : d > a.page.maxw && (d = a.page.maxw), d != a.newscrollx || c != a.newscrolly ? a.doScrollPos(d, c) : a.onscrollend && a.triggerScrollEnd()) : a.timer = s(e) || 1
                }
                d = "undefined" == typeof d || !1 === d ? a.getScrollTop(!0) : d;
                if (a.timer && a.newscrolly == d && a.newscrollx == b) return !0;
                a.timer &&
                    v(a.timer);
                a.timer = 0;
                var h = a.getScrollTop(),
                    g = a.getScrollLeft();
                (0 > (a.newscrolly - h) * (d - h) || 0 > (a.newscrollx - g) * (b - g)) && a.cancelScroll();
                a.newscrolly = d;
                a.newscrollx = b;
                if (!a.bouncescroll || !a.rail.visibility) 0 > a.newscrolly ? a.newscrolly = 0 : a.newscrolly > a.page.maxh && (a.newscrolly = a.page.maxh);
                if (!a.bouncescroll || !a.railh.visibility) 0 > a.newscrollx ? a.newscrollx = 0 : a.newscrollx > a.page.maxw && (a.newscrollx = a.page.maxw);
                a.dst = {};
                a.dst.x = b - g;
                a.dst.y = d - h;
                a.dst.px = g;
                a.dst.py = h;
                var k = Math.round(Math.sqrt(Math.pow(a.dst.x,
                    2) + Math.pow(a.dst.y, 2)));
                a.dst.ax = a.dst.x / k;
                a.dst.ay = a.dst.y / k;
                var l = 0,
                    q = k;
                0 == a.dst.x ? (l = h, q = d, a.dst.ay = 1, a.dst.py = 0) : 0 == a.dst.y && (l = g, q = b, a.dst.ax = 1, a.dst.px = 0);
                k = a.getTransitionSpeed(k);
                f && 1 >= f && (k *= f);
                a.bzscroll = 0 < k ? a.bzscroll ? a.bzscroll.update(q, k) : new BezierClass(l, q, k, 0, 1, 0, 1) : !1;
                if (!a.timer) {
                    (h == a.page.maxh && d >= a.page.maxh || g == a.page.maxw && b >= a.page.maxw) && a.checkContentSize();
                    var p = 1;
                    a.cancelAnimationFrame = !1;
                    a.timer = 1;
                    a.onscrollstart && !a.scrollrunning && a.onscrollstart.call(a, {
                        type: "scrollstart",
                        current: {
                            x: g,
                            y: h
                        },
                        request: {
                            x: b,
                            y: d
                        },
                        end: {
                            x: a.newscrollx,
                            y: a.newscrolly
                        },
                        speed: k
                    });
                    e();
                    (h == a.page.maxh && d >= h || g == a.page.maxw && b >= g) && a.checkContentSize();
                    a.noticeCursor()
                }
            }, this.cancelScroll = function () {
                a.timer && v(a.timer);
                a.timer = 0;
                a.bzscroll = !1;
                a.scrollrunning = !1;
                return a
            }) : (this.doScrollLeft = function (b, d) {
                var f = a.getScrollTop();
                a.doScrollPos(b, f, d)
            }, this.doScrollTop = function (b, d) {
                var f = a.getScrollLeft();
                a.doScrollPos(f, b, d)
            }, this.doScrollPos = function (b, d, f) {
                var e = b > a.page.maxw ? a.page.maxw : b;
                0 > e &&
                    (e = 0);
                var h = d > a.page.maxh ? a.page.maxh : d;
                0 > h && (h = 0);
                a.synched("scroll", function () {
                    a.setScrollTop(h);
                    a.setScrollLeft(e)
                })
            }, this.cancelScroll = function () {});
            this.doScrollBy = function (b, d) {
                var f = 0,
                    f = d ? Math.floor((a.scroll.y - b) * a.scrollratio.y) : (a.timer ? a.newscrolly : a.getScrollTop(!0)) - b;
                if (a.bouncescroll) {
                    var e = Math.round(a.view.h / 2);
                    f < -e ? f = -e : f > a.page.maxh + e && (f = a.page.maxh + e)
                }
                a.cursorfreezed = !1;
                py = a.getScrollTop(!0);
                if (0 > f && 0 >= py) return a.noticeCursor();
                if (f > a.page.maxh && py >= a.page.maxh) return a.checkContentSize(),
                    a.noticeCursor();
                a.doScrollTop(f)
            };
            this.doScrollLeftBy = function (b, d) {
                var f = 0,
                    f = d ? Math.floor((a.scroll.x - b) * a.scrollratio.x) : (a.timer ? a.newscrollx : a.getScrollLeft(!0)) - b;
                if (a.bouncescroll) {
                    var e = Math.round(a.view.w / 2);
                    f < -e ? f = -e : f > a.page.maxw + e && (f = a.page.maxw + e)
                }
                a.cursorfreezed = !1;
                px = a.getScrollLeft(!0);
                if (0 > f && 0 >= px || f > a.page.maxw && px >= a.page.maxw) return a.noticeCursor();
                a.doScrollLeft(f)
            };
            this.doScrollTo = function (b, d) {
                d && Math.round(b * a.scrollratio.y);
                a.cursorfreezed = !1;
                a.doScrollTop(b)
            };
            this.checkContentSize =
                function () {
                    var b = a.getContentSize();
                    (b.h != a.page.h || b.w != a.page.w) && a.resize(!1, b)
                };
            a.onscroll = function (b) {
                a.rail.drag || a.cursorfreezed || a.synched("scroll", function () {
                    a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
                    a.railh && (a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)));
                    a.noticeCursor()
                })
            };
            a.bind(a.docscroll, "scroll", a.onscroll);
            this.doZoomIn = function (b) {
                if (!a.zoomactive) {
                    a.zoomactive = !0;
                    a.zoomrestore = {
                        style: {}
                    };
                    var h = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                        f = a.win[0].style,
                        g;
                    for (g in h) {
                        var k = h[g];
                        a.zoomrestore.style[k] = "undefined" != typeof f[k] ? f[k] : ""
                    }
                    a.zoomrestore.style.width = a.win.css("width");
                    a.zoomrestore.style.height = a.win.css("height");
                    a.zoomrestore.padding = {
                        w: a.win.outerWidth() - a.win.width(),
                        h: a.win.outerHeight() - a.win.height()
                    };
                    d.isios4 && (a.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0));
                    a.win.css({
                        position: d.isios4 ? "absolute" : "fixed",
                        top: 0,
                        left: 0,
                        "z-index": x + 100,
                        margin: "0px"
                    });
                    h = a.win.css("backgroundColor");
                    ("" == h || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(h)) &&
                    a.win.css("backgroundColor", "#fff");
                    a.rail.css({
                        "z-index": x + 101
                    });
                    a.zoom.css({
                        "z-index": x + 102
                    });
                    a.zoom.css("backgroundPosition", "0px -18px");
                    a.resizeZoom();
                    a.onzoomin && a.onzoomin.call(a);
                    return a.cancelEvent(b)
                }
            };
            this.doZoomOut = function (b) {
                if (a.zoomactive) return a.zoomactive = !1, a.win.css("margin", ""), a.win.css(a.zoomrestore.style), d.isios4 && e(window).scrollTop(a.zoomrestore.scrollTop), a.rail.css({
                    "z-index": a.zindex
                }), a.zoom.css({
                    "z-index": a.zindex
                }), a.zoomrestore = !1, a.zoom.css("backgroundPosition",
                    "0px 0px"), a.onResize(), a.onzoomout && a.onzoomout.call(a), a.cancelEvent(b)
            };
            this.doZoom = function (b) {
                return a.zoomactive ? a.doZoomOut(b) : a.doZoomIn(b)
            };
            this.resizeZoom = function () {
                if (a.zoomactive) {
                    var b = a.getScrollTop();
                    a.win.css({
                        width: e(window).width() - a.zoomrestore.padding.w + "px",
                        height: e(window).height() - a.zoomrestore.padding.h + "px"
                    });
                    a.onResize();
                    a.setScrollTop(Math.min(a.page.maxh, b))
                }
            };
            this.init();
            e.nicescroll.push(this)
        },
        H = function (e) {
            var b = this;
            this.nc = e;
            this.steptime = this.lasttime = this.speedy =
                this.speedx = this.lasty = this.lastx = 0;
            this.snapy = this.snapx = !1;
            this.demuly = this.demulx = 0;
            this.lastscrolly = this.lastscrollx = -1;
            this.timer = this.chky = this.chkx = 0;
            this.time = function () {
                return +new Date
            };
            this.reset = function (e, g) {
                b.stop();
                var l = b.time();
                b.steptime = 0;
                b.lasttime = l;
                b.speedx = 0;
                b.speedy = 0;
                b.lastx = e;
                b.lasty = g;
                b.lastscrollx = -1;
                b.lastscrolly = -1
            };
            this.update = function (e, g) {
                var l = b.time();
                b.steptime = l - b.lasttime;
                b.lasttime = l;
                var l = g - b.lasty,
                    q = e - b.lastx,
                    a = b.nc.getScrollTop(),
                    p = b.nc.getScrollLeft(),
                    a = a +
                    l,
                    p = p + q;
                b.snapx = 0 > p || p > b.nc.page.maxw;
                b.snapy = 0 > a || a > b.nc.page.maxh;
                b.speedx = q;
                b.speedy = l;
                b.lastx = e;
                b.lasty = g
            };
            this.stop = function () {
                b.nc.unsynched("domomentum2d");
                b.timer && clearTimeout(b.timer);
                b.timer = 0;
                b.lastscrollx = -1;
                b.lastscrolly = -1
            };
            this.doSnapy = function (e, g) {
                var l = !1;
                0 > g ? (g = 0, l = !0) : g > b.nc.page.maxh && (g = b.nc.page.maxh, l = !0);
                0 > e ? (e = 0, l = !0) : e > b.nc.page.maxw && (e = b.nc.page.maxw, l = !0);
                l ? b.nc.doScrollPos(e, g, b.nc.opt.snapbackspeed) : b.nc.triggerScrollEnd()
            };
            this.doMomentum = function (e) {
                var g = b.time(),
                    l = e ? g + e : b.lasttime;
                e = b.nc.getScrollLeft();
                var q = b.nc.getScrollTop(),
                    a = b.nc.page.maxh,
                    p = b.nc.page.maxw;
                b.speedx = 0 < p ? Math.min(60, b.speedx) : 0;
                b.speedy = 0 < a ? Math.min(60, b.speedy) : 0;
                l = l && 60 >= g - l;
                if (0 > q || q > a || 0 > e || e > p) l = !1;
                e = b.speedx && l ? b.speedx : !1;
                if (b.speedy && l && b.speedy || e) {
                    var d = Math.max(16, b.steptime);
                    50 < d && (e = d / 50, b.speedx *= e, b.speedy *= e, d = 50);
                    b.demulxy = 0;
                    b.lastscrollx = b.nc.getScrollLeft();
                    b.chkx = b.lastscrollx;
                    b.lastscrolly = b.nc.getScrollTop();
                    b.chky = b.lastscrolly;
                    var r = b.lastscrollx,
                        t = b.lastscrolly,
                        s = function () {
                            var c = 600 < b.time() - g ? 0.04 : 0.02;
                            if (b.speedx && (r = Math.floor(b.lastscrollx - b.speedx * (1 - b.demulxy)), b.lastscrollx = r, 0 > r || r > p)) c = 0.1;
                            if (b.speedy && (t = Math.floor(b.lastscrolly - b.speedy * (1 - b.demulxy)), b.lastscrolly = t, 0 > t || t > a)) c = 0.1;
                            b.demulxy = Math.min(1, b.demulxy + c);
                            b.nc.synched("domomentum2d", function () {
                                b.speedx && (b.nc.getScrollLeft() != b.chkx && b.stop(), b.chkx = r, b.nc.setScrollLeft(r));
                                b.speedy && (b.nc.getScrollTop() != b.chky && b.stop(), b.chky = t, b.nc.setScrollTop(t));
                                b.timer || (b.nc.hideCursor(),
                                    b.doSnapy(r, t))
                            });
                            1 > b.demulxy ? b.timer = setTimeout(s, d) : (b.stop(), b.nc.hideCursor(), b.doSnapy(r, t))
                        };
                    s()
                } else b.doSnapy(b.nc.getScrollLeft(), b.nc.getScrollTop())
            }
        },
        w = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function (g, b, h) {
            return (b = e.data(g, "__nicescroll") || !1) && b.ishwscroll ? b.getScrollTop() : w.call(g)
        },
        set: function (g, b) {
            var h = e.data(g, "__nicescroll") || !1;
            h && h.ishwscroll ? h.setScrollTop(parseInt(b)) : w.call(g, b);
            return this
        }
    };
    e.fn.scrollTop = function (g) {
        if ("undefined" == typeof g) {
            var b = this[0] ? e.data(this[0],
                "__nicescroll") || !1 : !1;
            return b && b.ishwscroll ? b.getScrollTop() : w.call(this)
        }
        return this.each(function () {
            var b = e.data(this, "__nicescroll") || !1;
            b && b.ishwscroll ? b.setScrollTop(parseInt(g)) : w.call(e(this), g)
        })
    };
    var A = e.fn.scrollLeft;
    e.cssHooks.pageXOffset = {
        get: function (g, b, h) {
            return (b = e.data(g, "__nicescroll") || !1) && b.ishwscroll ? b.getScrollLeft() : A.call(g)
        },
        set: function (g, b) {
            var h = e.data(g, "__nicescroll") || !1;
            h && h.ishwscroll ? h.setScrollLeft(parseInt(b)) : A.call(g, b);
            return this
        }
    };
    e.fn.scrollLeft = function (g) {
        if ("undefined" ==
            typeof g) {
            var b = this[0] ? e.data(this[0], "__nicescroll") || !1 : !1;
            return b && b.ishwscroll ? b.getScrollLeft() : A.call(this)
        }
        return this.each(function () {
            var b = e.data(this, "__nicescroll") || !1;
            b && b.ishwscroll ? b.setScrollLeft(parseInt(g)) : A.call(e(this), g)
        })
    };
    var B = function (g) {
        var b = this;
        this.length = 0;
        this.name = "nicescrollarray";
        this.each = function (e) {
            for (var g = 0, a = 0; g < b.length; g++) e.call(b[g], a++);
            return b
        };
        this.push = function (e) {
            b[b.length] = e;
            b.length++
        };
        this.eq = function (e) {
            return b[e]
        };
        if (g)
            for (var h = 0; h < g.length; h++) {
                var k =
                    e.data(g[h], "__nicescroll") || !1;
                k && (this[this.length] = k, this.length++)
            }
        return this
    };
    (function (e, b, h) {
        for (var k = 0; k < b.length; k++) h(e, b[k])
    })(B.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function (e, b) {
        e[b] = function () {
            var e = arguments;
            return this.each(function () {
                this[b].apply(this, e)
            })
        }
    });
    e.fn.getNiceScroll = function (g) {
        return "undefined" == typeof g ? new B(this) : this[g] && e.data(this[g], "__nicescroll") || !1
    };
    e.extend(e.expr[":"], {
        nicescroll: function (g) {
            return e.data(g, "__nicescroll") ?
                !0 : !1
        }
    });
    e.fn.niceScroll = function (g, b) {
        "undefined" == typeof b && ("object" == typeof g && !("jquery" in g)) && (b = g, g = !1);
        var h = new B;
        "undefined" == typeof b && (b = {});
        g && (b.doc = e(g), b.win = e(this));
        var k = !("doc" in b);
        !k && !("win" in b) && (b.win = e(this));
        this.each(function () {
            var g = e(this).data("__nicescroll") || !1;
            g || (b.doc = k ? e(this) : b.doc, g = new N(b, e(this)), e(this).data("__nicescroll", g));
            h.push(g)
        });
        return 1 == h.length ? h[0] : h
    };
    window.NiceScroll = {
        getjQuery: function () {
            return e
        }
    };
    e.nicescroll || (e.nicescroll = new B, e.nicescroll.options =
        G)
});

/**
* jquery.matchHeight-min.js v0.5.1
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function(b){b.fn.matchHeight=function(a){if(1>=this.length)return this;a="undefined"!==typeof a?a:!0;b.fn.matchHeight._groups.push({elements:this,byRow:a});b.fn.matchHeight._apply(this,a);return this};b.fn.matchHeight._apply=function(a,d){var c=b(a),e=[c];d&&(c.css({display:"block","padding-top":"0","padding-bottom":"0","border-top":"0","border-bottom":"0",height:"100px"}),e=k(c),c.css({display:"","padding-top":"","padding-bottom":"","border-top":"","border-bottom":"",height:""}));b.each(e,function(a,
c){var d=b(c),e=0;d.each(function(){var a=b(this);a.css({display:"block",height:""});a.outerHeight(!1)>e&&(e=a.outerHeight(!1))});d.each(function(){var a=b(this),c=0;"border-box"!==a.css("box-sizing")&&(c+=f(a.css("border-top-width"))+f(a.css("border-bottom-width")),c+=f(a.css("padding-top"))+f(a.css("padding-bottom")));a.css("height",e-c)})});return this};b.fn.matchHeight._applyDataApi=function(){var a={};b("[data-match-height], [data-mh]").each(function(){var d=b(this),c=d.attr("data-match-height");
a[c]=c in a?a[c].add(d):d});b.each(a,function(){this.matchHeight(!0)})};b.fn.matchHeight._groups=[];var g=-1;b.fn.matchHeight._update=function(a){if(a&&"resize"===a.type){a=b(window).width();if(a===g)return;g=a}b.each(b.fn.matchHeight._groups,function(){b.fn.matchHeight._apply(this.elements,this.byRow)})};b(b.fn.matchHeight._applyDataApi);b(window).bind("load resize orientationchange",b.fn.matchHeight._update);var k=function(a){var d=null,c=[];b(a).each(function(){var a=b(this),g=a.offset().top-f(a.css("margin-top")),
h=0<c.length?c[c.length-1]:null;null===h?c.push(a):1>=Math.floor(Math.abs(d-g))?c[c.length-1]=h.add(a):c.push(a);d=g});return c},f=function(a){return parseFloat(a)||0}})(jQuery);

/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return}b=a.extend(g.options,b);g.destroy(!0)}g=new q(this,c,b);d.data("backstretch",g)})};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch")};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5E3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize())},this))};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a)}catch(h){}return this},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c])})});b.resize()}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1)},pause:function(){this.paused=!0;return this},resume:function(){this.paused=!1;this.next();return this},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next()},this),this.options.duration));return this},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch")}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k)})(jQuery,window);

/*
* jquery.gmap
* Version 2.1.5 2013-10-30
* @requires jQuery >= 1.6.1 or later
*
* Homepage: http://labs.mario.ec/jquery-gmap/
* Author: Mario Estrada <me@mario.ec>
* License: MIT
*/
!function(a){a.fn.gMap=function(b,c){switch(b){case"addMarker":return a(this).trigger("gMap.addMarker",[c.latitude,c.longitude,c.content,c.icon,c.popup]);case"centerAt":return a(this).trigger("gMap.centerAt",[c.latitude,c.longitude,c.zoom]);case"clearMarkers":return a(this).trigger("gMap.clearMarkers")}var d=a.extend({},a.fn.gMap.defaults,b);return this.each(function(){var b=new google.maps.Map(this);a(this).data("gMap.reference",b);var c=new google.maps.Geocoder;d.address?c.geocode({address:d.address},function(a){a&&a.length&&b.setCenter(a[0].geometry.location)}):d.latitude&&d.longitude?b.setCenter(new google.maps.LatLng(d.latitude,d.longitude)):a.isArray(d.markers)&&d.markers.length>0?d.markers[0].address?c.geocode({address:d.markers[0].address},function(a){a&&a.length>0&&b.setCenter(a[0].geometry.location)}):b.setCenter(new google.maps.LatLng(d.markers[0].latitude,d.markers[0].longitude)):b.setCenter(new google.maps.LatLng(34.885931,9.84375)),b.setZoom(d.zoom),b.setMapTypeId(google.maps.MapTypeId[d.maptype]);var e={scrollwheel:d.scrollwheel,disableDoubleClickZoom:!d.doubleclickzoom};d.controls===!1?a.extend(e,{disableDefaultUI:!0}):0!==d.controls.length&&a.extend(e,d.controls,{disableDefaultUI:!0}),b.setOptions(e);var f,g,h=new google.maps.Marker;f=new google.maps.MarkerImage(d.icon.image),f.size=new google.maps.Size(d.icon.iconsize[0],d.icon.iconsize[1]),f.anchor=new google.maps.Point(d.icon.iconanchor[0],d.icon.iconanchor[1]),h.setIcon(f),d.icon.shadow&&(g=new google.maps.MarkerImage(d.icon.shadow),g.size=new google.maps.Size(d.icon.shadowsize[0],d.icon.shadowsize[1]),g.anchor=new google.maps.Point(d.icon.shadowanchor[0],d.icon.shadowanchor[1]),h.setShadow(g)),a(this).bind("gMap.centerAt",function(a,c,d,e){e&&b.setZoom(e),b.panTo(new google.maps.LatLng(parseFloat(c),parseFloat(d)))});var i=[];a(this).bind("gMap.clearMarkers",function(){for(;i[0];)i.pop().setMap(null)});var j;a(this).bind("gMap.addMarker",function(a,c,e,f,g,k){var l,m,n=new google.maps.LatLng(parseFloat(c),parseFloat(e)),o=new google.maps.Marker({position:n});if(g?(l=new google.maps.MarkerImage(g.image),l.size=new google.maps.Size(g.iconsize[0],g.iconsize[1]),l.anchor=new google.maps.Point(g.iconanchor[0],g.iconanchor[1]),o.setIcon(l),g.shadow&&(m=new google.maps.MarkerImage(g.shadow),m.size=new google.maps.Size(g.shadowsize[0],g.shadowsize[1]),m.anchor=new google.maps.Point(g.shadowanchor[0],g.shadowanchor[1]),h.setShadow(m))):(o.setIcon(h.getIcon()),o.setShadow(h.getShadow())),f){"_latlng"===f&&(f=c+", "+e);var p=new google.maps.InfoWindow({content:d.html_prepend+f+d.html_append});google.maps.event.addListener(o,"click",function(){j&&j.close(),p.open(b,o),j=p}),k&&google.maps.event.addListenerOnce(b,"tilesloaded",function(){p.open(b,o)})}o.setMap(b),i.push(o)});for(var k,l=this,m=function(b){return function(c){c&&c.length>0&&a(l).trigger("gMap.addMarker",[c[0].geometry.location.lat(),c[0].geometry.location.lng(),b.html,b.icon,b.popup])}},n=0;n<d.markers.length;n++)k=d.markers[n],k.address?("_address"===k.html&&(k.html=k.address),c.geocode({address:k.address},m(k))):a(this).trigger("gMap.addMarker",[k.latitude,k.longitude,k.html,k.icon,k.popup])})},a.fn.gMap.defaults={address:"",latitude:0,longitude:0,zoom:1,markers:[],controls:[],scrollwheel:!1,doubleclickzoom:!0,maptype:"ROADMAP",html_prepend:'<div class="gmap_marker">',html_append:"</div>",icon:{image:"http://www.google.com/mapfiles/marker.png",shadow:"http://www.google.com/mapfiles/shadow50.png",iconsize:[20,34],shadowsize:[37,34],iconanchor:[9,34],shadowanchor:[6,34]}}}(jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 *
*/
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}});