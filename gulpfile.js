
var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');

/**
 * This task moves everything EXCEPT for the js files over from src/client to /bin/client.
 * We do not move over js files because wepback is going to bundle up our js files and move that to the /bin/client/js folder
 * 
 */
gulp.task('move-client', function(){
    return gulp.src(['src/client/**/*.*', '!src/client/js/*.js'])
        .pipe(gulp.dest('./bin/client/'));
});

/**
 * 
 * This task depends on 'move-client', so 'move-client' will run first.
 * 
 * This allows webpack to bundle our client side JS, and then it runs that output through babel,
 * which converts cool es6 features to JS older browsers can understand. 
 * 
 * Lastly the output is put into bin/client/js in one JS file!
 * 
 */
gulp.task('build-client', ['move-client'], function(){
    return gulp.src('src/client/js/app.js')
        .pipe(webpack(require('./webpack.config.js')))    
        .pipe(babel({
            presets: [
                ['es2015', { 'modules': false }]
            ]
        }))
        .pipe(gulp.dest('bin/client/js/'));
});

/**
 * JGrabs all the files in /src/server and puts them in /bin/server after running babel on them
 */
gulp.task('build-server', ['build-client'], function () {
  return gulp.src(['src/server/**/*.*', 'src/server/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('bin/server/'));
});


/**
 * Uses nodemon plugin to start server
 * script tells it where the node file is to run
 * 
 * NOTE: you can type rs and hit <enter> in the console at any time to restart the server
 */
gulp.task('run', ['build-server'], function () {
    nodemon({
        delay: 10,
        script: './bin/server/server.js',
    })
    .on('restart', function () {
        console.log('server restarted!');
    });
});

/**
 * Default gulp task, if just 'gulp' is run in the project root directory, this task will run
 */
gulp.task('default', ['run']);