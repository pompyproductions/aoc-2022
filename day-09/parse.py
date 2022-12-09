#!/usr/bin/python3

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))

f = open("input.txt", "r")

array = []
i = 0

for line in f:
    array.append([
        line[0],
        int(line[1:])
    ])

f.close()
f = open("input.json", "w")

json.dump(array, f, indent = 4)

f.close()