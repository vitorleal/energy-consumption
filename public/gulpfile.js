var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less   = require('gulp-less');

var paths = {
  scripts: ['js/**/*.js', 'js/app.js', '!js/*.min.js', '!js/libs/**/*.js'],
  less: ['less/app.less', 'less/*.less', 'less/**/*.less'],
  views: 'views/*.html'
};


gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('js'));
});


gulp.task('less', function () {
  gulp.src('less/app.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});


gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['scripts', 'less', 'watch']);
