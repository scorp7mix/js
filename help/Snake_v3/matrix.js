//
// Class of matrix
//
function Matrix(containerId, rows, cols) {
	this.containerId = containerId;
	this.rows = rows;
	this.cols = cols;
	var self = this;
	var matrix = document.getElementById(this.containerId);

	// creating grid
	this.create = function() {
		var n = this.rows * this.cols;
		matrix.innerHTML = '';
		for (var i = 0; i < n; i++) {
			var div = document.createElement('div');
			div.className = 'cell';
            div.id = parseInt(i/rows + 1) + 'x' + (i%rows + 1);
			matrix.appendChild(div);
		}
	};

	// getting value of cell
	this.getCell = function(row, col, className) {
        var ind = (row-1)*this.cols+(col-1);
        var cell = matrix.children[ind];
        var regClass = new RegExp(className);
        return !!cell.className.match(regClass);
    };

	// setuping value of cell
	this.setCell = function(row, col, val) {
        var ind = (row-1)*this.cols+(col-1);
        var cell = matrix.children[ind];
        cell.className = (val ? 'cell snake' : 'cell');

        //removing old food
        if (val == true) {
            $(cell).css('background-image', '');
        }
    };

	// setuping food
	this.setFood = function(row, col, val) {
        //random food
        randomFood = function() {
            var min = 1;
            var max = 15;
            var rand = min + Math.random() * (max + 1 - min);
            rand = Math.round(rand);
            return rand;
        };

        var ind = (row-1)*this.cols+(col-1);
        var cell = matrix.children[ind];
        var randFood = randomFood();
        cell.className = (val ? 'cell food' : 'cell');

        //setuping new random food
        $('.food').css('background-image', 'url(images/' + randFood + '.png)');
    }
}


