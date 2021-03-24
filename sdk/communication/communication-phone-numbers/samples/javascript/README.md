---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: communication-phone-numbers-javascript
---

# Azure Communication Service Phone Numbers client library samples for JavaScript

These sample programs show how to use the JavaScript client library for Azure Communication Service Phone Numbers.

| **File Name**                                                            | **Description**                                                                    |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [purchasePhoneNumber.js][purchasephonenumber]                            | uses the PhoneNumbersClient to purchase a phone number                             |
| [releasePhoneNumber.js]<!--[releasephonenumber]-->                       | uses the PhoneNumbersClient to release a purchased phone number                    |
| [updatePhoneNumberCapabilities.js]<!--[updatephonenumbercapabilities]--> | uses the PhoneNumbersClient to update the capabilities of a purchased phone number |
| [getPurchasedPhoneNumber.js]<!--[getpurchasedphonenumber]-->             | uses the PhoneNumbersClient to get a purchased phone number                        |
| [getPurchasedPhoneNumbers.js]<!--[getpurchasedphonenumbers]-->           | uses the PhoneNumbersClient to list all purchased phone numbers                    |

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
node purchasePhoneNumber.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<connection string>" node purchasePhoneNumber.js
```

## Next Steps

Take a look at our [API Documentation]<!--[apiref]--> for more information about the APIs that are available in the clients.

[purchasephonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/javascript/purchasePhoneNumber.js
[releasephonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/javascript/releasePhoneNumber.js
[updatephonenumbercapabilities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/javascript/updatePhoneNumberCapabilities.js
[getpurchasedphonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/javascript/getPurchasedPhoneNumber.js
[getpurchasedphonenumbers]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/javascript/getPurchasedPhoneNumbers.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-phone-numbers
[azcomsvc]: https://docs.microsoft.com/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/README.md
