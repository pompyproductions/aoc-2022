let input;

// helpers
const sumAll = arr => arr.reduce((acc, val) => acc + val);

async function getInput() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
}

async function solve() {
    console.log(input);
}

getInput();
solve();