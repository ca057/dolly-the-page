const fs = require('fs');

const readFile = (fileName, encoding = 'utf-8') => new Promise((resolve, reject) => {
  fs.readFile(fileName, encoding, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

const writeToFile = (fileName, data) => new Promise((resolve, reject) => {
  console.log(`\nWriting data to ${fileName}...`);
  // TODO validate input
  fs.writeFile(fileName, data, error => {
    if (error) reject(error);
    resolve(true);
  });
});

module.exports.writeToFile = writeToFile;
module.exports.readFile = readFile;
