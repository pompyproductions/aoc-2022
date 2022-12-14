const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// name this (build function) as you'd like
function buildStyles() {
    return src("sass/style.scss") // relative path to source
        .pipe(sass())
        .pipe(dest("./")) // relative path to destination folder
}

// name this (watcher function) as you'd like
function watchTask() {
    watch(["sass/**/*.scss"], buildStyles) 
}

exports.default = series(buildStyles, watchTask)