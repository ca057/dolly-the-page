const program = require('commander');
const createConfig = require('./config');
const printHelp = require('./print/help');
const printConfig = require('./print/config');
const printFinal = require('./print/final');
const createTemplate = require('./template');
const resolveSvgs = require('./template/svg').resolveSvgs;
const file = require('./file');

let defaultConfig = {
  name: 'Christian Ost',
  outputFile: 'index.html',
  backgroundColor: '#FFD54F',
  fontColor: '#212121',
  favicon: 'favicon.ico',
  links: [
    {
      name: 'Christian Ost',
      url: 'https://www.christianost.de',
      icon: 'ion-heart'
    }
  ]
};

module.exports = function clone(version) {
  program
    .version(version)
    .option(
      '-c, --config <config-file>',
      'A yml-file with the configuration for the homepage clone'
    );

  program.on('--help', printHelp);
  program.parse(process.argv);

  createConfig(defaultConfig, program.config)
    .then(printConfig)
    .then(resolveSvgs)
    .then(config =>
      createTemplate(config).then(homepage => file.writeToFile(config.outputFile, homepage)))
    .then(printFinal.success)
    .then(process.exit)
    .catch(error => {
      printFinal.failure();
      process.exit(1);
    });
};
