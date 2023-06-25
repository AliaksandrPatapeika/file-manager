import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { createBrotliDecompress } from 'node:zlib';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const decompress = async ([filePath, outputPath]) => {
  try {
    // Check if the source file exists
    await access(filePath);

    const zipFile = createReadStream(filePath);
    const outputFile = createWriteStream(outputPath);
    const brotli = createBrotliDecompress();

    const stream = zipFile.pipe(brotli).pipe(outputFile);

    brotli.on('error', (error) => {
      console.log(`Operation failed: ${error.message}`);
      displayCurrentDirectoryMessage();
    });

    stream.on('error', (error) => {
      console.log(`Operation failed: ${error.message}`);
      displayCurrentDirectoryMessage();
    });

    stream.on('finish', () => {
      console.log('File decompressed successfully!');
      displayCurrentDirectoryMessage();
    });
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
    displayCurrentDirectoryMessage();
  }
};
