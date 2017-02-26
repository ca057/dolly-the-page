const prompt = require('inquirer');

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
  console.log(
    'Sorry, reading from config file is currently not supported. The path you specified:',
    configFile
  );
  return Promise.reject();
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
