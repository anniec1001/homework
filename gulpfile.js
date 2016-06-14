var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	watch = require('gulp-watch');

var paths = [
	'index.html'
];

gulp.task('watch', function() {
	gulp.watch(paths);
});

gulp.task('serve', function(){
	gulp.src('.')
	.pipe(webserver({
		port:8001,
		liverload:true,
		open:true
	}));
});

gulp.task('default', ['serve', 'watch']);