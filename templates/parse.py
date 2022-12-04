#!/usr/bin/python

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))

f = open("input.txt", "r")

array = [[]] # initialize with first object
i = 0

for line in f:
    print(line)

f.close()
f = open("input.json", "w")

json.dump(array, f, indent = 4)

f.close()