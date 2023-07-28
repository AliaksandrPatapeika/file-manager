import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { createBrotliCompress } from 'node:zlib';
import path from 'path';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const compress = async ([filePath, folderPath]) => {
  try {
    // Check if the source file exists
    await access(filePath);

    // Check if the destination folder exists
    await access(folderPath);

    const fileStream = createReadStream(filePath);
    const outputPath = path.resolve(`${folderPath}/${path.basename(filePath)}.br`);
    const outputStream = createWriteStream(outputPath);
    const brotli = createBrotliCompress();

    const stream = fileStream.pipe(brotli).pipe(outputStream);

    brotli.on('error', (error) => {
      console.log(`Operation failed: ${error.message}`);
      displayCurrentDirectoryMessage()
    });

    fileStream.on('error', (error) => {
      console.log(`Error occurred while reading the file: ${error.message}`);
      displayCurrentDirectoryMessage();
    });

    stream.on('error', (error) => {
      console.log(`Operation failed: ${error.message}`);
      displayCurrentDirectoryMessage();
    });

    stream.on('finish', () => {
      console.log('File compressed successfully!');
      displayCurrentDirectoryMessage();
    });
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
    displayCurrentDirectoryMessage();
  }
};
