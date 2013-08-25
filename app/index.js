'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var LiGenerator = module.exports = function LiGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.hookFor('li:css', {
		args: args
	});

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LiGenerator, yeoman.generators.Base);

LiGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			type: 'confirm',
			name: 'customFont',
			message: 'Do you need custom font(s)?',
			default: false
		}
	];

	this.prompt(prompts, function (props) {
		this.customFont = props.customFont;

		cb();
	}.bind(this));
};

LiGenerator.prototype.app = function app() {
	this.mkdir('app');
	this.mkdir('app/templates');

	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
};

LiGenerator.prototype.makeDirectory = function makeDirectory() {
	this.mkdir('app');
	this.mkdir('app/style');
	this.mkdir('app/script');


	this.mkdir('app/style/block');
	this.mkdir('app/style/module');
	this.mkdir('app/style/ui-element');
	this.mkdir('app/style/');

	if(this.customFont){
		this.mkdir('app/font');
	}
};

LiGenerator.prototype.makeFiles = function makeFiles() {
	this.write('app/index.html', this.readFileAsString(path.join(this.sourceRoot(), 'index.html')));
};

LiGenerator.prototype.addReadMeFiles = function addReadMeFiles() {
	if(this.customFont){
		this.write('app/font/README.md', this.readFileAsString(path.join(this.sourceRoot(), 'font/README.md')));
	}
};

LiGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};
