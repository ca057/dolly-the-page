const prompt = require('inquirer');
const YAML = require('yamljs');

const createConfigStructure = defaultConfig => Object.keys(defaultConfig);
const containsAll = (arr1, arr2) => arr2.every(arr2Item => arr1.includes(arr2Item));
const validateStructure = (correct, toValidate) => {
  const correctKeys = createConfigStructure(correct);
  const toValidateKeys = createConfigStructure(toValidate);

  return containsAll(correctKeys, toValidateKeys) && containsAll(correctKeys, toValidateKeys);
};

const parseInteractiveLink = link => link.split('|');

const promptValidator = {
  isNonEmptyString: str => {
    if (str && str.trim().length) return true;
    return 'You need to enter at least one character!';
  },
  isPathToHtml: path => promptValidator.isNonEmptyString(path) && path.endsWith('.html'),
  isValidLink: link => parseInteractiveLink(link).length === 3 // check if everything is a isNonEmptyString
};

const toLinkObject = linkArray => ({
  name: linkArray[0],
  url: linkArray[1],
  icon: linkArray[2]
});

const fromFile = (defaultConfig, configFile) => {
  if (configFile && configFile.length) {
    console.log('Reading your config file...\n');
    const configFromFile = YAML.load(configFile);
    if (validateStructure(defaultConfig, configFromFile)) return Promise.resolve(configFromFile);
  }
  return Promise.reject('Either no path defined or wrong structure.');
};

const interactively = defaultConfig => {
  const baseQuestions = [
    {
      name: 'name',
      message: 'Your name to display in the header:',
      default: defaultConfig.name,
      validate: promptValidator.isNonEmptyString
    },
    {
      name: 'backgroundColor',
      message: 'What background-color do you want to have?',
      default: defaultConfig.backgroundColor,
      validate: promptValidator.isNonEmptyString
    },
    {
      name: 'fontColor',
      message: 'What font-color do you want to have?',
      default: defaultConfig.fontColor,
      validate: promptValidator.isNonEmptyString
    },
    {
      name: 'outputFile',
      message: 'Where do want the template to be saved to?',
      default: defaultConfig.outputFile,
      validate: promptValidator.isPathToHtml
    },
    {
      name: 'favicon',
      message: 'What is the name of your favicon and where will it be placed?',
      default: defaultConfig.favicon,
      validate: promptValidator.isNonEmptyString
    }
  ];

  const defaultLink = [
    defaultConfig.links[0].name,
    defaultConfig.links[0].url,
    defaultConfig.links[0].icon
  ].join('|');
  const linkQuestions = [
    {
      name: 'link',
      message: 'Add a link: <link-name>|<link-url>|<link-icon>',
      default: defaultLink,
      validate: promptValidator.isValidLink
    },
    {
      type: 'confirm',
      name: 'nextLink',
      message: 'Do you want another link?',
      choices: ['yes', 'no'],
      default: 'yes'
    }
  ];

  return prompt
    .prompt(baseQuestions)
    .then(baseAnswers => Object.assign(defaultConfig, baseAnswers))
    .then(baseConfig => {
      const links = [];
      const linkPrompt = () => prompt.prompt(linkQuestions).then(answers => {
        links.push(parseInteractiveLink(answers.link));
        if (answers.nextLink) return linkPrompt();
        return links;
      });
      return linkPrompt().then(links =>
        Object.assign(baseConfig, { links: links.map(toLinkObject) }));
    });
};

module.exports = (defaultConfig, configFile) =>
  configFile ? fromFile(defaultConfig, configFile) : interactively(defaultConfig);
