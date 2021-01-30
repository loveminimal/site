const { src, dest, series, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const sass = require('gulp-dart-sass');
const gls = require('gulp-live-server');

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
        .pipe(dest('dist'))
        .pipe(uglify())
        .pipe(dest('public/dist'));
}

function css() {
    return src('./src/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(dest('dist'))
        .pipe(dest('public/dist'));
}

function devServer(cb) {
    let server = gls.static('public', 3000);
    server.start();

    // watch('public/**/*', (file) => server.notify.apply(server, [file]))
    cb();
}

function watcher() {
    watch('src/**/*.js', js);
    watch('src/**/*.scss', css);
}
exports.build = parallel(js, css);
exports.watch = watcher;

// module.exports.dev = devServer;
