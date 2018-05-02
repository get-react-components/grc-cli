/**
 * Verify passed lint options
 * @param {string} source List of directory where lint need to execute
 * @param {string} autofix Disable `--fix` auto fix feature of ESLint
 * @param {string} config ESLint configuration or rules
 */
function verifyLintOptions(source, autofix, config) {
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

  return options;
}

module.exports = {
  verifyLintOptions
}