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
  const staticText = {
    either: 'either by default or custom configuration',
    purpose: '- Purpose:',
    usage: '- Usage:'
  };

  switch (trigger) {
    case 'create':
    return `
    ${staticText.purpose} create component
    ${staticText.usage} init <component-name> <mode>
    `;

    case 'deprecate':
    return `
    ${staticText.purpose} deprecate component
    ${staticText.usage} deprecate <component-name>
    `;

    case 'release':
    return `
    ${staticText.purpose} release component
    ${staticText.usage} release <component-name> 
    `

    case 'lint':
    return `
    ${staticText.purpose} execute lint on source ${staticText.either}
    ${staticText.usage} lint [dir1, dir2, file1.js, ...]
    `;

    case 'build':
    return `
    ${staticText.purpose} execute production build on source ${staticText.either}
    ${staticText.usage} build
    `;

    case 'start':
    return `
    ${staticText.purpose} start development server ${staticText.either}
    ${staticText.usage} start
    `;

    case 'ci':
    return `
    ${staticText.purpose} execute continuous integration ${staticText.either}
    ${staticText.usage} ci
    `;

    case 'cd':
    return `
    ${staticText.purpose} execute continuous deployment ${staticText.either}
    ${staticText.usage} cd
    `;

    case 'ut':
    return `
    ${staticText.purpose} execute unit test ${staticText.either}
    ${staticText.usage} ut
    `;

    case 'start':
    return `
    ${staticText.purpose} execute functional test ${staticText.either}
    ${staticText.usage} ft
    `;
  }
}

module.exports = {
  welcome,
  describeCmd
}