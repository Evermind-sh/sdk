import type { ArgumentsCamelCase, Argv } from 'yargs';
import { extractLicenceKey } from '../licence-key';
import { baseUrl, KeysOptions, licenceKeyOption } from '../options';

export const command = `create`;
export const desc = `Create a new Evermind API Key.`;
export const builder = (yargs: Argv) => {
    return yargs.option('licenceKey', licenceKeyOption);
};
export const handler = async (argv: ArgumentsCamelCase<KeysOptions>) => {
    const licenceKey = extractLicenceKey(argv);

    const url = new URL(`/api-key`, baseUrl);

    const response = await fetch(url, {
        body: JSON.stringify({ licenceKey }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const body = (await response.json()) as { apiKey: string };

    console.log(
        `Welcome to Evermind!

        Your new API Key created for your licence key: ${body.apiKey}

        Usage:
        1. Install the Evermind sdk "npm install @evermind-sh/sdk"
        2. Pass this API Key into to the SDK when initializing it.

        Check out the documentation at https://evermind.sh`,
    );
};
