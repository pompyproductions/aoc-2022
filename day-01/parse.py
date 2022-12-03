#! /usr/bin/python

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))
print(os.getcwd())

f = open("input.txt", "r")

array = [[]] # initialize with first object
i = 0

for line in f:
    if line != "\n":
        array[i].append(int(line))
    else:
        print(array[i])
        array.append([])
        i += 1

f.close()
print(array)
f = open("input.json", "w")

json.dump(array, f, indent = 4)

f.close()