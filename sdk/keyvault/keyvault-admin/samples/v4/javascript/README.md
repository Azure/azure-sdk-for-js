---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-admin-javascript
---

# Azure Key Vault Administration client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Key Vault Administration in some common scenarios.

| **File Name**                                             | **Description**                                                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [accessControlHelloWorld.js][accesscontrolhelloworld]     | Uses an AccessControlClient to list, create, and assign roles to users.                               |
| [backupRestoreHelloWorld.js][backuprestorehelloworld]     | Uses a BackupClient to backup and fully restore an Azure Key Vault using Azure Storage Blob.          |
| [backupSelectiveKeyRestore.js][backupselectivekeyrestore] | Uses a BackupClient to backup and restore a specific key in Azure Key Vault using Azure Storage Blob. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node accessControlHelloWorld.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AZURE_MANAGEDHSM_URI="<azure managedhsm uri>" CLIENT_OBJECT_ID="<client object id>" node accessControlHelloWorld.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesscontrolhelloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4/javascript/accessControlHelloWorld.js
[backuprestorehelloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4/javascript/backupRestoreHelloWorld.js
[backupselectivekeyrestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4/javascript/backupSelectiveKeyRestore.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/keyvault-admin
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/README.md
