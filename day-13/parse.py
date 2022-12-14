#!/usr/bin/python3

import os, sys, json, time

def parseInput(input_file):
    array = []
    i = 0
    source = open(input_file, "r")
    
    for line in source:
        line = line.strip()
        if line:
            arr, depth = constructArray(line)
            # delayPrint("nesting level: " + str(depth))
        array.append(arr)

    source.close()
    return array

def delayPrint(msg = "", delay = 0.8):
    if debug:
        print(msg)
        time.sleep(delay)
    # input()

def constructArray(line):
    # returns array and depth


    if line.isnumeric():
        return int(line), 0
    delayPrint(delay = 0.2)

    array = []
    depth = 0
    i = 0
    if line[i + 1] == "]":
        delayPrint("[]")
        return array, depth
    delayPrint("not a number, begin array")
    
    while True:

        if line[i] == "]":
            delayPrint("closing array: " + str(array), 0.2)
            return array, depth
        i += 1
        if line[i] == "[":
            delayPrint("found nested array")
            newArray, newArrayDepth = constructArray(line[i:])
            array.append(newArray)
            depth = newArrayDepth + 1
            
            openArrays = depth
            while openArrays:
                i += 1
                if line[i] == "]":
                    openArrays -= 1

            i += 1
            continue

        num = line[i]
        i += 1
        while line[i] not in "[],":
            num += line[i]
            i += 1
        delayPrint(num, 0.2)
        array.append(int(num))





        # i += 1
        




os.chdir(os.path.dirname(sys.argv[0]))

file = "input"
if len(sys.argv) > 1:
    file = sys.argv[1] + "-input"

debug = False

output = open(file + ".json", "w")
json.dump(parseInput(file + ".txt"), output) 
output.close()