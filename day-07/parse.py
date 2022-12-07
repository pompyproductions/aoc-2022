#!/usr/bin/python

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))

f = open("input.txt", "r")

array = []
i = 0
entry = {
    "command": f.readline().strip()[2:],
}

for line in f:
    line = line.strip()
    if (line.startswith("$")):
        array.append(entry)
        entry = {
            "command": line[2:],
        }
        if line.endswith("ls"):
            entry["results"] = []
    else:
        entry["results"].append(line)
array.append(entry)

f.close()
f = open("input.json", "w")

json.dump(array, f, indent = 4)

f.close()