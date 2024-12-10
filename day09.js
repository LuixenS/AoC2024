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
            var map = fileContent.split("");
            var block = generateBlock(map);

            console.log('------------Intern Fragmentation------------');
            internFragmentation(block);
            console.log('-------Optimized Intern Fragmentation-------');
            optimizedFragmentation(block);



        };
        reader.readAsText(file);
    }
});
function generateBlock(map) {
    let block = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < parseInt(map[i]); j++) {
            if (i % 2 === 0) {
                block.push(i / 2);
            } else {
                block.push('.');
            }
        }
    }

    return block;
}

//Star 1
function internFragmentation(map) {
    let value = 0;
    var block = [...map];
    for (let k = 0; k < block.length; k++) {
        if (block[k] == '.') {
            for (let l = block.length - 1; l >= 0; l--) {
                if (block[l] != '.') {
                    block[k] = block[l];
                    block[l] = '.';
                    break;
                }
            }
        }
    }
    for (let k = 0; k < block.length; k++) {
        if (block[k] == '.') {
            block[k] = block[block.length - 1];
            block[block.length - 1] = '.';
            break;
        }
    }

    for (let k = 0; k < block.length; k++) {
        if (block[k] != '.') {
            value += block[k] * k;
        }
    }
    //console.log("Intern Framentation:", block);
    console.log(value);
}

//Star 2
function optimizedFragmentation(map) {

    let value = 0;
    var block = [...map];
    for (let j = block.length - 1; j >= 0; j--) {
        if (block[j] != '.') {
            let movingValue = block[j];
            let movingValuesPositions = [];
            let positionsToMove = [];
            
            for (let k = block.length - 1; k >= 0; k--) {
                if (block[k] == movingValue) {
                    movingValuesPositions.push(k);
                }
            }

            for (let l = 0; l < j; l++) {
                if (block[l] == '.') {
                    let spacesLeft = movingValuesPositions.length; 
                    let validMoveFound = false;
            
                    for (let n = movingValuesPositions.length-1 ; n >= 0; n--) {
                        if (block[l + n] == '.') {
                            positionsToMove.push(l + n);
                        } else {

                            l += n;  
                            positionsToMove = [];
                            validMoveFound = true;
                            break;
                        }
                    }
            

                    if (!validMoveFound && positionsToMove.length < spacesLeft) {
                        for (let n = l; n < block.length; n++) {
                            if (block[n] != '.') {
                                l = n; 
                                break;
                            }
                        }
                    }
                }
                if (movingValuesPositions.length == positionsToMove.length) {
                    break;
                }
            }
            

            if (movingValuesPositions.length == positionsToMove.length) {
                for (let m = 0; m < movingValuesPositions.length; m++) {
                    block[positionsToMove[m]] = block[movingValuesPositions[m]];
                    block[movingValuesPositions[m]] = '.';
                }
            }
        }
    }

    for (let k = 0; k < block.length; k++) {
        if (block[k] != '.') {
            value += block[k] * k;
        }
    }


    //console.log("Optimized Intern Framentation:", block);
    console.log(value);


}
