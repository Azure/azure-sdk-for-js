# Azure ConfidentialLedger REST client library for JavaScript

Write and retrieve ledger entries against the Confidential Ledger service.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confidentialledger/confidential-ledger-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/confidential-ledger)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/confidential-ledger)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/confidential-ledger` package

Install the Azure ConfidentialLedger REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/confidential-ledger
```

### Create and authenticate a `ConfidentialLedgerClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.


## Key Concepts

### Confidential Ledger

Azure Confidential Ledger provides a tamper-proof, cryptographically verifiable data store. It runs on hardware-backed secure enclaves, ensuring data integrity.

### Client

The ConfidentialLedger client is a REST client that provides access to the Confidential Ledger API. It supports Azure Active Directory authentication and TLS certificate verification.

## Examples

### Create a client

```ts snippet:ReadmeSampleCreateClient_Node
import ConfidentialLedger, { getLedgerIdentity } from "@azure-rest/confidential-ledger";
import { DefaultAzureCredential } from "@azure/identity";

const { ledgerIdentityCertificate } = await getLedgerIdentity(
  "test-ledger-name",
  "https://identity.confidential-ledger.core.azure.com",
);
const credential = new DefaultAzureCredential();

const client = ConfidentialLedger(
  "https://test-ledger-name.confidential-ledger.azure.com",
  ledgerIdentityCertificate,
  credential,
);
```

### Create a ledger entry

```ts snippet:ReadmeSamplePostLedgerEntry
import ConfidentialLedger, {
  getLedgerIdentity,
  LedgerEntry,
  CreateLedgerEntryParameters,
} from "@azure-rest/confidential-ledger";
import { DefaultAzureCredential } from "@azure/identity";

const { ledgerIdentityCertificate } = await getLedgerIdentity(
  "test-ledger-name",
  "https://identity.confidential-ledger.core.azure.com",
);
const credential = new DefaultAzureCredential();

const client = ConfidentialLedger(
  "https://test-ledger-name.confidential-ledger.azure.com",
  ledgerIdentityCertificate,
  credential,
);

const entry: LedgerEntry = {
  contents: "<content>",
};
const ledgerEntry: CreateLedgerEntryParameters = {
  contentType: "application/json",
  body: entry,
};
const result = await client.path("/app/transactions").post(ledgerEntry);
```

### Get a ledger entry

```ts snippet:ReadmeSampleGetLedgerEntry
import ConfidentialLedger, { getLedgerIdentity } from "@azure-rest/confidential-ledger";
import { DefaultAzureCredential } from "@azure/identity";

const { ledgerIdentityCertificate } = await getLedgerIdentity(
  "test-ledger-name",
  "https://identity.confidential-ledger.core.azure.com",
);
const credential = new DefaultAzureCredential();

const client = ConfidentialLedger(
  "https://test-ledger-name.confidential-ledger.azure.com",
  ledgerIdentityCertificate,
  credential,
);

const transactionId = "<TRANSACTION_ID>";
const status = await client.path("/app/transactions/{transactionId}/status", transactionId).get();
```
## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
