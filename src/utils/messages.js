/**
 * @file Handle static messages for terminal outputs
 */
const { name, version } = require('../../package.json');

/**
 * Return welcome message for help output on terminal
 */
function welcome() {
  return `
    Thank you ${process.env.USER} for using ${name} v${version}
    You are running this program on ${process.title} ${process.version} platform
  `
}

/**
 * Return command discription for help output on terminal
 * @param {string} trigger
 */
function describeCmd(trigger) {
  switch (trigger) {
    case 'lint':
    return `
    - Purpose: execute eslint on source either default or given configs
    - Usage example: grc lint src,bin,lib
    \n`;
  }
}

module.exports = {
  welcome,
  describeCmd
}