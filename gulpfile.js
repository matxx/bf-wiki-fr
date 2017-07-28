const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-minify-css')
const path = require('path')
const gulpGitStatus = require('gulp-git-status')

const header_start = '/*****************************************************************/\n' +
                     '/*                   all CSS is managed via SCSS                 */\n' +
                     '/*    take a look there : https://github.com/matxx/bf-wiki-fr    */\n' +
                     '/*****************************************************************/\n' +
                     '/* all developments in progress are dumped into this file        */\n' +
                     '@import url("/MediaWiki:Dev.css?ctype=text/css&action=raw");\n' +
                     '/* and here are all the styles in "production"                   */\n'

const header_end = '/*****************************************************************/\n' +
                   "/* if you wanna C/C some CSS, you'll find your happiness there : */\n" +
                   '/* https://github.com/matxx/bf-wiki-fr/tree/master/dist/css      */\n' +
                   '/*****************************************************************/\n'


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

function logAndExecute(callback, caller) {
  return function (err, data) {
    if (err) {
      if (err.code === 'ENOENT' && caller === 'uploadToWiki') {
        callback('')
      } else {
        console.log(err)
      }
    }
    else {
      callback(data)
    }
  }
}

gulp.task('upload:css', function() {
  uploadToWiki('MediaWiki:Dev.css', 'changed.css')
})

gulp.task('deploy:css', function() {
  uploadToWiki('MediaWiki:Common.css', 'all.css', true)
})

function uploadToWiki(page, file, with_header) {
  let bot = new nodemw({
    protocol: 'http',
    server: process.env.WIKI_DOMAIN_EU_FR,
    path: '',
    debug: true
  })
  const cssPath = path.join(__dirname, 'dist', 'css', file)

  bot.logIn(process.env.WIKI_BOT_USERNAME, process.env.WIKI_BOT_PASSWORD, logAndExecute(readFile, 'uploadToWiki'))

  function readFile() {
    fs.readFile(cssPath, logAndExecute(uploadCss))
  }

  function uploadCss(css) {
    let text = css
    if (with_header) { text = header_start + css + '\n' + header_end }
    bot.edit(page, text, 'update CSS', '1', function (err, data) {
      if (err) {
        console.log(err)
      }
      else {
        console.log(data)
      }
    })
  }
}
