# Azure Communication Phone Numbers client library for JavaScript

The phone numbers library provides capabilities for phone number administration.

Acquired phone numbers can come with many capabilities, depending on the country, number type and phone plan. Examples of capabilities are SMS inbound and outbound usage, PSTN inbound and outbound usage. Phone numbers can also be assigned to a bot via a webhook URL.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the[Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-phone-numbers
```

## Key concepts

The phone numbers package exposes the `PhoneNumbersClient` which provides methods to manage phone numbers.

### Phone plans overview

Phone plans come in two types; Geographic and Toll-Free. Geographic phone plans are phone plans associated with a location, whose phone numbers' area codes are associated with the area code of a geographic location. Toll-Free phone plans are phone plans not associated location. For example, in the US, toll-free numbers can come with area codes such as 800 or 888.

All geographic phone plans within the same country are grouped into a phone plan group with a Geographic phone number type. All Toll-Free phone plans within the same country are grouped into a phone plan group.

### Searching and acquiring numbers

Phone numbers can be search through the search creation API by providing a phone plan id, an area code and quantity of phone numbers. The provided quantity of phone numbers will be reserved for ten minutes. This search of phone numbers can either be cancelled or purchased. If the search is cancelled, then the phone numbers will become available to others. If the search is purchased, then the phone numbers are acquired for the Azure resources.

### Configuring and assigning numbers

Phone numbers can be assigned to a callback URL via the update number API. As part of the configuration, you will need an acquired phone number, callback URL and application id.

## Examples

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Phone Numbers client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the `PhoneNumbersClient` with any of the following methods:

### Create `KeyCredential` with `AzureKeyCredential`

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const credential = new AzureKeyCredential(KEY);
const client = new PhoneNumbersClient(endpoint, credential);
```

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal].

### Using a connection string

```typescript
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

const connectionString = `endpoint=HOST;accessKey=KEY`;
const client = new PhoneNumbersClient(connectionString);
```

### Using an Azure Active Directory Credential

Client API key authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The README for @azure/identity provides more details and samples to get you started.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { PhoneNumbersClient } from "@azure/communication-phone-numbers";

let credential = new DefaultAzureCredential();
const client = new PhoneNumbersClient(endpoint, credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Phone Numbers client. The scenarios that are covered here consist of:

- [Search for available phone numbers to purchase](#search-for-available-phone-numbers)
- [Purchase phone numbers from a search](#purchase-phone-numbers-from-a-search)
- [Release an acquired phone number](#release-an-acquired-phone-number)
- [Get an acquired phone number](#get-an-acquired-phone-number)
- [Update an acquired phone number](#update-an-acquired-phone-number)
- [List acquired phone numbers](#list-acquired-phone-numbers)

### Search for available phone numbers

Use the `beginSearchAvailablePhoneNumbers` method to search for phone numbers and reserve them. This is a long running operation.

### Purchase phone numbers from a search

Use the `beginPurchasePhoneNumbers` method to purchase the phone numbers from your search. The `id` returned from `beginSearchAvailablePhoneNumbers` is required. `beginPurchasePhoneNumbers` is also a long running operation.

### Release an acquired phone number

Use the `beginReleasePhoneNumber` method to release a previously acquired phone number. This is a long running operation.

### Get an acquired phone number

Use the `getPhoneNumber` method to get an acquired phone number.

### Update an acquired phone number

Use the `updatePhoneNumber` method to update the `callbackUri` and `applicationId` of an acquired phone number.

### List acquired phone numbers

Use the `listPhoneNumbers` method to page through all acquired phone numbers.

## Troubleshooting

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/communication-phone-numbers/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-administration%2FREADME.png)
