const program = require('commander');
const createConfig = require('./config');
const printHelp = require('./print/help');
const printConfig = require('./print/config');
const printFinal = require('./print/final');
const getCreateTemplate = require('./template');
const getResolveSvgs = require('./template/svg').getResolveSvgs;
const file = require('./file');

const version = require('./../package.json').version;
const defaultConfig = require('./../defaultConfig.json');

module.exports = function clone(basePath) {
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
    .then(getResolveSvgs(basePath))
    .then(config =>
      getCreateTemplate(basePath)(config).then(homepage =>
        file.writeToFile(config.outputFile, homepage)
      )
    )
    .then(printFinal.success)
    .then(process.exit)
    .catch(error => {
      printFinal.failure();
      process.exit(1);
    });
};
