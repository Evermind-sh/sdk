import type { ArgumentsCamelCase, Argv } from 'yargs';
import { extractLicenceKey } from '../licence-key';
import { KeysOptions, licenceKeyOption } from '../options';

interface DeleteKeyOptions extends KeysOptions {
    apiKey: string;
}

export const command = `delete <key>`;
export const desc = `Delete an Evermind API Key, this will immediately invalidate it, preventing it from being used for requests.`;
export const builder = (yargs: Argv) => {
    return yargs
        .positional('key', {
            type: 'string',
            description: 'The API key to delete.',
            demandOption: true,
        })
        .option('licenceKey', licenceKeyOption);
};
export const handler = (argv: ArgumentsCamelCase<DeleteKeyOptions>) => {
    const licenceKey = extractLicenceKey(argv);

    console.log(licenceKey);
};
