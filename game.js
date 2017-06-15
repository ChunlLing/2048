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
				if (this.data[i][j] == 0) {
					return false;
				}
			}
		}
		return true;
	},

	isGameOver: function () {
		if (!this.isFull()) {
			return false;
		}
		for (var i = 0; i < this.rowNum-1; i++) {
			for (var j = 0; j < this.colNum-1; j++) {
				if (this.data[i][j] == this.data[i][j+1]) {
					return false;
				}
/*				if (this.data[i][j] == this.data[i+1][j]) {
					return false;
				}*/
			}
		}
		this.state = this.GAMEOVER;
		icon.replayIcon();
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
					cells[i*4+j].className = 'cell';
				} else {
					cells[i*4+j].innerHTML = this.data[i][j];
					cells[i*4+j].className = 'cell num' + this.data[i][j];
				}
			}
		}
	},

	moveLeft: function () {
		var oldData, newData;
		oldData = this.data.toString();
		for (var i = 0; i < this.rowNum; i++) {
			for (var j = 0; j < this.colNum; j++) {
				var nextNotNull = this.getRightNext(i, j);
				if (nextNotNull != -1) {
					if (this.data[i][j] == 0) {
						this.data[i][j] = this.data[i][nextNotNull];
						this.data[i][nextNotNull] = 0;
					} else if (this.data[i][nextNotNull] == this.data[i][j]) {
						var num = this.data[i][nextNotNull];
						this.score += num == 2 ? 1 :
									  num == 4 ? 2 :
									  num == 8 ? 5 :
									  num == 16 ? 8 :
									  num == 32 ? 12 :
									  num == 64 ? 17 :
									  num == 128 ? 23 :
									  num == 512 ? 29 :
									  num == 1024 ? 36 :
									  num == 2048 ? 45 : 0;
						this.data[i][j] *= 2;
						this.data[i][nextNotNull] = 0;
						for (var value of document.querySelectorAll('.score')) {
							value.innerHTML = this.score;
						};
					}
				}
			}
		}
		newData = this.data.toString();
		//if (newData != oldData) {
			if (!this.isGameOver()) {
				this.randomNum();
				this.updateView();
			} else {
				document.querySelector('#gameOver').style.display = 'block';
			}
		//}
	},

	getRightNext: function (rowIndex, colIndex) {
		for (var i = colIndex; i < this.colNum-1; i++) {
			if (this.data[rowIndex][i+1] != 0) {
				return i+1;
			}
		}
		return -1;
	},
};

