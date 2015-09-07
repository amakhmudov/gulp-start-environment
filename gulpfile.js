// Declare variables
var gulp = require('gulp'),
	wiredep = require('wiredep').stream;
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	cmq = require('gulp-combine-media-queries'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	livereload = require('gulp-livereload');


// Bower
	gulp.task('bower', function () {
	gulp.src('app/index.html')
	   .pipe(wiredep({
		   	directory: "bower_components"
		}))
	   .pipe(gulp.dest('app/'));
	});

// Image Optimization
	gulp.task('imagemin', function() {
    gulp.src('app/img/**/*')
	    .pipe(imagemin({
				progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()]
	}))
	    .pipe(gulp.dest('app/build/img'));
	});

// Clean
	gulp.task('clean', function () {

	gulp.src('app/build/*.*', {read: false})
	   .pipe(clean());
	});

// Build
	gulp.task('build', ['clean', 'imagemin'], function () {
		var assets = useref.assets();

	gulp.src('app/*.html')
	   .pipe(assets)
	   .pipe(gulpif('*.js', uglify()))
	   .pipe(gulpif('*.css', cmq()))
	   .pipe(gulpif('*.css', minifycss()))
	   .pipe(assets.restore())
	   .pipe(useref())
	   .pipe(gulp.dest('app/build'));
	});

// // Concat JS files
// 	gulp.task('jsconcat', function() {
// 	gulp.src([
// 		'bower_components/jquery/dist/jquery.js',
// 		'js/plugins.js',
// 		'js/main.js'
// 		])
// 	    .pipe(concat('main.js'))
// 	    .pipe(uglify())
// 	    .pipe(rename("main.min.js"))
// 	    .pipe(gulp.dest('js/'));
// });

// // Concat CSS files
// 	gulp.task('cssconcat', function () {
// 	gulp.src([
// 		'css/normalize.min.css',
// 		'css/main.css'
// 		])
// 	    .pipe(concat("main.css"))
// 	    .pipe(gulp.dest('css/'));
// });

// Minimize CSS files
// 	gulp.task('cssmin', function () {
// 	gulp.src(['css/main.css'])
// 		.pipe(cmq())
// 	    .pipe(minifycss())
// 	    .pipe(rename("main.min.css"))
// 	    .pipe(gulp.dest('css/'));
// });

// Sass
	gulp.task('sass', function () {
	gulp.src('app/css/*.scss')
	   .pipe(sass({outputStyle: 'expanded'})) // expanded, compact, compressed options available
	   .pipe(gulp.dest('app/css/'))
       .pipe(cmq())
	   .pipe(livereload());
	});

// // Watch task
	gulp.task('watch', function () {
	    var server = livereload();

		gulp.watch('bower.json', ['bower']);
		gulp.watch('app/css/*.scss', ['sass']);
	})

// Default task
	gulp.task('default', ['watch']);


