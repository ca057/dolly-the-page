module.exports = () => {
  console.log(
    `

  Usage: dolly-the-page [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -c, --config <config-file>  A yml-file with the configuration for the homepage clone

Examples:

  Create the homepage interactively:
  $ dolly-the-page

  Create the homepage as defined in a config file and create page in index.html of current dir:
  $ dolly-the-page --config config.yml
`
  );
};
