let input, step, map, lastVisited;

class MapNode {
    isVisited = false;
    isGoal = false;
    isNext = false; // for rendering
    step = 0;
    constructor(char, pos) {
        this.elevation = char.charCodeAt(0) - 96;
        this.position = pos;
    }
    getAdjacentNodes(map) {
        const [x, y] = this.position; 
        const currentElev = this.elevation;
        const nodes = [];
        if (y !== 0) nodes.push(map[y-1][x]);
        if (y !== map.length - 1) nodes.push(map[y+1][x]);
        if (x !== 0) nodes.push(map[y][x-1]);
        if (x !== map[y].length - 1) nodes.push(map[y][x+1]);
        return nodes.filter(elem => {
            return !elem.isVisited 
            && elem.elevation - currentElev <= 1
        })
    }
    set value(val) {
        this.step = val;
        this.isVisited = true;
        this.isNext = true;
    }
}

async function main() {
    await getInput("input.json");
    await solve();
    await getInput("test-input.json");
    await initializeMap();
    await updateMapDisplay();
}

function updateMapDisplay() {
    const container = document.querySelector(".map-container");
    Array.from(container.children).forEach(elem => elem.remove())
    for (const column of map) {
        for (const node of column) {
            let element = document.createElement("p");
            element.textContent = node.elevation;
            if (node.isGoal) {
                element.classList.add("goal");
            } else if (!node.isVisited) {
                element.classList.add("unvisited");
            } 
            if (node.isNext) {
                element.classList.add("next");
            }
            container.appendChild(element);
        }
    }
    document.getElementById("step-counter").textContent = `\
    Steps: ${step}
    `;
}

async function getInput(filename) {
    const response = await fetch(`./${filename}`);
    input = await response.json(); 
}

function initializeMap() {
    map = [];
    lastVisited = [];
    step = 0;
    for (const line of input) {
        const level = [];
        for (let i = 0; i < line.length; i++) {
            let node = new MapNode(line.charAt(i), [i, map.length]);
            if (node.elevation === -13) { // "S"
                node.elevation = 0;
                node.isVisited = true;
                node.isNext = true;
                lastVisited.push(node);
            } else if (node.elevation === -27) { // "E"
                node.elevation = 26; // "z"
                node.isGoal = true;
            }
            level.push(node);
        }
        map.push(level);
    }
}

function next() {
    if (lastVisited.find(elem => elem.isGoal)) {
        return;
    }
    const nextNodes = [];
    step++;
    for (const node of lastVisited) {
        node.isNext = false;
        const neighbors = node.getAdjacentNodes(map);
        neighbors.forEach(item => {
            item.value = step;
            nextNodes.push(item);
        })
    }
    lastVisited = nextNodes;
    updateMapDisplay();
}

function reset() {
    step = 0;
    lastVisited = [];
    initializeMap();
    updateMapDisplay();
}

async function solve() {
    initializeMap();
    let isGoalFound = false;
    while (!isGoalFound) {
        const nextNodes = [];
        step++;
        for (const node of lastVisited) {
            node.isNext = false;
            const neighbors = node.getAdjacentNodes(map);
            neighbors.forEach(item => {
                item.value = step;
                nextNodes.push(item);
            })
        }
        lastVisited = nextNodes;
        if (lastVisited.find(elem => elem.isGoal)) {
            isGoalFound = true;
        }
    }
    console.log("Part 1:", step);
}



// async function solve() {
//     // fetch question
//     if (!input) {
//         const response = await fetch('./test-input.json');
//         console.log("fetching input");
//         input = await response.json(); 
//     }
//     map = [];
//     let lastVisited = [];
//     for (const line of input) {
//         const level = [];
//         for (let i = 0; i < line.length; i++) {
//             let node = new MapNode(line.charAt(i), [i, map.length]);
//             if (node.elevation === -13) { // "S"
//                 node.elevation = 0;
//                 node.isVisited = true;
//                 lastVisited.push(node);
//             } else if (node.elevation === -27) { // "E"
//                 node.elevation = 26; // "z"
//                 node.isGoal = true;
//             }
//             level.push(node);
//         }
//         map.push(level);
//     }
//     console.log(map);
//     let step = 0;
//     let isGoalFound = false;

//     // while (!isGoalFound) {
//     //     const nextNodes = [];
//     //     for (const node of lastVisited) {
//     //         const neighbors = node.getAdjacentNodes(map);
//     //         neighbors.forEach(item => {
//     //             item.isVisited = true;
//     //             if (item.isGoal) isGoalFound = true;
//     //         });
//     //         nextNodes.push(...neighbors);
//     //     }
//     //     step++;
//     //     lastVisited = nextNodes;
//     //     console.log(lastVisited);
//     // }
//     // console.log(step);


//     // for (let i = 0; i < 2; i++) {
//     //     const nextNodes = [];
//     //     for (const node of lastVisited) {
//     //         const neighbors = node.getAdjacentNodes(map);
//     //         neighbors.forEach(item => {
//     //             item.isVisited = true;
//     //         });
//     //         nextNodes.push(...neighbors);
//     //     }
//     //     step++;
//     //     lastVisited = nextNodes;
//     // }
//     console.log(map);

//     // while (!isGoalFound) {
//     //     step++;
//     //     if (step > 1000) break;
//     // }
// }

document.getElementById("next").addEventListener("click", next)
document.getElementById("reset").addEventListener("click", reset)
main();