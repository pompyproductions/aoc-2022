#!/usr/bin/python3

import os, sys, json

def parseInput(input_file):
    array = []
    i = 0
    source = open(input_file, "r")
    
    for line in source:
        line = line.strip()
        print(line)
        array.append(line)

    source.close()
    return array

os.chdir(os.path.dirname(sys.argv[0]))

file = "input"
if sys.argv[1]:
    file = sys.argv[1] + "-input"

output = open(file + ".json", "w")
json.dump(parseInput(file + ".txt"), output, 4) 
output.close()