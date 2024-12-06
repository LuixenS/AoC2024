var fileContent = '';

const fileInput = document.getElementById('fileInput');
fileInput.type = 'file';
fileInput.accept = '.txt';

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            let fileContent = e.target.result;
            fileContent = fileContent.trimEnd();
            var temp = fileContent.split('\n');
            var map = temp.map(line => line.replace('\r', '').split(""));
            const originalMap = JSON.parse(JSON.stringify(map));
            var count = 0;
            var obsCount = 0;
            var check = false;
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if (map[i][j] != '#' && map[i][j] != '.') {
                        count += pathFinding(map, i, j);
                        check = true;
                    }
                    if (check == true) break;
                }
                if (check == true) break;
            }
            var pathedMap = [...map];
            for (let i = 0; i < originalMap.length; i++) {
                for (let j = 0; j < originalMap[i].length; j++) {
                    if (originalMap[i][j] != '#' && originalMap[i][j] != '.') {
                        obsCount += obstacle(originalMap, pathedMap, i, j)
                    }
                }
            }
            console.log(map);
            console.log(count);
            console.log(obsCount);
        };
        reader.readAsText(file);
    }
});

//Star 1
function pathFinding(map, i, j) {
    var count = 1;
    var inbounds = true;

    while (inbounds) {


        if (map[i][j] == '^') {
            map[i][j] = 'X';
            for (let k = i; k >= 0; k--) {
                if (map[k][j] != '#') {
                    if (map[k][j] != 'X') {
                        count += 1;
                    }
                    map[k][j] = 'X'
                } else if (map[k][j] == '#') {
                    map[k + 1][j] = '>';
                    i = k + 1;
                    break;
                } if (k - 1 < 0) {
                    inbounds = false;
                }
            }

        }

        if (map[i][j] == '>') {
            map[i][j] = 'X';
            for (let k = j; k < map[i].length; k++) {
                if (map[i][k] != '#') {
                    if (map[i][k] != 'X') {
                        count += 1;
                    }
                    map[i][k] = 'X'
                } else if (map[i][k] == '#') {
                    map[i][k - 1] = 'v';
                    j = k - 1;
                    break;
                } if (k + 1 >= map.length[i]) {
                    inbounds = false;
                }
            }
        }

        if (map[i][j] == 'v') {
            map[i][j] = 'X';
            for (let k = i; k < map.length; k++) {
                if (map[k][j] != '#') {
                    if (map[k][j] != 'X') {
                        count += 1;
                    }
                    map[k][j] = 'X'
                } else if (map[k][j] == '#') {
                    map[k - 1][j] = '<';
                    i = k - 1;
                    break;
                } if (k + 1 >= map.length) {
                    inbounds = false;
                }
            }
        }

        if (map[i][j] == '<') {
            map[i][j] = 'X';
            for (let k = j; k >= 0; k--) {
                if (map[i][k] != '#') {
                    if (map[i][k] != 'X') {
                        count += 1;
                    }
                    map[i][k] = 'X'
                } else if (map[i][k] == '#') {
                    map[i][k + 1] = '^';
                    j = k + 1;
                    break;
                } if (k - 1 < 0) {
                    inbounds = false;
                }
            }
        }
    }
    return count;
}

//Star 2
function obstacle(orMap, paMap, i, j) {
    var originalMap = JSON.parse(JSON.stringify(orMap));
    var tempMap = [...paMap];
    let count = 0;
    for (let k = 0; k < tempMap.length; k++) {
        for (let l = 0; l < tempMap[k].length; l++) {
            originalMap = JSON.parse(JSON.stringify(orMap));
            if (tempMap[k][l] == 'X' && (originalMap[k][l] != '^' && originalMap[k][l] != '>' && originalMap[k][l] != 'v' && originalMap[k][l] != '<')) {
                originalMap[k][l] = '#';
                if (loopFinding(originalMap, i, j) == false) {
                    count += 1;
                }
            }
        }
    }
    return count;
}

function loopFinding(map, i, j) {
    var iterations = 17000;
    var noloop = true;
    var inbounds = true;
    var count = 0;

    while (inbounds) {
        iterations -= 1;
        if(iterations <= 0) {
            noloop = false;
            return noloop;
        }
        if (map[i][j] == '^') {
            if (count != 0) {
                map[i][j] = '+';
            } else {
                map[i][j] = '.';
            }
            for (let k = i; k >= 0; k--) {
                if (map[k][j] == '#') {
                    if (map[k + 1][j] == '+') {
                        if (map[k + 1][j - 1] == '#') {
                            map[k + 1][j] = '>';
                            break;
                        }
                        noloop = false;
                        return noloop;
                    }
                    map[k + 1][j] = '>';
                    i = k + 1;
                    break;
                }
                if (k - 1 < 0) {
                    inbounds = false;
                }
                count += 1;
                iterations -= 1;
            }
        }

        if (map[i][j] == '>') {
            if (count != 0) {
                map[i][j] = '+';
            } else {
                map[i][j] = '.';
            }
            for (let k = j; k < map[i].length; k++) {
                if (map[i][k] == '#') {
                    if (map[i][k - 1] == '+') {
                        if (map[i - 1][k - 1] == '#') {
                            map[i][k - 1] = 'v';
                            break;
                        }
                        noloop = false;
                        return noloop;
                    }
                    map[i][k - 1] = 'v';
                    j = k - 1;
                    break;
                }
                if (k + 1 >= map[i].length) {
                    inbounds = false;
                }
                count += 1;
                iterations -= 1;
            }
        }

        if (map[i][j] == 'v') {
            if (count != 0) {
                map[i][j] = '+';
            } else {
                map[i][j] = '.';
            }
            for (let k = i; k < map.length; k++) {
                if (map[k][j] == '#') {
                    if (map[k - 1][j] == '+') {
                        if (map[k - 1][j + 1] == '#') {
                            map[k - 1][j] = '<';
                            break;
                        }
                        noloop = false;
                        return noloop;
                    }
                    map[k - 1][j] = '<';
                    i = k - 1;
                    break;
                }
                if (k + 1 >= map.length) {
                    inbounds = false;
                }
                count += 1;
                iterations -= 1;
            }
        }

        if (map[i][j] == '<') {
            if (count != 0) {
                map[i][j] = '+';
            } else {
                map[i][j] = '.';
            }
            for (let k = j; k >= 0; k--) {
                if (map[i][k] == '#') {
                    if (map[i][k + 1] == '+') {
                        if (map[i + 1][k + 1] == '#') {
                            map[i][k + 1] = '^';
                            break;
                        }
                        noloop = false;
                        return noloop;
                    }
                    map[i][k + 1] = '^';
                    j = k + 1;
                    break;
                }
                if (k - 1 < 0) {
                    inbounds = false;
                }
                count += 1;
                iterations -= 1;
            }
        }
    }

    return noloop;
}


