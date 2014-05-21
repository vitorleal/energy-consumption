var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less   = require('gulp-less'),
    paths  = {
      scripts: ['js/**/*.js', 'js/app.js', '!js/*.min.js', '!js/libs/**/*.js'],
      less   : ['less/app.less', 'less/*.less', 'less/**/*.less']
    };

//Concatenate the js files
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('js'));
});


//Compile less to css
gulp.task('less', function () {
  gulp.src('less/app.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});


//Watch changes in less and js files
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.less, ['less']);
});


gulp.task('default', ['scripts', 'less', 'watch']);
