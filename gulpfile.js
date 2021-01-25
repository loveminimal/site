const { src, dest, series, parallel, watch } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');

const sass = require('gulp-dart-sass');

const gls = require('gulp-live-server');

function js(cb) {
    // ...
    return src('./src/main.js')
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(
            browserify({
                insertGlobals: true,
                // debug: !gulp.env.production,
            })
        )
        .pipe(uglify())
        .pipe(dest('dist'));

    cb();
}

function css(cb) {
    return src('./src/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(dest('dist'));

    cb();
}

// watch(['./src/**/*.js', './src/**/*.scss'], (cb) => {
//     cb();
// });

function devServer(cb) {
    let server = gls.static('public', 3000);
    server.start();

    // watch('public/**/*', (file) => server.notify.apply(server, [file]))
    cb();
}

module.exports.default = function () {
    watch(
        'src/**/*.(js|scss)',
        { events: 'all', queue: false, delay: 500 },
        parallel(js, css)
    );
};

module.exports.build = parallel(js, css);

module.exports.dev = devServer;
