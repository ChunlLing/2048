window.onload = function () {
	game.start();
	window.onkeydown = function (e) {
		switch (e.keyCode) {
			case 37:
				game.moveLeft(1);
				break; 
			case 39:
				game.moveLeft(2);
				break;
			case 38:
				game.moveLeft(3);
				break;
			case 40:
				game.moveLeft(4);
				break;
		}
	};
};