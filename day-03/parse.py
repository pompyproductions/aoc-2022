#!/usr/bin/python

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))

f = open("input.txt", "r")

array = []
i = 0

for line in f:
    line = line.strip()
    array.append([
        line[:int(len(line) / 2)],
        line[int(len(line) / 2):]
    ])

f.close()
f = open("input.json", "w")

json.dump(array, f, indent = 4)

f.close()