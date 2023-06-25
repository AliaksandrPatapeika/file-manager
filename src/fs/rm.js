import { unlink } from 'node:fs/promises';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const rm = async ([filePath]) => {
  try {
    await unlink(filePath);
    console.log('File removed successfully!');
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
  } finally {
    displayCurrentDirectoryMessage();
  }
};
