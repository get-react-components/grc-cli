#!/usr/bin/env node

/**
 * @file Initial commander execution
 */
const program = require('commander');
const { cmdLint, execLint } = require('../src/libs/lint');
const { constants } = require('../src/utils/constants');
const { welcome, describeCmd } = require('../src/utils/messages');
const { verifyLintOptions } = require('../src/verify/lint');

/**
 * Execute lint operation
 * Supports
 *  - ESLint
 */
program
  .version(welcome(), '-v, --version')
  .command(cmdLint())
  .description(describeCmd('lint'))
  .action((source, autofix, config) => {
    execLint(verifyLintOptions(source, autofix, config));
  });

/**
 * Execute build operation
 * Supports
 *  - Webpack
 */
program
  .command('build')
  .description(describeCmd('build'))
  .action((source, autofix, config) => {
    console.log('App build is in progress ...')
  });

/**
 * Start development server
 * Supports
 *  - Webpack-Dev-Server
 */
program
  .command('start')
  .description(describeCmd('start'))
  .action((source, autofix, config) => {
    console.log('App stated ...')
  });

program.parse(process.argv);