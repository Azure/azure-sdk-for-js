# Azure Communication Phone Numbers client library for JavaScript

The phone numbers library provides capabilities for phone number administration.

Purchased phone numbers can come with many capabilities, depending on the country, number type and assignment type. Examples of capabilities are SMS inbound and outbound usage, PSTN inbound and outbound usage. Phone numbers can also be assigned to a bot via a webhook URL.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-phone-numbers
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

The phone numbers package exposes the `PhoneNumbersClient` which provides methods to manage phone numbers.

### Phone number types

Phone numbers come in two types; Geographic and Toll-Free. Geographic phone numbers are phone numbers associated with a location, whose area codes are associated with the area code of a geographic location. Toll-Free phone numbers are not associated with a location. For example, in the US, toll-free numbers can come with area codes such as 800 or 888.

All geographic phone numbers within the same country are grouped into a phone plan group with a Geographic phone number type. All Toll-Free phone numbers within the same country are grouped into a phone plan group.

### Searching and acquiring numbers

Phone numbers can be searched through the search creation API by providing a phone number type (geographic or toll-free), assignment type (person or application), calling and sms capabilities, an area code and quantity of phone numbers. The provided quantity of phone numbers will be reserved for 15 minutes. This search of phone numbers can either be cancelled or purchased. If the search is cancelled, then the phone numbers will become available to others. If the search is purchased, then the phone numbers are acquired for the Azure resource.

### Configuring phone numbers

Phone numbers can have a combination of capabilities. They can be configured to support inbound and/or outbound calling, or neither if you won't use the phone number for calling. The same applies to sms capabilities.

It is important to consider the assignment type of your phone number. Some capabilities are restricted to a particular assignment type.

## Examples

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Phone Numbers client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the `PhoneNumbersClient` with any of the following methods:

### Using a connection string

```typescript
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);
```

### Using an access key with `AzureKeyCredential`

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key and endpoint, you can authenticate with the following code:

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new AzureKeyCredential("<key-from-resource>");
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
```

### Using an Azure Active Directory Credential

Connection string authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`][azure_identity_readme] provides more details and samples to get you started.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

let credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Phone Numbers client. The scenarios that are covered here consist of:

- [Search for available phone numbers](#search-for-available-phone-numbers)
- [Purchase phone numbers from a search](#purchase-phone-numbers-from-a-search)
- [Release a purchased phone number](#release-a-purchased-phone-number)
- [Update phone number capabilities](#update-phone-number-capabilities)
- [Get a purchased phone number](#get-a-purchased-phone-number)
- [List purchased phone numbers](#list-purchased-phone-numbers)

### Search for available phone numbers

Use the `beginSearchAvailablePhoneNumbers` method to search for phone numbers and reserve them. The phone numbers returned are reserved for 15 minutes and can be purchased during this period by providing the `searchId` to the `beginPurchasePhoneNumbers` method.

`beginSearchAvailablePhoneNumbers` is a long running operation and returns a poller.

```typescript
import {
  PhoneNumbersClient,
  SearchAvailablePhoneNumbersRequest
} from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);

async function main() {
  const searchRequest: SearchAvailablePhoneNumbersRequest = {
    countryCode: "US",
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: {
      sms: "outbound",
      calling: "none"
    },
    quantity: 1
  };

  const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

  // The search is underway. Wait to receive searchId.
  const searchResults = await searchPoller.pollUntilDone();
  console.log(`Found phone number: ${searchResults.phoneNumbers[0]}`);
  console.log(`searchId: ${searchResults.searchId}`);
}

main();
```

### Purchase phone numbers from a search

Use the `beginPurchasePhoneNumbers` method to purchase the phone numbers from your search. Purchased phone numbers will be assigned to the Communication Services resource used when initiating the client. The `searchId` returned from `beginSearchAvailablePhoneNumbers` is required.

`beginPurchasePhoneNumbers` is a long running operation and returns a poller.

```typescript
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);

async function main() {
  const searchRequest = {
    countryCode: "US",
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: {
      sms: "outbound",
      calling: "none"
    },
    quantity: 1
  };

  const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

  // The search is underway. Wait to receive searchId.
  const { searchId, phoneNumbers } = searchPoller.pollUntilDone();

  const purchasePoller = await client.beginPurchasePhoneNumbers(searchId);

  // Purchase is underway.
  await purchasePoller.pollUntilDone();
  console.log(`Successfully purchased ${phoneNumbers[0]}`);
}

main();
```

### Release a purchased phone number

Use the `beginReleasePhoneNumber` method to release a previously purchased phone number. Released phone numbers will no longer be associated with the Communication Services resource, and will not be available for use with other operations (eg. SMS) of the resource. The phone number being released is required.

`beginReleasePhoneNumber` is a long running operation and returns a poller.

```typescript
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);

async function main() {
  const phoneNumberToRelease = "<phone-number-to-release>";

  const releasePoller = await client.beginReleasePhoneNumber(phoneNumberToRelease);

  // Release is underway.
  await releasePoller.pollUntilDone();
  console.log("Successfully release phone number.");
}

main();
```

### Update phone number capabilities

Use the `beginUpdatePhoneNumberCapabilities` method to update the capabilities of a purchased phone number. Phone numbers can be configured to support inbound and/or outbound calling and sms, or neither.

`beginUpdatePhoneNumberCapabilities` is a long running operation and returns a poller.

```typescript
import {
  PhoneNumbersClient,
  PhoneNumberCapabilitiesRequest
} from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);

async function main() {
  const phoneNumberToUpdate = "<phone-number-to-update>";

  // This will update phone number to send and receive sms, but only send calls.
  const updateRequest: PhoneNumberCapabilitiesRequest = {
    sms: "inbound+outbound",
    calling: "outbound"
  };

  const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
    phoneNumberToUpdate,
    updateRequest
  );

  // Update is underway.
  const { capabilities } = await updatePoller.pollUntilDone();
  console.log(`These are the update capabilities: ${capabilities}`);
}

main();
```

### Get a purchased phone number

Use the `getPurchasedPhoneNumber` method to get information about a purchased phone number. This information includes the phone number's type, capabilities, cost, and purchase date.

```typescript
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);

async main function() {
  const phoneNumberToGet = "<phone-number-to-get>";

  const phoneNumber = await client.getPurchasedPhoneNumber(phoneNumberToGet);

  console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
  console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
}

main();
```

### List purchased phone numbers

Use the `listPurchasedPhoneNumbers` method to page through all purchased phone numbers.

```typescript
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);

async main function() {
  const phoneNumbers = await client.listPurchasedPhoneNumbers();

  for await (const phoneNumber of phoneNumbers) {
    console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
    console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
  }
}

main();
```

## Troubleshooting

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[azure_identity_readme]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-phone-numbers%2FREADME.png)
