# Multi REST client library for JavaScript

Multi Client Service

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Package (NPM)](https://www.npmjs.com/package/@msinternal/multiclient)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@msinternal/multiclient` package

Install the Multi REST client REST client library for JavaScript with `npm`:

```bash
npm install @msinternal/multiclient
```

### Create and authenticate a `BarClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Troubleshooting

## Examples

The following section shows you how to create a Resource with; 
1. Default High Level Client.
1. Bar High Level Sub Client.
1. Foo High Level Sub Client.
1. Bar Modular Sub Client,
1. Foo Modular Sub Client.
1. Bar Rest Level Sub Client.
1. Foo Rest Level Sub Client.

- [Default High Level Client](./samples-dev/createOrUpdateWithHLCWithDefaultClient.ts)

```typescript
import { FooClient, Resource } from "@msinternal/multiclient";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This is an example to show how to use the Default High Level Client to create a Resource.
 */
async function main() {
  const client = new FooClient("<endpoint>");
  const resource: Resource = await client.createOrUpdate("", "");
  console.log(resource);
}

main().catch(console.error);
```

- [Bar High Level Sub Client](./samples-dev/createOrUpdateWithHLCWithBarSubClient.ts)

```typescript
import { BarClient, Resource } from "@msinternal/multiclient/bar";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This is an example to show how to use Bar High Level Sub Client to create a Resource
 */
async function main() {
  const client = new BarClient("<endpoint>");
  const resource: Resource = await client.createWithHeaders();
  console.log(resource);
}

main().catch(console.error);
```

- [Foo High Level Sub Client](./samples-dev/createOrUpdateWithHLCWithFooSubClient.ts)

```typescript
import { FooClient, Resource } from "@msinternal/multiclient/foo";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This is an example to show how to use Foo High Level Sub Client to create a Resource.
 */
async function main() {
  const client = new FooClient("<endpoint>");
  const resource: Resource = await client.createOrUpdate("", "");
  console.log(resource);
}

main().catch(console.error);
```

- [Foo Modular Sub Client](./samples-dev/createOrUpdateWithModularFooSubClient.ts)

```typescript
import { Resource, createFoo, createOrUpdate } from "@msinternal/multiclient/foo/api";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This an example to show how to use Foo Modular Sub Client to create a Resource.
 */
async function main() {
  const context = createFoo("<endpoint>");
  const resource: Resource = await createOrUpdate(context, "", "");
  console.log(resource);
}

main().catch(console.error);
```

- [Bar Modular Sub Client](./samples-dev/createOrUpdateWithModularBarSubClient.ts)

```typescript
import { Resource, createBar, createWithHeaders } from "@msinternal/multiclient/bar/api";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This an example to show how to use Bar Modular Sub Client to create a Resource.
 */
async function main() {
  const context = createBar("<endpoint>");
  const resource: Resource = await createWithHeaders(context);
  console.log(resource);
}
```

- [Foo Rest Level Sub Client](./samples-dev/createOrUpdateWithRestWithFooSubClient.ts)

```typescript
import createMyMulticlient, { isUnexpected } from "@msinternal/multiclient/foo/rest";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This an example to show how to use Foo Rest Level Sub Client to create a Resource.
 */
async function main() {
  const client = createMyMulticlient("<endpoint>");
  const result = await client.path("/cadl-foo/resources/{name}", "").put({body: {
    type: ""
  }})
  if (!isUnexpected(result)) {
    throw result.body;
  }
  console.log(result.body);
}

main().catch(console.error);
```

- [Bar Rest Level Sub Client](./samples-dev/createOrUpdateWithRestWithBarSubClient.ts)

```typescript
import createMyMulticlient from "@msinternal/multiclient/bar/rest";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This an example to show how to use Bar Rest Level Sub Client to create a Resource.
 */
async function main() {
  const client = createMyMulticlient("<endpoint>");
  const result = await client.path("/cadl-bar/create-with-headers").put();
  console.log(result.body);
}

main().catch(console.error);
```
### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
