const { src, dest, series, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const sass = require('gulp-dart-sass');
const gsl = require('gulp-server-livereload');
const sourcemaps = require('gulp-sourcemaps');

function js() {
    return src('./src/main.js')
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(
            browserify({
                insertGlobals: true,
                debug: true,
            })
        )
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('public/dist'));
}

function css() {
    return src('./src/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(dest('public/dist'));
}

function webserver() {
    return src('public').pipe(
        gsl({
            livereload: true,
            // directoryListing: true,
            open: true,
        })
    );
}

function watcher() {
    watch('src/**/*.js', js);
    watch('src/**/*.scss', css);
}

exports.serve = webserver;
exports.build = parallel(js, css);
exports.watch = watcher;
