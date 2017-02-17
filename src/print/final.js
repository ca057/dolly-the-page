const printSuccess = (...args) => {
  console.log('\nCloning completed, have fun with your new homepage!\n');
  return args;
};

const printFailure = (...args) => {
  console.log(
    '\nUps, something seems to be wrong. Your homepage could not be created, please run the tool again and check your parameters.\n'
  );
};

module.exports.success = printSuccess;
module.exports.failure = printFailure;
