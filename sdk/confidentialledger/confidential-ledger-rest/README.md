# Azure Confidential Ledger REST client library for JavaScript

Azure Confidential Ledger provides a service for logging to an immutable, tamper-proof ledger. As part of the [Azure Confidential Computing][azure_confidential_computing]
portfolio, Azure Confidential Ledger runs in SGX enclaves. It is built on Microsoft Research's [Confidential Consortium Framework][ccf].

**Please rely heavily on the [service's documentation][scanning_product_documentation] and our [Rest client docs][rest_client] to use this library**

[Source code][source_code] | [Package (NPM)][confidentialledger_npm] | [API reference documentation][ref_docs]| [Product documentation][confidential_ledger_docs]

## Getting started

### Currently supported environments

- Node.js version 13.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- A running instance of Azure Confidential Ledger.
- A registered user in the Confidential Ledger, typically assigned during [ARM][azure_resource_manager] resource creation, with `Administrator` privileges.

### Install the `@azure-rest/confidential-ledger` package

Install the Azure Condifential Ledger REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/confidential-ledger
```

### Authenticate the client

#### Using Azure Active Directory

This document demonstrates using [DefaultAzureCredential][default_azure_credential] to authenticate to the Confidential Ledger via Azure Active Directory. However, `ConfidentialLedger` accepts any [@azure/identity][azure_identity_credentials] credential.

#### Using a client certificate

As an alternative to Azure Active Directory, clients may choose to use a client certificate to authenticate via mutual TLS. `CertificateCredential` may be used for this purpose.

### Create a client

`DefaultAzureCredential` will automatically handle most Azure SDK client scenarios. To get started, set environment variables for the AAD identity registered with your Confidential Ledger.

```bash
export AZURE_CLIENT_ID="generated app id"
export AZURE_CLIENT_SECRET="random password"
export AZURE_TENANT_ID="tenant id"
```

Then, `DefaultAzureCredential` will be able to authenticate the `ConfidentialLedger` client.

Creating the client also requires your Confidential Ledger's URL and id, which you can get from the Azure CLI or the Azure Portal. When you have retrieved those values, please replace instances of `"my-ledger-id"` and `"https://my-ledger-url.confidential-ledger.azure.com"` in the examples below

Because Confidential Ledgers use self-signed certificates securely generated and stored in an enclave, the signing certificate for each Confidential Ledger must first be retrieved from the Confidential Ledger Identity Service.

```typescript
import ConfidentialLedger, { getLedgerIdentity } from "@azure-rest/confidential-ledger";
import { DefaultAzureCredential } from "@azure/identity";

// Get the signing certificate from the Confidential Ledger Identity Service
const ledgerIdentity = await getLedgerIdentity("<my-ledger-id>");

// Create the Confidential Ledger Client
const confidentialLedger = ConfidentialLedger(
  "https://sdk-test-ledger-prod.eastus.cloudapp.azure.com",
  ledgerIdentity.ledgerTlsCertificate,
  new DefaultAzureCredential()
);
```

## Key concepts

### Ledger entries and transactions

Every write to Azure Confidential Ledger generates an immutable ledger entry in the service. Writes, also referred to as transactions, are uniquely identified by transaction ids that increment with each write. Once written, ledger entries may be retrieved at any time.

### Receipts

State changes to the Confidential Ledger are saved in a data structure called a Merkle tree. To cryptographically verify that writes were correctly saved, a Merkle proof, or receipt, can be retrieved for any transaction id.

### Sub-ledgers

While most use cases will involve one ledger, we provide the sub-ledger feature in case semantically or logically different groups of data need to be stored in the same Confidential Ledger.

Ledger entries are retrieved by their sub-ledger identifier. The Confidential Ledger will always assume a constant, service-determined sub-ledger id for entries submitted without a sub-ledger specified.

### Users

Users are managed directly with the Confidential Ledger instead of through Azure. Users may be AAD-based, identified by their AAD object id, or certificate-based, identified by their PEM certificate fingerprint.

### Confidential computing

[Azure Confidential Computing][azure_confidential_computing] allows you to isolate and protect your data while it is being processed in the cloud. Azure Confidential Ledger runs on Azure Confidential Computing virtual machines, thus providing stronger data protection with encryption of data in use.

### Confidential Consortium Framework

Azure Confidential Ledger is built on Microsoft Research's open-source [Confidential Consortium Framework (CCF)][ccf]. Under CCF, applications are managed by a consortium of members with the ability to submit proposals to modify and govern application operation. In Azure Confidential Ledger, Microsoft Azure owns a member identity, allowing it to perform governance actions like replacing unhealthy nodes in the Confidential Ledger, or upgrading the enclave code.

## Examples

This section contains code snippets for the following samples:

- [Using certificate authentication](#using-certificate-authentication "Using certificate authentication")
- [List Enclave Quotes](#list-enclave-quotes "List Enclave Quotes")

### Using certificate authentication

Clients may authenticate with a client certificate in mutual TLS instead of via an Azure Active Directory token. For this kind of authentication, the client needs to be passed a `CertificateCredential` which is composed of a crertificate and private key, both in PEM format.

```typescript
import ConfidentialLedger, { getLedgerIdentity } from "@azure-rest/confidential-ledger";
// Get the signing certificate from the Confidential Ledger Identity Service
const ledgerIdentity = await getLedgerIdentity("<my-ledger-id>");

// Create the Confidential Ledger Client
const confidentialLedger = ConfidentialLedger(
  "https://sdk-test-ledger-prod.eastus.cloudapp.azure.com",
  ledgerIdentity.ledgerTlsCertificate,
  { cert: "<CERTIFICATE_KEY_PEM_FORMAT>", certKey: "<PRIVATE_KEY_PEM_FORMAT>" }
);
```

### List Enclave Quotes

```typescript
import ConfidentialLedger, { getLedgerIdentity } from "@azure-rest/confidential-ledger";
import { DefaultAzureCredential } from "@azure/identity";

export async function main() {
  console.log("== List Enclave Quotes ==");

  // Get the signing certificate from the Confidential Ledger Identity Service
  const ledgerIdentity = await getLedgerIdentity("<my-ledger-id>");

  // Create the Confidential Ledger Client
  const confidentialLedger = ConfidentialLedger(
    "https://sdk-test-ledger-prod.eastus.cloudapp.azure.com",
    ledgerIdentity.ledgerTlsCertificate,
    new DefaultAzureCredential()
  );

  // Get enclave quotes
  const enclaveQuotes = await confidentialLedger.path("/app/enclaveQuotes").get();

  // Check for non-success response
  if (enclaveQuotes.status !== "200") {
    throw enclaveQuotes.body.error;
  }

  // Log all the enclave quotes' nodeId
  Object.keys(enclaveQuotes.body.enclaveQuotes).forEach((key) => {
    console.log(enclaveQuotes.body.enclaveQuotes[key].nodeId);
  });
}

main().catch((err) => {
  console.error(err);
});
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/confidentialledger/confidential-ledger-rest/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fconfidentialledger%2Fconfidential-ledger-rest%2FREADME.png)

<!-- LINKS -->

[ccf]: https://github.com/Microsoft/CCF
[azure_confidential_computing]: https://azure.microsoft.com/solutions/confidential-compute
[confidential_ledger_docs]: https://aka.ms/confidentialledger-servicedocs
[rest_client]: https://github.com/joheredi/azure-sdk-for-js/wiki/Rest-Level-Client
[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/confidentialledger/confidential-ledger-rest
[confidentialledger_npm]: https://www.npmjs.com/package/@azure-rest/confidential-ledger
[ref_docs]: https://azure.github.io/azure-sdk-for-js
[azure_sub]: https://azure.microsoft.com/free/
[azure_identity_credentials]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#credentials
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[azure_resource_manager]: https://docs.microsoft.com/azure/azure-resource-manager/management/overview
