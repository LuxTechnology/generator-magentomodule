'use strict';
var _ = require('lodash');
var extend = _.merge;
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	_fields: [],

	prompting: {
		askForMore: function() {
			var done = this.async();

            var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your Form?',
                default: 'MyForm'
            },
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of your Form?',
                default: 'My Form'
            },
            {
                type: 'input',
                name: 'mode',
                message: 'What is the mode of the Form?',
                default: 'Edit'
            },
            {
                type: 'confirm',
                name: 'saveButton',
                message: 'Do you need a save button?',
                default: true
            }
            ];

            this.prompt(prompts, function (props) {

            	extend(this.options, props);

                done();
            }.bind(this));
		},
		addField: function() {
			var done = this.async();

            var prompts = [
            {
                type: 'input',
                name: 'title',
                message: 'What is title of the field?',
                default: 'title'
            },
            {
                type: 'list',
                name: 'type',
                message: 'Field type?',
                choices: ['text', 'time', 'date', 'textarea', 'submit', 'select', 'radio', 'radios', 'checkbox', 'checkboxes', 'password', 'obscure', 'note', 'multiselect', 'multiline', 'link', 'label', 'file'],
                default: '1'
            },
            {
                type: 'confirm',
                name: 'required',
                message: 'Required?',
                default: false
            },
            {
                type: 'input',
                name: 'value',
                message: 'Value of input?',
                when: function(props) {
                	return true;
                },
                default: ''
            },
            {
                type: 'confirm',
                name: 'addAnother',
                message: 'Add another field?',
                default: true
            }
            ];

            function ask(gen) {
	            gen.prompt(prompts, function (props) {

	            	gen._fields.push(props);

	            	if(props.addAnother) {
	            		ask(gen);
	            	}
	            	else {
	                	done();
	            	}
	            }.bind(gen));
	        }

	        ask(this);
		}
	},

	writing: {
		generate: function(){
			console.log(this._fields);
		}
	}
});