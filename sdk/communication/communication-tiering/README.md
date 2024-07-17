# Azure Communication Tiering client library for JavaScript

The Tiering client library allows developers to retrieve limits for each capability (SMS/PSTN Calling/Phone Number purchasing) for a specific resource/tier.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure-tools/communication-tiering
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

## Examples

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Tiering client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the `TieringClient` with any of the following methods:

### Using a connection string

```javascript
const { TieringClient } = require("@azure-tools/communication-tiering");
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new TieringClient(connectionString);
```

### Using an access key with `AzureKeyCredential`

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key and endpoint, you can authenticate with the following code:

```javascript
const { AzureKeyCredential } = require("@azure/core-auth");
const { TieringClient } = require("@azure-tools/communication-tiering");
const credential = new AzureKeyCredential("<key-from-resource>");
const client = new TieringClient("<endpoint-from-resource>", credential);
```

### Using an Azure Active Directory Credential

Connection string authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`][azure_identity_readme] provides more details and samples to get you started.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { TieringClient } = require("@azure-tools/communication-tiering");

let credential = new DefaultAzureCredential();
const client = new TieringClient("<endpoint-from-resource>", credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Tiering Client. The scenarios that are covered here consist of:

- [Get acquired number limits](#get-acquired-number-limits)
- [Get Tier Info](#get-tier-info)

### Get acquired number limits

```typescript
import { Tiering } from "@azure-tools/communication-tiering";
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new Tiering(connectionString);

async function main() {
  const resourceId = "5d41e908-de88-4bbf-94dc-fe9a1b51029b";

  // Get acquired numbers and limits for a resource
  var acquiredNumberLimits = await client.getAcquiredNumberLimits(resourceId);

  // print all number limits
  console.log(acquiredNumberLimits);
}

main();
```

### Get tier info

```typescript
import { Tiering } from "@azure-tools/communication-tiering";
const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new Tiering(connectionString);

async function main() {
  const resourceId = "5d41e908-de88-4bbf-94dc-fe9a1b51029b";

  // Get tier info for a resource
  var tierInfo = await client.getTierByResourceId(resourceId);

  // print all tier info
  console.log(tierInfo);
}

main();
```

## Troubleshooting

## Next steps

Please take a look at the samples directory for detailed examples on how to use this library.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-toll-free-verification%2FREADME.png)
