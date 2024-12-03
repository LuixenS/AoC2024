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
            fileContent = fileContent.trimEnd();
            var temp = fileContent.split('\n');

            var fileArray = temp.map(temp => temp.split(/\s+/));
            var safeTotal = 0;
            for (let i = 0; i < fileArray.length; i++) {
                var array = fileArray[i];
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
        newArray.pop();

        if (testIncrease(newArray) || testDecrease(newArray)) {
            isSafe = true;
            break; 
        }
    }
    return isSafe;
}



