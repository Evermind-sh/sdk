import type yargs from 'yargs';

export const command = `lock <command>`;
export const desc = `Lock commands.`;
export const builder = (yargs: yargs.Argv) => {
    return yargs.commandDir('commands');
};
export const handler = () => {};
