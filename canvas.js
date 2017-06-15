var icon = {
	replayIcon: function () {
		var replayIcon = document.querySelector('#replayIcon');
		var ctx = replayIcon.getContext('2d');
		ctx.beginPath();
		ctx.arc(25,25,8,0,Math.PI*3/2,false);
		ctx.moveTo(33,25);
		ctx.lineTo(39,25);
		ctx.arc(25,25,14,0,Math.PI*3/2,false);
		ctx.lineTo(25,11);
		ctx.lineTo(25,4);
		ctx.lineTo(32,14);
		ctx.lineTo(25,24);
		ctx.lineTo(25,17);
		ctx.strokeStyle = '#09c';
		ctx.stroke();
	},
};