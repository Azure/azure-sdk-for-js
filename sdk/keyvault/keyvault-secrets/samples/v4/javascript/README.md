---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-secrets-javascript
---

# Azure Key Vault Keys client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Key Vault Keys in some common scenarios.

| **File Name**                           | **Description**                                                                                |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [backupAndRestore.js][backupandrestore] | Backs up an Azure Key Vault secret to a local file and restores from it.                       |
| [deleteAndRecover.js][deleteandrecover] | Deletes a secret and then recovers a deleted secret (this sample requires soft-delete to run). |
| [helloWorld.js][helloworld]             | Uses a SecretClient to create, read, and update a secret in various ways.                      |
| [listOperations.js][listoperations]     | Uses a SecretClient to iterate over secrets and their versions.                                |
| [purgeAllSecrets.js][purgeallsecrets]   | Purges all deleted secrets from an Azure Key Vault.                                            |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Key Vault][createinstance_azurekeyvault]

To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftest-resources.json)

If creating the Key Vault manually using the Azure Portal, be aware that the samples require that the soft-delete feature be enabled. Our template above will enable this feature automatically, but it is possible to enable it manually using the Azure CLI. See [the documentation for enabling soft-delete in Key Vault](https://docs.microsoft.com/azure/key-vault/key-vault-soft-delete-cli) for more information.

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_URI="<keyvault uri>" node backupAndRestore.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[backupandrestore]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/v4/javascript/backupAndRestore.js
[deleteandrecover]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/v4/javascript/deleteAndRecover.js
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/v4/javascript/helloWorld.js
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/v4/javascript/listOperations.js
[purgeallsecrets]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-secrets/samples/v4/javascript/purgeAllSecrets.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/keyvault-secrets
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-secrets/README.md
