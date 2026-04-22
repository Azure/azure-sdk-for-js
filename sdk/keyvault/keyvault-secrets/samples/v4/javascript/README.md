---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-secrets-javascript
---

# Azure Key Vault Secrets client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Key Vault Secrets in some common scenarios.

| **File Name**                           | **Description**                                                                                |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [backupAndRestore.js][backupandrestore] | Backs up an Azure Key Vault secret to a local file and restores from it.                       |
| [deleteAndRecover.js][deleteandrecover] | Deletes a secret and then recovers a deleted secret (this sample requires soft-delete to run). |
| [gettingStarted.js][gettingstarted]     | Authenticates with Azure Key Vault and creates a SecretClient.                                 |
| [helloWorld.js][helloworld]             | Uses a SecretClient to create, read, and update a secret in various ways.                      |
| [listOperations.js][listoperations]     | Uses a SecretClient to iterate over secrets and their versions.                                |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node backupAndRestore.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_URI="<keyvault uri>" node backupAndRestore.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[backupandrestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-secrets/samples/v4/javascript/backupAndRestore.js
[deleteandrecover]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-secrets/samples/v4/javascript/deleteAndRecover.js
[gettingstarted]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-secrets/samples/v4/javascript/gettingStarted.js
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-secrets/samples/v4/javascript/helloWorld.js
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-secrets/samples/v4/javascript/listOperations.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/keyvault-secrets
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://learn.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-secrets/README.md
