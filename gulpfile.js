'use strict'

const gulp = require('gulp')
  const sass = require('gulp-ruby-sass')
  const postcss = require('gulp-postcss')
    const sugarss = require('sugarss')
    const autoprefixer = require('autoprefixer')
  const jade = require('gulp-jade')
  const rename = require('gulp-rename')

gulp.task('sss', () => {
  return gulp.src('src/**/*.sss')
    .pipe(postcss([], { parser: sugarss }))
    .pipe(rename({ extname: '.scss' }))
    .pipe(gulp.dest('scss/'))
})

gulp.task('scss', ['sss'], () => {
  return sass('scss/**/index.scss', { style: 'expanded' }).on('error', sass.logError)
    .pipe(postcss([ autoprefixer ]))
    .pipe(gulp.dest('css/'))
})

gulp.task('jade', () => {
  return gulp.src('src/**/index.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(''))
})

gulp.task('build', ['scss', 'jade'])

gulp.task('watch', () => {
  gulp.watch('src/**/*', ['build'])
})
