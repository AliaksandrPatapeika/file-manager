import { displayCurrentDirectoryMessage } from '../helpers.js';

export const cd = (path) => {
  try {
    process.chdir(path);
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
  } finally {
    displayCurrentDirectoryMessage();
  }
};