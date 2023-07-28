import { access, constants, writeFile } from 'node:fs/promises';
import path from 'path';
import { displayCurrentDirectoryMessage, getCurrentDirectory } from '../helpers.js';

export const add = async (fileName) => {
  const filePath = path.join(getCurrentDirectory(), fileName);

  try {
    await access(filePath, constants.F_OK);
    console.log(`File '${fileName}' already exists`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(filePath, '');
      console.log(`File '${fileName}' created successfully!`);
    } else {
      console.log(`Operation failed: ${error.message}`);
    }
  } finally {
    displayCurrentDirectoryMessage();
  }
};
