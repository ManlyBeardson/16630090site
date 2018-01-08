var audioElement;

$(function()
{
	console.log("web page loaded")//tells me the javascript is linked correctly
	if(localStorage && localStorage.getItem('background'))
	{
		console.log("local storage contains a background")//these tell me if it has at least found the local storage item
		var back = localStorage.getItem('background');//retreives the local storage item
		$('body').css("background-color",back);//sets the background colour appropriately 
		$('#setBack').val(back);//sets the customiser to reflect the current scheme
	}
	if(localStorage && localStorage.getItem('buttons'))
	{
		console.log("local storage contains a button")
		var butt = localStorage.getItem('buttons');
		$('.button').css("background-color",butt);
		$('nav').css("background-color", butt);
		$('#setButt').val(butt);
	}
	if(localStorage && localStorage.getItem('text'))
	{
		console.log("local storage contains a text");
		var tex = localStorage.getItem('text');
		$('body').css("color",tex);
		$('#setText').val(tex);
	}
	$('#setTheme').click(function()
	{
		localStorage.setItem('background', $('#setBack').val());//these three set the local storage items to the current colour input values, once the set theme button is clicked
		localStorage.setItem('buttons', $('#setButt').val());
		localStorage.setItem('text', $('#setText').val());
		$('body').css("background-color", $('#setBack').val());//these implement the colour scheme present in the colour input fields
		$('.button').css("background-color", $('#setButt').val());
		$('nav').css("background-color", $('#setButt').val());
		$('body').css("color", $('#setText').val());
	});
	$('#clearTheme').click(function()
	{
		localStorage.setItem('background', '#3a3a3a');//by clicking Clear Theme, the colour scheme is reset to the original style
		localStorage.setItem('buttons', '#139907');
		localStorage.setItem('text', '#139907');
		$('body').css("background-color", '#3a3a3a');
		$('.button').css("background-color", '#139907');
		$('nav').css("background-color", '#139907');
		$('body').css("color", '#139907');
	});
	$('.play').bind('click', (function(e)//each button with the play class has a different data-sound attribute, which is passed into the function below 
	{
		event.preventDefault();
		playSound($(this));
	}));
});

function playSound(btn)
{
	console.log("play");
	if(btn.hasClass('playing'))
	{
		$('.play').removeClass('playing').text('Play');
		audioElement.pause();//if the music is already playing, pause it and reset the button text
	} else 
	{
		if(audioElement)
		{
			audioElement.pause();//if there is another audio file playing, pause it
		}
		var soundfile = btn.data('sound');//soundfile becomes the data-sound attribute from the button
		console.log(soundfile);
		audioElement = new Audio(soundfile);
		$('.play').removeClass('playing');//removes the playing class from all other buttons just in case
		btn.addClass('playing').text('Stop');//adds the playing class to the current button, and changes its text
		audioElement.play();//plays the audio file
	}
	audioElement.onended = function()
	{
		$('.play').removeClass('playing').text('Play');//when the music has ceased, reset the button
	};
}