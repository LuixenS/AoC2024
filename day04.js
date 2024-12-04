var fileContent = '';

const fileInput = document.getElementById('fileInput');
fileInput.type = 'file';
fileInput.accept = '.txt';

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fileContent = e.target.result.trimEnd();
            var temp = fileContent.split('\n');
            var fileArray = temp.map(line => line.replace('\r', '').split(""));
            var hohoho = 0;
            var xmas = 0;
            for (let i = 0; i < fileArray.length; i++) {
                for (let j = 0; j < fileArray[i].length; j++) {
                    if (fileArray[i][j] === "X") {
                        hohoho += checkDirection(fileArray, i, j);
                    }
                    //Star 2
                    if (fileArray[i][j] === "A" && i - 1 >= 0 && j - 1 >= 0 && i + 1 < fileArray.length && j + 1 < fileArray[i].length) {
                        if (
                            (fileArray[i-1][j-1] === "M" && fileArray[i-1][j+1] === "S" &&
                             fileArray[i+1][j-1] === "M" && fileArray[i+1][j+1] === "S") || 
                            (fileArray[i-1][j-1] === "S" && fileArray[i-1][j+1] === "M" &&
                             fileArray[i+1][j-1] === "S" && fileArray[i+1][j+1] === "M") ||
                            (fileArray[i-1][j-1] === "M" && fileArray[i-1][j+1] === "M" &&
                             fileArray[i+1][j-1] === "S" && fileArray[i+1][j+1] === "S") ||
                            (fileArray[i-1][j-1] === "S" && fileArray[i-1][j+1] === "S" &&
                             fileArray[i+1][j-1] === "M" && fileArray[i+1][j+1] === "M")
                        ){
                            xmas += 1;
                        }
                    }
                    
                }


            }
            console.log("XMAS counter: " + hohoho);
            console.log("X-MAS counter: " + xmas);

        };
        reader.readAsText(file);
    }
});
/*
[-j-i][-i][+j-i]
[ -j ][00][ +j ]
[-j+i][+i][+j+i]
*/
//Star 1
function checkDirection(array, i, j) {
    let check = 0;

    // Right
    if (j + 3 < array[i].length && r(array, i, j)) {
        check += 1;
    }
    // Up
    if (i - 3 >= 0 && u(array, i, j)) {
        check += 1;
    }
    // Up-Right
    if (i - 3 >= 0 && j + 3 < array[i].length && ur(array, i, j)) {
        check += 1;
    }
    // Left
    if (j - 3 >= 0 && l(array, i, j)) {
        check += 1;
    }
    // Down
    if (i + 3 < array.length && d(array, i, j)) {
        check += 1;
    }
    // Down-Left
    if (i + 3 < array.length && j - 3 >= 0 && dl(array, i, j)) {
        check += 1;
    }
    // Up-Left
    if (i - 3 >= 0 && j - 3 >= 0 && ul(array, i, j)) {
        check += 1;
    }
    // Down-Right
    if (i + 3 < array.length && j + 3 < array[i].length && dr(array, i, j)) {
        check += 1;
    }

    return check;
}

function r(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta a la derecha
    if (j + 3 < array[i].length) {
        return array[i][j + 1] === "M" && array[i][j + 2] === "A" && array[i][j + 3] === "S";
    }
    return false;
}

function u(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta hacia arriba
    if (i - 3 >= 0) {
        return array[i - 1][j] === "M" && array[i - 2][j] === "A" && array[i - 3][j] === "S";
    }
    return false;
}

function ur(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta hacia arriba y a la derecha
    if (i - 3 >= 0 && j + 3 < array[i].length) {
        return array[i - 1][j + 1] === "M" && array[i - 2][j + 2] === "A" && array[i - 3][j + 3] === "S";
    }
    return false;
}

function l(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta hacia la izquierda
    if (j - 3 >= 0) {
        return array[i][j - 1] === "M" && array[i][j - 2] === "A" && array[i][j - 3] === "S";
    }
    return false;
}

function d(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta hacia abajo
    if (i + 3 < array.length) {
        return array[i + 1][j] === "M" && array[i + 2][j] === "A" && array[i + 3][j] === "S";
    }
    return false;
}

function dl(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta hacia abajo y a la izquierda
    if (i + 3 < array.length && j - 3 >= 0) {
        return array[i + 1][j - 1] === "M" && array[i + 2][j - 2] === "A" && array[i + 3][j - 3] === "S";
    }
    return false;
}

function ul(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta hacia arriba y a la izquierda
    if (i - 3 >= 0 && j - 3 >= 0) {
        return array[i - 1][j - 1] === "M" && array[i - 2][j - 2] === "A" && array[i - 3][j - 3] === "S";
    }
    return false;
}

function dr(array, i, j) {
    // Verifica que haya "M", "A" y "S" en la dirección correcta hacia abajo y a la derecha
    if (i + 3 < array.length && j + 3 < array[i].length) {
        return array[i + 1][j + 1] === "M" && array[i + 2][j + 2] === "A" && array[i + 3][j + 3] === "S";
    }
    return false;
}







