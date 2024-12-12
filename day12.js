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
            var newMap = JSON.parse(JSON.stringify(map));
            var totalPrice = 0;
            newMap = checkAreaPerimeter(newMap);
            console.log(map);
            console.log(newMap);
            for (let i = 0; i < newMap.areaAndPerimeter.length; i++) {
                totalPrice += newMap.areaAndPerimeter[i].area * newMap.areaAndPerimeter[i].perimeter;
            }
            console.log(totalPrice);
        };
        reader.readAsText(file);
    }
});


function checkAreaPerimeter(map) {
    const rows = map.length;
    const cols = map[0].length;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const result = Array.from({ length: rows }, () => Array(cols));
    const areaAndPerimeter = [];
    let currentIndex = 0;

    function search(r, c, value, index) {
        const stack = [[r, c]];
        const cells = [];
        let perimeter = 0;

        while (stack.length > 0) {
            const [x, y] = stack.pop();
            if (x < 0 || y < 0 || x >= rows || y >= cols || visited[x][y] || map[x][y] !== value) {
                continue;
            }
            visited[x][y] = true;
            result[x][y] = index;
            cells.push([x, y]);

            const directions = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1],
            ];

            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || map[nx][ny] !== value) {
                    perimeter++;
                } else {
                    stack.push([nx, ny]);
                }
            }
        }

        const area = cells.length;
        areaAndPerimeter.push({ index, area, perimeter });
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!visited[r][c]) {
                search(r, c, map[r][c], currentIndex++);
            }
        }
    }

    return { remappedArray: result, areaAndPerimeter };
}

function countSides(map) {
    for(let i=0; i<Math.max(map[map.length-1]);i++) {
        
    }
}