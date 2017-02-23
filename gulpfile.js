'use strict';

const outputDir = './dist';

const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');

const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');

const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

const uglify = require('gulp-uglify');

// transpile and minify css
gulp.task('styles', () => {
    return gulp.src('styles/*.css')
        .pipe(autoprefixer({ browsers: 'ie >= 9' }))
        .pipe(cleanCss())
        .pipe(gulp.dest(`${outputDir}/styles/`));
});

// transpile, concatenate, and minify our javascript
gulp.task('scripts', () => {
    return gulp.src('scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(`${outputDir}/scripts/`));
});

// copy static files to the output directory
gulp.task('static', () => {
    return gulp.src(['robots.txt', 'robots-deny.txt', '.htaccess'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
        }))
        .pipe(gulp.dest(`${outputDir}/`));
});

// interpolate, minify, and copy static files to the output directory
gulp.task('markup', () => {
    return gulp.src(['index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
        }))
        .pipe(htmlmin())
        .pipe(gulp.dest(`${outputDir}/`));
});

gulp.task('watch', () => {
    gulp.watch(['styles/*.css'], ['build']);
    gulp.watch(['scripts/*.js'], ['build']);
    gulp.watch(['robots.txt', 'robots-deny.txt', '.htaccess'], ['static']);
    gulp.watch(['index.html'], ['markup']);
});

// clean output directory
gulp.task('clean', () => {
    // forced becuase outside of working directory
    return del([`${outputDir}/**/*`], { force: true });
})

gulp.task('build', () => {
    runSequence(['styles', 'scripts', 'static'], 'markup');
});
gulp.task('default', () => {
    runSequence('clean', ['build', 'watch']);
});
