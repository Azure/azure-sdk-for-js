---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-certificates-javascript
---

# Azure Key Vault Certificates client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Key Vault Certificates in some common scenarios.

| **File Name**                                   | **Description**                                                                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [backupAndRestore.js][backupandrestore]         | Demonstrates creating a self-signed certificate, creating a backup from it, and restoring it.                                              |
| [contacts.js][contacts]                         | Demonstrates creating, updating, and deleting certificate contacts.                                                                        |
| [deleteAndRecover.js][deleteandrecover]         | Demonstrates deleting and recovering a self-signed certificate (soft-delete is required for this sample to run).                           |
| [helloWorld.js][helloworld]                     | Demonstrates various ways to read a certificate as well as updating a certificate's tags.                                                  |
| [importCertificate.js][importcertificate]       | Demonstrates importing a PFX and PEM certificate.                                                                                          |
| [issuers.js][issuers]                           | Demonstrates creating, updating, and deleting certificate issuers.                                                                         |
| [listCertificates.js][listcertificates]         | Demonstrates various ways to list certificates, list a certificate's versions, and list deleted certificates.                              |
| [mergeCertificate.js][mergecertificate]         | Demonstrates creating a certificate with an unknown issuer and signing it using a fake certificate authority and the mergeCertificate API. |
| [operations.js][operations]                     | Demonstrates creating, updating, and deleting a certificate's operation.                                                                   |
| [purgeAllCertificates.js][purgeallcertificates] | Demonstrates purging all deleted certificates from a Key Vault.                                                                            |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Key Vault][createinstance_azurekeyvault]

To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftest-resources.json)

If creating the Key Vault manually using the Azure Portal, be aware that the samples require that the soft-delete feature be enabled. Our template above will enable this feature automatically, but it is possible to enable it manually using the Azure CLI. See [this page](https://docs.microsoft.com/azure/key-vault/key-vault-soft-delete-cli) for more information.

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

[backupandrestore]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/backupAndRestore.js
[contacts]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/contacts.js
[deleteandrecover]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/deleteAndRecover.js
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/helloWorld.js
[importcertificate]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/importCertificate.js
[issuers]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/issuers.js
[listcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/listCertificates.js
[mergecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/mergeCertificate.js
[operations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/operations.js
[purgeallcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/v4/javascript/purgeAllCertificates.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/keyvault-certificates
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/keyvault/keyvault-certificates/README.md
