import type { ArgumentsCamelCase } from 'yargs';
import { KeysOptions } from './options';

export function extractLicenceKey<T extends ArgumentsCamelCase<KeysOptions>>(
    argv: T,
): string {
    const licenceKey: string | undefined =
        argv.licenceKey || process.env['EVERMIND_LICENCE_KEY']?.trim();

    if (!licenceKey) {
        console.error(
            `Expected EVERMIND_LICENCE_KEY to be set or passed in via the --licenceKey (-l) flag.`,
        );
        process.exit(1);
    }

    return licenceKey;
}
