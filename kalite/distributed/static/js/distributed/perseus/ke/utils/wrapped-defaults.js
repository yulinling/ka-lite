(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DEFAULT_TOLERANCE=1e-9,EPSILON=Math.pow(2,-42),knumber=KhanUtil.knumber={DEFAULT_TOLERANCE:DEFAULT_TOLERANCE,EPSILON:EPSILON,is:function(n){return _.isNumber(n)&&!_.isNaN(n)},equal:function(n,r,u){return null==n||null==r?n===r:(null==u&&(u=DEFAULT_TOLERANCE),Math.abs(n-r)<u)},sign:function(n,r){return knumber.equal(n,0,r)?0:Math.abs(n)/n},round:function(n,r){var u=Math.pow(10,r);return Math.round(n*u)/u},roundTo:function(n,r){return Math.round(n/r)*r},floorTo:function(n,r){return Math.floor(n/r)*r},ceilTo:function(n,r){return Math.ceil(n/r)*r},isInteger:function(n,r){return knumber.equal(Math.round(n),n,r)},toFraction:function(n,r,u){u=u||1e3,r=r||EPSILON;for(var t=[1,0],o=[0,1],e=Math.floor(n),a=n-e;o[0]<=u;){if(knumber.equal(t[0]/o[0],n,r))return[t[0],o[0]];t=[e*t[0]+t[1],t[0]],o=[e*o[0]+o[1],o[0]],e=Math.floor(1/a),a=1/a-e}return[n,1]}};module.exports=knumber;
},{}],2:[function(require,module,exports){
function arraySum(r){return _.reduce(r,function(r,t){return r+t},0)}function arrayProduct(r){return _.reduce(r,function(r,t){return r*t},1)}var knumber=require("./knumber.js"),kvector=KhanUtil.kvector={is:function(r,t){return _.isArray(r)?void 0!==t&&r.length!==t?!1:_.all(r,knumber.is):!1},normalize:function(r){return kvector.scale(r,1/kvector.length(r))},length:function(r){return Math.sqrt(kvector.dot(r,r))},dot:function(r,t){var n=_.toArray(arguments),e=_.zip.apply(_,n),o=_.map(e,arrayProduct);return arraySum(o)},add:function(){var r=_.toArray(arguments),t=_.zip.apply(_,r);return _.map(t,arraySum)},subtract:function(r,t){return _.map(_.zip(r,t),function(r){return r[0]-r[1]})},negate:function(r){return _.map(r,function(r){return-r})},scale:function(r,t){return _.map(r,function(r){return r*t})},equal:function(r,t,n){return _.all(_.zip(r,t),function(r){return knumber.equal(r[0],r[1],n)})},codirectional:function(r,t,n){return knumber.equal(kvector.length(r),0,n)||knumber.equal(kvector.length(t),0,n)?!0:(r=kvector.normalize(r),t=kvector.normalize(t),kvector.equal(r,t,n))},collinear:function(r,t,n){return kvector.codirectional(r,t,n)||kvector.codirectional(r,kvector.negate(t),n)},polarRadFromCart:function(r){var t=kvector.length(r),n=Math.atan2(r[1],r[0]);return 0>n&&(n+=2*Math.PI),[t,n]},polarDegFromCart:function(r){var t=kvector.polarRadFromCart(r);return[t[0],180*t[1]/Math.PI]},cartFromPolarRad:function(r,t){return _.isUndefined(t)&&(t=r[1],r=r[0]),[r*Math.cos(t),r*Math.sin(t)]},cartFromPolarDeg:function(r,t){return _.isUndefined(t)&&(t=r[1],r=r[0]),kvector.cartFromPolarRad(r,t*Math.PI/180)},rotateRad:function(r,t){var n=kvector.polarRadFromCart(r),e=n[1]+t;return kvector.cartFromPolarRad(n[0],e)},rotateDeg:function(r,t){var n=kvector.polarDegFromCart(r),e=n[1]+t;return kvector.cartFromPolarDeg(n[0],e)},angleRad:function(r,t){return Math.acos(kvector.dot(r,t)/(kvector.length(r)*kvector.length(t)))},angleDeg:function(r,t){return 180*kvector.angleRad(r,t)/Math.PI},projection:function(r,t){var n=kvector.dot(r,t)/kvector.dot(t,t);return kvector.scale(t,n)},round:function(r,t){return _.map(r,function(r,n){return knumber.round(r,t[n]||t)})},roundTo:function(r,t){return _.map(r,function(r,n){return knumber.roundTo(r,t[n]||t)})},floorTo:function(r,t){return _.map(r,function(r,n){return knumber.floorTo(r,t[n]||t)})},ceilTo:function(r,t){return _.map(r,function(r,n){return knumber.ceilTo(r,t[n]||t)})}};module.exports=kvector;
},{"./knumber.js":1}],3:[function(require,module,exports){
var pluck=function(r,c){return _.object(_.map(r,function(r,t){return[t,r[c]]}))},mapObject=function(r,c){var t={};return _.each(_.keys(r),function(e){t[e]=c(r[e],e)}),t},mapObjectFromArray=function(r,c){var t={};return _.each(r,function(r){t[r]=c(r)}),t};module.exports={pluck:pluck,mapObject:mapObject,mapObjectFromArray:mapObjectFromArray};
},{}],4:[function(require,module,exports){
function computePrefixedTransform(){var r=document.createElement("div"),n=["transform","msTransform","MozTransform","WebkitTransform","OTransform"],e=null;return _.each(n,function(n){"undefined"!=typeof r.style[n]&&(e=n)}),e}function computeCanUse3dTransform(){var r=document.createElement("div"),n=KhanUtil.getPrefixedTransform();return r.style[n]="translateZ(0px)",!!r.style[n]}var prefixedTransform=null,canUse3dTransform=null;$.extend(KhanUtil,{getPrefixedTransform:function(){return prefixedTransform=prefixedTransform||computePrefixedTransform()},getCanUse3dTransform:function(){return null==canUse3dTransform&&(canUse3dTransform=computeCanUse3dTransform()),canUse3dTransform}});
},{}],5:[function(require,module,exports){
var objective_=require("./objective_.js"),kvector=require("./kvector.js");require("./transform-helpers.js");var PASS_TO_RAPHAEL=["attr","animate"],WrappedDefaults=_.extend({transform:function(e){var t=KhanUtil.getPrefixedTransform();this.wrapper.style[t]=e},toFront:function(){var e=this.wrapper.parentNode;e&&e.appendChild(this.wrapper)},toBack:function(){var e=this.wrapper.parentNode;e.firstChild!==this.wrapper&&e.insertBefore(this.wrapper,e.firstChild)},remove:function(){this.visibleShape.remove(),$(this.wrapper).remove()},getMouseTarget:function(){return this.visibleShape[0]},moveTo:function(e){var t=kvector.subtract(this.graphie.scalePoint(e),this.graphie.scalePoint(this.initialPoint)),r=KhanUtil.getCanUse3dTransform(),i="translateX("+t[0]+"px) translateY("+t[1]+"px)"+(r?" translateZ(0)":"");this.transform(i)},hide:function(){this.visibleShape.hide()},show:function(){this.visibleShape.show()}},objective_.mapObjectFromArray(PASS_TO_RAPHAEL,function(e){return function(){this.visibleShape[e].apply(this.visibleShape,arguments)}}));module.exports=WrappedDefaults;
},{"./kvector.js":2,"./objective_.js":3,"./transform-helpers.js":4}]},{},[5]);