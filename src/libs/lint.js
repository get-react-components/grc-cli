/**
 * @file ESLint related operations
 */
const eslint = require('eslint');
const util = require('util');
const path = require('path');
const { split } = require('lodash/fp');
const { join } = require('lodash/array');
const { constants } = require('../utils/constants');
const { defaults } = require('../utils/defaults');
const exec = util.promisify(require('child_process').exec);

/**
 * Execute terminal command and either return response or
 * throw error and terminate
 * @param {string} command Terminal command
 */
async function _executeESLint(command) {
  try {
    await exec(command);
    console.info('\nNo errors or warnings found in linting!\n');
    return;
  } catch(error) {

    if (error.stderr) {
      console.error(`\nSomething went wrong in linting!\n ${error.stderr}`);
      process.exit(1);
    }

    if (error.stdout) {
      console.error(`\nErrors or warnings found in linting!\n ${error.stdout}`);
      return error.stdout;
    }
  }
}

/**
 * Construct and return ESLint command
 * @param {Object} params configuration options
 */
function _buildESlintCmd(params) {
  return `eslint ${params.autofix} ${params.source} --config ${_eslintConfig(params.config)}`;
}

/**
 * Return ESLint configuration
 * @param {string} esLintConfig 
 */
function _eslintConfig(esLintConfig) {
  const lintConfigDir = path.join(__dirname, '../configs/lint/');
  
  if (esLintConfig === constants.lint.recommended) {
    return path.join(lintConfigDir, '.eslintrc.default.json'); 
  }

  switch(esLintConfig) {
    case constants.lint.airbnb:
    return path.join(lintConfigDir, '.eslintrc.airbnb.json');

    case constants.lint.standard:
    return path.join(lintConfigDir, '.eslintrc.standard.json');
  }
}

/**
 * Append user's root dirname and return the Array
 * @param {array} filteredSource 
 */
function _prependSrcRootDir(filteredSource) {
  return filteredSource.map((source) => {
    return path.join(process.cwd(), source);
  });
}

/**
 * Split the string based on filter passed
 * @param {string} source 
 * @param {string} filter 
 */
function _optionsFilter(source, filter) {
  return source.split(filter);
}

/**
 * Join the Array based on filter passed
 * @param {string} prependSrcRootDir 
 * @param {string} filter 
 */
function _optionsJoin(prependSrcRootDir, filter) {
  return join(prependSrcRootDir, filter);
}

/**
 * Assign or override defaults options and return ESLint response
 * @param  {string} {source=defaults.lint.source
 * @param  {string} autofix=defaults.lint.autofix
 * @param  {string} config=defaults.lint.config}
 */
function execLint({
  source = defaults.lint.source,
  autofix = defaults.lint.autofix,
  config = defaults.lint.config
}) {
  const optionsFilter = _optionsFilter(source, ',');
  const prependSrcRootDir = _prependSrcRootDir(optionsFilter);
  const optionsJoin = _optionsJoin(prependSrcRootDir, ' ');

  const esLintCmd = _buildESlintCmd({
    source: optionsJoin,
    autofix,
    config
  });

  return _executeESLint(esLintCmd);
}

module.exports = {
  execLint
}