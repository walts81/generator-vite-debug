'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('port', { type: Number });
    this.option('dest', { type: String });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the rad ${chalk.red('generator-vite-debug')} generator!`));

    const prompts = [
      {
        type: 'number',
        name: 'port',
        message: 'What port is Vite using?',
        default: 5173,
      },
    ];

    let props = null;

    if (!!this.options.port) {
      props = { port: this.options.port };
    }

    if (!!this.options.dest) {
      if (!props) props = {};
      props.dest = this.options.dest;
    }

    if (!!props) {
      this.props = props;
      return Promise.resolve();
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const prefix = !!this.props.dest ? `${this.props.dest}/.vscode/` : '.vscode/';
    this.fs.copyTpl(this.templatePath('launch.json'), this.destinationPath(`${prefix}launch.json`), this.props);
    this.fs.copyTpl(this.templatePath('tasks.json'), this.destinationPath(`${prefix}tasks.json`), this.props);
  }
};
