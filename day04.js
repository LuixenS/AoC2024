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
                            (fileArray[i-1][j-1] === "M" && fileArray[i-1][j+1] === "S" &&
                             fileArray[i+1][j-1] === "S" && fileArray[i+1][j+1] === "M") ||
                            (fileArray[i-1][j-1] === "S" && fileArray[i-1][j+1] === "M" &&
                             fileArray[i+1][j-1] === "M" && fileArray[i+1][j+1] === "S")
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

//Star 1
function checkDirection(array, i, j) {
    let check = 0;

    if (j + 3 < array[i].length && r(array, i, j)) {
        check += 1;
    }
    if (i - 3 >= 0 && u(array, i, j)) {
        check += 1;
    }
    if (i - 3 >= 0 && j + 3 < array[i].length && ur(array, i, j)) {
        check += 1;
    }
    if (j - 3 >= 0 && l(array, i, j)) {
        check += 1;
    }
    if (i + 3 < array.length && d(array, i, j)) {
        check += 1;
    }
    if (i + 3 < array.length && j - 3 >= 0 && dl(array, i, j)) {
        check += 1;
    }
    if (i - 3 >= 0 && j - 3 >= 0 && ul(array, i, j)) {
        check += 1;
    }
    if (i + 3 < array.length && j + 3 < array[i].length && dr(array, i, j)) {
        check += 1;
    }

    return check;
}

function r(array, i, j) {
    if (j + 3 < array[i].length) {
        return array[i][j + 1] === "M" && array[i][j + 2] === "A" && array[i][j + 3] === "S";
    }
    return false;
}

function u(array, i, j) {
    if (i - 3 >= 0) {
        return array[i - 1][j] === "M" && array[i - 2][j] === "A" && array[i - 3][j] === "S";
    }
    return false;
}

function ur(array, i, j) {
    if (i - 3 >= 0 && j + 3 < array[i].length) {
        return array[i - 1][j + 1] === "M" && array[i - 2][j + 2] === "A" && array[i - 3][j + 3] === "S";
    }
    return false;
}

function l(array, i, j) {
    if (j - 3 >= 0) {
        return array[i][j - 1] === "M" && array[i][j - 2] === "A" && array[i][j - 3] === "S";
    }
    return false;
}

function d(array, i, j) {
    if (i + 3 < array.length) {
        return array[i + 1][j] === "M" && array[i + 2][j] === "A" && array[i + 3][j] === "S";
    }
    return false;
}

function dl(array, i, j) {
    if (i + 3 < array.length && j - 3 >= 0) {
        return array[i + 1][j - 1] === "M" && array[i + 2][j - 2] === "A" && array[i + 3][j - 3] === "S";
    }
    return false;
}

function ul(array, i, j) {
    if (i - 3 >= 0 && j - 3 >= 0) {
        return array[i - 1][j - 1] === "M" && array[i - 2][j - 2] === "A" && array[i - 3][j - 3] === "S";
    }
    return false;
}

function dr(array, i, j) {
    if (i + 3 < array.length && j + 3 < array[i].length) {
        return array[i + 1][j + 1] === "M" && array[i + 2][j + 2] === "A" && array[i + 3][j + 3] === "S";
    }
    return false;
}
