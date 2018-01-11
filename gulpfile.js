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
	browserSync = require('browser-sync').create();


// Bower
	gulp.task('bower', function () {
	gulp.src('app/*.html')
		.pipe(wiredep({directory: "bower_components"}))
		.pipe(gulp.dest('app/'));
	});



// Image Optimization
	gulp.task('imagemin', function() {
    gulp.src('app/img/**/*')
	    .pipe(imagemin())
	    .pipe(gulp.dest('app/build/img'));
	});



	// Merge media queries
	gulp.task('mmq', function () {
	gulp.src('app/**/*.css')
		.pipe(mmq({log: true}))
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
		var fonts = gulp.src('app/fonts/**/*')
			.pipe(gulp.dest('app/build/fonts/'));
			
		var styles = gulp.src('app/css/*.css')
			.pipe(gulp.dest('app/build/css/'));

	gulp.src('app/*.html')
		.pipe(assets)
		//.pipe(gulpif('*.js', uglify()))    		// turn on build version compilation
		.pipe(gulpif('*.css', mmq()))
		//.pipe(gulpif('*.css', minifycss()))		// turn on build version compilation
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('app/build'));
	});



// Browser sync task
	gulp.task('serve', ['sass'], function() {
	    browserSync.init({
	    	server: {
		        baseDir: "./app/",
		        routes: {
		             "/bower_components": "bower_components"
		        }
		    }
	    });
	    gulp.watch("app/css/*.scss", ['sass']);
	    gulp.watch("app/*.html").on('change', browserSync.reload);
	});



// Sass
	gulp.task('sass', function () {
	gulp.src('app/css/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compact'})) 		// expanded, compact, compressed options available
		.pipe(mmq({log: true}))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.stream());
	});



// Watch task
	gulp.task('watch', function () {
		gulp.watch('bower.json', ['bower', 'sass']);
		gulp.watch('app/css/*.scss', ['sass']);
	})



// Default task
	gulp.task('default', ['watch' , 'serve']);