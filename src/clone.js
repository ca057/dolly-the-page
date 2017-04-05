const program = require('commander');
const createConfig = require('./config');
const printHelp = require('./print/help');
const printConfig = require('./print/config');
const printFinal = require('./print/final');
const createTemplate = require('./template');
const resolveSvgs = require('./template/svg').resolveSvgs;
const file = require('./file');

const version = require('./../package.json').version;
const defaultConfig = require('./../defaultConfig.json');

module.exports = function clone() {
  program
    .version(version)
    .option(
      '-c, --config <config-file>',
      'A yml-file with the configuration for the homepage clone',
    );

  program.on('--help', printHelp);
  program.parse(process.argv);

  console.log(process.argv.slice(2));

  createConfig(defaultConfig, program.config)
    .then(printConfig)
    .then(resolveSvgs)
    .then(config =>
      createTemplate(config).then(homepage => file.writeToFile(config.outputFile, homepage)))
    .then(printFinal.success)
    .then(process.exit)
    .then(console.log, console.log)
    .catch(error => {
      printFinal.failure();
      process.exit(1);
    });
};
