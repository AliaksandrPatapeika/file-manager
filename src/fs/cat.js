import { createReadStream } from 'node:fs';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const cat = (path) => {
  const readStream = createReadStream(path, 'utf-8');

  readStream.on('data', (chunk) => process.stdout.write(chunk));

  readStream.on('error', (error) => {
    console.log(`Operation failed: ${error.message}`);
    displayCurrentDirectoryMessage();
  });

  readStream.on('end', () => {
    displayCurrentDirectoryMessage();
  });
};