$(function () {

    main();

    function main() {
        var resArray = calculateSolution(getMazeArray().mazeArray, getMazeArray().resolutionArray)
        findSolution(resArray);
    }
    function getMazeArray() {
        var mazeArray = [];
        var resolutionArray = [];
        var keys = ['top', 'left', 'right', 'bottom'];
        $('#cells .row').each(function (key, row) {
            var tmpMazeRow = [];
            var tmpResRow = [];
            $(row).children('.cell').each(function (key, cell) {
                var array = $(cell).attr('class').split(' ');
                array.pop();
                var allowed = keys.filter(function (val) {
                    return array.indexOf(val) == -1
                })
                var res = allowed.map(function (val) {
                    switch (val) {
                        case 'top':
                            return { x: 0, y: -1 }
                        case 'bottom':
                            return { x: 0, y: 1 }
                        case 'left':
                            return { x: -1, y: 0 }
                        case 'right':
                            return { x: 1, y: 0 }
                    }
                })
                tmpMazeRow.push(res);
                tmpResRow.push('');
            })
            mazeArray.push(tmpMazeRow);
            resolutionArray.push(tmpResRow);
        })
        return { mazeArray: mazeArray, resolutionArray: resolutionArray };
    }



    function calculateSolution(mazeArray, resolutionArray) {
        debugger
        var start = [0, 0];
        var end = [mazeArray.length - 1, mazeArray[0].length - 1];
        var queue = [0, 0];
        resolutionArray[0][0] = '1';
        //check 
        while (queue.length != 0) {
            var y = queue.shift();
            var x = queue.shift();
            var cur_val = parseInt(resolutionArray[x][y]);
            mazeArray[y][x].forEach(function (move) {
                if (resolutionArray[y + move.y][x + move.x] == '') {
                    resolutionArray[y + move.y][x + move.x] = cur_val + 1 + '';
                    queue.push(x + move.x)
                    queue.push(y + move.y)
                }
            })
        };
        console.log(resolutionArray);
    }

    function findSolution(resArray) {
        end = [19, 19];
        curStep = parseInt(resArray[19, 19]);
        var sol = [];
        while (curStep > 1) {
            x = end[0];
            y = end[1];
            var getout = 0;
            for (var ny = -1; ny <= 1; ny++) { // If checking all neighbours this could be max(y-1,0):min(y+1,height)
                for (var nx = -1; nx <= 1; nx++) {
                    if (Math.abs(ny) == Math.abs(nx) || y + ny < 0 || y + ny >= height || x + nx < 0 || x + nx >= width)
                        continue;


                    if (maze[y + ny][x + nx] == (cur_step - 1).toString()) {
                        end = [y + ny, x + nx];
                        cur_step = parseInt(maze[end[0]][end[1]]);
                        maze[y + ny][x + nx] = 'o';
                        get_out = 1;
                        break;
                    }

                }
                if (get_out == 1)
                    break;

            }
        }

    }


})