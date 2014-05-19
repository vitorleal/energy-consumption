var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less   = require('gulp-less');

var paths = {
  scripts: ['js/**/*.js', 'js/app.js', '!natura/static/js/lib/*.js'],
  less: '/less/app.less'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(uglify())
    .pipe(concat('app-min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(less({
      paths: ['less']
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['scripts', 'less', 'watch']);
