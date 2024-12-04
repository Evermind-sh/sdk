export interface KeysOptions {
    licenceKey?: string;
}

export const licenceKeyOption = {
    type: 'string',
    description:
        'The Licence key acquired from Polar.sh to create an API key under.',
    alias: 'l',
} as const;

export const baseUrl =
    process.env['EVERMIND_BASE_URL'] || `https://api.evermind.sh`;
