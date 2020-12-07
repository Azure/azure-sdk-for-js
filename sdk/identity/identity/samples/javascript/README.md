---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-identity
urlFragment: identity-javascript
---

# Azure Identity client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Identity in some common scenarios.

| **File Name**                                          | **Description**                                                 |
| ------------------------------------------------------ | --------------------------------------------------------------- |
| [defaultAzureCredential.js][defaultAzureCredential]    | Tries several authentications. The simplest way to use @azure/identity |
| [clientSecretCredential.js][clientSecretCredential]    | Authenticates with a client and a client's secret. |
| [environmentCredential.js][environmentCredential]      | Authenticates with a client and a client's secret sent through environment variables. |
| [deviceCodeCredential.js][deviceCodeCredential]        | Authenticates by entering a code in a website as specified in the printed instructions. |
| [interactiveBrowserCredential.js][interactiveBrowserCredential] | Opens a website page where users can authenticate using their Microsoft accounts. |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Key Vault][azkeyvault] to run these sample programs.

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
npx cross-env KEYVAULT_NAME="<key vault name>" AZURE_TENANT_ID="<AAD tenant id>" AZURE_CLIENT_ID="<AAD client id>" AZURE_CLIENT_SECRET="<AAD client secret>" node environmentCredential.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[defaultAzureCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/javascript/defaultAzureCredential.js
[clientSecretCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/javascript/clientSecretCredential.js
[environmentCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/javascript/environmentCredential.js
[deviceCodeCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/javascript/deviceCodeCredential.js
[interactiveBrowserCredential]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/javascript/interactiveBrowserCredential.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/identity
[azkeyvault]: https://docs.microsoft.com/azure/key-vault/quick-create-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity/README.md
