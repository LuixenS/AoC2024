var fileContent = '';

let fileInput = document.getElementById('fileInput');
fileInput.type = 'file';
fileInput.accept = '.txt';

fileInput.addEventListener('change', (event) => {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            let fileContent = e.target.result;
            fileContent = fileContent.trimEnd();
            let prizes = parseTextToObjects(fileContent);
            console.log(prizes);
            let solutions = [];
            for(let i = 0; i<prizes.length; i++) {
                solutions.push(solve(prizes[i].A.X, prizes[i].B.X, prizes[i].P.X, prizes[i].A.Y, prizes[i].B.Y, prizes[i].P.Y));
            }
            let tokens = 0;
            console.log(solutions);
            for(const element of solutions) {
                if(element.A%1 != 0 || element.B%1) {

                } else {
                    tokens += element.A*3+element.B;
                }
            }
            console.log(tokens);

        };
        reader.readAsText(file);
    }
});


function parseTextToObjects(inputText) {
    let blocks = inputText.replace(/\r/g, '').split(/\n\s*\n/); 
    let result = [];

    blocks.forEach(block => {
        let lines = block.split('\n'); 
        let blockData = {};

        lines.forEach(line => {
            let match = line.match(/^(.*?):\s*X[+=](\d+),\s*Y[+=](\d+)$/);

            if (match) {
                let name = match[1].trim(); 
                let x = parseInt(match[2], 10); 
                let y = parseInt(match[3], 10); 
                if (name == "Button A") name = "A";
                else if (name == "Button B") name = "B";
                else if (name == "Prize") name = "P";

                blockData[name] = { X: x, Y: y };
            }
        });

        if (Object.keys(blockData).length > 0) {
            result.push({ ...blockData }); 
        }
    });

    return result;
}

function solve(a1, b1, c1, a2, b2, c2) {
    let add = 10000000000000;
    let determinant = a1 * b2 - a2 * b1;

    if (determinant == 0) {
        return;
    }

    let determinantX = (c1+add) * b2 - (c2+add) * b1;
    let determinantY = a1 * (c2+add) - a2 * (c1+add);

    let A = determinantX / determinant;
    let B = determinantY / determinant;

    return { A, B };
}
