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
            const divIndex = temp.findIndex(line => line.trim() == "");
            const allRules = temp.slice(0, divIndex);
            const allPrint = temp.slice(divIndex + 1);
            const rules = allRules.map(allRules => allRules.split("|").map(num => parseInt(num, 10)));
            const printLine = allPrint.map(allPrint => allPrint.split(",").map(num => parseInt(num, 10)));
            console.log(rules);
            console.log(printLine);

            let sum = 0;
            let sumWrong = 0;

            for (let i = 0; i < printLine.length; i++) {
                if (checkRules(rules, printLine[i]) === true) {
                    sum += printLine[i][Math.trunc(printLine[i].length / 2)];
                } else {
                    var reorderedLine = reorderPrintLine(printLine[i], rules);
                    sumWrong += reorderedLine[Math.trunc(reorderedLine.length / 2)];
                }
            }

            console.log("Add of correct edits mid position: ", sum);
            console.log("Add of correct reordered edits mid position: ", sumWrong);
        };
        reader.readAsText(file);
    }
});

//Star 1
function checkRules(rules, printLine) {
    for (let k = 0; k < rules.length; k++) {
        const [ruleA, ruleB] = rules[k];
        for (let j = 1; j < printLine.length; j++) {
            if (printLine[j] == ruleA) {
                for (let l = j - 1; l >= 0; l--) {
                    if (printLine[l] == ruleB) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

//Star 2
function reorderPrintLine(printLine, rules) {
    let reordered = [...printLine];

    let changed = true;
    while (changed) {
        changed = false;

        for (let k = 0; k < rules.length; k++) {
            const [ruleA, ruleB] = rules[k];

            const indexA = reordered.indexOf(ruleA);
            const indexB = reordered.indexOf(ruleB);

            if (indexA > indexB && indexA !== -1 && indexB !== -1) {
                [reordered[indexA], reordered[indexB]] = [reordered[indexB], reordered[indexA]];
                changed = true;
            }
        }
    }

    return reordered;
}


