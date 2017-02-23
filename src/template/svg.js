const SVGO = require('svgo');
const file = require('../file');

const ioniconsPath = './node_modules/ionicons-npm/src/';

const svgo = new SVGO({
  plugins: [
    {
      removeDimensions: true
    }
  ]
});

const promisedSvgOptimization = svg => new Promise((resolve, reject) => {
  svgo.optimize(svg, result => result.data.length ? resolve(result.data) : reject());
});

const removeIonPrefix = string =>
  string.startsWith('ion-') && string.length > 4 ? string.substring(4) : string;

const resolveSvgs = config => {
  console.log('Getting your icons...');

  const paths = config.links.map(link => `${ioniconsPath}${removeIonPrefix(link.icon)}.svg`);

  return Promise.all(paths.map(link => file.readFile(link)))
    .then(svgs => Promise.all(svgs.map(promisedSvgOptimization)))
    .then(svgs => Object.assign(config, {
      links: config.links.map((link, i) => Object.assign(link, { icon: svgs[i] }))
    }));
};

module.exports = {
  resolveSvgs
};
