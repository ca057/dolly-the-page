const mapLinksToList = (link, index) =>
  `\n    ${index + 1}: "${link.name}" to "${link.url}" with "${link.icon}" as icon`;

module.exports = config => {
  console.log(
    `
This is the config I will use to generate the website:
  Your name: ${config.name}
  Your links: ${config.links.map(mapLinksToList).join('')}
  The output file: ${config.outputFile}
  `
  );
  return config;
};
