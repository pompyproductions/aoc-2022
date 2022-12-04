#!/usr/bin/python3

import os, sys, re

# ensure correct directory no matter where you're running the script from
os.chdir(os.path.dirname(sys.argv[0]))

def copyTemplate(name):
    template = open(name, "r")
    target = open("../day-%s/%s" % (sys.argv[1], name), "w")
    target.write(template.read())
    target.close()
    template.close()
    

def generate():
    if not os.path.exists("../day-%s" % sys.argv[1]):
        os.mkdir("../day-%s" % sys.argv[1])

    template = open("index.html", "r")
    target = open("../day-%s/index.html" % sys.argv[1], "w")
    target.write(re.sub(r"\$DAY", sys.argv[1], template.read()))
    target.close()
    template.close()

    copyTemplate("parse.py")
    copyTemplate("script.js")

generate()







# def copy_file(file, ):
# os.chdir("..")

# print(os.getcwd())
# print(sys.argv)

# name = sys.argv[1]

# os.mkdir(root + name)
# file = open(root + name + "/index.html", "w")

# template = open("index-blank.html", "r")

# if (len(sys.argv) - 1):
#     for arg in sys.argv:
#         if arg == "input":
#             template = open("index-input.html", "r")
# else:
#     template = open("index-blank.html", "r")

# for line in template.readlines():
#     file.write(line)

# template.close()
# file.close()

# file = open(root + name + "/script.js", "w")
# template = open("script.js", "r")

# for line in template.readlines():
#     file.write(line)