let input;

// helpers
function checkDuplicate(str) {
    for (let i = str.length - 1; i >= 0; i--) {
        const curr = str.charAt(i);
        const chunk = str.slice(0, i);
        if (chunk.includes(curr)) {
            return chunk.lastIndexOf(curr)
        }
    }
    return -1;
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }

    let i = 4;
    let skip = checkDuplicate(input.slice(i - 4, i));
    
    while (skip != -1) { // fancy way of saying != -1
        i += skip + 1;
        skip = checkDuplicate(input.slice(i - 4, i));
    }
    console.log("Part 1:", i);
    
    i = 14;
    skip = checkDuplicate(input.slice(i - 14, i));
    
    while (skip != -1) { // fancy way of saying != -1
        i += skip + 1;
        skip = checkDuplicate(input.slice(i - 14, i));
    }
    console.log("Part 2:", i);
}

solve();