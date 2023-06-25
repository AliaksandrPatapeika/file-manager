import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const cp = async ([filePath, newDirectory]) => {
  const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
  const destinationFilePath = `${newDirectory}/${fileName}`;

  try {
    // Check if the source file exists
    await access(filePath);

    // Check if the destination directory exists
    await access(newDirectory);

    // Create a readable stream from the source file
    const sourceStream = createReadStream(filePath);

    // Create a writable stream to the destination file
    const destinationStream = createWriteStream(destinationFilePath);

    // Handle error event for both streams
    const handleStreamError = (error) => {
      console.log(`Operation failed: ${error.message}`);
      displayCurrentDirectoryMessage();
    };

    // Handle close event for the destination stream (copy completed)
    const handleStreamClose = () => {
      console.log(`File '${fileName}' copied successfully to '${newDirectory}'!`);
      displayCurrentDirectoryMessage();
    };

    // Set the error event handler for both streams
    sourceStream.on('error', handleStreamError);
    destinationStream.on('error', handleStreamError);

    // Set the close event handler for the destination stream
    destinationStream.on('close', handleStreamClose);

    // Pipe the source stream to the destination stream for copying
    sourceStream.pipe(destinationStream);
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
    displayCurrentDirectoryMessage();
  }
};
