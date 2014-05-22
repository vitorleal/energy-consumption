var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less   = require('gulp-less'),
    cache  = require('gulp-angular-templatecache'),
    css    = require('gulp-minify-css'),
    paths  = {
      scripts  : ['js/**/*.js', 'js/app.js', '!js/min/*.js', '!js/libs/**/*.js'],
      libs     : ['js/libs/jquery/*.js', 'js/libs/**/*.js'],
      less     : ['less/app.less', 'less/*.less', 'less/**/*.less'],
      templates: ['views/*.html', 'views/**/*.html']
    };

//Concatenate the js files
gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/min/'));
});


//Concatenate js libs
gulp.task('libs', function() {
  gulp.src(paths.libs)
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('js/min/'));
});


//Compile less to css
gulp.task('less', function () {
  gulp.src('less/app.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});


//Minify css
gulp.task('css', function() {
  gulp.src('css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(css({
      keepBreaks: true
    }))
    .pipe(gulp.dest('css/min/'))
});


//Create the template
gulp.task('template', function () {
  gulp.src(paths.templates)
    .pipe(cache({
      module: 'light.templates',
      standalone: true
    }))
    .pipe(gulp.dest('js'));
});


//Watch changes in less and js files
gulp.task('watch', function() {
  gulp.watch(paths.scripts,   ['scripts']);
  gulp.watch(paths.less,      ['less']);
  gulp.watch(paths.templates, ['template']);
});


gulp.task('default', ['template', 'scripts', 'libs', 'less', 'css', 'watch']);
