const SVGO = require('svgo');
const file = require('../file');
const path = require('path');

const removeIonPrefix = string =>
  string.startsWith('ion-') ? string.substring(4) : string;

const getIconPath = (basePath, icon) =>
  `${path.join(basePath, 'node_modules/ionicons-npm/src/')}${removeIonPrefix(
    icon
  )}.svg`;

const svgo = new SVGO({
  plugins: [
    {
      removeDimensions: true,
    },
  ],
});

const promisedSvgOptimization = svg =>
  new Promise((resolve, reject) => {
    svgo.optimize(
      svg,
      result => (result.data.length ? resolve(result.data) : reject())
    );
  });

const getResolveSvgs = basePath => config => {
  console.log('Getting your icons...');

  return Promise.all(
    config.links.map(({ icon }) => file.readFile(getIconPath(basePath, icon)))
  )
    .then(svgs => Promise.all(svgs.map(promisedSvgOptimization)))
    .then(svgs =>
      Object.assign(config, {
        links: config.links.map((link, i) =>
          Object.assign(link, { icon: svgs[i] })
        ),
      })
    );
};

module.exports = {
  getResolveSvgs,
};
