---
page_type: sample
languages:
  - typescript
products:
  - entra
  - entra-id
urlFragment: identity-broker-typescript-beta
---

# Azure Identity Brokered Auth Plugin client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Identity Brokered Auth Plugin in some common scenarios.

| **File Name**     | **Description**                                                                                                                                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [index.ts][index] | Demonstrates [WAM broker authentication](https://learn.microsoft.com/entra/identity-platform/scenario-desktop-acquire-token-wam) scenario on electron app with the usage of identity broker plugin package along with the InteractiveBrowserCredential from the identity package. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Microsoft Entra App Registration][createinstance_azureactivedirectoryappregistration]
- [Azure Key Vault][createinstance_azurekeyvault]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the sample:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run the Electron Sample using the following command:

```bash
npm run start
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AZURE_CLIENT_ID="<azure client id>" AZURE_AUTHORITY_HOST="<azure authority host>" AZURE_TENANT_ID="<azure tenant id>" AAD_TEST_SCOPE="<aad test scope>" electron ./dist/index.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[index]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-broker/samples/v1/typescript/src/index.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/identity
[freesub]: https://azure.microsoft.com/free/nodejs
[createinstance_azureactivedirectoryappregistration]: https://learn.microsoft.com/entra/identity-platform/quickstart-register-app
[createinstance_azurekeyvault]: https://learn.microsoft.com/azure/key-vault/quick-create-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-broker/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
