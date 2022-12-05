#!/usr/bin/python

import os, sys, json, re

os.chdir(os.path.dirname(sys.argv[0]))

f = open("input.txt", "r")

array = []

for line in f:
    match = re.search(r"(\d+)-(\d+),(\d+)-(\d+)", line).groups()
    array.append([
        [int(match[0]), int(match[1])],
        [int(match[2]), int(match[3])]
    ])

f.close()
f = open("input.json", "w")

json.dump(array, f, indent = 4)

f.close()