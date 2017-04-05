var gulp  = require ('gulp');
 var deleteFile = require('gulp-delete-file');
 var clean = require('gulp-clean');

 gulp.task('deleteTest', function () {
     gulp.src('./test*.txt').
         pipe(clean());
 });
