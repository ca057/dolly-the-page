module.exports = () => {
  console.log(
    `
Examples:

  Create the homepage interactively:
  $ clone-ca

  Create the homepage interactively and create page in specified file:
  $ clone-ca --output my-clone.html

  Create the homepage as defined in a config file and create page in index.html of current dir:
  $ clone-ca --config config.yml

  Read from config file and create page in specified file:
  $ clone-ca --config config.yml --output my-clone.html
  `
  );
};
