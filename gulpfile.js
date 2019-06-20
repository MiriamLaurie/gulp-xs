const gulp 		   = require('gulp');
const sass         = require('gulp-sass');
const browserSync  = require('browser-sync').create();
const plumber      = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('code', function() { //html
    return gulp.src('src/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() { 
    return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({ stream: true }))
});


gulp.task('sass', function () { // sass и преобразование в css
    return gulp.src('src/sass/**/*.sass')
		.pipe(plumber())
		.pipe(sass())
		//.pipe(autoprefixer({cascade: false}))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({ stream: true }))
});



gulp.task('server', function () { //сервер
	browserSync.init({
		server: {
			baseDir: "./src",
			directory: false,
		},          
		notify: false,
		open: true
	});
});


gulp.task('watch',  function() {
    gulp.watch('src/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('src/*.html', gulp.parallel('code')); 
	gulp.watch('src/js/*.js', gulp.parallel('js')); 
	gulp.watch('./gulpfile.js', cb=>cb(process.exit(0))); 
});



gulp.task('default', gulp.parallel('sass', 'server', 'watch')); //dev

