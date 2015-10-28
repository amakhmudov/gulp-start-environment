// Declare variables
var gulp = require('gulp'),
	wiredep = require('wiredep').stream;
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	mmq = require('gulp-merge-media-queries'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
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



	// Merge media queries
	gulp.task('mmq', function () {
		gulp.src('app/**/*.css')
		.pipe(mmq({
		  log: true
		}))
		.pipe(gulp.dest('app/**/*.css'));
		});



// Clean
	gulp.task('clean', function () {

	gulp.src('app/build/*.*', {read: false})
	   .pipe(clean());
	});



// Build
	gulp.task('build', ['imagemin', 'clean'], function () {
		var assets = useref.assets();

	gulp.src('app/*.html')
	   .pipe(assets)
	   // .pipe(gulpif('*.js', uglify()))
	   .pipe(gulpif('*.css', mmq()))
	   // .pipe(gulpif('*.css', minifycss()))
	   .pipe(assets.restore())
	   .pipe(useref())
	   .pipe(gulp.dest('app/build'));
	});



// Sass
	gulp.task('sass', function () {
	gulp.src('app/css/*.scss')
		.pipe(plumber())
	   .pipe(sass({outputStyle: 'compact'})) // expanded, compact, compressed options available
	   .pipe(gulp.dest('app/css/'))
       // .pipe(cmq())
	   .pipe(livereload());
	});



// Watch task
	gulp.task('watch', function () {
	    var server = livereload();

		gulp.watch('bower.json', ['bower']);
		gulp.watch('app/css/*.scss', ['sass']);
	})



// Default task
	gulp.task('default', ['watch']);


