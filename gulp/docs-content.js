'use strict';

var gulp = require('gulp'),
	plugins = {
		markdown: require('gulp-markdown')
	},
	marked = require('marked'),
	hljs = require('highlight.js');

var config = require('./config'),
	paths = config.paths,
	files = config.files;


var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
	var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
	//if the escaped result has a dash at the end, remove it
	if (escapedText[escapedText.length - 1] === '-') {
		escapedText = escapedText.slice(0, -1);
	}

	return '<h' + level + ' id="' + escapedText + '"><a href="#/#' + escapedText + '" class="heading-link"><span class="intelicon-link"></span></a>' + text + '</h' + level + '>';
};

function compileDocsContent() {
	return gulp.src(files.docsContent)
		.pipe(plugins.markdown({
			highlight: function (code, lang) {
				// if no language is provided in code block, or something else has gone wrong, attempt to auto-detect
				if (typeof lang !== 'string')
					return hljs.highlightAuto(code).value;

				// otherwise use the language specified
				return hljs.highlight(lang, code).value;
			},
			renderer: renderer
		}))
		.pipe(gulp.dest(paths.tmpContent));
}
compileDocsContent.description = 'Compiles docs content markdown files to html.';


module.exports = {
	compileDocsContent: compileDocsContent
};
