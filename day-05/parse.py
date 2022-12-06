#!/usr/bin/python

import os, sys, json, re

def getCrates(line):
    return list(map(
        lambda str: str[1] if str[1] != " " else "",
        re.findall(r"(\s{4}|\[\w\]\s)", line)
    ))
def convertCrates(crate):
    if "" in crate:
        return "".join(crate[crate.index(""):])[::-1]
    return "".join(crate)[::-1]

if bool(os.path.dirname(sys.argv[0])):
    os.chdir(os.path.dirname(sys.argv[0]))

obj = {
    "stacks": [],
    "instructions": []
}
i = 0

# parse crates
f = open("input.txt", "r")
crates = getCrates(f.readline())
for item in crates:
    obj["stacks"].append([item])

for i in range(9):
    crates = getCrates(f.readline())
    for index, item in enumerate(crates):
        obj["stacks"][index].append(item)

# convert crates to strings
obj["stacks"] = list(map(
    convertCrates,
    obj["stacks"]
))

# parse instructions
line = f.readline().strip()
while line:
    obj["instructions"].append(
        list(map(
            int,
            re.findall(r"\d+", line)
        ))
    )
    line = f.readline().strip()

f.close()

f = open("input.json", "w")
json.dump(obj, f, indent = 4)
f.close()