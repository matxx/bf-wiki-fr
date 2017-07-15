const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const path = require('path')

gulp.task('clean', function() {
  return del(['dist'])
})

gulp.task('build:css', function() {
  gulp.src('assets/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
  gulp.src('assets/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('all.css'))
      .pipe(gulp.dest('dist/css'))
})

gulp.task('minify:css', function() {
  return gulp.src('dist/css/**/*.css')
             .pipe(minifyCSS())
             .pipe(rename({ suffix: ".min" }))
             .pipe(gulp.dest('dist/css'))
})
