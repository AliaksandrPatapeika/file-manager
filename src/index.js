import {
  displayCurrentDirectoryMessage,
  displayWelcomeMessage,
  exitFileManager,
  getCurrentDirectory,
  getPathToNavigate,
  getCommandArguments,
  getUsernameFromArgs,
  parseCommand
} from './helpers.js';

import { cd, ls, up } from './nwd/index.js';
import { add, cat, cp, mv, rm, rn } from './fs/index.js';
import { getHomeDir, os } from './os/os.js';
import { hash } from './hash/hash.js';
import { compress, decompress } from './zlib/index.js';


const start = () => {
  const userName = getUsernameFromArgs();
  displayWelcomeMessage(userName);

  cd(getHomeDir());

  const executeCommand = (command) => {
    // Navigation & working directory (nwd)
    if (command === 'up') {
      up(getCurrentDirectory());
      return;
    }

    if (command === 'ls') {
      ls(getCurrentDirectory());
      return;
    }

    if (command.startsWith('cd')) {
      cd(getPathToNavigate(command));
      return;
    }

    // Basic operations with files (fs)
    if (command.startsWith('cat')) {
      cat(getPathToNavigate(command));
      return;
    }

    if (command.startsWith('add')) {
      add(getPathToNavigate(command));
      return;
    }

    if (command.startsWith('rn')) {
      rn(getCommandArguments(command));
      return;
    }

    if (command.startsWith('cp')) {
      cp(getCommandArguments(command));
      return;
    }

    if (command.startsWith('rm')) {
      rm(getCommandArguments(command));
      return;
    }

    if (command.startsWith('mv')) {
      mv(getCommandArguments(command));
      return;
    }

    // Operating system info (os)
    if (command.startsWith('os')) {
      os(getCommandArguments(command));
      return;
    }

    // Hash calculation (hash)
    if (command.startsWith('hash')) {
      hash(getCommandArguments(command));
      return;
    }

    // Compress and decompress operations (zlib)
    if (command.startsWith('compress')) {
      compress(getCommandArguments(command));
      return;
    }

    if (command.startsWith('decompress')) {
      decompress(getCommandArguments(command));
      return;
    }

    console.log('Invalid input');
    displayCurrentDirectoryMessage();
  };

  const handleInput = (data) => {
    const command = parseCommand(data);

    // Program work finished
    if (command === '.exit') {
      exitFileManager(userName);
    }

    executeCommand(command);
  };

  const handleSIGINT = () => {
    process.stdout.clearLine();
    exitFileManager(userName);
  };

  process.stdin.on('data', handleInput);
  process.on('SIGINT', handleSIGINT);
};

start();
