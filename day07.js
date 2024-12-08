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
            const temp = fileContent.split('\n');
            var dataCheck = JSON.parse(JSON.stringify(temp));
            dataCheck = dataCheck.map(dataCheck => dataCheck.split(" ").map(num => parseInt(num, 10)));
            for (let i = 0; i < dataCheck.length; i++) {
                while (dataCheck[i].length > 1) {
                    dataCheck[i].pop();
                }
            }
            var data = [];
            for (let i = 0; i < dataCheck.length; i++) {
                data = data.concat(dataCheck[i]);
            }
            var operate = temp.map(temp => temp.split(" ").map(num => parseInt(num, 10)));
            for (let i = 0; i < operate.length; i++) {
               operate[i].reverse();
               operate[i].pop();
               operate[i].reverse();
            }

            var value = 0;
            var value2 = 0;
            for(let i = 0; i<data.length; i++) {
                value += checkData(data[i], operate[i]);
                value2 += checkConcatData(data[i], operate[i]);
            }
            console.log('Star 1: '+value);
            console.log('Star 2: '+value2);
        };
        reader.readAsText(file);
    }
});


//Star 1 
function checkData(numToCheck, numbers) {
    const results = [numbers[0]];
    var value = 0;
    var length = results.length;
    var position = [];
    for(let k = 0; k <= numbers.length; k++) {
        value = Math.pow(2, k)-1;
        position.push(value);
    }
    for(let i = 1; i<numbers.length; i++) {
        length = results.length;
        for(let j = position[i-1]; j<length; j++) {
            value = numbers[i]+results[j];
            results.push(value);
            value = numbers[i]*results[j];
            results.push(value);
        }
    }
    results.reverse();


   for(let i = results.length; i>Math.pow(2, numbers.length-1); i--) {
        results.pop();
    } 

    
    for(let i = 0; i<Math.pow(2, numbers.length); i++) {
        if(results[i] == numToCheck) {
            return results[i];
        }
    }

    return 0;

}

//Star 2
function checkConcatData(numToCheck, numbers) {
    const results = [numbers[0]];
    var value = 0;
    var length = results.length;
    var position = [];
    for(let k = 0; k < numbers.length; k++) {
        value = (Math.pow(3, k)-1)/2;
        position.push(value);
    }
    for(let i = 1; i<numbers.length; i++) {
        length = results.length;
        for(let j = position[i-1]; j<length; j++) {
            value = numbers[i]+results[j];
            results.push(value);
            value = numbers[i]*results[j];
            results.push(value);
            value = parseInt(results[j].toString() + numbers[i].toString());
            results.push(value);
        }
    }
    results.reverse();
    for(let i = results.length; i>Math.pow(3, numbers.length-1); i--) {
        results.pop();
    } 

    
    for (let i = results.length - 1; i >= 0; i--) {
        if (results[i] == numToCheck) {

            return results[i];
        }
    }

    return 0;
}

