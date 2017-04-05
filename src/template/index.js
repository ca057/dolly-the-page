const Mustache = require('mustache');
const file = require('../file');

module.exports = params => {
  // TODO validate input
  // TODO escape input
  console.log('\nCreating the homepage...');
  return Promise
    .all([
      file.readFile('./src/template/base.mustache'),
      file.readFile('./src/template/_link.mustache'),
      file.readFile('./src/template/_style.mustache')
    ])
    .then(templates => Mustache.render(templates[0], params, {
      link: templates[1],
      style: templates[2]
    }));
};
