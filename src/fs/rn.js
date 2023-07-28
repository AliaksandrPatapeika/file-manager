import { access, constants, rename } from 'node:fs/promises';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const rn = async ([oldPath, newPath]) => {
  try {
    await access(oldPath, constants.F_OK);
    await access(newPath, constants.F_OK);
    console.log(`File '${newPath}' already exists`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await rename(oldPath, newPath);
        console.log('File renamed successfully!');
      } catch (error) {
        console.log(`Operation failed: ${error.message}`);
      }
    } else {
      console.log(`Operation failed: ${error.message}`);
    }
  } finally {
    displayCurrentDirectoryMessage();
  }
};
