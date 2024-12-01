import type { ArgumentsCamelCase, Argv } from 'yargs';
import { extractLicenceKey } from '../licence-key';
import { KeysOptions, licenceKeyOption } from '../options';

export const command = `create`;
export const desc = `Create a new Evermind API Key.`;
export const builder = (yargs: Argv) => {
    return yargs.option('licenceKey', licenceKeyOption);
};
export const handler = (argv: ArgumentsCamelCase<KeysOptions>) => {
    const licenceKey = extractLicenceKey(argv);
    console.log(licenceKey);
};
