var game = {
	data: [],
	rowNum: 4,
	colNum: 4,
	score: 0,
	RUNNING: true,
	GAMEOVER: false,
	state: this.RUNNING,
	direct: 0,
	/*
		1 左
		2 右
		3 上
		4 下
	*/

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
				if (this.data[i][j] == this.data[i+1][j]) {
					return false;
				}
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

	changeScore: function (i, j, next) {
		var num;
		switch (this.direct) {
			case 1:
			case 2:
				num = this.data[i][next];
				break;
			case 3:
			case 4:
				num = this.data[next][j];
				break;
		}
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
		switch (this.direct) {
			case 1:
			case 2:
				this.data[i][next] = 0;
				break;
			case 3:
			case 4:
				this.data[next][j] = 0;
				break;
		}
		
		for (var value of document.querySelectorAll('.score')) {
			value.innerHTML = this.score;
		};
	},

	moveLeft: function (direct) {
		this.direct = direct;
		var oldData, newData;
		oldData = this.data.toString();
		switch (this.direct) {
			case 1:
				// 左
				for (var i = 0; i < this.rowNum; i++) {
					for (var j = 0; j < this.colNum; j++) {
						var nextNotNull = this.getRightNext(i, j);
						if (nextNotNull != -1) {
							if (this.data[i][j] == 0) {
								this.data[i][j] = this.data[i][nextNotNull];
								this.data[i][nextNotNull] = 0;
							} else if (this.data[i][nextNotNull] == this.data[i][j]) {
								this.changeScore(i,j,nextNotNull);
							}
						}
					}
				}
				break;
			case 2:
				// 右
				for (var i = 0; i < this.rowNum; i++) {
					for (var j = this.colNum-1; j >= 0; j--) {
						var nextNotNull = this.getRightNext(i, j);
						if (nextNotNull != -1) {
							if (this.data[i][j] == 0) {
								this.data[i][j] = this.data[i][nextNotNull];
							} else if (this.data[i][nextNotNull] == this.data[i][j]) {
								this.changeScore(i,j,nextNotNull);
							}
							this.data[i][nextNotNull] = 0;
						}
					}
				}
				break;
			case 3:
				for (var i = 0; i < this.colNum; i++) {
					for (var j = 0; j < this.rowNum; j++) {
						var nextNotNull = this.getRightNext(j, i);
						if (nextNotNull != -1) {
							if (this.data[j][i] == 0) {
								this.data[j][i] = this.data[nextNotNull][i];
								this.data[nextNotNull][i] = 0;
							} else if (this.data[nextNotNull][i] == this.data[j][i]) {
								this.changeScore(j,i,nextNotNull);
							}
						}
					}
				}
				break;
			case 4:
				for (var i = 0; i < this.colNum; i++) {
					for (var j = this.rowNum-1; j >= 0; j--) {
						var nextNotNull = this.getRightNext(j, i);
						if (nextNotNull != -1) {
							if (this.data[j][i] == 0) {
								this.data[j][i] = this.data[nextNotNull][i];
							} else if (this.data[nextNotNull][i] == this.data[j][i]) {
								this.changeScore(j,i,nextNotNull);
							}
							this.data[nextNotNull][i] = 0;
						}
					}
				}
				break;
		}

		newData = this.data.toString();
		// if (newData != oldData) {
			if (!this.isGameOver()) {
				this.randomNum();
				this.updateView();
			} else {
				document.querySelector('#gameOver').style.display = 'block';
			}
		// }
	},

	getRightNext: function (rowIndex, colIndex) {
		switch (this.direct) {
			case 1:
				for (var i = colIndex; i < this.colNum-1; i++) {
					if (this.data[rowIndex][i+1] != 0) {
						return i+1;
					}
				}
				break;
			case 2:
				for (var i = colIndex; i > 0; i--) {
					if (this.data[rowIndex][i-1] != 0) {
						return i-1;
					}
				}
				break;
			case 3:
				for (var i = rowIndex; i < this.rowNum-1; i++) {
					if (this.data[i+1][colIndex] != 0) {
						return i+1;
					}
				}
				break;
			case 4:
				for (var i = rowIndex; i > 0; i--) {
					if (this.data[i-1][colIndex] != 0) {
						return i-1;
					}
				}
				break;
		}
		return -1;
	}
};

