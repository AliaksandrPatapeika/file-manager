const displayCurrentDirectoryMessage = () =>
  console.log(`You are currently in ${getCurrentDirectory()}`);

const displayWelcomeMessage = (username) =>
  console.log(`Welcome to the File Manager, ${username}!`);

const exitFileManager = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
};

const getCurrentDirectory = () => process.cwd();

const getCommandArguments = (command) => command.split(/\s/g).slice(1);

const getPathToNavigate = (command) => getCommandArguments(command)[0];

const getUsernameFromArgs = () => {
  const args = process.argv.slice(2);
  return args[0]?.split('=')[1] || 'User';
};

const parseCommand = (data) => data.toString('utf-8').trim();

export {
  displayCurrentDirectoryMessage,
  displayWelcomeMessage,
  exitFileManager,
  getCurrentDirectory,
  getCommandArguments,
  getPathToNavigate,
  getUsernameFromArgs,
  parseCommand
};
