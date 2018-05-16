const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');


gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('image', () => {
    return gulp.src('src/images/**/*.+(png|jpg|gif)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});