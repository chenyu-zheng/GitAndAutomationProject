const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlbuild = require('gulp-htmlbuild');


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

gulp.task('js', () => {
    return gulp.src([
            'src/js/**/!(engine)*.js',
            'src/js/engine.js'
        ])
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .pipe(htmlbuild({
            js: htmlbuild.preprocess.js((block) => {
                block.write('js/main.js');
                block.end();
            })
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/css/**/*.css', ['css']);
});

gulp.task('default', ['html', 'css', 'js', 'image', 'watch']);