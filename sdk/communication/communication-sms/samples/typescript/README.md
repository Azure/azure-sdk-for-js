---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: communication-sms-typescript
---

# Azure Communication Service SMS client library sample for TypeScript

This sample program shows how to use the JavaScript client libraries for Azure Communication Service SMS to send SMS messages.

| **File Name**         | **Description**                           |
| --------------------- | ----------------------------------------- |
| [sendSms.ts][sendsms] | uses the SmsClient to send an SMS message |

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

2. Compile the sample

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run the sample:

```bash
node dist/sendSms.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<connection string>" node dist/sendSms.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendsms]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-sms/samples/typescript/src/sendSms.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-sms
[azcomsvc]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-sms/README.md
