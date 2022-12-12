#!/usr/bin/python3

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))

source = open("input.txt", "r")
array = []
monke = None

for line in source:
    line = line.strip().split()
    if not len(line):
        if monke:
            array.append(monke)
        continue
    if line[0] == "Monkey":
        monke = {}
    elif line[0] == "Starting":
        monke["items"] = []
        for i in range(2, len(line)):
            monke["items"].append(int(line[i].replace(",", "")))
        # print(monke["items"])
    elif line[0] == "Operation:":
        monke["operation"] = [line[-2], line[-1]]
        # print(monke["operation"])
    elif line[0] == "Test:":
        monke["mod"] = int(line[-1])
        monke["throw"] = []
        monke["throw"].append(int(source.readline().strip()[-1]))
        monke["throw"].append(int(source.readline().strip()[-1]))

array.append(monke)
source.close()

target = open("input.json", "w")
json.dump(array, target, indent = 4)
target.close()

source = open("test-input.txt", "r")
array = []
monke = None

for line in source:
    line = line.strip().split()
    if not len(line):
        if monke:
            array.append(monke)
        continue
    if line[0] == "Monkey":
        monke = {}
    elif line[0] == "Starting":
        monke["items"] = []
        for i in range(2, len(line)):
            monke["items"].append(int(line[i].replace(",", "")))
        # print(monke["items"])
    elif line[0] == "Operation:":
        monke["operation"] = [line[-2], line[-1]]
        # print(monke["operation"])
    elif line[0] == "Test:":
        monke["mod"] = int(line[-1])
        monke["throw"] = []
        monke["throw"].append(int(source.readline().strip()[-1]))
        monke["throw"].append(int(source.readline().strip()[-1]))

array.append(monke)
source.close()

target = open("test-input.json", "w")
json.dump(array, target, indent = 4)
target.close()