let input;

function isTreeVisible(y, x) {
    let visible = 4;
    for (let i = 0; i < y; i++) {
        if (input[y][x] <= input[i][x]) {
            visible--;
            break;
        }
    }
    for (let i = y + 1; i < input.length; i++) {
        if (input[y][x] <= input[i][x]) {
            visible--;
            break;
        }
    }
    for (let i = 0; i < x; i++) {
        if (input[y][x] <= input[y][i]) {
            visible--;
            break;
        }
    }
    for (let i = x + 1; i < input.length; i++) {
        if (input[y][x] <= input[y][i]) {
            visible--;
            break;
        }
    }
    return Boolean(visible);
}

function scenicScore(y, x) {
    let viewingDistance = [0, 0, 0, 0];
    for (let i = y - 1; i >= 0; i--) {
        viewingDistance[0]++;
        if (input[y][x] <= input[i][x]) {
            break;
        }
    }
    for (let i = y + 1; i < input.length; i++) {
        viewingDistance[1]++;
        if (input[y][x] <= input[i][x]) {
            break;
        }
    }
    for (let i = x - 1; i >= 0; i--) {
        viewingDistance[2]++;
        if (input[y][x] <= input[y][i]) {
            break;
        }
    }
    for (let i = x + 1; i < input.length; i++) {
        viewingDistance[3]++;
        if (input[y][x] <= input[y][i]) {
            break;
        }
    }
    return viewingDistance.reduce((acc, val) => acc * val, 1);
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
    let visible = input.length * 2 + input[0].length * 2 - 4;
    for (let i = 1; i < input.length - 1; i++) {
        for (let j = 1; j < input[i].length - 1; j++) {
            if (isTreeVisible(i, j)) visible++;
        }
    }
    console.log("Part 1:", visible);

    let highest = 1;
    for (let i = 1; i < input.length - 1; i++) {
        for (let j = 1; j < input[i].length - 1; j++) {
            let score = scenicScore(i, j);
            if (score > highest) highest = score;
        }
    }
    console.log("Part 2:", highest);
}

solve();