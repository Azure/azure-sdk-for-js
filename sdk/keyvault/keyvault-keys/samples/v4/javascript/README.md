---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-keys-javascript
---

# Azure Key Vault Keys client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Key Vault Keys in some common scenarios.

| **File Name**                                 | **Description**                                                                                                                                                                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [node/cryptography.js][node_cryptography]     | Uses an Azure Key Vault key to sign/verify, encrypt/decrypt, and wrap/unwrap data.                                                                                                             |
| [node/gettingStarted.js][node_gettingstarted] | Authenticates with Azure Key Vault and creates a KeyClient and CryptographyClient.                                                                                                             |
| [node/helloWorld.js][node_helloworld]         | Creates, reads, lists, and deletes keys.                                                                                                                                                       |
| [node/hsmOperations.js][node_hsmoperations]   | Shows key operations that require a Managed HSM endpoint: creating OCT keys, getting key attestation, releasing keys, and getting random bytes. Set AZURE_MANAGEDHSM_URI to run these samples. |
| [node/keyRotation.js][node_keyrotation]       | Creates and updates a key's automated rotation policy, and rotates a key on-demand.                                                                                                            |

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
node node/cryptography.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_URI="<keyvault uri>" node node/cryptography.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[node_cryptography]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v4/javascript/node/cryptography.js
[node_gettingstarted]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v4/javascript/node/gettingStarted.js
[node_helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v4/javascript/node/helloWorld.js
[node_hsmoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v4/javascript/node/hsmOperations.js
[node_keyrotation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v4/javascript/node/keyRotation.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/keyvault-keys
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://learn.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-keys/README.md
