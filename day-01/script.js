// let input;

async function solve() {
    // fetch question
    const response = await fetch('./input.json');
    const input = await response.json(); 

    // solve question (quick way)
    let bestElf = {
        index: -1,
        totalCalories: 0
    }
    for (let i = 0; i < input.length; i++) {
        sum = input[i].reduce((acc, val) => acc + val);
        if (sum > bestElf.totalCalories) {
            bestElf.index = i;
            bestElf.totalCalories = sum;
        }
    }
    console.log(bestElf);
}

solve();

// await loadInput();
// await loadInput();
// fetch('./input.json')
//     .then((response) => response.json())
//     .then(json => console.log(json));