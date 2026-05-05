---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-certificates-typescript
---

# Azure Key Vault Certificates client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Key Vault Certificates in some common scenarios.

| **File Name**                                       | **Description**                                                                                                            |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [node/backupAndRestore.ts][node_backupandrestore]   | Creates a self-signed certificate, then makes a backup from it, then deletes it and purges it, and finally restores it.    |
| [node/contacts.ts][node_contacts]                   | Creates, updates, and deletes certificate contacts.                                                                        |
| [node/deleteAndRecover.ts][node_deleteandrecover]   | Creates a self-signed certificate, deletes it, and then recovers it (soft-delete is required for this sample to run).      |
| [node/gettingStarted.ts][node_gettingstarted]       | Authenticates with Azure Key Vault and creates a CertificateClient.                                                        |
| [node/helloWorld.ts][node_helloworld]               | Uses a CertificateClient in various ways to read a certificate as well as update a certificate's tags.                     |
| [node/importCertificate.ts][node_importcertificate] | Imports a PFX and PEM certificate and then deletes them.                                                                   |
| [node/issuers.ts][node_issuers]                     | Creates, updates and deletes certificate issuers.                                                                          |
| [node/listCertificates.ts][node_listcertificates]   | List certificates, lists a certificate's versions, and lists deleted certificates in various ways.                         |
| [node/mergeCertificate.ts][node_mergecertificate]   | Creates a certificate with an unknown issuer and signs it using a fake certificate authority and the mergeCertificate API. |
| [node/operations.ts][node_operations]               | Uses a CertificateClient to create, update, and delete a certificate's operation.                                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Key Vault][createinstance_azurekeyvault]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/node/backupAndRestore.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_URI="<keyvault uri>" node dist/node/backupAndRestore.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[node_backupandrestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/backupAndRestore.ts
[node_contacts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/contacts.ts
[node_deleteandrecover]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/deleteAndRecover.ts
[node_gettingstarted]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/gettingStarted.ts
[node_helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/helloWorld.ts
[node_importcertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/importCertificate.ts
[node_issuers]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/issuers.ts
[node_listcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/listCertificates.ts
[node_mergecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/mergeCertificate.ts
[node_operations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-certificates/samples/v4/typescript/src/node/operations.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/keyvault-certificates
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://learn.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-certificates/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
