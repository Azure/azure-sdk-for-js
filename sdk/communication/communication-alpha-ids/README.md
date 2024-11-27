# Azure Communication Alpha IDs client library for JavaScript

The Alpha IDs library provides capabilities for Alpha IDs administration.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure-tools/communication-alpha-ids
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

## Examples

## Authentication

To create a client object to access the Communication Services API, you will need a `connection string` or the `endpoint` of your Communication Services resource and a `credential`. The Alpha IDs client can use either Azure Active Directory credentials or an API key credential to authenticate.

You can get a key and/or connection string from your Communication Services resource in the [Azure Portal][azure_portal]. You can also find the endpoint for your Communication Services resource in the [Azure Portal][azure_portal].

Once you have a key, you can authenticate the `AlphaIdsClient` with any of the following methods:

### Using a connection string

```javascript
const { AlphaIdsClient } = require("@azure-tools/communication-alpha-ids");

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new AlphaIdsClient(connectionString);
```

### Using an access key with `AzureKeyCredential`

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key and endpoint, you can authenticate with the following code:

```javascript
const { AzureKeyCredential } = require("@azure/core-auth");
const { AlphaIdsClient } = require("@azure-tools/communication-alpha-ids");

const credential = new AzureKeyCredential("<key-from-resource>");
const client = new AlphaIdsClient("<endpoint-from-resource>", credential);
```

### Using an Azure Active Directory Credential

Connection string authentication is used in most of the examples, but you can also authenticate with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the [`@azure/identity`][azure_identity] package:

```bash
npm install @azure/identity
```

The [`@azure/identity`][azure_identity] package provides a variety of credential types that your application can use to do this. The [README for `@azure/identity`][azure_identity_readme] provides more details and samples to get you started.

```javascript
const { DefaultAzureCredential } = require ("@azure/identity");
const { AlphaIdsClient } = require("@azure-tools/communication-alpha-ids");

const credential = new DefaultAzureCredential();
const client = new AlphaIdsClient("<endpoint-from-resource>", credential);
```

## Usage

The following sections provide code snippets that cover some of the common tasks using the Azure Communication Services Alpha IDs client. The scenarios that are covered here consist of:

- [Get the current applied configuration](#get-the-current-applied-configuration)

### Get the current applied configuration
Use the `getConfiguration` method to obtain the current applied configuration for your resource.

```javascript
const { AlphaIdsClient } = require("@azure-tools/communication-alpha-ids");

const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
const client = new AlphaIdsClient(connectionString);

// get the current configuration
const configuration = await client.getConfiguration();

console.log(`Usage of Alpha IDs is currently ${(configuration.enabled ? "enabled" : "disabled")}`);
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
![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-alpha-ids%2FREADME.png)
