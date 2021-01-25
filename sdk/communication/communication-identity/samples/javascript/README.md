---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: communication-identity-javascript
---

# Azure Communication Service Administration Identity client library sample for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Communication Service Administration Identity to issue and refresh tokens.

| **File Name**                   | **Description**                                                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [issueToken.js][issuetoken]     | uses the CommunicationIdentityClient to create a user and issue a token for this user                      |
| [revokeTokens.js][revoketokens] | uses the CommunicationIdentityClient to create a user, issue tokens for this user, and revoke these tokens |

## Prerequisites

The sample is compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Communication Service Instance][azcomsvc] to run these sample program.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the sample using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node issueToken.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<connection string>" node issueToken.js
```

## Next Steps

Take a look at our API Documentation<!--Todo uncomment when API ref published [API Documentation][apiref]--> for more information about the APIs that are available in the clients.

[issuetoken]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-identity/samples/javascript/issueToken.js
[revoketokens]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-identity/samples/javascript/revokeTokens.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-identity
[azcomsvc]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-identity/README.md
