$(function(){
	$.ajaxSetup({
		cache: false
	});
	
	// Initialize MessageHandler
	MessageHandler.addTarget("msgs", ".messages", {mHideF: true, timeout:10000});
	MessageHandler.setTarget("msgs");
	
	/************************/
	/**** EVENT HANDLERS ****/
	/************************/
	$(document).on("keypress", function(e){
		if(e.keyCode === 13 && $("#rsvpStep1 input[name='inviteCode']").is(":focus")){
			e.preventDefault();
			
			if($("a[name='enterCodeButton']").is(":visible")){
				submitCode();
			}
		}
	});
	
	$(document).on("click", "a[name='enterCodeButton']", function(e){
		e.preventDefault();
		submitCode();
	});
	
	$(document).on("click", ".familyMember input[type='checkbox']", function(e){
		var $chkbox = $(this);
		
		$chkbox.closest("label").toggleClass("selected", $chkbox.is(":checked"));
	});
	
	$(document).on("click", "a[name='submitRSVPButton']", function(e){
		e.preventDefault();
		
		toggleCodeInput(false);
		
		var $button = $(this);
		var members = $("#rsvpStep2 .familyMember").map(function(i,e){
			var $familyMember = $(this).find("input[type='checkbox']");
		
			return {
				name: $familyMember.data("name"),
				attending: $familyMember.prop("checked")
			};
		})
		
		var params = {
			code: ($("#rsvpStep1 input[name='inviteCode']").val() || "nocode").replace(/[^a-zA-Z0-9_\.\!\? ]+/g, ""),
			songRequest: $("#rsvpStep2 input[name='songRequest']").val(),
			rsvpMessage: $("#rsvpStep2 textarea[name='rsvpMessage']").val(),
			members: members.toArray()
		};
		
		$.ajax({
			url: "./RSVP",
			type: "POST", 
			data: JSON.stringify(params), 
			headers: {
				"content-type": "application/json",
			},
			success: function(data, status, xhr){
				if(!data.success){
					MessageHandler.displayMessage({type:"error", message:"Something went wrong. Please contact Enrique. He'll know what to do."}, "msgs");
				}
				else{
					$("#rsvpStep1").slideUp(300);
					$("#rsvpStep2").slideUp(300, function(){
						renderRSVPStep(3, {});
					});
				}
			}
		});
	});
	
	/*******************/
	/**** FUNCTIONS ****/
	/*******************/
	var renderRSVPStep = function(num, data){
		var templatePath = "./templates/rsvpStep" + num + ".mustache.html"
		
		$.get(templatePath, function(tmpl){
			var t = $(tmpl).html()
			var rh = Mustache.render(t, data);
		
			$("#rsvpStep2")
				.html(rh)
				.slideDown(300);
		});
	}
	
	var toggleCodeInput = function(enabled){
		var $button = $("a[name='enterCodeButton']");
		var fadeSpeed = 200;
		
		if(!enabled){
			$button.fadeOut(fadeSpeed);
		}
		else{
			$button.fadeIn(fadeSpeed);
		}
		$("#rsvpStep1 input[name='inviteCode']").prop("disabled", !enabled);
	}
	
	var submitCode = function (){
		toggleCodeInput(false);
		
		var $codeField = $("#rsvpStep1 input[name='inviteCode']")
		var code = $codeField.val() || "nocode";
		
		$.ajax({
			url: "./RSVP-1/" + code,
			type: "GET", 
			data: {}, 
			success: function(data, status, xhr){
				if(!data || data.length == 0){
					MessageHandler.displayMessage({type:"error", message:"No family with that code found."}, "msgs");
					
					toggleCodeInput(true);
				}
				else{
					MessageHandler.clearMessage();
					renderRSVPStep(2, data[0]);
				}
			}
		});
	}
});