let input;

// helpers
const sumAll = arr => arr.reduce((acc, val) => acc + val);

async function solve() {
    function playRound(round) {
        return [3, 6, 0][ // tie, loss, win
            (round[1] - round[0] + 3) % 3
        ] + round[1] + 1
    }
    function predict(round) {
        return (round[0] + [2, 0, 1][round[1]]) % 3
    }

    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += playRound(input[i]); // solution 1
    }
    console.log("part 1:", sum)

    sum = 0;
    for (let i = 0; i < input.length; i++) {
        sum += playRound([
            input[i][0],
            predict(input[i])
        ])
    }
    console.log("part 2:", sum)
}
solve();