let input;

const sumAll = arr => arr.reduce((acc, val) => acc + val);

async function solve(elves=1) {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        input = await response.json(); 
    }

    let bestElves = [
        {
            index: 0, 
            totalCalories: sumAll(input[0])
        }
    ];

    for (let i = 1; i < input.length; i++) {
        sum = sumAll(input[i]);
        if (sum > bestElves[bestElves.length-1].totalCalories) {
            bestElves.push({index: i, totalCalories: sum});
            bestElves.sort((a, b) => b.totalCalories - a.totalCalories);
            if (bestElves.length > elves) {
                bestElves.pop();
            }
        }
    }
    solution = bestElves; // containing "elf objects"
    console.log(
        elves > 1 
            ? `Total of top ${elves}:`
            : `Highest total calories:`,
        solution.reduce((acc, val) => acc + val.totalCalories, 0)
        );
}

async function sortAll() {
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }

    input = input
        .map(elf => sumAll(elf))
        .sort((a, b) => b - a);
    let total = 0;
    for (let i = 0; i < 3; i++) {
        total += input[i];
    }
    console.log(input);
    console.log(total);
}

solve();
solve(3);
solve(10);
