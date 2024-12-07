<p align="center">
	<img src="https://avatars.githubusercontent.com/u/184973784" alt="Evermind Logo" style="width: 100px;vertical-align: middle;">
</p>
<h1 align="center">Evermind - Distributed Lock as a Service</h1>

[![Evermind](https://img.shields.io/badge/Evermind-Lock%20as%20a%20Service-blue)](https://evermind.sh)
[![Polar.sh](https://img.shields.io/badge/Polar.sh-Purchase-orange)](https://polar.sh/evermind/)
[![Bluesky](https://img.shields.io/badge/Evermind-Bluesky-blue)](https://bsky.app/profile/evermind.sh)

## Table of contents

- [About Evermind.sh](#1-about-evermindsh)
- [Evermind Lock](#2-evermind-lock)
	- [Features](#21-features)
	- [Future Features](#22-future-features)
	- [Pricing](#23-pricing)
		- [Pay as you go Pricing](#231-pay-as-you-go-pricing)
		- [Enterprise Pricing](#232-enterprise-pricing)
- [Setup: Acquiring an API Key](#3-setup-acquiring-an-api-key)
	- [Using the CLI](#31-using-the-cli)
	- [Direct HTTP API Calls](#32-direct-http-api-calls)
		- [Create API Key](#321-create-api-key)
		- [Delete API Key](#322-delete-api-key)
- [Using Evermind](#4-using-evermind)
	- [TypeScript SDK Usage](#41-typescript-sdk-usage)
	- [HTTP API Examples](#42-http-api-examples)
		- [Acquire Lock](#421-acquire-lock)
		- [Extend Lock](#422-extend-lock)
		- [Release Lock](#423-release-lock)
- [Lock API](#5-lock-api)
	- [Lock Operations](#51-lock-operations)
		- [Acquire Lock](#511-acquire-lock)
		- [Extend Lock](#512-extend-lock)
		- [Release Lock](#513-release-lock)
	- [Summary of SDK Methods and HTTP Endpoints](#52-summary-of-sdk-methods-and-http-endpoints)
    - [Additional Notes](#53-additional-notes)
- [Discussion & Alternatives](#6-discussion--alternatives)
    - [Distributed Locks vs. Local Mutexes](#61-distributed-locks-vs-local-mutexes)
    - [Alternatives to Evermind](#62-alternatives-to-evermind)
    - [When Not to Use Evermind](#63-when-to-use-evermind)
    - [When to Use Evermind](#64-when-not-to-use-evermind)
- [Regions & Deployment](#7-regions-and-deployment)
- [Related](#8-related)

## 1. About [Evermind.sh](https://evermind.sh)

*Evermind*, translated from the Rohanese word *Simbelmynë*—the name of a small white flower symbolizing "everlasting memory"—is a simple, reliable, and scalable Distributed Lock-as-a-Service (LaaS).

Locks (sometimes referred to as a Mutex or a Semaphore) empowers developers to maintain consistency across distributed systems effortlessly by offering tools to acquire, extend, and release locks on shared resources.

Evermind simplifies complex coordination challenges, enabling robust, fault-tolerant applications that ensure atomic operations on resources across distributed systems.

---

## 2. Evermind Lock

Evermind eliminates the complexities of building and managing distributed locking mechanisms. Our service provides:

### 2.1. Features
- 🔄 **Configurable Lock Acquisitions:** Fine-tune lock behavior with options for lease duration, retries, and delay intervals.
- ⏱️ **Automatic Expirations and Releases:** Prevent deadlocks and resource starvation.
- ➕ **Lock Extensions:** Extend a lock without releasing it.
- ☁️ **HTTP API & TypeScript SDK:** Flexible integrations with multiple environments that is serverless ready.
- 🤝 **Soft Fail Option:** Handle errors gracefully with inline responses.

### 2.2. Future Features
- 📜 **FIFO Locks:** First In, First Out locks, allowing you to ensure that acquisition order is honoured.
- 🛠️ **Lock Acquisition Optimization:** Tools to help you optimize your lock durations and retry delays to reduce Lock Acquisition Attempts (See [Pricing](#pricing) below)

### 2.3. Pricing

Evermind is billed based on how much usage (i.e. how many locks you will be acquiring), based on Lock Acquisition Attempts (LAAs).

A Lock Acquisition Attempt (LAA) is where a call to the Evermind Lock API attempts to acquire a lock on a resource, if that resource can be acquired on the first attempt and then a subsequent call to the Evermind API releases it, that is 1 LAA.

If that resource is unable to be acquired on the first attempt and must retry `N` times then the total number of LAAs used would be `M`, where `M` is `1 + the number of retires`.

Lock Acquisition Attempts approximately measure usage in the system, although notably Lock Releases and Lock extensions are not billed and do not count towards your Licence Key usage.

Check our the pricing plans and subscribe via our [storefront](https://polar.sh/evermind/).

#### 2.3.1. Pay as you go Pricing
In the future Evermind will offer Pay as you go pricing, currently you must sign up for a subscription.

#### 2.3.2. Enterprise Pricing
Need unlimited LAAs or a higher level of support/isolation? Reach out to <a href="mailto:hello@evermind.sh">hello@evermind.sh</a>!

---

## 3. Setup: Acquiring an API Key

To interact with Evermind's lock API, you first need to exchange your Polar.sh license key for an API key. Licence Keys can be purchased from our [Polar.sh](https://polar.sh/evermind/) storefront.

1. Visit the store: [Polar.sh](https://polar.sh/evermind/)
2. Subscribe to a plan, each plan comes with 1x Licence Key as a Benefit that can be exchanged for 1 or more API Keys
3. Go to your benefits for your subscription and use the Licence Key to create an API key (below)

Licence Keys are automatically managed by Polar and will expire and have their usage allocations tracked within the Polar system, but you manage your own API Keys.

There is a 1:M relationship between Licence Keys and API Keys, all API Keys created for a Licence Key will contribute to that Licence Keys usage allocation.

### 3.1. Using the CLI

Install the CLI globally:

```bash
npm install -g evermind
```

Or, run the command using `npx`, `bunx`, etc.

**Create an API key:**

```bash
npx evermind keys create --licenceKey <licence-key>
```

Or let the Evermind CLI read the licence key from the `EVERMIND_LICENCE_KEY` environment variable:

```bash
export EVERMIND_LICENCE_KEY=YOUR_POLAR_SH_LICENCE_KEY

npx evermind keys create
```

**Delete an API key:**

```bash
npx evermind keys delete YOUR_API_KEY --licenceKey YOUR_POLAR_SH_LICENCE_KEY
```

Or use an environment variable:

```bash
export EVERMIND_LICENCE_KEY=YOUR_POLAR_SH_LICENCE_KEY

npx evermind keys delete YOUR_API_KEY
```

---

### 3.2. Direct HTTP API Calls

#### 3.2.1 Create API Key

- **Endpoint:** `https://api.evermind.sh/api-key`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "licenceKey": "YOUR_POLAR_SH_LICENCE_KEY"
  }
  ```
- **Response:**
  ```json
  {
    "apiKey": "YOUR_API_KEY"
  }
  ```

**cURL Example:**

```bash
curl -X POST https://api.evermind.sh/api-key \
-H "Content-Type: application/json" \
-d '{
  "licenceKey": "YOUR_POLAR_SH_LICENCE_KEY"
}'
```

---

#### 3.2.2. Delete API Key

- **Endpoint:** `https://api.evermind.sh/api-key`
- **Method:** `DELETE`
- **Body:**
  ```json
  {
    "licenceKey": "YOUR_POLAR_SH_LICENCE_KEY",
    "apiKey": "YOUR_API_KEY"
  }
  ```
- **Response:**
  204 No Content (if successful)

**cURL Example:**

```bash
curl -X DELETE https://api.evermind.sh/api-key \
-H "Content-Type: application/json" \
-d '{
  "licenceKey": "YOUR_POLAR_SH_LICENCE_KEY",
  "apiKey": "YOUR_API_KEY"
}'
```

---

## 4. Using Evermind

Once you have an API key, you can interact with the lock service to acquire, extend, and release locks. The following sections describe how to use the system directly via HTTP methods and with the TypeScript SDK.

### 4.1. TypeScript SDK Usage

Install the SDK:

npm
```bash
npm install @evermind/sdk
```

**Example Usage:**

```typescript
import { Evermind } from 'evermind';

const evermind = new Evermind({ apiKey: 'YOUR_API_KEY' });

const key = 'my_resource';

// Acquire a lock directly
const acquireResponse = await evermind.acquire({ key, lease: 5000 });
console.log('Acquire:', acquireResponse);

// Extend a lock that has been acquired
if (acquireResponse.acquired) {
	const extendResponse = await evermind.extend({ key, uuid: acquireResponse.config.uuid, extendBy: 2000 });
	console.log('Extend:', extendResponse);

	// Release the lock
	const releaseResponse = await evermind.release({ key, uuid: acquireResponse.config.uuid, softFail: true });
	console.log('Release:', releaseResponse);
}

// Using `withLock` to simplify lock management, will automatically release the lock once the routine is finished.
const result = await evermind.withLock({ key }, async () => {
	// Do some work while holding the lock
	return 'some result';
});
```

---

### 4.2. HTTP API Examples

#### 4.2.1. Acquire Lock

- **Endpoint:** `https://lock.evermind.sh/lock/acquire`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "key": "<your resource key>",
    "lease": 5000,
    "retryAttempts": 5,
    "retryDelay": 500
  }
  ```
- **Response:**
  ```json
  {
    "acquired": true,
    "lockAcquisitionAttempts": 1,
    "config": {
      "key": "<your resource key>",
      "lease": 5000,
      "retryAttempts": 5,
      "retryDelay": 500,
      "uuid": "<UUIDv7>"
    },
    "message": null
  }
  ```

**cURL Example:**

```bash
curl -X POST https://lock.evermind.sh/lock/acquire \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{
  "key": "<your resource key>",
  "lease": 5000,
  "retryAttempts": 5,
  "retryDelay": 500
}'
```

---

#### 4.2.2. Extend Lock

- **Endpoint:** `https://lock.evermind.sh/lock/extend`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "key": "<your resource key>",
    "uuid": "<UUIDv7>",
    "extendBy": 3000,
    "softFail": true
  }
  ```
- **Response:**
  ```json
  {
    "extended": true,
    "message": null
  }
  ```

**cURL Example:**

```bash
curl -X POST https://lock.evermind.sh/lock/extend \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{
  "key": "<your resource key>",
  "extendBy": 3000,
  "uuid": "<UUIDv7>"
}'
```

---

#### 4.2.3. Release Lock

- **Endpoint:** `https://lock.evermind.sh/lock/release`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "key": "<your resource key>",
    "uuid": "<UUIDv7>",
    "softFail": true
  }
  ```
- **Response:**
  ```json
  {
    "released": true,
    "message": null
  }
  ```

**cURL Example:**

```bash
curl -X POST https://lock.evermind.sh/lock/release \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{
  "key": "<your resource key>",
  "uuid": "<UUIDv7>"
}'
```

---

Here’s the expanded **DTOs** section with endpoint details, Evermind SDK method names, descriptions, caveats, and additional explanations.

---

## 5. Lock API

### 5.1. Lock Operations

The Lock API is used for acquiring, extending, and releasing locks. Below are the DTOs for each operation, along with their corresponding HTTP endpoints and Evermind SDK method names.

The resulting Resource Key (the globally unique key to acquire the lock on) is in the following format.

```md
<GlobalPrefix>:<IdentityId>:<Key>
```

1. `GlobalPrefix`: Will always be `Evermind` unless you have your own deployment or isolated environment of the Evermind system. This key will be the same across all locks in the system.
2. `IdentityId`: A unique ID that corresponds to the account that the API key belongs to, if purchased via the Polar.sh storefront this will be your `userId`.
3. `Key`: The key you pass in for the resource, this can be anything you want it to be.

The only parts you have control over are the `Key`, the other parts of the lock key are managed by the system itself and are there to prevent locks from clashing across users of Evermind.

#### 5.1.1. Acquire Lock

| **Field**       | **Type**    | **Required** | **Description**                                                                                                                                                                             |
|-----------------|-------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `key`           | `string`    | Yes          | The resource to acquire a lock on.                                                                                                                                                          |
| `lease`         | `number`    | No           | Lock duration in milliseconds. Default: `10000`.                                                                                                                                            |
| `retryAttempts` | `number`    | No           | Number of retry attempts. Default: `10`.                                                                                                                                                    |
| `retryDelay`    | `number`    | No           | Milliseconds between retries. Default: `500`.                                                                                                                                               |
| `retryJitter`   | `number`    | No           | An amount of time in milliseconds to randomly add to the retry delay to help in times of high lock contention. See: https://www.awsarchitectureblog.com/2015/03/backoff.html. Default: `0`. |
| `uuid`          | `string`    | No           | Optional custom UUID for the lock. If not provided a UUIDv7 is used by default. It is recommended you use the default.                                                                      |
| `softFail`      | `boolean`   | No           | Return errors inline in an HTTP 200 instead of throwing errors.                                                                                                                             |
| `fifo`          | `boolean`   | No           | Whether this lock should be acquired in FIFO or FCFS order.                                                                                                                                 |

- **Endpoint:** `POST https://lock.evermind.sh/lock/acquire`
- **SDK Method:** `evermind.acquire(options: AcquireOptions)`

**Description:**
Acquires a lock on a given resource (`key`). By default, if the lock cannot be acquired immediately, the system will retry the specified number of times (`retryAttempts`) with the provided delay (`retryDelay`).

**Caveats:**
- Locks are tied to a unique `uuid`. If a custom UUID is not provided, the system generates one.
- Using `softFail: true` ensures errors are returned inline instead of throwing exceptions. This can simplify error handling in some scenarios.
- When multiple processes are trying to acquire a lock on the same resource key ensure you are using the right `fifo` value otherwise locks may get into an unrecoverable state since some will be trying to acquire in FIFO order and some in FCFS order.

---

#### 5.1.2. Extend Lock

| **Field**       | **Type**    | **Required** | **Description**                                                 |
|------------------|-------------|--------------|-----------------------------------------------------------------|
| `key`           | `string`    | Yes          | The resource key to extend the lock on.                         |
| `uuid`          | `string`    | Yes          | UUID (or custom value) of the lock acquisition to extend.       |
| `extendBy`      | `number`    | Yes          | Milliseconds to extend the lock.                                |
| `softFail`      | `boolean`   | No           | Return errors inline in an HTTP 200 instead of throwing errors. |

- **Endpoint:** `POST https://lock.evermind.sh/lock/extend`
- **SDK Method:** `evermind.extend(options: ExtendOptions)`

**Description:**
Extends the duration of an existing lock. The `uuid` must match the UUID of the currently held lock, and the `extendBy` value specifies how much additional time (in milliseconds) to add to the lock duration.

**Caveats:**
- Attempting to extend a non-existent or expired lock will fail unless `softFail` is set to `true`.
- The extension is relative to the current lock's expiration time and not to the time of the request.

---

#### 5.1.3. Release Lock

| **Field**       | **Type**    | **Required** | **Description**                                                 |
|------------------|-------------|--------------|-----------------------------------------------------------------|
| `key`           | `string`    | Yes          | The resource key to release the lock on.                        |
| `uuid`          | `string`    | Yes          | UUID (or custom value) of the lock acquisition to release.      |
| `softFail`      | `boolean`   | No           | Return errors inline in an HTTP 200 instead of throwing errors. |

- **Endpoint:** `POST https://lock.evermind.sh/lock/release`
- **SDK Method:** `evermind.release(options: ReleaseOptions)`

**Description:**
Releases a lock on a resource. The `uuid` must match the UUID used to acquire the lock. If the lock is already released or does not exist, the response will indicate this unless `softFail` is set to `true`.

**Caveats:**
- Ensure that the `uuid` provided matches the one used during acquisition; otherwise, the release will fail.
- Using `softFail: true` can help avoid exceptions when the lock does not exist or has already been released.

---

### 5.2. Summary of SDK Methods and HTTP Endpoints

| **Operation** | **HTTP Endpoint**                        | **SDK Method**              | **Description**                                                              |
|---------------|------------------------------------------|-----------------------------|------------------------------------------------------------------------------|
| Acquire Lock  | `POST /lock/acquire`                     | `evermind.acquire`          | Attempts to acquire a lock on the given resource.                           |
| Extend Lock   | `POST /lock/extend`                      | `evermind.extend`           | Extends the duration of a held lock.                                        |
| Release Lock  | `POST /lock/release`                     | `evermind.release`          | Releases the lock on the specified resource.                                |

---

### 5.3. Additional Notes

- **Error Handling:** By default, errors are returned as HTTP status codes. Setting `softFail: true` in any request results in errors being returned inline within a `200 OK` response.
- **UUID Management:** For optimal operation, UUIDs are used as a lock value to uniquely identify a lock acquisition. If you generate lock values manually, ensure they are truly unique to prevent collisions.
- **Retry Logic:** Retry attempts and delays are configurable for acquisitions. This is particularly useful in scenarios with high contention for a resource.

---

## 6. Discussion & Alternatives

Evermind offers a managed DLaaS solution. However, various alternatives exist for concurrency control. Here's a comparison to help you choose the right tool:

### 6.1. Distributed Locks vs. Local Mutexes

- **Local Mutexes:** Efficient for single-process applications. Libraries like `sync.Mutex` (Go), `asyncio.Lock` (Python), and `@synchronized` (Objective-C/Swift) operate within a single process's memory.
- **Distributed Locks:** Necessary for coordinating shared resources across multiple processes or machines. This is where Evermind excels.

### 6.2. Alternatives to Evermind

- **Redlock Algorithm (e.g., npm package `redlock`):** Fault-tolerant distributed locking using multiple Redis instances. However, managing Redis infrastructure introduces additional complexity.
- **Database-based Locking:** Simple to implement but may cause performance bottlenecks in high-contention scenarios.
- **Distributed Consensus Systems (e.g., etcd, ZooKeeper):** Offer robust locking with higher operational overhead.

### 6.3. When to Use Evermind

- Simplifying distributed locking without managing infrastructure.
- Seamless integration with serverless environments.
- Rapid development with minimal setup.

### 6.4. When Not to Use Evermind

- Single-process applications (use local mutexes instead).
- Applications already using robust Redis infrastructure and comfortable with Redlock.
- Extremely low-latency scenarios that require finely-tuned, in-house solutions.

---

## 7. Regions and Deployment

Evermind.sh is hosted on [Fly.io](https://fly.io) and has servers in the following regions:

1. `yyz` - Toronto, Canada
2. `yul` - Montreal, Canada
3. `sea` - Seattle, Washington (US)

If you are wanting to use Evermind in a region closer to where your servers are going to be, feel free to open a pull request here with your new region request. You can find the available regions [here](https://fly.io/docs/reference/regions/).

You can choose to send your traffic to a specific region using [this](https://fly.io/docs/networking/dynamic-request-routing/#the-fly-prefer-region-request-header) method. Only the regions above are supported.

If you are looking for your own deployment on infrastructure isolated from the rest of the Evermind platform or are wanting to run all services (Lock API, Database and Cache) in the same region as the server, feel free to reach out to <a href="mailto:hello@evermind.sh">hello@evermind.sh</a>.

## 8. Related

1. Evermind SDK - [@evermind-sh/sdk](https://www.npmjs.com/package/@evermind-sh/sdk)
2. Evermind CLI - [evermind](https://www.npmjs.com/package/evermind)
3. [Evermind Bluesky](https://bsky.app/profile/evermind.sh)
4. [Jay Bell Bluesky](https://bsky.app/profile/jaycooperbell.dev)
