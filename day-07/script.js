let input;

class Directory {
    constructor(parent, name, contents=[]) {
        this.parent = parent;
        this.name = name;
        this.contents = contents;
    }
    get size() {
        return this.contents.reduce((acc, elem) => acc + elem.size, 0)
    }
    getChild(name) {
        return this.contents.find(elem => elem.name === name)
    }
    getChildrenMaxSize(value) {
        const result = [];
        if (this.size <= value) result.push(this);
        this.contents.forEach(item => {
            if (item instanceof Directory) {
                result.push(...item.getChildrenMaxSize(value))
            }
        })
        return result;
    }
    getChildrenMinSize(value) {
        const result = [];
        if (this.size >= value) result.push(this);
        this.contents.forEach(item => {
            if (item instanceof Directory) {
                result.push(...item.getChildrenMinSize(value))
            }
        })
        return result;
    }
}

class File {
    extension = "";
    constructor(parent, name, size) {
        this.parent = parent;
        name = name.split(".");
        if (name.length > 1) {
            this.extension = name[1];
        }
        this.name = name[0];
        this.size = size;
    }
}

// helper for debugging
function colorLog(msg, color) {
    console.log(`%c${msg}`, `color: ${color}`)
}

const totalDiskSpace = 70000000;
const spaceRequired = 30000000;
let root;

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }

    // create root directory
    let currentDir = new Directory(
        "",
        "",
        []
    )
    root = currentDir;

    for (let i = 0; i < input.length; i++) {
        let cmd = input[i].command.split(" ");

        if (cmd[0] === "cd") {
            if (cmd[1] === "..") {
                currentDir = currentDir.parent;
            } else {
                if (cmd[1] == "/") continue; // skip root
                currentDir = currentDir.getChild(cmd[1]);
            }
        } else { // ls
            if (!currentDir.contents[0]) { // check if empty
                input[i].results.forEach(item => {
                    item = item.split(" ");
                    if (item[0] === "dir") {
                        currentDir.contents.push(new Directory(
                            currentDir,
                            item[1]
                        ))
                    } else { // ls
                        currentDir.contents.push(new File(
                            currentDir,
                            item[1],
                            Number.parseInt(item[0])
                        ))
                    }
                })
            }
        }
    }
    console.log("Part 1:", root.getChildrenMaxSize(100000).reduce((acc, item) => {
        return acc + item.size;
    }, 0))

    const unusedSpace = totalDiskSpace - root.size;
    const spaceToFree = spaceRequired - unusedSpace;
    console.log("Additional space required:", spaceToFree)
    
    console.log("Part 2:", root
        .getChildrenMinSize(spaceToFree)
        .reduce((curr, item) => item.size < curr.size ? item : curr)
        .size);
}

solve();