var gulp = require('gulp');
var rev = require('gulp-rev');
var del = require('del');
var concat = require('gulp-concat');
var revCollector = require('gulp-rev-collector');
var minifyHTML   = require('gulp-minify-html');

gulp.task('default',['js','html']);

gulp.task('clean',function(){
	return del(['js','html'])
})

gulp.task('js',function(){
	return gulp.src('js/*.js')
	.pipe(concat('test.js'))
	.pipe(rev())
	.pipe(gulp.dest('dist/js'))
	.pipe(rev.manifest())
	.pipe(gulp.dest('rev/js'))
});

gulp.task('html',function(){
	return gulp.src(['rev/**/*.json', '*.html'])
	.pipe(revCollector(
			{
	            replaceReved: true,
	            dirReplacements: {
	                'js/': 'dist/js/'
	            }
	        }
		))
	.pipe( minifyHTML({
                empty:true,
                spare:true
            }) )
	.pipe(gulp.dest('dist'))
});
gulp.task('rev', function() {
  gulp.src('./index.html')
    .pipe(rev())
    .pipe(gulp.dest('dist'));
});
gulp.task('watch',function(){
	gulp.watch('js/*.js',['js']);
	gulp.watch('*.html',['html']);
});