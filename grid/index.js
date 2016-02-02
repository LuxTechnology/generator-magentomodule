'use strict';
var _ = require('lodash');
var extend = _.merge;
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting: {
		askForMore: function() {
			var done = this.async();

            var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your Grid?',
                default: 'MyGrid'
            },
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of your Grid?',
                default: 'My Grid'
            }
            ];

            this.prompt(prompts, function (props) {

            	extend(this.options, props);

                done();
            }.bind(this));
		}
	},

	writing: {
		generate: function(){
			var opts = this.options;

			opts.blockIdentifier = opts.name.toLowerCase(); 

			this.fs.copyTpl(
		      this.templatePath('_gridcontroller.php'),
		      this.destinationPath(opts.modulePath + 'controllers/Adminhtml/' + opts.name + 'Controller.php'), 
		      opts
		    );

			this.fs.copyTpl(
		      this.templatePath('_gridcontainerblock.php'),
		      this.destinationPath(opts.modulePath + 'Block/Adminhtml/' + opts.name + '.php'), 
		      opts
		    );

			this.fs.copyTpl(
		      this.templatePath('_gridblock.php'),
		      this.destinationPath(opts.modulePath + 'Block/Adminhtml/' + opts.name + '/Grid.php'), 
		      opts
		    );
		}
	}
});