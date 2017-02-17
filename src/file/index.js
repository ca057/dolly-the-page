const fs = require('fs');

const writeToFile = (fileName, data) => new Promise((resolve, reject) => {
  console.log(`\nWriting data to ${fileName}...`);
  // TODO validate input
  fs.writeFile(fileName, data, error => {
    if (error) reject(error);
    resolve(true);
  });
});

module.exports.writeToFile = writeToFile;
