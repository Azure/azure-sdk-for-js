# Azure Communication Administration client library for JavaScript

The administration library is used for managing users and tokens for Azure Communication Services. This library also provides capabilities for phone number administration.

Acquired phone numbers can come with many capabilities, depending on the country, number type and phone plan. Examples of capabilities are SMS inbound and outbound usage, PSTN inbound and outbound usage. Phone numbers can also be assigned to a bot via a webhook URL.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-administration
```

## Key concepts

### Clients

The administration package exposes two clients. The `CommunicationIdentityClient` provides methods to manage users and their tokens. The `PhoneNumberAdministrationClient` provides methods to manage phone plans and numbers.

### Phone plans overview

Phone plans come in two types; Geographic and Toll-Free. Geographic phone plans are phone plans associated with a location, whose phone numbers' area codes are associated with the area code of a geographic location. Toll-Free phone plans are phone plans not associated location. For example, in the US, toll-free numbers can come with area codes such as 800 or 888.

All geographic phone plans within the same country are grouped into a phone plan group with a Geographic phone number type. All Toll-Free phone plans within the same country are grouped into a phone plan group.

### Searching and acquiring numbers

Phone numbers can be search through the search creation API by providing a phone plan id, an area code and quantity of phone numbers. The provided quantity of phone numbers will be reserved for ten minutes. This search of phone numbers can either be cancelled or purchased. If the search is cancelled, then the phone numbers will become available to others. If the search is purchased, then the phone numbers are acquired for the Azure resources.

### Configuring and assigning numbers

Phone numbers can be assigned to a callback URL via the configure number API. As part of the configuration, you will need an acquired phone number, callback URL and application id.

## Examples

## Authentication

You can get a key and/or connection string from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key, you can authenticate the `CommunicationIdentityClient` and `PhoneNumberAdministrationClient` with any of the following methods:

### Create `KeyCredential` with `AzureKeyCredential` before initializing the client

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { CommunicationIdentityClient } from "@azure/communication-administration";

const credential = new AzureKeyCredential(KEY);
const client = new CommunicationIdentityClient(HOST, credential);
```

### Using a connection string

```typescript
import { PhoneNumberAdministrationClient } from "@azure/communication-administration";

const connectionString = `endpoint=HOST;accessKey=KEY`;
const client = new CommunicationIdentityClient(connectionString);
```

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal].

## Usage

### CommunicationIdentityClient

### Creating an instance of CommunicationIdentityClient

```typescript
import { CommunicationIdentityClient } from "@azure/communication-administration";

const client = new CommunicationIdentityClient(CONNECTION_STRING);
```

#### Creating a new user

Use the `createUser` method to create a new user.

```typescript
const user = await client.createUser();
```

#### Creating and refreshing a user token

Use the `issueToken` method to issue or refresh a token for an existing user. The method also takes in a list of communication token scopes. Scope options include:

- `chat` (Chat)
- `pstn` (Public switched telephone network)
- `voip` (Voice over IP)

```typescript
let { token } = await client.issueToken(user, ["chat"]);
```

To refresh the user token, issue another token with the same user.

```typescript
{ token } = await client.issueToken(user, ["chat"]);
```

#### Revoking tokens for a user

Use the `revokeTokens` method to revoke all the issued tokens of a user.

```typescript
await client.revokeTokens(user);
```

`revokeTokens` takes an optional second argument, `tokensValidFrom`. If this date is provided, `revokeTokens` will revoke all tokens issued before it. Otherwise, all tokens will be revoked.

#### Deleting a user

Use the `deleteUser` method to delete a user.

```typescript
await client.deleteUser(user);
```

### PhoneNumberAdministrationClient

#### Creating an instance of PhoneNumberAdministrationClient

```typescript
import { CommunicationIdentityClient } from "@azure/communication-administration";

const client = new CommunicationIdentityClient(CONNECTION_STRING);
```

#### Getting countries

Use the `listSupportedCountries` method to get a list of the supported countries.

```typescript
const countries = await client.listSupportedCountries();

for await (const country of countries) {
  console.log(`Country code: ${country.countryCode}`);
  console.log(`Country name: ${country.localizedName}`);
}
```

#### Getting phone plan groups

Phone plan groups come in two types, Geographic and Toll-Free. Use the `listPhonePlanGroups` method to get them.

```typescript
const countryCode = "US";
const phonePlanGroups = await client.listPhonePlanGroups(countryCode);

for await (const phonePlanGroup of phonePlanGroups) {
  console.log(`Phone plan group id: ${phonePlanGroup.phonePlanGroupId}`);
}
```

#### Getting location options

For Geographic phone plans, you can query the available geographic locations. The locations options are structured like the geographic hierarchy of a country. For example, the US has states and within each state are cities.

Use the `getPhonePlanLocationOptions` method to get the options for a location.

```typescript
const { locationOptions } = await client.getPhonePlanLocationOptions({
  countryCode: "US",
  phonePlanGroupId: "phonePlanGroupId",
  phonePlanId: "phonePlanId"
});

console.log(`Got location options for: ${locationOptions.labelId}`);
```

#### Getting area codes

Fetching area codes for geographic phone plans will require the the location options queries set. You must include the chain of geographic locations traversing down the location options object returned by the `getPhonePlanLocationOptions`.

Use the `getAreaCodes` method to get the area codes for geographic phone plans.

```typescript
const { primaryAreaCodes } = await client.getAreaCodes({
  locationType: "selection",
  countryCode: "US",
  phonePlanId: "phonePlanId",
  locationOptionsQueries
});
```

#### Reserving phone numbers for purchase

Use the `beginReservePhoneNumbers` method to search for phone numbers and reserve them. This is a long running operation.

```typescript
const reservePoller = await client.beginReservePhoneNumbers({
    name: "Phone number search 800",
    description: "Search for 800 phone numbers"
    phonePlanIds: ["phone-plan-id-1"],
    areaCode: "800",
    quantity: 3
});
```

To get the results of the reservation, use the `pollUntilDone` method on the poller you created.

```typescript
const phoneNumberReservation = await reservePoller.pollUntilDone();
```

You can cancel the the polling and reservation by calling the `cancelOperation` method on the poller you created.

```typescript
await reservePoller.cancelOperation();
```

#### Purchasing phone numbers from a reservation

Use the `beginPurchasePhoneNumbers` method to purchase the phone numbers from your reservation. The `reservationId` returned from `beginReservePhoneNumbers` is required. `beginPurchasePhoneNumbers` is also a long running operation.

```typescript
const { reservationId } = phoneNumberReservation;
const purchasePoller = await client.beginPurchasePhoneNumbers(reservationId);
```

To get the results of the purchase, use the `pollUntilDone` method on the purchase poller you created.

```typescript
const results = await purchasePoller.pollUntilDone();
```

## Troubleshooting

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-administration/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-administration%2FREADME.png)
