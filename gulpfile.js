var gulp            = require('gulp');
var util            = require('gulp-util');
var pleeease        = require('gulp-pleeease');
var plumber         = require('gulp-plumber');
var browserSync     = require('browser-sync');
var sass            = require('gulp-sass');
var pug             = require('gulp-pug');


/*--------------------------------------------------------*/

gulp.task('sass', function () {
  gulp
    .src('./resources/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(pleeease({
      autoprefixer: {"browsers": ["last 4 versions", 'ie 11', "Android 2.3"]},
      minifier: !util.env.d
    }))
    .pipe(gulp.dest('./docs/css/'));
});

gulp.task('sass_sp', function () {
  gulp
    .src('./resources/sp/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(pleeease({
      autoprefixer: {"browsers": ["last 4 versions", 'ie 10', "Android 2.3"]},
      minifier: !util.env.d
    }))
    .pipe(gulp.dest('./docs/sp/css/'));
});

gulp.task('pug', function (){
   gulp.src([
     './resources/pug/**/*.pug',
     '!./resources/pug/modules/*.pug'
     ])
     .pipe(plumber())
     .pipe(pug({pretty: util.env.d}))
     .pipe(gulp.dest('./docs/'));
});

gulp.task('pug_sp', function (){
   gulp.src([
     './resources/sp/pug/**/*.pug',
     '!./resources/sp/pug/modules/*.pug'
     ])
     .pipe(plumber())
     .pipe(pug({pretty: util.env.d}))
     .pipe(gulp.dest('./docs/sp/'));
});

gulp.task('watch', function () {
  gulp.watch(['./resources/scss/**/*.scss'], ['sass']);
  gulp.watch(['./resources/pug/**/*.pug'], ['pug']);
  gulp.watch(['./resources/sp/scss/**/*.scss'], ['sass_sp']);
  gulp.watch(['./resources/sp/pug/**/*.pug'], ['pug_sp']);
});


// DEV SERVER
gulp.task('server', function() {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: "./docs"
    }
  });

  gulp.watch('./docs/**/*.html', ['serverReload']);
  gulp.watch('./docs/**/*.css', ['serverReload']);
  gulp.watch('./docs/**/*.js', ['serverReload']);
});

gulp.task('serverReload', function() {
  browserSync.reload();
});

gulp.task('build', ['sass', 'pug','sass_sp', 'pug_sp', 'sprite', 'sprite_sp', 'webpack']);
gulp.task('default', ['watch','pug','sass_sp', 'pug_sp', 'server']);
