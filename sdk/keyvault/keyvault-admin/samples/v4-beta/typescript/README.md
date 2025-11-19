---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-admin-typescript-beta
---

# Azure Key Vault Administration client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Key Vault Administration in some common scenarios.

| **File Name**                                             | **Description**                                                                                                      |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [accessControlHelloWorld.ts][accesscontrolhelloworld]     | Uses an AccessControlClient to list, create, and assign roles to users.                                              |
| [backupRestoreHelloWorld.ts][backuprestorehelloworld]     | Uses a BackupClient to backup and fully restore an Azure Key Vault Managed HSM using Azure Storage Blob.             |
| [backupSelectiveKeyRestore.ts][backupselectivekeyrestore] | Uses a BackupClient to backup and restore a specific key in an Azure Key Vault Managed HSM using Azure Storage Blob. |
| [updateSettings.ts][updatesettings]                       | Demonstrates how to retrieve and update account settings for Managed HSM.                                            |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Key Vault][createinstance_azurekeyvault]

To quickly create the needed Key Vault Managed HSM resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftest-resources.json)

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
node dist/accessControlHelloWorld.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AZURE_MANAGEDHSM_URI="<azure managedhsm uri>" CLIENT_OBJECT_ID="<client object id>" node dist/accessControlHelloWorld.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesscontrolhelloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4-beta/typescript/src/accessControlHelloWorld.ts
[backuprestorehelloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4-beta/typescript/src/backupRestoreHelloWorld.ts
[backupselectivekeyrestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4-beta/typescript/src/backupSelectiveKeyRestore.ts
[updatesettings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-admin/samples/v4-beta/typescript/src/updateSettings.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/keyvault-admin
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://learn.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-admin/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
