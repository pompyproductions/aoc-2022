let input;

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
    console.log(input[0])
    // for (let i = 0; i < 10; i++) {
    //     console.log(input[i])
    // }
}

solve();