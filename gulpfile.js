const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const path = require('path')
const gulpGitStatus = require('gulp-git-status');

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
  gulp.src('assets/scss/**/*.scss')
      .pipe(gulpGitStatus({ excludeStatus: 'unchanged' }))
      .pipe(gulpGitStatus({ excludeStatus: 'untracked' }))
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('changed.css'))
      .pipe(gulp.dest('dist/css'))
})

gulp.task('minify:css', function() {
  return gulp.src('dist/css/**/*.css')
             .pipe(minifyCSS())
             .pipe(rename({ suffix: ".min" }))
             .pipe(gulp.dest('dist/css'))
})

const nodemw = require('nodemw')
const fs = require('fs')

function logAndExecute(callback) {
  return function (err, data) {
    if (err) {
      console.log(err)
    }
    else {
      callback(data)
    }
  }
}

gulp.task('upload:css', function() {
  let bot = new nodemw({
    protocol: 'http',
    server: process.env.WIKI_DOMAIN_EU_FR,
    path: '',
    debug: true
  })
  const cssPath = path.join(__dirname, 'dist', 'css', 'changed.min.css')

  bot.logIn(process.env.WIKI_BOT_USERNAME, process.env.WIKI_BOT_PASSWORD, logAndExecute(readFile))

  function readFile() {
    fs.readFile(cssPath, logAndExecute(uploadCss))
  }

  function uploadCss(css) {
    bot.edit('MediaWiki:Dev.css', css, 'update CSS', '1', function (err, data) {
      if (err) {
        console.log(err)
      }
      else {
        console.log(data)
      }
    })
  }
})
