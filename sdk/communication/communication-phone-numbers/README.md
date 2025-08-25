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

This SDK provides functionality to easily manage `direct offer` and `direct routing` numbers.

The `direct offer` numbers come in three types: Geographic, Toll-Free and Mobile. Geographic and Mobile phone plans are phone plans associated with a location, whose phone numbers' area codes are associated with the area code of a geographic location. Toll-Free phone plans are phone plans not associated location. For example, in the US, toll-free numbers can come with area codes such as 800 or 888.
They are managed using the `PhoneNumbersClient`

The `direct routing` feature enables connecting your existing telephony infrastructure to ACS.
The configuration is managed using the `SipRoutingClient`, which provides methods for setting up SIP trunks and voice routing rules, in order to properly handle calls for your telephony subnet.

### Phone numbers client

#### Phone number types

Phone numbers come in three types; Geographic, Toll-Free and Mobile. Toll-Free numbers are not associated with a location. For example, in the US, toll-free numbers can come with area codes such as 800 or 888. Geographic and Mobile phone numbers are phone numbers associated with a location.

Phone number types with the same country are grouped into a phone plan group with that phone number type. For example all Toll-Free phone numbers within the same country are grouped into a phone plan group.

#### Searching and acquiring numbers

Phone numbers can be searched through the search creation API by providing a phone number type (geographic, toll-free or mobile), assignment type (person or application), calling and sms capabilities, an area code and quantity of phone numbers. The provided quantity of phone numbers will be reserved for 15 minutes. This search of phone numbers can either be cancelled or purchased. If the search is cancelled, then the phone numbers will become available to others. If the search is purchased, then the phone numbers are acquired for the Azure resource.

#### Configuring phone numbers

Phone numbers can have a combination of capabilities. They can be configured to support inbound and/or outbound calling, or neither if you won't use the phone number for calling. The same applies to sms capabilities.

It is important to consider the assignment type of your phone number. Some capabilities are restricted to a particular assignment type.

#### Browsing and reserving phone numbers

The Browse and Reservations APIs provide an alternate way to acquire phone numbers via a shopping-cart-like experience. This is achieved by splitting the search operation, which finds and reserves numbers using a single LRO, into two separate synchronous steps, Browse and Reservation.

The browse operation retrieves a random sample of phone numbers that are available for purchase for a given country, with optional filtering criteria to narrow down results. The returned phone numbers are not reserved for any customer.

Reservations represent a collection of phone numbers that are locked by a specific customer and are awaiting purchase. They have an expiration time of 15 minutes after the last modification or 2 hours from creation time. A reservation can include numbers from different countries, in contrast with the Search operation. Customers can create, retrieve, modify (by adding and removing numbers), delete, and purchase reservations. Purchasing a reservation is an LRO.

### SIP routing client

Direct routing feature allows connecting customer-provided telephony infrastructure to Azure Communication Resources. In order to setup routing configuration properly, customer needs to supply the SIP trunk configuration and SIP routing rules for calls. SIP routing client provides the necessary interface for setting this configuration.

When a call is made, system tries to match the destination number with regex number patterns of defined routes. The first route to match the number will be selected. The order of regex matching is the same as the order of routes in configuration, therefore the order of routes matters.
Once a route is matched, the call is routed to the first trunk in the route's trunks list. If the trunk is not available, next trunk in the list is selected.

## Examples

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Phone Numbers client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the client with any of the following methods:

### Using a connection string

```ts snippet:ReadmeSampleCreatePhoneClient_ConnectionString
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new PhoneNumbersClient(connectionString);
```

```ts snippet:ReadmeSampleCreateSipClient_ConnectionString
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new SipRoutingClient(connectionString);
```

### Using an access key with `AzureKeyCredential`

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key and endpoint, you can authenticate with the following code:

```ts snippet:ReadmeSampleCreatePhoneClient_KeyCredential
import { AzureKeyCredential } from "@azure/core-auth";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new AzureKeyCredential("<key-from-resource>");
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
```

```ts snippet:ReadmeSampleCreateSipClient_KeyCredential
import { AzureKeyCredential } from "@azure/core-auth";
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const credential = new AzureKeyCredential("<key-from-resource>");
const client = new SipRoutingClient("<endpoint-from-resource>", credential);
```

### Using an Azure Active Directory Credential

Connection string authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`][azure_identity_readme] provides more details and samples to get you started.

```ts snippet:ReadmeSampleCreatePhoneClient_DefaultAzureCredential
import { DefaultAzureCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);
```

```ts snippet:ReadmeSampleCreateSipClient_DefaultAzureCredential
import { DefaultAzureCredential } from "@azure/identity";
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new SipRoutingClient("<endpoint-from-resource>", credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Phone Numbers client. The scenarios that are covered here consist of:

PhoneNumbersClient

- [Search for available phone numbers](#search-for-available-phone-numbers)
- [Purchase phone numbers from a search](#purchase-phone-numbers-from-a-search)
- [Browse and reserve available phone numbers](#browse-and-reserve-available-phone-numbers)
- [Release a purchased phone number](#release-a-purchased-phone-number)
- [Update phone number capabilities](#update-phone-number-capabilities)
- [Purchase reservation](#purchase-reservation)
- [Get a purchased phone number](#get-a-purchased-phone-number)
- [List purchased phone numbers](#list-purchased-phone-numbers)

SipRoutingClient

- [Retrieve SIP trunks and routes](#retrieve-sip-trunks-and-routes)
- [Replace SIP trunks and routes](#replace-sip-trunks-and-routes)
- [Retrieve single trunk](#retrieve-single-trunk)
- [Set single trunk](#set-single-trunk)
- [Delete single trunk](#delete-single-trunk)

### PhoneNumbersClient

#### Search for available phone numbers

Use the `beginSearchAvailablePhoneNumbers` method to search for phone numbers and reserve them. The phone numbers returned are reserved for 15 minutes and can be purchased during this period by providing the `searchId` to the `beginPurchasePhoneNumbers` method.

`beginSearchAvailablePhoneNumbers` is a long running operation and returns a poller.

```ts snippet:PhoneNumbersClientSearchAvailablePhoneNumbers
import { DefaultAzureCredential } from "@azure/identity";
import {
  PhoneNumbersClient,
  SearchAvailablePhoneNumbersRequest,
} from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const searchRequest: SearchAvailablePhoneNumbersRequest = {
  countryCode: "US",
  phoneNumberType: "tollFree",
  assignmentType: "application",
  capabilities: {
    sms: "outbound",
    calling: "none",
  },
  quantity: 1,
};

const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

// The search is underway. Wait to receive searchId.
const searchResults = await searchPoller.pollUntilDone();
console.log(`Found phone number: ${searchResults.phoneNumbers[0]}`);
console.log(`searchId: ${searchResults.searchId}`);
```

#### Purchase phone numbers from a search

Use the `beginPurchasePhoneNumbers` method to purchase the phone numbers from your search. Purchased phone numbers will be assigned to the Communication Services resource used when initiating the client. The `searchId` returned from `beginSearchAvailablePhoneNumbers` is required.

`beginPurchasePhoneNumbers` is a long running operation and returns a poller.

```ts snippet:PhoneNumbersClientPurchasePhoneNumbers
import { DefaultAzureCredential } from "@azure/identity";
import {
  PhoneNumbersClient,
  SearchAvailablePhoneNumbersRequest,
} from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const searchRequest: SearchAvailablePhoneNumbersRequest = {
  countryCode: "US",
  phoneNumberType: "tollFree",
  assignmentType: "application",
  capabilities: {
    sms: "outbound",
    calling: "none",
  },
  quantity: 1,
};

const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

// The search is underway. Wait to receive searchId.
const { searchId, phoneNumbers } = await searchPoller.pollUntilDone();

const purchasePoller = await client.beginPurchasePhoneNumbers(searchId);

// Purchase is underway.
await purchasePoller.pollUntilDone();
console.log(`Successfully purchased ${phoneNumbers[0]}`);
```

#### Browse and reserve available phone numbers

Use the Browse and Reservations API to reserve a phone number

```ts snippet:PhoneNumbersClientBrowseAndReserveAvailablePhoneNumbers
import { DefaultAzureCredential } from "@azure/identity";
import {
  PhoneNumbersClient,
  BrowseAvailableNumbersRequest,
  AvailablePhoneNumber,
} from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const browseAvailableNumberRequest: BrowseAvailableNumbersRequest = {
  countryCode: "US",
  phoneNumberType: "tollFree",
};

const browseAvailableNumbers = await client.browseAvailablePhoneNumbers(
  browseAvailableNumberRequest,
  {
    capabilities: {
      calling: "outbound",
    },
    assignmentType: "application",
  },
);
const phoneNumbers = browseAvailableNumbers.phoneNumbers;
const phoneNumbersList = [phoneNumbers[0], phoneNumbers[1]];
const reservationResponse = await client.createOrUpdateReservation(
  {
    reservationId: "reservationId",
  },
  {
    add: phoneNumbersList,
  },
);
const numbersWithError: AvailablePhoneNumber[] = [];
for (const number of Object.values(reservationResponse.phoneNumbers || {})) {
  if (number != null && number.status === "error") {
    numbersWithError.push(number);
  }
}
if (numbersWithError.length > 0) {
  console.log("Errors occurred during reservation");
} else {
  console.log("Reservation operation completed without errors.");
}
```

#### Release a purchased phone number

Use the `beginReleasePhoneNumber` method to release a previously purchased phone number. Released phone numbers will no longer be associated with the Communication Services resource, and will not be available for use with other operations (eg. SMS) of the resource. The phone number being released is required.

`beginReleasePhoneNumber` is a long running operation and returns a poller.

```ts snippet:PhoneNumbersClientReleasePhoneNumber
import { DefaultAzureCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const phoneNumberToRelease = "<phone-number-to-release>";

const releasePoller = await client.beginReleasePhoneNumber(phoneNumberToRelease);

// Release is underway.
await releasePoller.pollUntilDone();
console.log("Successfully release phone number.");
```

#### Update phone number capabilities

Use the `beginUpdatePhoneNumberCapabilities` method to update the capabilities of a purchased phone number. Phone numbers can be configured to support inbound and/or outbound calling and sms, or neither.

`beginUpdatePhoneNumberCapabilities` is a long running operation and returns a poller.

```ts snippet:PhoneNumbersClientUpdatePhoneNumberCapabilities
import { DefaultAzureCredential } from "@azure/identity";
import {
  PhoneNumbersClient,
  PhoneNumberCapabilitiesRequest,
} from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const phoneNumberToUpdate = "<phone-number-to-update>";

// This will update phone number to send and receive sms, but only send calls.
const updateRequest: PhoneNumberCapabilitiesRequest = {
  sms: "inbound+outbound",
  calling: "outbound",
};

const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
  phoneNumberToUpdate,
  updateRequest,
);

// Update is underway.
const { capabilities } = await updatePoller.pollUntilDone();
console.log(`These are the update capabilities: ${capabilities}`);
```

#### Get a purchased phone number

Use the `getPurchasedPhoneNumber` method to get information about a purchased phone number. This information includes the phone number's type, capabilities, cost, and purchase date.

```ts snippet:PhoneNumbersClientGetPurchasedPhoneNumber
import { DefaultAzureCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const phoneNumberToGet = "<phone-number-to-get>";

const phoneNumber = await client.getPurchasedPhoneNumber(phoneNumberToGet);

console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
```

#### Purchase reservation

Given an existing and active reservation, purchase the phone numbers in that reservation.

```ts snippet:PhoneNumbersClientBeginReservationPurchase
import { DefaultAzureCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const reservationId = "<reservation-id>";

const purchasePoller = await client.beginReservationPurchase(reservationId);

// Purchase is underway.
const purchaseResult = await purchasePoller.pollUntilDone();
console.log(`Successfully purchased phone numbers in reservation: ${reservationId}`);
   ```

#### List purchased phone numbers

Use the `listPurchasedPhoneNumbers` method to page through all purchased phone numbers.

```ts snippet:PhoneNumbersClientListPurchasedPhoneNumbers
import { DefaultAzureCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient("<endpoint-from-resource>", credential);

const phoneNumbers = client.listPurchasedPhoneNumbers();

for await (const phoneNumber of phoneNumbers) {
  console.log(`The id is the same as the phone number: ${phoneNumber.id}`);
  console.log(`Phone number type is ${phoneNumber.phoneNumberType}`);
}
```

### SipRoutingClient

#### Retrieve SIP trunks and routes

Get the list of currently configured trunks or routes.

```ts snippet:SipRoutingClientRetrieveTrunksAndRoutes
import { DefaultAzureCredential } from "@azure/identity";
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new SipRoutingClient("<endpoint-from-resource>", credential);

const trunks = client.listTrunks();
const routes = client.listRoutes();
for await (const trunk of trunks) {
  console.log(`Trunk ${trunk.fqdn}:${trunk.sipSignalingPort}`);
}

for await (const route of routes) {
  console.log(`Route ${route.name} with pattern ${route.numberPattern}`);
  console.log(`Route's trunks: ${route.trunks?.join()}`);
}
```

#### Replace SIP trunks and routes

Replace the list of currently configured trunks or routes with new values.

```ts snippet:SipRoutingClientReplaceTrunksAndRoutes
import { DefaultAzureCredential } from "@azure/identity";
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new SipRoutingClient("<endpoint-from-resource>", credential);

await client.setTrunks([
  {
    fqdn: "sbc.one.domain.com",
    sipSignalingPort: 1234,
  },
  {
    fqdn: "sbc.two.domain.com",
    sipSignalingPort: 1234,
  },
]);

await client.setRoutes([
  {
    name: "First Route",
    description: "route's description",
    numberPattern: "^+[1-9][0-9]{3,23}$",
    trunks: ["sbc.one.domain.com"],
  },
  {
    name: "Second Route",
    description: "route's description",
    numberPattern: "^.*$",
    trunks: ["sbc.two.domain.com", "sbc.one.domain.com"],
  },
]);
```

#### Retrieve single trunk

```ts snippet:SipRoutingClientRetrieveSingleTrunk
import { DefaultAzureCredential } from "@azure/identity";
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new SipRoutingClient("<endpoint-from-resource>", credential);

const trunk = await client.getTrunk("sbc.one.domain.com");
if (trunk) {
  console.log(`Trunk ${trunk.fqdn}:${trunk.sipSignalingPort}`);
} else {
  console.log("Trunk not found");
}
```

#### Set single trunk

```ts snippet:SipRoutingClientSetSingleTrunk
import { DefaultAzureCredential } from "@azure/identity";
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new SipRoutingClient("<endpoint-from-resource>", credential);

await client.setTrunk({
  fqdn: "sbc.one.domain.com",
  sipSignalingPort: 4321,
});
```

#### Delete single trunk

```ts snippet:SipRoutingClientDeleteSingleTrunk
import { DefaultAzureCredential } from "@azure/identity";
import { SipRoutingClient } from "@azure/communication-phone-numbers";

const credential = new DefaultAzureCredential();
const client = new SipRoutingClient("<endpoint-from-resource>", credential);

await client.deleteTrunk("sbc.one.domain.com");
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-phone-numbers/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://learn.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[azure_identity_readme]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md
