const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'));
});