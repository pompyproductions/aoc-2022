# Devlog

Taking notes for each day participating in the Advent of Code 2022. Since my goal is not only to grab stars, but also to _go on every possible tangent_ and try out new things, my days (01–25 December) may not perfectly match the days of the advent calendar (Day 01 – Day 25). This log matches the former (days of the month), and also tracks how it relates to the latter (days of the event).

## Days

### December 04

Yes, today I actually started by solving the puzzles. Day 01 part 2 was a breeze, and now it's time to solve day 02! Lazy as I am, I didn't want to copy files and edit them manually. A couple lines of python, and ta-da! Now I have template files which I can copy over by running a script I named "generator.py": `./generator.py 02` makes a new folder called day-02 and fills it with a nice starting point. 

Content with the templates, I solved day 02, and thought to myself that I should be keeping a log of these. This means all the entries up until know was written, you know, now (oops!).


### December 03

Now it's solving time — or is it? While mulling over how best to import the puzzle input into my website, I decided to parse the plain-text file into JSON using Python from the WSL terminal. It went well, meaning it _really is_ solving time! No, actually not; because now I ask myself how to read that file (no, not reaching for Node.js in the slightest inconvenience). Since I had to _request_ what I made available on GitHub pages, I realized I was already knee-deep in asynchronous territory — so I doubled down and started scouring all over the Internet for good study material on it (event loop, promises, async/await...). Tangent 02! 

I did end up solving the first part of the first puzzle. The solution remembers the input (so that it doesn't have to fetch again, and browser console can reach it), and returns the "top X elf objects" where X can be changed to get as many as you need.


### December 02

Today is where I set up my dev environment and solve the two puzzles at once — or so I _thunk._ Once I started setting up my [GitHub page for Advent of Code 2022](https://pompyproductions.github.io/aoc-2022/), I realised I wanted it to work on its own as a GitHub page, and started setting it up with vanilla HTML+CSS+JS. CSS is good and all, and it would be enough for a page this simple, but I wanted to make it a bit more "scalable" — so I set up Sass, because I'm much more comfortable using my breakpoint mixins. I also read up some Python to get back to speed for parsing the inputs. Needless to say, I didn't get around to actually solving a problem. Again!


### December 01

While I originally meant to set up my dev environment and solve the first puzzle on the first day of the challenge, I decided to prepare my [personal website](https://erengazioglu.com) so that I could then create a dedicated sub-page. One thing led to the other (tangent 01) and I found myself completely restyling my website. Task failed successfully!


## Tangents

### Tangent 03: Intersections (Array and Set)

```js
// not an actual intersect: 
// returns one of each repeated value, 
// and duplicates are discarded
function findCommonValues(...args) {
    if (args.length === 1) {
        return args[0];
    }
    const arrays = [...args];

    return arrays.pop()
        .filter(item => findCommonValues(...arrays).includes(item))
        .filter((elem, i, curr) => curr.indexOf(elem) === i); // extra step to discard duplicates
}
```


### Tangent 02: The Event Loop

Content TBD. 


### Tangent 01: Restyling my personal website

Content TBD.

