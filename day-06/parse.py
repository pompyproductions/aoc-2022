#!/usr/bin/python

import os, sys, json

os.chdir(os.path.dirname(sys.argv[0]))

source = open("input.txt", "r")
target = open("input.json", "w")

json.dump(source.readline(), target)

source.close()
target.close()