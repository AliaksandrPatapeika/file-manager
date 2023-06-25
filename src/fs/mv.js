import { createReadStream, createWriteStream } from 'node:fs';
import { access, unlink } from 'node:fs/promises';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const mv = async ([filePath, newDirectory]) => {
  const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
  const destinationFilePath = `${newDirectory}/${fileName}`;

  try {
    // Check if the source file exists
    try {
      await access(filePath);
    } catch (error) {
      console.log(`Operation failed: Source file '${filePath}' does not exist`);
      displayCurrentDirectoryMessage();
      return;
    }

    // Check if the destination directory exists
    try {
      await access(newDirectory);
    } catch (error) {
      console.log(`Operation failed: Destination directory '${newDirectory}' does not exist`);
      displayCurrentDirectoryMessage();
      return;
    }

    // Create a readable stream from the source file
    const sourceStream = createReadStream(filePath);

    // Create a writable stream to the destination file
    const destinationStream = createWriteStream(destinationFilePath);

    // Handle error event for both streams
    const handleStreamError = (error) => {
      console.log(`Operation failed: ${error.message}`);
      displayCurrentDirectoryMessage();
    };

    // Set the error event handler for both streams
    sourceStream.on('error', handleStreamError);
    destinationStream.on('error', handleStreamError);

    // Handle close event for the destination stream (copy completed)
    destinationStream.on('close', async () => {
      try {
        await unlink(filePath);
        console.log(`File '${fileName}' moved successfully to '${newDirectory}'!`);
      } catch (error) {
        console.log(`Operation failed: ${error.message}`);
      }
      displayCurrentDirectoryMessage();
    });

    // Pipe the source stream to the destination stream for copying
    sourceStream.pipe(destinationStream);
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
    displayCurrentDirectoryMessage();
  }
};
