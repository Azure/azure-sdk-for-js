---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: communication-sms-javascript
---

# Azure Communication Service SMS client library sample for JavaScript

This sample program shows how to use the JavaScript client libraries for Azure Communication Service SMS to send SMS messages.

| **File Name**                               | **Description**                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [sendSms.js][sendsms]                       | demonstrates how to use the SmsClient to send an SMS message                                |
| [sendSmsWithOptions.js][sendsmswithoptions] | demonstrates how to set options when sending SMS messages                                   |
| [usingAadAuth.js][usingaadauth]             | demonstrates how to create the SmsClient using AAD token credentials to send an SMS message |

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

3. Run whichever samples you like:

```bash
node sendSms.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<connection string>" node sendMessage.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.
For a basic guide on how to configure Delivery Reporting for your SMS messages please refer to the [Handle SMS Events quickstart][handlesmsevents].

[sendsms]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-sms/samples/javascript/sendSms.js
[sendsmswithoptions]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-sms/samples/javascript/sendSmsWithOptions.js
[usingaadauth]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-sms/samples/javascript/usingAadAuth.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-sms
[azcomsvc]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-sms/README.md
[handlesmsevents]: https://docs.microsoft.com/en-us/azure/communication-services/quickstarts/telephony-sms/handle-sms-events
