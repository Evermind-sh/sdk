export interface KeysOptions {
    licenceKey?: string;
}

export const licenceKeyOption = {
    type: 'string',
    description:
        'The Licence key acquired from Polar.sh to create an API key under.',
    alias: 'l',
} as const;
