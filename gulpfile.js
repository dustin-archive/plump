'use strict'

const gulp = require('gulp')
  const sass = require('gulp-sass')
  const postcss = require('gulp-postcss')
    const sugarss = require('sugarss')
    const autoprefixer = require('autoprefixer')
    const comments = require('postcss-strip-inline-comments')
    const sorting = require('postcss-sorting')
  const jade = require('gulp-jade')
  const rename = require('gulp-rename')

gulp.task('lint', () => {
  return gulp.src('src/**/*.sss')
    .pipe(postcss([
      sorting({
        'empty-lines-between-children-rules': 1,
        'empty-lines-between-media-rules': 1
      })
    ], { syntax: sugarss }))
    .pipe(gulp.dest('src'))
})

gulp.task('sss', ['lint'], () => {
  return gulp.src('src/**/*.sss')
    .pipe(postcss([comments], { parser: sugarss }))
    .pipe(rename({ extname: '.scss' }))
    .pipe(gulp.dest('scss'))
})

gulp.task('scss', ['sss'], () => {
  return gulp.src('scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer ]))
    .pipe(gulp.dest('css'))
})

gulp.task('watch', () => {
  gulp.watch('src/**/*', ['scss'])
})

// docs
gulp.task('docs:scss', () => {
  return gulp.src('docs/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('docs'))
})

gulp.task('docs:jade', () => {
  return gulp.src('docs/*.jade')
    .pipe(jade({ basedir: __dirname }))
    .pipe(gulp.dest('docs'))
})

gulp.task('docs:watch', () => {
  gulp.watch(['docs/*.jade', 'docs/*.scss'], ['docs:scss', 'docs:jade'])
})
