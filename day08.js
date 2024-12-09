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
            var antiNode = [];
            var antiNodeLine = [];
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if (map[i][j] !== '.') {
                        checkNodes(map, map[i][j], i, j, antiNode);
                        checkLine(map, map[i][j], i, j, antiNodeLine);
                    }
                }
            }
            var antiNodeSorted = new Set();
            for (let k = 0; k < antiNode.length; k++) {
                const nodeString = JSON.stringify(antiNode[k]);
                antiNodeSorted.add(nodeString);
            }
            var antiNodeLineSorted = new Set();
            for (let k = 0; k < antiNodeLine.length; k++) {
                const nodeStringL = JSON.stringify(antiNodeLine[k]);
                antiNodeLineSorted.add(nodeStringL);
            }

            antiNodeSorted = Array.from(antiNodeSorted).map(node => JSON.parse(node));

            antiNodeLineSorted = Array.from(antiNodeLineSorted).map(node => JSON.parse(node));
            antiNodeLine.sort();
            antiNodeLineSorted.sort();
            console.log(antiNodeSorted.length);
            console.log(antiNodeLineSorted.length);

        };
        reader.readAsText(file);
    }
});

//star1
function checkNodes(map, value, x, y, antiNode) {
    var delta = [0, 0];
    var node = [0, 0];
    for (let k = 0; k < map.length; k++) {
        for (let l = 0; l < map[k].length; l++) {
            if (value == map[k][l] && !(k == x && l == y)) {
                delta[0] = k - x;
                delta[1] = l - y;
                if (validCoordinate(map, x - delta[0], y - delta[1]) && map[x - delta[0]][y - delta[1]] !== value) {
                    node = [x - delta[0], y - delta[1]];
                    antiNode.push(node);
                }
                if (validCoordinate(map, k + delta[0], l + delta[1]) && map[k + delta[0]][l + delta[1]] !== value) {
                    node = [k + delta[0], l + delta[1]];
                    antiNode.push(node);
                }
            }
        }
    }
}

function validCoordinate(map, x, y) {
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
}




// Star 2 CHECK
function checkLine(map, value, x, y, antiNodeLine) {
    var delta = [0, 0];
    var node = [0, 0];
    for (let k = 0; k < map.length; k++) {
        for (let l = 0; l < map[k].length; l++) {
            for(let i = 1; i<100; i++) {
            if (value == map[k][l]) {
                delta[0] = k - x;
                delta[1] = l - y;
                if (validCoordinate(map, x - delta[0]*i, y - delta[1]*i)) {
                    node = [x - delta[0]*i, y - delta[1]*i];
                    antiNodeLine.push(node);
                }
                if (validCoordinate(map, k + delta[0]*i, l + delta[1]*i)) {
                    node = [k + delta[0]*i, l + delta[1]*i];
                    antiNodeLine.push(node);
                }
            }
        }
        }
    }
}










