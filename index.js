window.onload = function () {
	game.start();
	window.onkeydown = function (e) {
		switch (e.keyCode) {
			case 37:
				game.move(1);
				break; 
			case 39:
				game.move(2);
				break;
			case 38:
				game.move(3);
				break;
			case 40:
				game.move(4);
				break;
		}
	};
};