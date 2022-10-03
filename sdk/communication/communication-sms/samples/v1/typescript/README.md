---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-communication-services
urlFragment: communication-sms-typescript
---

# Azure Communication Services - SMS client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Communication Services - SMS in some common scenarios.

| **File Name**                               | **Description**                                       |
| ------------------------------------------- | ----------------------------------------------------- |
| [sendSms.ts][sendsms]                       | Send an SMS message to 1 or more recipients           |
| [sendSmsWithOptions.ts][sendsmswithoptions] | Configure SMS options when sending a message          |
| [usingAadAuth.ts][usingaadauth]             | Use AAD token credentials when sending a SMS message. |

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
node dist/sendSms.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_SAMPLES_CONNECTION_STRING="<communication samples connection string>" FROM_PHONE_NUMBER="<from phone number>" AZURE_PHONE_NUMBER="<azure phone number>" TO_PHONE_NUMBERS="<to phone numbers>" AZURE_PHONE_NUMBER="<azure phone number>" node dist/sendSms.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendsms]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-sms/samples/v1/typescript/src/sendSms.ts
[sendsmswithoptions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-sms/samples/v1/typescript/src/sendSmsWithOptions.ts
[usingaadauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-sms/samples/v1/typescript/src/usingAadAuth.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-sms
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesaccount]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-sms/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
