var browserify = require('browserify'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    scsso = require('gulp-csso'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer');

gulp.task('browserify', function () {
    return browserify('./app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});

gulp.task('browserify:watch', function () {
    gulp.watch(['./app.js', './controllers/**/*', './filters/**/*', './directives/**/*'], ['browserify']);
});


gulp.task('styles', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass({
            sourcemap: true
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./styles'))
        .pipe(scsso(true))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./styles'));

});

gulp.task('styles:watch', function () {
    gulp.watch('./sass/**/*', ['styles']);
});