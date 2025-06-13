const gulp = require('gulp');
const del = require('del');
const exec = require('child_process').exec;
const fs = require('fs-extra');

// clean dist folder
gulp.task('clean', function () {
  return del(['dist']);
});

// copy logos to dist
gulp.task('copy-logos', function () {
  return fs.copy('hosted_logos', 'dist/hosted_logos');
});

// generate the HTML using main.js
gulp.task('generate', function (cb) {
  exec('node src/main.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});

// default task
gulp.task('dist', gulp.series('clean', 'generate', 'copy-logos'));
