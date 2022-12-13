#!/usr/bin/python3

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))

f = open("test-input.txt", "r")

array = []
i = 0

for line in f:
    array.append(line.strip())

f.close()
f = open("test-input.json", "w")

json.dump(array, f, indent = 4)

f.close()