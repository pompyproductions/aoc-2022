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