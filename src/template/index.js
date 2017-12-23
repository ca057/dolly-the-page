const Mustache = require('mustache');
const path = require('path');
const file = require('../file');

module.exports = basePath => params => {
  // TODO validate input
  // TODO escape input
  console.log('\nCreating the homepage...');
  return Promise.all([
    file.readFile(path.join(basePath, 'src/template/base.mustache')),
    file.readFile(path.join(basePath, 'src/template/_link.mustache')),
    file.readFile(path.join(basePath, 'src/template/_style.mustache')),
  ]).then(templates =>
    Mustache.render(templates[0], params, {
      link: templates[1],
      style: templates[2],
    })
  );
};
