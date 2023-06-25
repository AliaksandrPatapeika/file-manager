import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const hash = async ([filePath]) => {
  try {
    const hashSum = createHash('sha256');
    const readStream = createReadStream(filePath);

    readStream.on('data', (data) => {
      hashSum.update(data);
    });

    readStream.on('end', () => {
      const hex = hashSum.digest('hex');
      console.log(hex);
      displayCurrentDirectoryMessage();
    });

    readStream.on('error', (error) => {
      console.log(`Error occurred while reading the file: ${error.message}`);
      displayCurrentDirectoryMessage();
    });
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
    displayCurrentDirectoryMessage();
  }
};
