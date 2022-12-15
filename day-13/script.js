let input;
let sortedArray;

function compare(a, b) {
    // console.log("comparing:", a, b);
    if (typeof a === "number") {
        if (typeof b === "number") {
            if (a < b) return 1;
            if (a > b) return -1;
            return 0;
        }
        return compare([a], b)
    }
    // console.log("a is array");
    if (typeof b === "number") {
        // console.log("but b is number")
        return compare(a, [b])
    }
    // console.log("b is array too");
    for (let i = 0; i < a.length; i++) {
        if (i >= b.length) {
            // console.log("b ran out, returning -1");
            return -1;
        }
        let result = compare(a[i], b[i])
        if (result) {
            // console.log("two arrays compared, result is", result);
            return result;
        }
    }
    let result = a.length === b.length ? 0 : 1; 
    // console.log("two arrays compared, result is", result);
    return result
}

function getDividerCallback(val) {
    return (elem) => {
        return (
            elem.length === 1
            && elem[0].length === 1
            && elem[0][0] === val
        )
    }
    
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
    // console.log(""); // separator for readability
    let indexTotal = 0;
    for (let i = 0; i < input.length; i++) {
        const couple = [input[i], input[++i]];
        if (compare(...couple) + 1) {
            indexTotal += Math.ceil(i / 2);
        }
        // console.log(""); // separator for readability
    }
    console.log("Part 1:", indexTotal)

    // part 2
    sortedArray = [...input];
    sortedArray.push([[2]], [[6]]);
    sortedArray.sort(compare).reverse();
    console.log(
        (sortedArray.findIndex(getDividerCallback(2)) + 1)
        * (sortedArray.findIndex(getDividerCallback(6)) + 1)
        )
    }

    
solve();
// console.log(sortedArray);