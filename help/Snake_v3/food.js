function Food(matrix) {
    console.log('new food');
    this.matrix = matrix;

    randomCell = function() {
        var min = 1;
        var max = matrix.cols-1;
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.round(rand);
        return rand;
    };

    var row, col;
    //Checking is food putted on body of snake or not
    do {
        row = randomCell();
        col = randomCell();
        console.log('try: '+row+'x'+col);
        console.log(matrix.getCell(row, col, "snake") ? 'тут змея' : 'тут змеи нет');
        console.log(matrix.getCell(row, col, "food") ? 'тут еда' : 'тут еды нет');
    } while (matrix.getCell(row, col, "snake") || matrix.getCell(row, col, "food"));
    console.log('found on: '+row+'x'+col);
    matrix.setFood(row, col, true);
}