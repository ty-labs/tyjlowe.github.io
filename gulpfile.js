'use strict';

// load the required modules
let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');

// sass compile task (for styles)
gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'));
});

// sass watch task (recompile on update to sass file)
gulp.task('watch:sass', function () {
  gulp.watch('./css/*.scss', gulp.series('sass'));
  gulp.watch('./css/partials/*.scss', gulp.series('sass'));
});

// live browser task
gulp.task('browser-sync', function () {
  var files = [
    './*.html',
    './css/*.css',
    './js/*.js',
    './media/*.{png,jpg,gif}'
  ];
  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  });
})

// default gulp task to run on "gulp" command
gulp.task('default', gulp.parallel('browser-sync', 'watch:sass')); // run both browser & watch in parallel