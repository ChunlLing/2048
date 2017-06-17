var icon = {
	replayIcon: function (selector, color, lineWidth) {
		var replayIcon = document.querySelector(selector);
		var ctx = replayIcon.getContext('2d');
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth ? lineWidth : 1;
		ctx.beginPath();
		ctx.arc(25,28,8,0,Math.PI*3/2,false);
		ctx.moveTo(33,28);
		ctx.lineTo(39,28);
		ctx.arc(25,28,14,0,Math.PI*3/2,false);
		ctx.lineTo(25,14);
		ctx.lineTo(25,7);
		ctx.lineTo(32,17);
		ctx.lineTo(25,27);
		ctx.lineTo(25,20);
		ctx.stroke();
	},
};