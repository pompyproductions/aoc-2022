let input;

// helpers
const sumAll = arr => arr.reduce((acc, val) => acc + val);

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
}

solve();