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

| **File Name**                                  | **Description**                                                                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [backupAndRestore.js][backupandrestore]         | creates a self-signed certificate, then makes a backup from it, then deletes it and purges it, and finally restores it                                                                                 |
| [contacts.js][contacts]                         | creates, updates and deletes certificate contacts                                                                                                                                                      |
| [deleteAndRecover.js][deleteandrecover]         | creates a self-signed certificate, then deletes it, then recovers it (soft-delete is required for this sample to run, see: https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete) |
| [helloWorld.js][helloworld]                     | creates a self-signed certificate, reads it in various ways, updates the tags of the certificate and finally deletes the certificate                                                                   |
| [issuers.js][issuers]                           | creates, updates and deletes certificate issuers                                                                                                                                                       |
| [listCertificates.js][listcertificates]         | lists previously created certificates in a single chunk and by page, then changes one of them and lists all the versions of that certificate, then deletes them and lists the deleted certificates.    |
| [mergeCertificate.js][mergecertificate]         | creates a certificate with an Unknown issuer, then signs this certificate using a fake certificate authority and the mergeCertificate API method                                                       |
| [operations.js][operations]                     | creates, updates and deletes a certificate's operation                                                                                                                                                 |
| [purgeAllCertificates.js][purgeAllCertificates] | purges all the certificates of a Key Vault (useful for repeated tests)                                                                                                                                  |

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
node helloWorld.js
```

Alternatively, run a single sample with the correct environment variables set (step 2 is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_NAME="<key vault name>" AZURE_TENANT_ID="<AAD tenant id>" AZURE_CLIENT_ID="<AAD client id>" AZURE_CLIENT_SECRET="<AAD client secret>" node helloWorld.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[backupandrestore]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/backupAndRestore.js
[contacts]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/contacts.js
[deleteandrecover]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/deleteAndRecover.js
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/helloWorld.js
[issuers]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/issuers.js
[listcertificates]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/listCertificates.js
[mergecertificate]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/mergeCertificate.js
[operations]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/operations.js
[purgeAllCertificates]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/samples/javascript/purgeAllCertificates.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/keyvault-certificates
[azkeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[kvsoftdelete]: https://docs.microsoft.com/azure/key-vault/key-vault-soft-delete-cli
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-certificates/README.md
