let input;

class Monke {
    inspections = 0;
    constructor(obj) {
        this.items = obj.items;
        this.inspect = (item) => {
            this.inspections++;
            const operand = obj.operation[1] === "old"
                ? item
                : parseInt(obj.operation[1]);
            switch(obj.operation[0]) {
                case "*":
                    return item * operand;
                case "/":
                    return item / operand;
                case "+":
                    return item + operand;
                case "-":
                    return item - operand;
            }
        }
        this.targetMonke = item => item % obj.mod
            ? obj.throw[1]
            : obj.throw[0];
        this.catch = item => this.items.push(item)
    }
}

async function solve() {
    // fetch question
    if (!input) {
        const response = await fetch('./input.json');
        console.log("fetching input");
        input = await response.json(); 
    }
    const monkes = [];
    console.log(input.length)
    for (let i = 0; i < input.length; i++) {
        monkes.push(new Monke(input[i]));
    }
    // console.log(monkes)

    for (let i = 0; i < 20; i++) {
        for (let monke of monkes) {
            while (monke.items.length) {
                let item = monke.items.pop();
                console.log("Worry level:", item);
                item = monke.inspect(item);
                console.log("New worry level:", item);
                item = Math.floor(item / 3);
                console.log("Divided:", item);
                console.log("Target monke:", monke.targetMonke(item));
                monkes[monke.targetMonke(item)].catch(item);
                console.log("");
            }
        }
        // console.log(...monkes[0].items);
        // console.log(...monkes[1].items);
    }
    monkes.sort((a, b) => a.inspections - b.inspections);
    console.log(monkes);
    console.log(monkes.pop().inspections * monkes.pop().inspections);
}

solve();