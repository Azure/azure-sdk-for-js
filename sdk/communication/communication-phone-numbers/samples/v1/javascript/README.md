---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-communication-services
urlFragment: communication-phone-numbers-javascript
---

# Azure Communication Services client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Communication Services in some common scenarios.

| **File Name**                                                     | **Description**                                                                                       |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [getPurchasedPhoneNumber.js][getpurchasedphonenumber]             | Demonstrates how to us the PhoneNumbersClient to get a purchased phone number.                        |
| [getPurchasedPhoneNumbers.js][getpurchasedphonenumbers]           | Demonstrates how to us the PhoneNumbersClient to list all purchased phone numbers.                    |
| [purchasePhoneNumber.js][purchasephonenumber]                     | Demonstrates how to us the PhoneNumbersClient to purchase a phone number and use it to send a SMS.    |
| [releasePhoneNumber.js][releasephonenumber]                       | Demonstrates how to us the PhoneNumbersClient to release phone numbers.                               |
| [updatePhoneNumberCapabilities.js][updatephonenumbercapabilities] | Demonstrates how to us the PhoneNumbersClient to update the capabilities of a purchased phone number. |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] to run these sample programs.

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
node getPurchasedPhoneNumber.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env COMMUNICATION_CONNECTION_STRING="<communication connection string>" node getPurchasedPhoneNumber.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getpurchasedphonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/v1/javascript/getPurchasedPhoneNumber.js
[getpurchasedphonenumbers]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/v1/javascript/getPurchasedPhoneNumbers.js
[purchasephonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/v1/javascript/purchasePhoneNumber.js
[releasephonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/v1/javascript/releasePhoneNumber.js
[updatephonenumbercapabilities]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples/v1/javascript/updatePhoneNumberCapabilities.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/communication-phone-numbers
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/communication/communication-phone-numbers/README.md
