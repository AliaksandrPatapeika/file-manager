import { readdir } from 'node:fs/promises';
import { displayCurrentDirectoryMessage } from '../helpers.js';

export const ls = async (path) => {
  try {
    // Get the list of files and folders in the current directory
    const files = await readdir(path, {withFileTypes: true});

    // Sort the list of files and folders
    const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name, 'en', {sensitivity: 'base'}));

    // Prepare the data for the table
    const tableData = sortedFiles.map((file) => ({
      Name: file.name,
      Type: file.isDirectory() ? 'directory' : 'file'
    }));

    // Print the table using console.table()
    console.table(tableData);
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
  } finally {
    displayCurrentDirectoryMessage();
  }
};