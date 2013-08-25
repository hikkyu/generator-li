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
	if(this.folder != 'block'){
		console.log('The first arguments need to be a directory');
		return;
	}
	this.write('app/style/' + this.folder + '/' + this.name + '.css', this.readFileAsString(path.join(this.sourceRoot(), 'style.css')));
};