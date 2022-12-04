let input;

// helpers
const sumAll = arr => arr.reduce((acc, val) => acc + val);

async function solve() {
    function playRound(round) {
        return [
            () => 3,
            () => 6,
            () => 0
        ][(round[1] - round[0] + 3) % 3]() + round[1] + 1
    }

    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += playRound(input[i]);
    }
    console.log(sum)
}
solve();