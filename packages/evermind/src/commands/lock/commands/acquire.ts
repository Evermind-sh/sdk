import type { AcquireOptions } from '@evermind-sh/sdk';
import type { ArgumentsCamelCase } from 'yargs';

export const command = `lock acquire <resource>`;
export const desc = `Acquire lock on a resource.`;
export const builder = () => {};
export const handler = (argv: ArgumentsCamelCase<AcquireOptions>) => {};
