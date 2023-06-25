import { arch, EOL, cpus, userInfo } from 'node:os';
import {
  displayCurrentDirectoryMessage,
} from '../helpers.js';

export const getHomeDir = () => userInfo().homedir;

export const os = ([arg]) => {
  if (!arg) {
    console.log('Missing argument');
    displayCurrentDirectoryMessage();
    return;
  }

  try {
    switch (arg) {
      case '--EOL':
        console.log(JSON.stringify(EOL));
        break;
      case '--cpus':
        console.log(cpus());
        break;
      case '--homedir':
        console.log(getHomeDir());
        break;
      case '--username':
        console.log(userInfo().username);
        break;
      case '--architecture':
        console.log(arch());
        break;
      default:
        console.log('Invalid argument');
        break;
    }
  } catch (error) {
    console.log(`Operation failed: ${error.message}`);
  }

  displayCurrentDirectoryMessage();
};