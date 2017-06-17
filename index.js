window.onload = function () {
	icon.playIcon('#gameStart .playIcon', '#09c');
	icon.replayIcon('#game .replayIcon', '#000', 2);
	icon.replayIcon('#gameOver .replayIcon', '#09c');
	document.querySelector('#gameStart').style.display = 'block';
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
	document.querySelector('#gameStart .playIcon').onclick = function () {
		game.start();
		document.querySelector('#gameStart').style.display = 'none';
	};
	document.querySelector('#gameOver .replayIcon').onclick = function () {
		game.start();
		document.querySelector('#gameOver').style.display = 'none';
	};
	document.querySelector('#game .replayIcon').onclick = function () {
		game.start();
	};
};