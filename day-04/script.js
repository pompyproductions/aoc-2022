let input;

// helpers
const sumAll = arr => arr.reduce((acc, val) => acc + val);
function isAreaContained(arr1, arr2) {
    if (arr1[0] == arr2[0]) return true;
    if (arr1[0] < arr2[0]) {
        return arr1[1] >= arr2[1]
    }
    return arr1[1] <= arr2[1]
}
function doAreasOverlap(arr1, arr2) {
    if (arr1[0] == arr2[0]) return true;
    if (arr1[0] < arr2[0]) {
        return arr1[1] >= arr2[0]
    }
    return arr2[1] >= arr1[0]
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        input = await response.json(); 
    }

    // part 1
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        if (isAreaContained(input[i][0], input[i][1])) {
            total++;
        }
    }
    console.log("Part 1:", total);

    // part 2
    total = 0;
    for (let i = 0; i < input.length; i++) {
        if (doAreasOverlap(input[i][0], input[i][1])) {
            total++;
        }
    }
    console.log("Part 2:", total);

}

solve();