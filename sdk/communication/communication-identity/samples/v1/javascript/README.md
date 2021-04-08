---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-communication-services
urlFragment: communication-identity-javascript
---

# Azure Communication Services - Identity client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Communication Services - Identity in some common scenarios.

| **File Name**                   | **Description**         |
| ------------------------------- | ----------------------- |
| [issueToken.js][issuetoken]     | Issue a new user token. |
| [revokeTokens.js][revoketokens] | Revoke user tokens.     |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Communication Services account][createinstance_azurecommunicationservicesaccount]

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
node issueToken.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<communication connection string>" node issueToken.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[issuetoken]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-identity/samples/v1/javascript/issueToken.js
[revoketokens]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-identity/samples/v1/javascript/revokeTokens.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-identity
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesaccount]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/communication/communication-identity/README.md
