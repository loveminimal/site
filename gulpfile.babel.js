const { src, dest, series, parallel } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const sass = require("gulp-dart-sass");

function defaultTask(cb) {
    // ...
    return src("./src/main.js")
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(uglify())
        .pipe(dest("dist"));

    cb();
}

function css(cb) {
    return src("./src/style.scss").pipe(sass()).pipe(dest('dist'));
}

module.exports.default = parallel(css);
