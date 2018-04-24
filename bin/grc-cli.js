#!/usr/bin/env node

/**
 * @file Initial commander execution
 */
const program = require('commander');
const { execLint } = require('../src/libs/lint');
const { constants } = require('../src/utils/constants');
const { welcome, describeCmd } = require('../src/utils/messages');

program
  .version(welcome(), '-v, --version')
  .command('lint [source] [no-autofix] [config]')
  .description(describeCmd('lint'))
  .action((source, autofix, config) => {
    
    /**
     * Validate user passed options and either assign defaults or throw error
     */
    if (autofix && autofix !== constants.lint.noAutofix) {
      console.error(`
        Error: the option "${autofix}" passed is invalid,
        Please try using "${constants.lint.noAutofix}" instead!\n`);
      process.exit(1);
    }

    if (config) {
      switch (config) {
        case constants.lint.airbnb:
        case constants.lint.standard:
        break;

        default:
        console.warning(`\n
          Warning: the option "${config}" passed is invalid, executing with default config "eslint:recommended".
          Possible valid options can be "${constants.lint.airbnb}", and "${constants.lint.standard}"\n`);
        break;
      }
    }
    
    const options = {
      source,
      autofix,
      config
    }

    execLint(options)
  });

program.parse(process.argv);