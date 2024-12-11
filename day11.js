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
            var length = 0;
            var stones = fileContent.split(" ").map(char => parseInt(char, 10));
            var newStones = stones.map(stone => [stone, 1]);
            var transformedNumbers = stoneBlinkNew(newStones, 75);
            for(let k = 0; k < transformedNumbers.length; k++) {
                length += transformedNumbers[k][1];
            }
            console.log('Transformed Numbers:', transformedNumbers);
            console.log(length);
        };
        reader.readAsText(file);
    }
});


function stoneBlinkNew(newStones, blinks) {
    for (let i = 0; i < blinks; i++) {
        let stoneMap = new Map(); 

        for (let j = 0; j < newStones.length; j++) {
            let [stone, count] = newStones[j];

            if (stone === 0) {
                stone = 1;
            } else if ((stone.toString().length) % 2 === 0) {
                let digits = stone.toString();
                let middle = Math.floor(digits.length / 2);
                let p1 = parseInt(digits.slice(0, middle), 10);
                let p2 = parseInt(digits.slice(middle), 10);
                stoneMap.set(p1, (stoneMap.get(p1) || 0) + count);
                stoneMap.set(p2, (stoneMap.get(p2) || 0) + count);
                continue; 
            } else {
                stone = stone * 2024;
            }

            stoneMap.set(stone, (stoneMap.get(stone) || 0) + count);
        }

        newStones = Array.from(stoneMap.entries());
    }

    return newStones.sort((a, b) => a[0] - b[0]);

}
