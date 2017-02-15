'use strict';

var gulp = require('gulp'),
	plugins = {
		rename: require('gulp-rename'),
		replace: require('gulp-replace')
	},
	_ = require('lodash'),
	args = require('yargs').argv,
	chalk = require('chalk'),
	del = require('del');

var config = require('./config'),
	files = config.files;


function renameProject(done) {
	if (!args.name && !args.n) {
		console.error(chalk.red('You must specify a new name for the project.') + '\n\nUsage:\n    gulp rename-project --name [name]\n    gulp rename-project -n [name]');
		return;
	}

	var oldProjectName = config.projectName;
	var newProjectName = args.name || args.n;

	var oldProjectNameKebab = _.kebabCase(oldProjectName);
	var newProjectNameKebab = _.kebabCase(newProjectName);

	var oldProjectNameCamel = _.camelCase(oldProjectName);
	var newProjectNameCamel = _.camelCase(newProjectName);

	var oldProjectNamePascal = _.capitalize(oldProjectNameCamel);
	var newProjectNamePascal = _.capitalize(newProjectNameCamel);

	// if name is unchanged, do nothing
	if(oldProjectName === newProjectNameKebab) {
		console.warn(chalk.yellow('Project name will remain unchanged, as the provided name is the same as the current name.'));
		done();
		return;
	}

	if(hasUpperCase(newProjectName)) {
		console.info(chalk.yellow('The project name you provided has been converted to its kebab-case equivalent: ' + chalk.green.bold(newProjectNameKebab) + '.'));
	}

	console.log('Changing project name from ' + chalk.gray.bold(oldProjectName) + ' to ' + chalk.green.bold(newProjectNameKebab) + '.');

	// files get renamed using `newProjectName` regardless of kebab-case or camelCase
	return gulp.src([
		'**/*',
		'!**/*.{jpg,jpeg,tiff,gif,png,ico}',
		'!.git/**/*',
		'!.idea/**/*',
		'!' + files.tmp,
		'!' + files.bowerComponents,
		'!' + files.nodeModules,
		'!' + files.dist,
		'!' + files.docsDist
	])
		.pipe(plugins.rename(function (path) {
			path.basename = path.basename.replace(oldProjectName, newProjectNameKebab); // replace file names
		}))
		.pipe(plugins.replace(oldProjectNamePascal, newProjectNamePascal))
		.pipe(plugins.replace(oldProjectNameCamel, newProjectNameCamel))
		.pipe(plugins.replace(oldProjectNameKebab, newProjectNameKebab))
		.pipe(gulp.dest('.')) // overwrite existing files and write new files
		.on('end', function() {
			// delete all the old files
			del(['**/*' + oldProjectName + '*'], done);
		});
}
renameProject.description = 'Renames entire project, changing filenames and strings in files to match the new name.'

function hasUpperCase(str) {
	return str.toLowerCase() !== str;
}


module.exports = {
	renameProject: renameProject
};
