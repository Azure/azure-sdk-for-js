---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-communication-services
urlFragment: communication-phone-numbers-typescript
---

# Azure Communication Services - Phone Numbers client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Communication Services - Phone Numbers in some common scenarios.

| **File Name**                                                                | **Description**                                       |
| ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| [getPurchasedPhoneNumber.ts][getpurchasedphonenumber]                        | Get a purchased phone number.                         |
| [getPurchasedPhoneNumbers.ts][getpurchasedphonenumbers]                      | Get a list of all purchased phone numbers.            |
| [purchasePhoneNumber.ts][purchasephonenumber]                                | Search for a toll-free phone number then purchase it. |
| [releasePhoneNumber.ts][releasephonenumber]                                  | Release a purchased phone number.                     |
| [updatePhoneNumberCapabilities.ts][updatephonenumbercapabilities]            | Update the capabilities of a purchased phone number.  |
| [siprouting/getSipRoutingConfiguration.js][getsiproutingconfiguration]       | Get SIP trunks and call routing routes.               |
| [siprouting/manageSipRoutingConfiguration.js][managesiproutingconfiguration] | Manage SIP trunks and call routing routes.            |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

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
node dist/getPurchasedPhoneNumber.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env COMMUNICATION_SAMPLES_CONNECTION_STRING="<communication samples connection string>" PHONE_NUMBER_TO_GET="<phone number to get>" AZURE_PHONE_NUMBER="<azure phone number>" node dist/getPurchasedPhoneNumber.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getpurchasedphonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples/v1/typescript/src/getPurchasedPhoneNumber.ts
[getpurchasedphonenumbers]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples/v1/typescript/src/getPurchasedPhoneNumbers.ts
[purchasephonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples/v1/typescript/src/purchasePhoneNumber.ts
[releasephonenumber]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples/v1/typescript/src/releasePhoneNumber.ts
[updatephonenumbercapabilities]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples/v1/typescript/src/updatePhoneNumberCapabilities.ts
[getsiproutingconfiguration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples/v1/javascript/siprouting/getSipRoutingConfiguration.js
[managesiproutingconfiguration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples/v1/javascript/siprouting/manageSipRoutingConfiguration.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/communication-phone-numbers
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecommunicationservicesaccount]: https://learn.microsoft.com/azure/communication-services/quickstarts/create-communication-resource
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-phone-numbers/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
