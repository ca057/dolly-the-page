const program = require('commander');
const createConfig = require('./config');
const printHelp = require('./print/help');
const printConfig = require('./print/config');
const printFinal = require('./print/final');
const createTemplate = require('./template');
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
    .then(config => file.writeToFile(config.outputFile, createTemplate(config)))
    .then(printFinal.success)
    .catch(error => {
      printFinal.failure();
      process.exit(1);
    });
};
