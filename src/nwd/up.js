import path from 'path';
import { cd } from './cd.js';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const up = (currentDir) => {
  try {
    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      // If the current directory is the root directory, return
      displayCurrentDirectoryMessage();

      return;
    }

    cd(parentDir);
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
  }
};