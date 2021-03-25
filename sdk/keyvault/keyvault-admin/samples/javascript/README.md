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

These sample programs show how to use the JavaScript client libraries for Azure Key Vault Keys in some common scenarios.

| **File Name**                                                | **Description**                                                                                                |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| [accessControlHelloWorld.js][accesscontrolhelloworld] (RBAC) | Lists all Role Definitions and Role Assignments, Creates a Role Assignment, then gets it and later deletes it. |
| [backupRestoreHelloWorld.js][backuprestorehelloworld]        | Performs a full key backup, then a full key restore.                                                           |
| [backupSelectiveRestore.js][backupselectiverestore]          | Performs a selective key backup, then a selective key restore.                                                 |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Key Vault][azkeyvault] to run these sample programs. To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftest-resources.json)

If creating the Key Vault manually using the Azure Portal, be aware that the samples require that the soft-delete feature be enabled. Our template above will enable this feature automatically, but it is possible to enable it manually using the Azure CLI. See [this page][kvsoftdelete] for more information.

Samples retrieve credentials to access the Key Vault from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

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
node backupRestoreHelloWorld.js
```

Alternatively, run a single sample with the correct environment variables set (step 2 is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_URI="<key vault uri>" AZURE_TENANT_ID="<AAD tenant id>" AZURE_CLIENT_ID="<AAD client id>" AZURE_CLIENT_SECRET="<AAD client secret>" BLOB_STORAGE_URI="<blob-storage-uri>" BLOB_STORAGE_SAS_TOKEN="<blob-storage-sas-token>" CLIENT_OBJECT_ID="<client-object-id>" node backupRestoreHelloWorld.js
```

These samples add and remove roles to and from the application, tenant or principal specified by the `CLIENT_OBJECT_ID` environment variable. **Do not use the same Object Id of the application, tenant or principal you're using to authenticate the client.**

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesscontrolhelloworld]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-admin/samples/javascript/accessControlHelloWorld.js
[backuprestorehelloworld]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-admin/samples/javascript/backupRestoreHelloWorld.js
[backupselectiverestore]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-admin/samples/javascript/backupSelectiveRestore.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/keyvault-admin
[azkeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[kvsoftdelete]: https://docs.microsoft.com/azure/key-vault/key-vault-soft-delete-cli
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-admin/README.md
