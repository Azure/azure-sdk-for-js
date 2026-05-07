---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-key-vault
urlFragment: keyvault-keys-typescript-beta
---

# Azure Key Vault Keys client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Key Vault Keys in some common scenarios.

| **File Name**                     | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cryptography.ts][cryptography]   | Uses an Azure Key Vault key to sign/verify, encrypt/decrypt, and wrap/unwrap data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [helloWorld.ts][helloworld]       | Creates, reads, lists, and deletes keys.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [keyRotation.ts][keyrotation]     | Creates and updates a key's automated rotation policy, and rotates a key on-demand.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [secureWrapKey.ts][securewrapkey] | Wraps a TEE-generated symmetric key with a Key Vault key, then unwraps it. Demonstrates the SECURE WRAP and SECURE UNWRAP operations on Azure Managed HSM. Unlike the regular wrap/unwrap operations, the symmetric key being wrapped is generated inside a Trusted Execution Environment (TEE) and the unwrap operation is gated by attestation through Microsoft Azure Attestation (MAA). These operations are only available on Managed HSM and require an exportable RSA key with an appropriate release policy. Replace `<attestation-target>` below with a valid MAA token for your environment. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Key Vault][createinstance_azurekeyvault]

To quickly create the needed Key Vault resources in Azure and to receive a connection string for them, you can deploy our sample template by clicking:

[![](http://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure%2Fazure-sdk-for-js%2Fmaster%2Fsdk%2Fkeyvault%2Ftest-resources.json)

If creating the Key Vault manually using the Azure Portal, be aware that the samples require that the soft-delete feature be enabled. Our template above will enable this feature automatically, but it is possible to enable it manually using the Azure CLI. See [the documentation for enabling soft-delete in Key Vault](https://learn.microsoft.com/azure/key-vault/key-vault-soft-delete-cli) for more information.

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
node dist/cryptography.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_URI="<keyvault uri>" node dist/cryptography.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cryptography]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v5/typescript/src/cryptography.ts
[helloworld]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v5/typescript/src/helloWorld.ts
[keyrotation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v5/typescript/src/keyRotation.ts
[securewrapkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/keyvault/keyvault-keys/samples/v5/typescript/src/secureWrapKey.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/keyvault-keys?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurekeyvault]: https://learn.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/keyvault/keyvault-keys/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
