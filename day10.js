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
            var map = temp.map(line => line.replace('\r', '').split("").map(char => parseInt(char, 10)));
            var trailHeadScore = [];
            var trailHeadScoring = [];
            var score = 0;
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[i].length; j++) {
                    if (map[i][j] == 0) {
                        checkPath(map, i, j, map[i][j], trailHeadScore, trailHeadScoring);
                        var trailHeadScoreSorted = [];
                        for (let k = 0; k < trailHeadScoring.length; k++) {
                            let contains = false;
                            for (let l = 0; l < trailHeadScoreSorted.length; l++) {
                                if (arraysAreEqual(trailHeadScoring[k], trailHeadScoreSorted[l])) {
                                    contains = true;
                                    break;
                                }
                            }
                            if (!contains) {
                                trailHeadScoreSorted.push(trailHeadScoring[k]);
                            }
                        }

                        score += trailHeadScoreSorted.length;
                        trailHeadScoring = [];
                        trailHeadScoreSorted = [];
                    }
                }
            }
            console.log(score);
            console.log(trailHeadScore.length);

        };
        reader.readAsText(file);
    }
});

//Star 1 and 2 
function checkPath(map, y, x, value, score, length) {
    if (y + 1 < map.length && map[y + 1][x] == value + 1) {
        if (checkPath(map, y + 1, x, map[y + 1][x], score, length) == 10) {
            score.push([y + 1, x]);
            length.push([y + 1, x]);
        }
    }
    if (y - 1 >= 0 && map[y - 1][x] == value + 1) {
        if (checkPath(map, y - 1, x, map[y - 1][x], score, length) == 10) {
            score.push([y - 1, x]);
            length.push([y - 1, x]);
        }
    }
    if (x + 1 < map[y].length && map[y][x + 1] == value + 1) {
        if (checkPath(map, y, x + 1, map[y][x + 1], score, length) == 10) {
            score.push([y, x + 1]);
            length.push([y, x + 1]);
        }
    }
    if (x - 1 >= 0 && map[y][x - 1] == value + 1) {
        if (checkPath(map, y, x - 1, map[y][x - 1], score, length) == 10) {
            score.push([y, x - 1]);
            length.push([y, x - 1]);
        }
    }
    return value + 1;
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
}

