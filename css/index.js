'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var LiGenerator = module.exports = function LiGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.folder = args[0];
	this.name = args[1];
};

util.inherits(LiGenerator, yeoman.generators.Base);

LiGenerator.prototype.createCssFiles = function createCssFiles() {
	switch(this.folder){
		case 'block':
		case 'component':
			this.write('app/style/' + this.folder + '/' + this.name + '.css', this.readFileAsString(path.join(this.sourceRoot(), 'default.css')));
			break;

		case 'font':
			this.write('app/style/' + this.folder + '/' + this.name + '.css', this.readFileAsString(path.join(this.sourceRoot(), 'font.css')));
			break;

		case 'root':
			this.write('app/style/' + this.name + '.css', this.readFileAsString(path.join(this.sourceRoot(), 'default.css')));
			break;

		default:
			console.log('The first arguments need to be a directory');
			break;
	}
};