---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-communication-services
urlFragment: communication-recipient-verification-typescript-beta
---

# Azure Communication Services - Recipient Verification client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Communication Services - Recipient Verification in some common scenarios.

| **File Name**                                           | **Description**                           |
| ------------------------------------------------------- | ----------------------------------------- |
| [deleteVerification.ts][deleteverification]             | Delete a verification for a resource      |
| [getAllVerifications.ts][getallverifications]           | Get all verifications for a resource      |
| [getVerificationConstants.ts][getverificationconstants] | Get verification constants for a resource |
| [requestVerification.ts][requestverification]           | Request identity verification             |
| [verifyVerification.ts][verifyverification]             | Verifying idenity with verification code  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/deleteVerification.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_SAMPLES_CONNECTION_STRING="<communication samples connection string>" VERIFICATION_ID="<verification id>" node dist/deleteVerification.js
```

## Next Steps

Here are some [samples] <!--TODO: Enable link after release (https://github.com/azure-sdk-for-python/blob/main/samples.json)--> to look at.

[deleteverification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/typescript/src/deleteVerification.ts
[getallverifications]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/typescript/src/getAllVerifications.ts
[getverificationconstants]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/typescript/src/getVerificationConstants.ts
[requestverification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/typescript/src/requestVerification.ts
[verifyverification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-recipient-verification/samples/v1-beta/typescript/src/verifyVerification.ts
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesaccount]: https://learn.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-recipient-verification/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
