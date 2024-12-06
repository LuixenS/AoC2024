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
            var count = 0;
            var check = false;
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if (map[i][j] != '#' && map[i][j] != '.') {
                        count += pathFinding(map, i, j);
                        check = true;
                    }
                    if(check==true) break;
                }
                if(check==true) break;
            }

            console.log(map);
            console.log(count);
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
                } if (k+1 >= map.length[i]) {
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
                } if (k+1 >= map.length) {
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




