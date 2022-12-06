let input;

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }

    // helpers
    function moveCrates(stacks, reps, from, to) {
        to--; from--;
        for (let i = 0; i < reps; i++) {
            stacks[to] = stacks[to].concat(stacks[from].slice(-1));
            stacks[from] = stacks[from].slice(0, -1)
        }
    }
    function moveMultipleCrates(stacks, amount, from, to) {
        to--; from--;
        stacks[to] = stacks[to].concat(stacks[from].slice(-amount));
        stacks[from] = stacks[from].substring(0, stacks[from].length-amount)
    }

    // part 1
    let stacks = [...input.stacks];
    for (let i = 0; i < input.instructions.length; i++) {
        moveCrates(
            stacks,
            ...input.instructions[i]
        );
    }
    let result = "";
    for (let str of stacks) {
        result = result.concat(str.slice(-1))
    }
    console.log("CrateMover 9000:", result);

    // part 2
    stacks = [...input.stacks];
    for (let i = 0; i < input.instructions.length; i++) {
        moveMultipleCrates(
            stacks,
            ...input.instructions[i]
        );
    }
    result = "";
    for (let str of stacks) {
        result = result.concat(str.slice(-1))
    }
    console.log("CrateMover 9001:", result);
}

solve();