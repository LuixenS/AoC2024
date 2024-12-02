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

            var array = fileArray.flat();
            var arrayCol1 = [];
            var contCol1 = 0;
            var arrayCol2 = [];
            var contCol2 = 0;

            for (let i = 0; i < array.length; i++) {
                if (i % 2 == 0) {
                    arrayCol1[contCol1] = parseInt(array[i]);
                    contCol1 += 1;
                } else {
                    arrayCol2[contCol2] = parseInt(array[i]);
                    contCol2 += 1;
                }
            }

            arrayCol1.sort((a, b) => a - b);
            arrayCol2.sort((a, b) => a - b);
            console.log(arrayCol1);
            console.log(arrayCol2);

            //Star 1
            var total = 0;

            for (let i = 0; i < arrayCol2.length; i++) {
                total += Math.abs(arrayCol2[i] - arrayCol1[i]);
            }

            console.log('Distance result: ' + total);

            //Star 2
            var total2 = 0;
            let k = 0;
            for (let i = 0; i < arrayCol1.length; i++) {
                while(arrayCol1[i]>=arrayCol2[k]) {
                    if (arrayCol1[i] == arrayCol2[k]) {
                        total2 += arrayCol1[i];
                    }
                    k += 1;
                }
                k = 0;
            }
            console.log('Similarity score: ' + total2)

        };
        reader.readAsText(file);
    }
});