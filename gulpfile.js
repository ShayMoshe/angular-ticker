'use strict';

var gulp = require('gulp');

var server = require('./gulp/server');
gulp.task('serve-docs', server.serveDocs);
gulp.task('serve', server.serveDocs);
gulp.task('default', server.serveDocs);
gulp.task('serve-docs:dist', server.serveDocsDist);
gulp.task('serve:dist', server.serveDocsDist);

var build = require('./gulp/build');
gulp.task('build', build.build);

var docsBuild = require('./gulp/docs-build');
gulp.task('build-docs', docsBuild.buildDocs);


var lint = require('./gulp/lint');
gulp.task('lint', lint.lint);
gulp.task('lint-docs', lint.lintDocs);

var test = require('./gulp/unit-tests');
gulp.task('test', test.test); // run test once and exit
gulp.task('tdd', test.tdd); // watch for file changes and re-run tests on each change

var deploy = require('./gulp/deploy');
gulp.task('deploy', deploy.deploy);

var clean = require('./gulp/clean');
gulp.task('clean-dist', clean.cleanDist);
gulp.task('clean-docs', clean.cleanDocs);
gulp.task('clean', clean.cleanDocs);

var renameProject = require('./gulp/rename-project');
gulp.task('rename-project', renameProject.renameProject);
gulp.task('renameProject', renameProject.renameProject); // keep this alias for intc gen-bower in intc-cli
