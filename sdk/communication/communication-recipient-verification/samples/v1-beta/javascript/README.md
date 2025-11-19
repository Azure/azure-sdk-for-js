---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-communication-services
urlFragment: communication-recipient-verification-javascript-beta
---

# Azure Communication Services - Recipient Verification client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Communication Services - Recipient Verification in some common scenarios.

| **File Name**                                           | **Description**                           |
| ------------------------------------------------------- | ----------------------------------------- |
| [deleteVerification.js][deleteverification]             | Delete a verification for a resource      |
| [getAllVerifications.js][getallverifications]           | Get all verifications for a resource      |
| [getVerificationConstants.js][getverificationconstants] | Get verification constants for a resource |
| [requestVerification.js][requestverification]           | Request identity verification             |
| [verifyVerification.js][verifyverification]             | Verifying idenity with verification code  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node deleteVerification.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_SAMPLES_CONNECTION_STRING="<communication samples connection string>" VERIFICATION_ID="<verification id>" node deleteVerification.js
```

## Next Steps

Here are some [samples] <!--TODO: Enable link after release (https://github.com/azure-sdk-for-python/blob/main/samples.json)--> to look at.

[deleteverification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/javascript/deleteVerification.js
[getallverifications]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/javascript/getAllVerifications.js
[getverificationconstants]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/javascript/getVerificationConstants.js
[requestverification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/javascript/requestVerification.js
[verifyverification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/javascript/verifyVerification.js
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesaccount]: https://learn.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-recipient-verification/README.md
