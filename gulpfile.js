const gulp = require('gulp');
const del = require('del');
const exec = require('child_process').exec;

// clean dist folder
gulp.task('clean', function () {
  return del(['dist']);
});

// generate the landscape
gulp.task('generate', function (cb) {
  exec('node src/main.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
});

// default task
gulp.task('dist', gulp.series('clean', 'generate'));
