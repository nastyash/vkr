var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    minHtml = require('gulp-minify-html'),
    minCss = require('gulp-minify-css'),
    bower = require('gulp-bower'),
    dirName = './static/assets';

var filterJs = gulpFilter(['**/*.js', '!**/*.min.js']),
    filterCss = gulpFilter('**/*.css');

gulp.task('bower', function() {
    return bower('./bower_components')
        .pipe(filterJs)
        .pipe(uglify())
        .pipe(filterJs.restore())

        .pipe(filterCss)
        .pipe(minCss({}))
        .pipe(filterCss.restore())
        .pipe(gulp.dest(dirName));
});

gulp.task('css', function() {
    gulp.src('./client/css/*.css')
        .pipe(minCss({keepBreaks:true}))
        .pipe(gulp.dest(dirName));
});

gulp.task('js', function() {
    gulp.src('./client/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(dirName));
});

gulp.task('html', function() {
    gulp.src('./client/*.html')
        .pipe(minHtml({}))
        .pipe(gulp.dest('./static'));
});

gulp.task('watch', function() {
    gulp.watch('./client/js/*.js', ['js']);
    gulp.watch('./client/css/*.css', ['css']);
    gulp.watch('./client/*.html', ['html']);
});

gulp.task('default', ['bower', 'css', 'js', 'html', 'watch']);

