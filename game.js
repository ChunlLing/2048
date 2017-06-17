var game = {
	data: [],
	rowNum: 4,
	colNum: 4,
	direct: 0,
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
		for (var i = 0; i < this.rowNum; i++) {
			for (var j = 0; j < this.colNum; j++) {
				if (this.data[i][j] == 2048) {
					this.state = this.GAMEOVER;
					return true;
				}
			}
		}
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
		return true;
	},

	start: function () {
		this.score = 0;
		this.state = this.RUNNING;
		for (var i = 0; i < this.rowNum; i++) {
			this.data[i] = [];
			for (var j = 0; j < this.colNum; j++) {
				this.data[i][j] = 0;
			}
		}
		this.randomNum();
		this.randomNum();
		this.updateView();
	},

	randomNum: function () {
		var rowIndex, colIndex;
		while(true) {
			rowIndex = Math.floor(Math.random()*this.rowNum);
			colIndex = Math.floor(Math.random()*this.colNum);
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
					cells[i*this.rowNum+j].innerHTML = '';
					cells[i*this.rowNum+j].className = 'cell';
				} else {
					cells[i*this.rowNum+j].innerHTML = this.data[i][j];
					cells[i*this.rowNum+j].className = 'cell num' + this.data[i][j];
				}
			}
		}
		for (var value of document.querySelectorAll('.score')) {
			value.innerHTML = this.score;
		};
		if (this.isGameOver()) {
			document.querySelector('#gameOver').style.display = 'block';
		}
	},

	changeData: function (i, j, next) {
		var num;
		switch (this.direct) {
			case 1:
			case 2:
				num = this.data[i][next];
				this.data[i][next] = 0;
				break;
			case 3:
			case 4:
				num = this.data[next][j];
				this.data[next][j] = 0;
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
	},

	getNextNum: function (rowIndex, colIndex) {
		switch (this.direct) {
			case 1:
				for (var i = colIndex+1; i < this.colNum; i++) {
					if (this.data[rowIndex][i] != 0) {
						return i;
					}
				}
				break;
			case 2:
				for (var i = colIndex-1; i >= 0; i--) {
					if (this.data[rowIndex][i] != 0) {
						return i;
					}
				}
				break;
			case 3:
				for (var i = rowIndex+1; i < this.rowNum; i++) {
					if (this.data[i][colIndex] != 0) {
						return i;
					}
				}
				break;
			case 4:
				for (var i = rowIndex-1; i >= 0; i--) {
					if (this.data[i][colIndex] != 0) {
						return i;
					}
				}
				break;
		}
		return -1;
	},

	move: function (direct) {
		this.direct = direct;
		var oldData, newData;
		oldData = this.data.toString();
		switch (this.direct) {
			case 1:
				for (var i = 0; i < this.rowNum; i++) {
					for (var j = 0; j < this.colNum-1; j++) {
						var nextNotNull = this.getNextNum(i, j);
						if (nextNotNull == -1) {
							break;
						} else {
							if (this.data[i][j] == 0) {
								this.data[i][j] = this.data[i][nextNotNull];
								this.data[i][nextNotNull] = 0;
								j--;
							} else if (this.data[i][nextNotNull] == this.data[i][j]) {
								this.changeData(i,j,nextNotNull);
							}
						}
					}
				}
				break;
			case 2:
				for (var i = 0; i < this.rowNum; i++) {
					for (var j = this.colNum-1; j > 0; j--) {
						var nextNotNull = this.getNextNum(i, j);
						if (nextNotNull == -1) {
							break;
						} else {
							if (this.data[i][j] == 0) {
								this.data[i][j] = this.data[i][nextNotNull];
								this.data[i][nextNotNull] = 0;
								j++;
							} else if (this.data[i][nextNotNull] == this.data[i][j]) {
								this.changeData(i,j,nextNotNull);
							}
						}
					}
				}
				break;
			case 3:
				for (var i = 0; i < this.colNum; i++) {
					for (var j = 0; j < this.rowNum-1; j++) {
						var nextNotNull = this.getNextNum(j, i);
						if (nextNotNull == -1) {
							break;
						} else {
							if (this.data[j][i] == 0) {
								this.data[j][i] = this.data[nextNotNull][i];
								this.data[nextNotNull][i] = 0;
								j--;
							} else if (this.data[nextNotNull][i] == this.data[j][i]) {
								this.changeData(j,i,nextNotNull);
							}
						}
					}
				}
				break;
			case 4:
				for (var i = 0; i < this.colNum; i++) {
					for (var j = this.rowNum-1; j > 0; j--) {
						var nextNotNull = this.getNextNum(j, i);
						if (nextNotNull == -1) {
							break;
						} else {
							if (this.data[j][i] == 0) {
								this.data[j][i] = this.data[nextNotNull][i];
								this.data[nextNotNull][i] = 0;
								j++;
							} else if (this.data[nextNotNull][i] == this.data[j][i]) {
								this.changeData(j,i,nextNotNull);
							}
						}
					}
				}
				break;
		}
		newData = this.data.toString();
		if (newData != oldData) {
			this.randomNum();
			this.updateView();
		}
	}
};

