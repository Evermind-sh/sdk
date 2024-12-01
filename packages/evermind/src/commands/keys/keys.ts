import type yargs from 'yargs';

export const command = `keys <command>`;
export const desc = `Manage Evermind API Keys.`;
export const builder = (yargs: yargs.Argv) => {
    return yargs.commandDir('commands');
};
export const handler = () => {};
