# Gulp Boostrap Start Environment

Following is the my preferred, configured gulp start environment, hand made boilerplate.

##Instructions on use

In order to use the environment you have to install and configure:

1. [node.js](https://nodejs.org/en/)
2. [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.mdgulp)
3. [Bower package manager](http://bower.io/)

After its ready to use, you can download the repository and:

#### 1. Call `npm install` in your terminal.

Calling that command will install all the packages which are pointed out inside `package.json` file:

```js
{
  "name": "www-gulp-ready",
  "version": "0.0.1",
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-clean": "^0.3.1",
    "gulp-concat": "^2.6.0",
    "gulp-if": "^1.2.5",
    "gulp-imagemin": "^2.3.0",
    "gulp-livereload": "^3.8.0",
    "gulp-merge-media-queries": "^0.2.1",
    "gulp-minify-css": "^1.2.1",
    "gulp-plumber": "^1.0.1",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.0.4",
    "gulp-uglify": "^1.3.0",
    "gulp-useref": "^1.3.0",
    "imagemin-pngquant": "^4.2.0",
    "wiredep": "^2.2.2"
  }
}
```

#### 2. Call `bower install` in your terminal

Calling that command will install all bower packages which are pointed out inside `bower.json` file.

```js
{
  "name": "gulp-www-ready",
  "version": "0.0.1",
  "description": "gulp-www-ready",
  "main": "index.html",
  "authors": [
    "Alisher Makhmudov"
  ],
  "license": "MIT",
  "dependencies": {
    "jquery": "~2.1.4",
    "jquery-easing-original": "~1.3.2",
    "jquery.scrollTo": "~2.1.2",
    "normalize-css": "~3.0.3"
  },
  "devDependencies": {}
}
```

#### 3. Inside `index.html` you will find comments like:

```html
<!-- bower:css -->
    <link rel="stylesheet" href="your path to installed css plugin by bower" />
<!-- endbower -->
```

That will allow to use and update packages installed by `bower package manager` automatically by `bower task` which is inside your `gulpfile.js`.

```js
gulp.task('bower', function () {
gulp.src('app/index.html')
   .pipe(wiredep({
	   	directory: "bower_components"
	}))
   .pipe(gulp.dest('app/'));
});
```

Although there are comments inside index.html file where i use `Gulp` plugin for concatanating and merging `*.css` and `*.js` files to one `plugins.css, main.css` and  `plugins.js, main.js` files to avoid multiple http:// requests...

You can use and fork repository for further improvements as well...
