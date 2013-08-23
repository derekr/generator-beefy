'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BeefyGenerator = module.exports = function BeefyGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ bower: false });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BeefyGenerator, yeoman.generators.Base);

BeefyGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      type: 'input',
      name: 'name',
      message: 'Name for your module:',
      default: 'beefy-fun'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description for your module:',
      default: 'beefy-fun'
    },
    {
      type: 'input',
      name: 'author',
      message: 'What\'s your name?',
      default: 'Handsom Devil'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What\'s your email?',
      default: 'hd@example.com'
    },
    {
      type: 'input',
      name: 'website',
      message: 'Do you have a website?',
      default: ''
    },
    {
      type: 'input',
      name: 'github',
      message: 'What\'s your github username?',
      default: ''
    },
    {
      type: 'input',
      name: 'constructor',
      message: 'Give your module constructor a name:',
      default: ''
    }
  ];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.description = props.description;
    this.author = props.author;
    this.email = props.email;
    this.website = props.website;
    this.github = props.github;
    this.constructor = props.constructor;

    cb();
  }.bind(this));
};

BeefyGenerator.prototype.main = function main() {
  this.template('_index.html', 'examples/index.html');
  this.template('_index.js', 'lib/index.js');
  this.template('_package.json', 'package.json');
  this.template('_readme.md', 'readme.md');
};

BeefyGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
