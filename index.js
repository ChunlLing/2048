window.onload = function () {
	game.start();
	window.onkeydown = function (e) {
		switch (e.keyCode) {
			case 37:
				game.moveLeft();
				break; 
			case 38:
				break;
			case 39:
				break;
			case 40:
				break;
		}
	};
};