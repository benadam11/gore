var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var fileInclude = require('gulp-file-include');

//Paths
var config = {
  sassPath: './scss/*.scss',
  jsPath: './js',
  bowerPath: './bower_components'
}

//Serve Files From Base Directory 
gulp.task('browser-sync', function() {
    browserSync({
        server: { baseDir: "./" }
    });
});

//Include Paths & Pipe 'da' sass 
gulp.task('sass', function() {
  return gulp.src(config.sassPath)
        .pipe(sass({
            outputStyle: '',
            includePaths: [
              'bower_components/foundation/scss',
              require('node-bourbon').includePaths
            ]
        }))
        .pipe(autoprefixer({ browsers: ['last 10 versions']}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task ('html', function(){
  return gulp.src(['html/index.html','html/article-detail.html'])
         .pipe(fileInclude({
          prefix: '@@',
          basepath: '@file'
         }))
         .pipe(gulp.dest('./'))
         .pipe(browserSync.reload({stream:true}));
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Watch scss AND html files, reload changes.
gulp.task('default', ['sass','html','browser-sync'], function () {
    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("./**/*.html", ['html']);
});