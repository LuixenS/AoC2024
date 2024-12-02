var fileContent = '';

const fileInput = document.getElementById('fileInput');
fileInput.type = 'file';
fileInput.accept = '.txt';

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fileContent = e.target.result;

            var temp = fileContent.split('\n');

            var fileArray = temp.map(temp => temp.split(/\s+/));
            var safeTotal = 0;
            for (let i = 0; i < fileArray.length; i++) {
                if (testIncrease(fileArray[i]) == true || testDecrease(fileArray[i]) == true || fixArray(fileArray[i]) == true) {
                    safeTotal += 1;
                } 
            }
            console.log("Safe Tests: " + safeTotal);
        };
        reader.readAsText(file);
    }
});

//Star 1
function testIncrease(array) {
    var totalSafe = 0;
    var safe = false;
    for (let j = 0; j < array.length - 1; j++) {
        if (array[j + 1] - array[j] <= 3 && array[j + 1] - array[j] >= 1) {
            totalSafe += 1;
        }

    }
    if (totalSafe == array.length - 1) {
        safe = true;
    }
    return safe;
}

function testDecrease(array) {
    var totalSafe = 0;
    var safe = false;
    for (let j = 0; j < array.length - 1; j++) {
        if (array[j] - array[j + 1] <= 3 && array[j] - array[j + 1] >= 1) {
            totalSafe += 1;
        }

    }
    if (totalSafe == array.length - 1) {
        safe = true;
    }
    return safe;
}

//Star 2
function fixArray(array) {
    var newArray;
    var isSafe = false;

    for (let k = 0; k < array.length; k++) {
        newArray = [...array];
        newArray.splice(k, 1);

        if (testIncrease(newArray) || testDecrease(newArray)) {
            isSafe = true;
            break; 
        }
    }
    return isSafe;
}

//Star 2
/*
function fixArray(array) {
    var greaterThan = 0;
    var lowerThan = 0;
    var equals = 0;
    var asc = false;
    var desc = false;
    var isSafe = false;
    var newArray = array;
    for (let j = 0; j < array.length - 1; j++) {
        if (array[j] > array[j + 1]) {
            greaterThan += 1;
        } else if (array[j] < array[j + 1]) {
            lowerThan += 1;
        } else {
            equals += 1;
        }
    }
    if(greaterThan>lowerThan) {
        asc = true;
    } else if (lowerThan>greaterThan) {
        desc = true;
    }
        console.log(array);
        newArray = removeBad(array, asc, desc, equals);

    if (testIncrease(newArray) == true || testDecrease(newArray) == true) {
        isSafe = true;
        console.log("YAY!")
    } else {
        console.log("Algo ha salido mal...\n" + newArray)
    }
    return isSafe;
}

function removeBad(array, may, men, eq) {
    var badSpot = -1;
    for (let k = 0; k < array.length - 1; k++) {
        const current = parseInt(array[k]);
        const next = parseInt(array[k + 1]);
        if (current > next && men==true) {
            if(k != 0) {
                badSpot = k+1;
                } else {
                    badSpot = k;
                }
            console.log(array + ' se va a quitar la posición ' + badSpot + ' (' + array[badSpot] + ') CASO 1');
            break; 
        } else if (current < next && may==true) {
            if(k != 0) {
                badSpot = k+1;
                } else {
                    badSpot = k;
                }
            console.log(array + ' se va a quitar la posición ' + badSpot + ' (' + array[badSpot] + ') CASO 2');
            break;
        } else if (current == next && eq == 1) {
            if(k != 0) {
                badSpot = k+1;
                } else {
                    badSpot = k;
                }
            console.log(array + ' se va a quitar la posición ' + badSpot + ' (' + array[badSpot] + ') CASO 3');
            break;
        } else if (current > next + 3) {
            if(k != 0) {
                badSpot = k+1;
                } else  if(array[k+2]+3>current){
                    badSpot = k;
                } else {
                    badSpot = k+1;
                }
            console.log(array + ' se va a quitar la posición ' + badSpot + ' (' + array[badSpot] + ') CASO 4');
            break;
        } else if (current + 3 < next) {
            if(k != 0) {
                badSpot = k+1;
                } else  if(array[k+2]>current+3){
                    badSpot = k;
                } else {
                    badSpot = k+1;
                }
            console.log(array + ' se va a quitar la posición ' + badSpot + ' (' + array[badSpot] + ') CASO 5');
            break;
        } 
    }

    if (badSpot !== -1) {
        array.splice(badSpot, 1);
    } else {
        console.log("yo wtf");
    }
    return array;
}
*/


