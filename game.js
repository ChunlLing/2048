var game = {
	data: [],
	rowNum: 4,
	colNum: 4,
	score: 0,
	RUNNING: true,
	GAMEOVER: false,
	state: this.RUNNING,

	isFull: function () {
		for (var i = 0; i < this.rowNum; i++) {
			for (var j = 0; j < this.colNum; j++) {
				if (this.data[this.rowNum][colNum] == 0) {
					return false;
				}
			}
		}
		return true;
	},

	isGameOver: function () {
		if (!isFull()) {
			return false;
		}
		for (var i = 0; i < this.rowNum-1; i++) {
			for (var j = 0; j < this.colNum-1; j++) {
				if (this.data[i][j] == this.data[i][j-1]) {
					return false;
				}
				if (this.data[i][j] == this.data[i-1][j]) {
					return false;
				}
			}
		}
		this.state = GAMEOVER;
		return true;
	},

	start: function () {
		for (var i = 0; i < this.rowNum; i++) {
			this.data[i] = [];
			for (var j = 0; j < this.colNum; j++) {
				this.data[i][j] = 0;
			}
		}
		this.randomNum();
		this.updateView();
	},

	randomNum: function () {
		var rowIndex, colIndex;
		while(true) {
			rowIndex = Math.floor(Math.random()*4);
			colIndex = Math.floor(Math.random()*4);
			if (this.data[rowIndex][colIndex] == 0) {
				this.data[rowIndex][colIndex] = (Math.random() > 0.4) ? 2 : 4;
				break;
			}
		}
	},

	updateView: function () {
		var cells = document.querySelectorAll('#gnum .cell');
		for (var i = 0; i < this.rowNum; i++) {
			for (var j = 0; j < this.colNum; j++) {
				if (this.data[i][j] == 0) {
					cells[i*4+j].innerHTML = '';
				} else {
					cells[i*4+j].innerHTML = this.data[i][j];
					cells[i*4+j].className = 'cell num' + this.data[i][j];
				}
			}
		}
	},
};
window.onload = function () {
	game.start();
	console.log('game.start() success');
};

/*
 [
 	1 2 3 4
 	5 6 7 8
 	9 0 1 2
 	3 4 5 6
 ]

*/