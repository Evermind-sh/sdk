export interface LockOptions {
    endpoint?: string;
    prefix?: string;
    apiKey?: string;
}

export const defaultLockOptions: LockOptions = {
    endpoint: 'https://evermind.fly.dev',
};

// Release

export interface ReleaseOptions {
    key: string;
    uuid: string;
    softFail: boolean;
}

export interface ReleasedResponse {
    released: true;
    message: null;
}

export interface ReleaseFailedResponse {
    extended: false;
    message: string;
}

export type ReleaseResponse = ReleasedResponse | ReleaseFailedResponse;

// Extend

export interface ExtendOptions {
    key: string;
    extendBy: number;
    uuid: string;
    softFail: boolean;
}

export interface ExtendedResponse {
    extended: true;
    message: null;
}

export interface ExtendFailedResponse {
    extended: false;
    message: string;
}

export type ExtendResponse = ExtendedResponse | ExtendFailedResponse;

/**
 * Lock acquisition options, only {@link key} is required. Will define how the
 * lock attempts are tried initially and retried.
 */
export interface AcquireOptions {
    /**
     * The resource key to lock on. This will be combined with other globally
     * unique properties in the Evermind system to ensure lock acquisitions do
     * not clash.
     */
    key: string;

    /**
     * How long in milliseconds to lock the resource for, once this time is up
     * the lock will automatically be released and the resource can be acquired
     * by another process.
     */
    lease?: number;

    /**
     * The number of times to retry acquiring the lock on the resource
     * {@link key}
     */
    retryAttempts?: number;

    /**
     * The amount of time in milliseconds to wait before retrying to acquire the
     * lock.
     */
    retryDelay?: number;

    /**
     * A custom UUID to be used as the lock acquisition value, each request to
     * acquire a lock will be assigned a {@link uuid} if one is not passed in.
     *
     * This value is needed when releasing a lock.
     */
    uuid?: string;

    /**
     * Whether the lock will soft-fail and return a 200 with an error if the
     * lock fails to be acquired.
     */
    softFail?: boolean;
}

export interface AcquiredResponse {
    /**
     * Whether the lock on {@link key} was acquired or not. Will be `false` when
     * {@link AcquireOptions#softFail} was `false` and the lock failed to be
     * acquired.
     */
    acquired: boolean;

    /**
     * If {@link AcquireOptions#softFail} was true then {@link message} will
     * contain an error in the case of the acquisition failing.
     */
    message: null;

    /**
     * The config that was used to acquire the lock on the resource {@link key}.
     *
     * A subset of {@link AcquireOptions}
     */
    config: Required<
        Pick<
            AcquireOptions,
            'key' | 'lease' | 'retryAttempts' | 'retryDelay' | 'uuid'
        >
    >;

    /**
     * The billed number of LAAs for this request. This will be the total number
     * of times this request attempted (whether it succeeded or not) to acquire
     * the lock on the resource {@link key}
     */
    lockAcquisitionAttempts: number;
}

/**
 * Body of the HTTP error thrown when a lock acquisition fails.
 *
 * Is in a similar structure as {@link AcquiredResponse}
 */
export interface AcquireFailedResponse
    extends Pick<AcquiredResponse, 'config' | 'lockAcquisitionAttempts'> {
    acquired: false;
    message: string;
}

export type AcquireResponse = AcquiredResponse | AcquireFailedResponse;
