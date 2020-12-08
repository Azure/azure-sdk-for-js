---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-active-directory
urlFragment: identity-typescript
---

# Azure Identity library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Identity in some common scenarios.

| **File Name**                   | **Description**                                                  |
| ------------------------------- | ---------------------------------------------------------------- |
| [defaultAzureCredential.ts][defaultAzureCredential]    | Tries several authentications. The simplest way to use @azure/identity |
| [clientSecretCredential.ts][clientSecretCredential]    | Authenticates with a client and a client's secret. |
| [environmentCredential.ts][environmentCredential]      | Authenticates with a client and a client's secret sent through environment variables. |

## Prerequisites

The samples are compatible with Node.ts >= 8.0.0.

Before running the samples in Node, they must be compiled to TypeScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Key Vault][azkeyvault] to run these sample programs.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/helloWorld.ts
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env KEYVAULT_NAME="<key vault name>" AZURE_TENANT_ID="<AAD tenant id>" AZURE_CLIENT_ID="<AAD client id>" AZURE_CLIENT_SECRET="<AAD client secret>" node dist/environmentCredential.ts
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[defaultAzureCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/typescript/src/defaultAzureCredential.ts
[clientSecretCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/typescript/src/clientSecretCredential.ts
[environmentCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/typescript/src/environmentCredential.ts
[apiref]: https://docs.microsoft.com/Typescript/api/@azure/keyvault-keys
[azkeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/keyvault/keyvault-keys/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
