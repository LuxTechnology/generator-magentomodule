'use strict';
var _ = require('lodash');
var extend = _.merge;
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    constructor: function(args, options, config) {
      generators.Base.apply(this, arguments);

      extend(this, options);
    },

	default: {
	    askForMore: function() {

	        var done = this.async();

	        var prompts = [
	        {
	            type: 'checkbox',
	            name: 'global',
	            message: 'Need any templates for the general stuff?',
	            choices: [
	                {
	                    name: "Template for Model",
	                    value: 'model'
	                },
	                {
	                    name: "Template for Block",
	                    value: 'block'
	                },
	                {
	                    name: "Helper",
	                    value: 'helper'
	                }
	            ],
	            default: false
	        },
	        {
	            type: 'checkbox',
	            name: 'frontend',
	            message: 'What frontend gadgets do you require good sir?',
	            choices: [
	                {
	                    name: "Layout file",
	                    value: 'layout'
	                },
	                {
	                    name: "Controller",
	                    value: 'controller'
	                },
	                {
	                    name: "Widget",
	                    value: 'widget'
	                }
	            ],
	            default: false
	        },
	        {
	            type: 'checkbox',
	            name: 'adminhtml',
	            message: 'What admin shizzle do you want?',
	            choices: [
	            {
	                name: "Layout file",
	                value: 'layout'
	            },
	            {
	                name: "Controller",
	                value: 'controller'
	            }
	            ],
	            default: false
	        },
	        {
	            type: 'confirm',
	            name: 'setup',
	            message: 'Need a setup script?',
	            default: false
	        },

	        ];

	        this.prompt(prompts, function (props) {

	            console.log(props.frontend);

	            this.global = props.global;
	            this.frontend = props.frontend;
	            this.adminhtml = props.adminhtml;
	            this.setup = props.setup;

	            done();
	        }.bind(this));

	    }
	},

	writing: {
	    app: function() {

	        this.mkdir('app');
	        this.mkdir('app/etc');
	        this.mkdir('app/etc/modules');
	        this.mkdir('app/code');
	        this.mkdir('app/code/' + this.codePool);
	        this.mkdir('app/code/' + this.codePool + '/' + this.namespace);
	        this.mkdir('app/code/' + this.codePool + '/' + this.namespace + '/' + this.moduleName);

	        // Global
	        if (this.global.length) {
	            // Hepler
	            if (this.global.indexOf('helper') !== -1) {
	                this.mkdir(this.modulePath + 'Helper');
	                this.template('_helper.php', this.modulePath + 'Helper/Data.php');
	            }
	            // Model
	            if (this.global.indexOf('model') !== -1) {
	                this.mkdir(this.modulePath + 'Model');
	                this.template('_model.php', this.modulePath + 'Model/Mymodel.php');
	            }
	            // Block
	            if (this.global.indexOf('block') !== -1) {
	                this.mkdir(this.modulePath + 'Block');
	                this.template('_block.php', this.modulePath + 'Block/Myblock.php');
	            }
	        }

	        // Frontend
	        if (this.frontend.length) {
	            // layout file
	            if (this.frontend.indexOf('layout') !== -1) {
	                this.mkdir('app/design/frontend/base/default/layout');
	                var layoutPath = 'app/design/frontend/base/default/layout/';

	                this.template('_frontlayout.xml', layoutPath + this.moduleIdentifier + '.xml');
	            }
	        }


	        // Admin
	        if (this.adminhtml.length) {
	            // Controller
	            if (this.adminhtml.indexOf('controller') !== -1) {
	                this.mkdir(this.modulePath + 'controllers/adminhtml');
	                this.template('_adminhtmlcontroller.php', this.modulePath + 'controllers/adminhtml/IndexController.php');
	            }
	            // Layout
	            if (this.adminhtml.indexOf('layout') !== -1) {
	                this.mkdir('app/design/adminhtml/default/default/layout');
	                var adminLayoutPath = 'app/design/adminhtml/default/default/layout/';
	                this.template('_adminhtmllayout.xml', adminLayoutPath + this.moduleIdentifier + '.xml');
	            }
	        }
	        
	        // Set up script
	        if (this.setup) {
	            var setupPath = this.modulePath + 'sql/' + this.moduleIdentifier + '_setup';
	            this.mkdir(setupPath);
	            this.mkdir(this.modulePath + 'Model/Resource');
	            this.template('_setup.php', setupPath + '/mysql4-install-0.1.0.php');
	            this.template('_setupresource.php', this.modulePath + 'Model/Resource/Setup.php');
	        }



	        this.template('_etcmodules.xml', 'app/etc/modules/' + this.fullModuleName + '.xml');
	        this.template('_config.xml', this.modulePath + 'etc/config.xml');
	        this.copy('_package.json', 'package.json');
	    }
	}
});