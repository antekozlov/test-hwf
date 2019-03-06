'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var	plumber = require("gulp-plumber");//отлавливает ошибки, не дает упасть серверу
var	postcss = require('gulp-postcss');
var	sourcemaps = require('gulp-sourcemaps');
var	autoprefixer = require('autoprefixer');

var debug = require('gulp-debug');
var	rename = require('gulp-rename');
var	concat = require('gulp-concat');
var	uglify = require('gulp-uglify');
var	notify = require('gulp-notify');
var	cssnano = require('gulp-cssnano');

// Сборка стилей c source_map
// для того, чтобы ставились префиксы для grid-ов надо в core.scss написать комментарий: 
// /* autoprefixer grid: autoplace */
// подробно по ссылке https://github.com/postcss/autoprefixer#grid-autoplacement-support-in-ie
gulp.task('dev', function() {
	return gulp.src('assets/scss/core.scss')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(debug({title: 'SASS -->'}))
	.pipe(sass()).on('error', notify.onError(function(err) {
		return {
			title: 'Styles',
			message: err.message
		};
	}))
	.pipe(debug({title: 'AUTOPREFIXER -->'}))
	.pipe(postcss([ 
		autoprefixer({grid: true, browsers: 'last 2 versions, > 1%'}) 
		]))
	.pipe(concat('core.css'))
	.pipe(debug({title: 'MINIFY -->'}))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('assets/css'));
});

gulp.task('prod', function() {
	return gulp.src('assets/scss/core.scss')
	.pipe(plumber())
	.pipe(debug({title: 'SASS -->'}))
	.pipe(sass()).on('error', notify.onError(function(err) {
		return {
			title: 'Styles',
			message: err.message
		};
	}))
	.pipe(debug({title: 'AUTOPREFIXER -->'}))
	.pipe(postcss([ 
		autoprefixer({grid: true, browsers: 'last 2 versions, > 1%'}) 
		]))
	.pipe(concat('core.css'))
	.pipe(debug({title: 'MINIFY -->'}))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('assets/css'));
});

// Генерим hash запроса чтобы избежать кэширования стилей в продакшн
gulp.task('rev', function() {
	gulp.src('index.html')
	.pipe(rev())
	.pipe(gulp.dest('.'));
});

// gulp watch
gulp.task('watch', function() {
	gulp.watch('assets/scss/**', gulp.series('dev'))
});
