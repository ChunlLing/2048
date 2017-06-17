window.onload = function () {
	game.start();
	icon.replayIcon('#game .replayIcon', '#000', 2);
	icon.replayIcon('#gameOver .replayIcon', '#09c');
	for (var value of document.querySelectorAll('.score')) {
		value.innerHTML = game.score;
	};
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
	document.querySelector('#gameOver').onclick = function () {
		game.start();
		document.querySelector('#gameOver').style.display = 'none';
	};
};