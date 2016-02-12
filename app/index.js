'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');


module.exports = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);

        this.option('grid');
        this.option('module');
        this.option('form');
        //this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    },
    prompting: {
        askFor: function() {
            var done = this.async();

            var prompts = [
            {
                type: 'input',
                name: 'namespace',
                message: 'What is your namespace?',
                default: 'MyNamespace',
                store: true
            },
            {
                type: 'input',
                name: 'moduleName',
                message: 'What is the name of your Magento module?',
                default: 'MyModule',
                store: true
            },
            {
                type: 'select',
                name: 'codePool',
                message: 'Which code pool are you going to stick your module in?',
                choices: [
                {
                    name: "Local Module",
                    value: "local"
                },
                {
                    name: "Third party module",
                    value: "community"
                }
                ],
                default: 'community',
                store: true
            }
            ];

            this.prompt(prompts, function (props) {

                this.opts = {
                    namespace: props.namespace,
                    moduleName: props.moduleName,
                    codePool: props.codePool,


                    fullModuleName: props.namespace + '_' + props.moduleName,
                    moduleIdentifier: props.namespace.toLowerCase() + '_' + props.moduleName.toLowerCase(), 
                    modulePath: 'app/code/' + props.codePool + '/' + props.namespace + '/' + props.moduleName + '/'
                };

                done();
            }.bind(this));
        }
    },

    default: {
        subGenerators: function() {
            if(this.options.grid) {
                this.composeWith('magentomodule:grid', {
                    options: this.opts
                });
            }

            if(this.options.module) {
                this.composeWith('magentomodule:module', {
                    options: this.opts
                });
            }

            if(this.options.form) {
                this.composeWith('magentomodule:form', {
                    options: this.opts
                });
            }
        }
    }

    // end: {
    //     generators: function () {
    //         this.installDependencies({ skipInstall: options['skip-install'] });

    //         // Frontend Controller
    //         if (this.frontend.indexOf('controller') !== -1) {
    //             this.invoke('magentomodule:frontcontroller', {
    //               args: [{
    //                   name: 'IndexController',
    //                   codePool: this.codePool,
    //                   namespace: this.namespace,
    //                   moduleName: this.moduleName,
    //                   modulePath: this.modulePath
    //               }],
    //               options: {
    //                 options: {
    //                     'skip-install': true,
    //                 }
    //               }
    //             });
    //         }

    //         // Add widget via sub generator if selected
    //         if (this.frontend.indexOf('widget') !== -1) {
    //             this.invoke('magentomodule:widget', {
    //               args: [{
    //                   name: 'Mywidget',
    //                   codePool: this.codePool,
    //                   namespace: this.namespace,
    //                   moduleName: this.moduleName,
    //                   modulePath: this.modulePath
    //               }],
    //               options: {
    //                 options: {
    //                     'skip-install': true,
    //                 }
    //               }
    //             });
    //         }
    //     }
    // }
});
