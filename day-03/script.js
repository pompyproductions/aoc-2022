let input;

// helpers
function getPriority(char) {
    const code = char.charCodeAt(0);
    return code <= 90 
        ? code - 38
        : code - 96;
}

function getDuplicates(bag) {
    const dup = new Set();
    for (let i = 0; i < bag[1].length; i++) {
        if (bag[0].includes(bag[1].charAt(i))) {
            dup.add(bag[1].charAt(i))
        }
    }
    return Array.from(dup);
}

function getDuplicatesRecursive(...args) {
    if (args.length === 1) {
        return args[0];
    }
    const arr = [...args];
    return getDuplicates([arr.pop(), getDuplicatesRecursive(...arr)]).join();
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        input = await response.json(); 
    }

    // misunderstood the brief?
    const duplicateSet = new Set();
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i][1].length; j++) {
            if (input[i][0].includes(input[i][1].charAt(j))) {
                duplicateSet.add(input[i][1].charAt(j))
            }
        }
    }

    let sum = 0;
    duplicateSet.forEach(item => {
        sum += getPriority(item)
    })
    console.log("Part 1, first interpretation:", sum);

    // part 1 attempt 2:
    sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += getDuplicates(input[i])
            .reduce((acc, char) => acc + getPriority(char), 0);
    }
    console.log("Part 1, correct answer:", sum);

    // part 2:
    sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += getPriority(getDuplicatesRecursive(
            input[i][0].concat(input[i][1]),
            input[i+1][0].concat(input[i+1][1]),
            input[i+2][0].concat(input[i+2][1])
        ));
        i += 2;
    }
    console.log("Part 2:", sum);
}

// demonstration (uncomment it!)
//
// let test = "abcdefghijklmnopqrstuvwxyz"
// for (let i = 0; i < test.length; i++) {
//     console.log(test.charAt(i), test.charCodeAt(i) - 96);
// }
// test = test.toUpperCase();
// for (let i = 0; i < test.length; i++) {
//     console.log(test.charAt(i), test.charCodeAt(i) - 38);
// }


solve();