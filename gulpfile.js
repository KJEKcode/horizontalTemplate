var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
sass = require('gulp-sass'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
gulp = require("gulp"),
babel = require("gulp-babel"),
sourcemaps = require("gulp-sourcemaps"),
minify = require("gulp-babel-minify");

/*
 -- TOP LEVEL FUNCTIONS --
 gulp.task - define task
 gulp.src - point to the files to use
 gulp.dest - point to folder to output
 gulp.watch - watch files and folders for changes
*/


// copy all html files
gulp.task('copyHtml', function(done){
 gulp.src('src/*.html')
 .pipe(gulp.dest('dist'));
 done();
});

// copy all php files
gulp.task('copyPhp', function(done){
 gulp.src('src/*.php')
 .pipe(gulp.dest('dist'));
 done();
});

// optimize images
gulp.task('imageMin', () =>
 gulp.src('src/images/*')
 .pipe(imagemin())
 .pipe(gulp.dest('dist/images'))
);

// compile sass
gulp.task('sass', function(done){
 gulp.src('src/sass/*.scss')
 .pipe(sass().on('error', sass.logError))
 .pipe(cssmin())
 .pipe(rename({suffix: '.min'}))
 .pipe(gulp.dest('dist/css'))
 done();
});

// scripts
gulp.task('scripts', function(done){
 gulp.src('src/js/*.js')
 .pipe(sourcemaps.init())
 .pipe(babel())
 .pipe(concat('compiled.min.js'))
 .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
 .pipe(sourcemaps.write("."))
 .pipe(gulp.dest('dist/js'));
 done();
});

gulp.task('default', gulp.series('copyHtml', 'copyPhp', 'imageMin', 'sass', 'scripts'));

gulp.task('watch', function(){
 gulp.watch('src/js/*.js', gulp.parallel('scripts'));
 gulp.watch('src/images/*', gulp.parallel('imageMin'));
 gulp.watch('src/sass/*.scss', gulp.parallel('sass'));
 gulp.watch('src/*.html', gulp.parallel('copyHtml'));
  gulp.watch('src/*.php', gulp.parallel('copyPhp'));
});