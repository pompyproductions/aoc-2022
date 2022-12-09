let input;

function getVector(to, from) {
    return [to[0] - from[0], to[1] - from[1]];
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch("./input.json");
        console.log("fetching input");
        input = await response.json();
    }
    const dirs = {
        U: [0, -1],
        D: [0, 1],
        R: [1, 0],
        L: [-1, 0],
    };

    function ropeMotion(count, input) {
        const knots = [];
        for (let i = 0; i < count; i++) {
            knots.push([0, 0]);
        }
        let visited = new Set();
        visited.add("0,0");
        for (let i = 0; i < input.length; i++) {
            const motion = input[i];
            for (let j = 0; j < motion[1]; j++) {
                knots[0][0] += dirs[motion[0]][0];
                knots[0][1] += dirs[motion[0]][1];

                for (let k = 1; k < knots.length; k++) {
                    const vector = getVector(knots[k - 1], knots[k]);
                    if (vector[0] * vector[0] + vector[1] * vector[1] > 2) {
                        if (vector[0])
                            knots[k][0] += vector[0] / Math.abs(vector[0]);
                        if (vector[1])
                            knots[k][1] += vector[1] / Math.abs(vector[1]);
                    }
                }
                visited.add(knots[knots.length - 1].join(","));
            }
        }
        return visited.size;
    }
    console.log("Part 1:", ropeMotion(2, input));
    console.log("Part 2:", ropeMotion(10, input));
}

solve();
