#!/usr/bin/python

import os, sys, json, re

os.chdir(os.path.dirname(sys.argv[0]))

f = open("input.txt", "r")

array = [] # initialize with first object
i = 0

for line in f:
    array.append([
        ["A", "B", "C"].index(line[0]),
        ["X", "Y", "Z"].index(line[2])
    ])

f.close()
f = open("input.json", "w")

json.dump(array, f, indent = 4)

f.close()