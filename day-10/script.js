let input;

function checkCycle(cyc) {
    return [20, 60, 100, 140, 180, 220].includes(cyc)
}

function getPixel(cyc, pos, len=3) {
    if (cyc >= pos && cyc < pos + len) {
        return "█"
    }
    return " "
}

function chunkString(str, chunkSize) {
    if (chunkSize <= 0) return [str]; // catch infinite loop
    const arr = [];
    for (let i = 0; i < str.length; i += chunkSize) {
        arr.push(str.substring(i, i + chunkSize));
    }
    return arr;
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
    let cycle = 1;
    let currentPixel = 0;
    let register = 1;
    const signals = [];
    let crt = "";
    for (let i = 0; i < input.length; i++) {
        crt += getPixel(currentPixel, register - 1);
        if (checkCycle(cycle)) signals.push(register * cycle);
        
        if (input[i].length > 4) {
            cycle++;
            currentPixel = (currentPixel + 1) % 40;
            crt += getPixel(currentPixel, register - 1);
            if (checkCycle(cycle)) signals.push(register * cycle);
            register += Number.parseInt(input[i].split(" ")[1]);
        }
        cycle++;
        currentPixel = (currentPixel + 1) % 40;
    }
    console.log("Part 1:", signals.reduce((acc, val) => acc + val, 0));
    console.log("Part 2:");
    const message = chunkString(crt, 40).join("\n");
    console.log(message);
}

solve();