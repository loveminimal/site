const { src, dest, series, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const sass = require('gulp-dart-sass');
const gsl = require('gulp-server-livereload');

function js() {
    return src('./src/main.js')
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
        .pipe(dest('public/dist'));
}

function css() {
    return src('./src/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
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
