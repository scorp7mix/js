function Food(matrix) {
    this.matrix = matrix;

    randomCell = function() {
        var min = 1;
        var max = matrix.cols-1;
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.round(rand);
        return rand;
    };

    //Checking is food putted on body of snake or not
    do {
        var row = randomCell();
        var col = randomCell();
    } while (matrix.getCell(row, col, "snake"));
    matrix.setFood(row, col, true);
}