$(function () {

    main();

    function main() {
        var mazeArray = getMazeArray();
        var resArray = calculateSolution(mazeArray.mazeArray, mazeArray.resolutionArray)
        var sol = findSolution(resArray, mazeArray.mazeArray);
        console.log(sol);
        var inter = setInterval(function () {
            var pos = sol.pop();
            $('.row:nth-child(' + (parseInt(pos[1]) + 1) + ') .cell:nth-child(' + (parseInt(pos[0]) + 1) + ')').append('<div class="rat"></div>')
            if (sol.length === 0) {
                clearInterval(inter);
            }
        }, 100)

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
        var start = [0, 0];
        var end = [mazeArray.length - 1, mazeArray[0].length - 1];
        var queue = [0, 0];
        resolutionArray[0][0] = '1';
        stop = false;
        //fill the path 
        while (queue.length != 0 && stop === false) {
            var col = queue.shift();
            var row = queue.shift();
            var cur_val = parseInt(resolutionArray[row][col]);

            mazeArray[row][col].forEach(function (move) {
                var nRow = row + move.y;
                var nCol = col + move.x;
                if (resolutionArray[nRow][nCol] == '') {
                    resolutionArray[nRow][nCol] = cur_val + 1 + '';
                    if (nRow === 19 && nCol === 19) {
                        stop = true;
                    }
                    queue.push(nCol);
                    queue.push(nRow)
                }
            })
        };
        return resolutionArray;
    }

    function findSolution(resArray, mazeArray) {
        end = [19, 19];
        curStep = parseInt(resArray[19][19]);
        var sol = [];
        while (curStep > 1) {
            col = end[0];
            row = end[1];
            var out = false;
            for (var x = -1; x <= 1; x++) { // If checking all neighbours this could be max(y-1,0):min(y+1,height)
                for (var y = -1; y <= 1; y++) {
                    var nRow = row + x;
                    var nCol = col + y;
                    if (nCol >= 0 && nCol <= 19 && nRow >= 0 && nRow <= 19
                        && resArray[nRow][nCol] == (curStep - 1).toString()
                    ) {

                        var allowed = mazeArray[row][col].filter(function (move) {
                            return row + move.y == nRow && col + move.x == nCol
                        });
                        if (allowed.length) {
                            end = [nCol, nRow];
                            curStep = curStep - 1;
                            sol.push(end);
                            out = true;
                            break;
                        }

                    }
                }
                if (out) {
                    break;
                }
            }
        }
        return sol;
    }


})