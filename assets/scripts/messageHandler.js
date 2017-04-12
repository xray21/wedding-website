// JavaScript Document

// Version History
//  v0.6.9 -- 07/16/2014
//	  - Refactored "displayMessage" to respect "clearMessage"'s total operation time before displaying the message.
//	  - Modified "clearMessage" so that the target html content only empties after the animation has completed.
//	  - Added handling for target-specific showSpeed value
//	  - Added handling for target-specific hideSpeed value
//	 
//	v0.6.6 -- 07/10/2014
//	  - Added handling for target-specific timeOut speed value
//	  - Added the ability to specify a target in the displayMessageList function
//	  - Renamed "defMProps" to "settings"
//	  - Added a "defaults" variable to MessageHandler that maintains the default settings of the class.
//	  - Added "restoreDefaults" function.
// 
//	v0.6.5 -- 04/17/2014
//	  - Refactored displayMessage function to take a message object with the message type and message content as attributes instead of individual parameters of the function.
//	  - Added the ability to specify a target in the displayMessage function
//
//	v0.6.2 -- 04/16/2014
//	  - Added a flag to the displayMessage function to specify whether the message is temporary or not (if temporary, restores message that was previously there);
//	  - Changed displayMessage function to always clear the previous message from the target
//
//	v0.6.1 -- 04/15/2014
//	  - Added a check to refresh the jQuery selector object if the target's was empty before the displaying of the message
// 
//  v0.6 -- 04/11/2014
//	  - Refactored messageHandler class to use the "defMProp" associative array instead of individual properties
//    - Added setTargetProp function
//	  - Removed onLoad adds to messageType and placed them directly in mTypes object
//
//  v0.5.2 -- 04/10/2014
//	  - Added To-Do List
//
//  v0.5.1 -- 04/09/2014
//    - Changed clearMessage function to use a timeout to remove the html
//	  - Changed clearMessage function to allow the user to specify the specific target for which to clear the message.
//
//	v0.5 -- 04/08/2014
//	  - Refactored messageHandler class to allow for multiple targets, each with their own message properties
//	  - Removed timers property
//	  - Removed $wMsgWndw property
//	  - Added targets property
//    - Added addTarget, hasTarget, setTarget, and getTargetObj functions
//	  - Added messageHandler.css
//	  - Fixed some bugs with displayMessageList function
//
//	v0.3.1 -- 04/03/2014
//	  - Added displayMessageList function
//
//	v0.3 -- 04/03/2014
//	  - Removed all existing mutators 
//    - Added prop function to manage property mutation
//
//  v0.2 -- 04/03/2014
//	  - Removed mClass property
//	  - Added mTypes property
//	  - Added addMessageType function
//  
//	v0.1.1 -- 04/02/2014
//	  - Changed timeout to use lambda function for creation
//	  - Added hideMessageF property and mutator
//
//	v0.1 -- 03/28/2014
//	  - Created MessageHandler Class
//    - Added showSpeed, hideSpeed, timeOut, animation, mClass, $wMsgWndw properties and mutators
//    - Added displayMessage and clearMessage functions

// To-Do List
//
// -- Add handling for the speed and other default properties for each target
// -- Add handling for all properties to message types, not just color
// -- Allow messages of multiple types to exist within the same target
// -- Create constructor to set default properties
// -- Provide the ability to specify the target in the "displayMessage" and "displayMessageList" functions
// -- Restrict prop function to only those properties that already exist
// -- Allow for the creation / usage of custom animations
// -- Create a function for adding / appending messages instead of always replacing them

/** BEGIN MESSAGE HANDLER **/
var MessageHandler;

var messageHandler = function(){
	this.settings = {
		showSpeed: 100,
		hideSpeed: 100,
		timeOut: 5000,
		animation: "slide", //available: "slide", "fade", "none"
		mHideF: true
	};
	this.defaults = this.settings;
	this.mTypes = {
		error: {
			mColor: "#F30"
		},
		warning: {
			mColor: "#E87600"
		},
		informational: {
			mColor: "#09C"
		},
		success: {
			mColor: "#6C3"
		}
	};
	this.targets = [];
	this.curTargetId = "wMes";
	
	this.displayMessage = function(nMessageObj, targetId, tempMessage){
		if( tempMessage === undefined && (targetId === true || targetId === false) ){
			tempMessage = targetId
			targetId = undefined
		}
		var targetObj = this.getTargetObj((targetId? targetId: this.curTargetId));
		if(targetObj.$sel.length == 0){
			targetObj.$sel = $(targetObj.sel);
		}
		
		if(tempMessage){
			targetObj.pMessage = {
				type: (targetObj.curMType? targetObj.curMType: ""),
				message: targetObj.$sel.html()
			};
		}
		
		
		if(this.targetHasMessage(targetObj.name)){
			this.clearMessage(targetObj.name);
		}
		
		(function(nMessageObj, targetObj, mHandlerObj, targetId, tempMessage){
			var hideSpeed = (targetObj.hideSpeed !== undefined && targetObj.hideSpeed !== null)? targetObj.hideSpeed:mHandlerObj.settings.hideSpeed;
			
			setTimeout(function(){
				var anim = (targetObj.animation !== undefined && targetObj.animation !== null)? targetObj.animation: mHandlerObj.settings.animation;
				var showSpeed = (targetObj.showSpeed !== undefined && targetObj.showSpeed !== null)? targetObj.showSpeed:mHandlerObj.settings.showSpeed;
				
				if(mHandlerObj.mTypes[nMessageObj.type] !== undefined && mHandlerObj.mTypes[nMessageObj.type] !== null){
					targetObj.$sel.css("color", mHandlerObj.mTypes[nMessageObj.type].mColor);
				}
				
				targetObj.curMType = nMessageObj.type;
				targetObj.$sel.html(nMessageObj.message);
				
				switch(anim){
					case "slide":
						targetObj.$sel.slideDown(showSpeed); break;
					case "fade":
						targetObj.$sel.fadeIn(showSpeed); break;
					default:
						targetObj.$sel.show(); break;
				}
				
				(function(msgType, mHandlerObj, targetId, tempMessage){
					var targetObj = mHandlerObj.getTargetObj(targetId? targetId: mHandlerObj.curTargetId);
					var mHideF = (targetObj.mHideF !== undefined && targetObj.mHideF !== null)? targetObj.mHideF: mHandlerObj.settings.mHideF;
					var anim = (targetObj.animation !== undefined && targetObj.animation !== null)? targetObj.animation: mHandlerObj.settings.animation;
					
					if(targetObj.timer !== undefined && targetObj.timer !== null){
						clearTimeout(targetObj.timer);
					}
					if(mHideF || tempMessage){
						var timeOut = (targetObj.timeOut !== undefined && targetObj.timeOut !== null)? targetObj.timeOut:mHandlerObj.settings.timeOut;
						var hideSpeed = (targetObj.hideSpeed !== undefined && targetObj.hideSpeed !== null)? targetObj.hideSpeed:mHandlerObj.settings.hideSpeed;
						targetObj.timer = setTimeout( function(){ 
							switch(anim){
								case "slide":
									targetObj.$sel.slideUp(hideSpeed); break;
								case "fade":
									targetObj.$sel.fadeOut(hideSpeed); break;
								default:
									targetObj.$sel.hide(); break;
							}
							
							//04/16/2014 EST -- Added check for temporary message function
							if(tempMessage){
								mHandlerObj.displayMessage(targetObj.pMessage);
								if(mHideF){
									targetObj.pMessage = null;
								}
							}
							else{
								//04/09/2014 EST -- Changed to only remove the text after the animation has completed
								if(anim !== 'none'){
									(function(targetObj, mHandlerObj){
										var hideSpeed = (targetObj.hideSpeed !== undefined && targetObj.hideSpeed !== null? targetObj.hideSpeed:mHandlerObj.settings.hideSpeed);
										setTimeout(function(){targetObj.$sel.html(""); }, hideSpeed);
									})(targetObj, mHandlerObj);
								}
								else{
									targetObj.$sel.html("");
								}
							}
						}, timeOut )
					}
				})(nMessageObj.type, mHandlerObj, targetId, tempMessage);
			}, mHandlerObj.targetHasMessage(targetObj.name)?hideSpeed:0);
		})(nMessageObj, targetObj, this, targetId, tempMessage);
	}
	
	this.displayMessageList = function(type, messageArray, hasHeader, targetId){
		var messageStr = "";
		var sInd = 0;
		
		if(messageArray !== undefined && messageArray !== null && (Object.prototype.toString.call(messageArray) === "[object Array]")){
			if(messageArray.length > 1){
				if(hasHeader){
					messageStr += "" + messageArray[0] + "";
					sInd = 1;
				}
				messageStr += "<ul class='messageList'>"
				for (i=sInd; i<messageArray.length; i++){
					messageStr += "<li>" + messageArray[i] + "</li>";
				}
				messageStr += "</ul>";
			}
			else if(messageArray.length == 1){
			    messageStr = messageArray[0];
			}
			else{
				messageStr = "";
			}
		}
		
		var nMessage = {
			type: type,
			message: messageStr
		}
		this.displayMessage(nMessage, targetId);
	}
	
	this.appendMessageListItems = function(type, messageArray, targetId){
		var targetObj = this.getTargetObj(targetId);
		var hideSpeed = (targetObj.hideSpeed !== undefined && targetObj.hideSpeed !== null)? targetObj.hideSpeed:this.settings.hideSpeed;
		
		(function(targetObj, hideSpeed, type, messageArray, targetId){
			setTimeout(function(){
				if(!MessageHandler.targetHasMessage(targetId)){
					MessageHandler.displayMessageList(type, messageArray, false, targetId);
				}
				else{
					$eMessageList = targetObj.$sel.find(".messageList");
					
					if($eMessageList.length > 0){
						for(i=0; i<messageArray.length; i++){
							var li = "<li style='color:" + MessageHandler.mTypes[type].mColor + ";'>" + messageArray[i] + "</li>";
							$eMessageList.append(li);
						}
					}
					else{
						var eMessage = targetObj.$sel.html();
						var curType = targetObj.curMType;
						
						var messageStr = "<ul class='messageList'>"
						messageStr += "<li>" + eMessage + "</li>";
						for (i=0; i<messageArray.length; i++){
							messageStr += "<li style='color:" + MessageHandler.mTypes[type].mColor + ";'>" + messageArray[i] + "</li>";
						}
						messageStr += "</ul>";
						
						var nMessage = {
							type: curType,
							message: messageStr
						}
						
						targetObj.$sel.html(messageStr);
					}
				}
			}, hideSpeed);
		})(targetObj, hideSpeed, type, messageArray, targetId);
	}
	
	this.clearMessage = function(name){
		var refName = (name? name: this.curTargetId);
		var targetObj = this.getTargetObj(refName);
		if(targetObj.timer !== undefined && targetObj.timer !== null){
			clearTimeout(targetObj.timer);
		}
		var anim = (targetObj.animation !== undefined && targetObj.animation !== null)? targetObj.animation: this.settings.animation;
		var hideSpeed = (targetObj.hideSpeed !== undefined && targetObj.hideSpeed !== null)? targetObj.hideSpeed:this.settings.hideSpeed;
		
		switch(anim){
			case "slide":
				targetObj.$sel.slideUp(hideSpeed); break;
			case "fade":
				targetObj.$sel.fadeOut(hideSpeed); break;
			default:
				targetObj.$sel.hide(); break;
		}
		
		//07/16/2014 EST -- Changed to only remove the text after the animation has completed
		if(anim !== 'none'){
			(function(targetObj, hideSpeed){
				setTimeout(function(){targetObj.$sel.html(""); }, hideSpeed);
			})(targetObj, hideSpeed);
		}
		else{
			targetObj.$sel.html("");
		}
	}
	
	/***************************/
	/**** Target Management ****/
	/***************************/
	this.addTarget = function(name, selector, properties){
		var nTarget, sel;
		if(this.hasTarget(name)){
			nTarget = this.getTargetObj(name);
			if(selector !== undefined && selector !== null){
				nTarget.sel = selector;
				nTarget.$sel = $(nTarget.selector);
			}
		}
		else{
			sel = selector? selector: name;
			nTarget = {};
			nTarget.name = name;
			nTarget.sel = sel;
			nTarget.$sel = $(nTarget.sel);
			this.targets.push(nTarget);
		}
		
		this.setTargetProp(name, properties);
		return nTarget;
	}
	
	this.setTarget = function(name){
		if(!this.hasTarget(name)){
			this.addTarget(name);
		}
		this.curTargetId = name;
	}
	
	this.setTargetProp = function(name, props){
		var target = this.getTargetObj(name);
		
		if(target !== undefined && target !== null){
			if(props !== undefined && props !== null && Object.prototype.toString.call(props) === "[object Object]"){
				var keys = Object.keys(props);
				for(i=0;i<keys.length;i++){
					var propName = keys[i];
					var propValue = props[propName];
					target[propName] = propValue;
				}
			}
		}
	}
	
	this.hasTarget = function(name){
		var foundF = false;
		for(i=0;i<this.targets.length;i++){
			if(this.targets[i].name == name){
				foundF = true;
				break;
			}
		}
		return foundF;
	}
	
	this.getTargetObj = function(name){
		var obj = null;
		for(i=0;i<this.targets.length;i++){
			if(this.targets[i].name == name){
				obj = this.targets[i];
				break;
			}
		}
		return obj;
	}
	
	this.targetHasMessage = function(name){
		var targetId = (name !== undefined && name !== null? name:this.curTargetId);
		var targetObj = this.getTargetObj(targetId);
		
		if(targetObj.$sel.html() !== null && targetObj.$sel.html() !== undefined && targetObj.$sel.html().trim() !== ""){
			return true;
		}
		else{
			return false;
		}
	}
	/***************************/
	/** End Target Management **/
	/***************************/
	
	this.prop = function(obj, value){
		if(typeof obj === "string" && value !== undefined){
			this.settings[obj] = value;
		}
		else{
			if(typeof obj === "string" && this.settings[obj] !== undefined){
				return this.settings[obj];
			}
			else if(Object.prototype.toString.call(obj) === "[object Object]"){
				var keys = Object.keys(obj);
				for(i=0;i<keys.length;i++){
					var propName = keys[i];
					var propValue = obj[propName];
					this.settings[propName] = propValue;
				}
			}
		}
	}
	
	this.addMessageType = function(mType, mColor){
		var newType = {};
		newType.mColor = mColor;
		this.mTypes[mType] = newType;
	}
	
	this.restoreDefaults = function(){
		this.settings = this.defaults;
	}
}
$(function(){
	MessageHandler = new messageHandler();
});
/** END MESSAGE HANDLER **/