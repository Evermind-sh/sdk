import { randomUUID } from 'node:crypto';
import {
    type AcquireOptions,
    type AcquireResponse,
    defaultLockOptions,
    type ExtendOptions,
    type ExtendResponse,
    type LockOptions,
    type ReleaseOptions,
    type ReleaseResponse,
} from './options';

/**
 * Class to initialize an instance of an Evermind lock. Includes functionality
 * to use the lock but also manage API keys using a Licence Key.
 */
export class Evermind {
    private readonly options: LockOptions;

    constructor(private readonly _options: LockOptions) {
        this.options = {
            ...this._options,
            ...defaultLockOptions,
        };
    }

    async release(options: ReleaseOptions): Promise<ReleaseResponse> {
        const url = new URL(`/lock/release`, this.options.endpoint);

        return this.makeRequest<ReleaseResponse>(url, options);
    }

    async extend(options: ExtendOptions): Promise<ExtendResponse> {
        const url = new URL(`/lock/extend`, this.options.endpoint);

        return this.makeRequest<ExtendResponse>(url, options);
    }

    async acquire(options: AcquireOptions): Promise<AcquireResponse> {
        const url = new URL(`/lock/acquire`, this.options.endpoint);

        return this.makeRequest<AcquireResponse>(url, options);
    }

    async withLock<T>(options: AcquireOptions, routine: () => T): Promise<T> {
        const uuid = options.uuid ?? randomUUID();

        let acquired = false;

        try {
            await this.acquire({
                ...options,
                uuid,
            });

            acquired = true;

            return await routine();
        } finally {
            if (acquired) {
                await this.release({
                    key: options.key,
                    uuid,
                    softFail: true,
                });
            }
        }
    }

    private async makeRequest<T>(
        url: URL,
        options: AcquireOptions | ExtendOptions,
    ): Promise<T> {
        const response = await fetch(url, {
            body: JSON.stringify(this.includePrefix(options)),
        });

        return (await response.json()) as T;
    }

    private includePrefix<T extends { key: string }>(options: T): T {
        if (this.options.prefix) {
            return {
                ...options,
                key: `${this.options.prefix}:${options.key}`,
            };
        }

        return options;
    }
}
