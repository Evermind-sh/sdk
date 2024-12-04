import type { ArgumentsCamelCase, Argv } from 'yargs';
import { extractLicenceKey } from '../licence-key';
import { baseUrl, KeysOptions, licenceKeyOption } from '../options';

interface DeleteKeyOptions extends KeysOptions {
    key: string;
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
export const handler = async (argv: ArgumentsCamelCase<DeleteKeyOptions>) => {
    const licenceKey = extractLicenceKey(argv);

    const url = new URL(`/api-key`, baseUrl);

    const response = await fetch(url, {
        body: JSON.stringify({ apiKey: argv.key, licenceKey }),
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        console.log(`Successfully deleted Evermind API Key.`);
    } else {
        console.log(
            `Error while deleting Evermind API Key.`,
            JSON.stringify(await response.json(), null, 2),
        );
    }
};
