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
            fileContent = "do()"+fileContent;
            var sections = fileContent.split(/do\(\)|don't\(\)/);
            var marks = fileContent.match(/do\(\)|don't\(\)/g);
            console.log(sections);
            console.log(marks);
            var match = fileContent.match(/mul\((\d+),(\d+)\)/g);
            console.log(match);
            if (match) {
                var numArray = match.map(match => {
                    let nums = match.replace("mul(", "").replace(")", "");
                    return nums.split(",").map(num => parseInt(num));
                });
                console.log(numArray);
            }

            //Star 1
            var totalSum = 0;
            for (let i = 0; i < numArray.length; i++) {
                for (let j = 0; j < numArray[i].length - 1; j++) {
                    totalSum += numArray[i][0] * numArray[i][1];
                }
            }
            console.log(totalSum);

            //Star 2
            var sum2 = 0;
            if (sections && marks) {
                for (let i = 0; i < sections.length; i++) {
                    if (marks[i - 1] === "do()") {
                        let matches = sections[i].match(/mul\((\d+),(\d+)\)/g);
                        if (matches) {
                            matches.forEach(match => {
                                let nums = match.match(/\d+/g).map(num => parseInt(num));
                                sum2 += nums[0] * nums[1];
                            });
                        }
                    }
                }
            }
            console.log(sum2);
        };
        reader.readAsText(file);
    }
});