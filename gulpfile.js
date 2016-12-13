var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();


// default task
gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

// watch
gulp.task('watch', function(){
  gulp.watch('./src/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch('./src/*.html', browserSync.reload);
  gulp.watch('./src/js/*.js', browserSync.reload);
})

// build
gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts', 'video'],
    callback
  )
})

/////
// DEVELOPMENT TASKS
/////

var processors = [
    autoprefixer({browsers: ['> 1%', 'last 5 versions', 'IE 8']}),
    //cssnano(),
];

gulp.task('postcss', function() {
  return gulp.src('./src/css/*.css')
      .pipe( sourcemaps.init() )
      .pipe( postcss(processors) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('./dist') );
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/*.+(scss|sass)')
      .pipe( sourcemaps.init() )
      .pipe( sass({outputStyle: 'expanded'}, {includePaths : ['./src/sass'] }) )
      .pipe( postcss(processors) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('./src/css') ) //change for prod
      .pipe(browserSync.reload({
        stream: true
      }));
});

/////
// OPTIMIZATION TASKS
/////

gulp.task('useref', function(){
  return gulp.src('./src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    //.pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('video', function() {
  return gulp.src('./src/video/**/*')
  .pipe(gulp.dest('dist/video'))
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
})

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
})

// hot reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})
