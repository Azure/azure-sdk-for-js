# Azure Communication Network Traversal client library for JavaScript

Azure Communication Network Traversal is managing tokens for Azure Communication Services. 

It will provide TURN credentials to a user.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the[Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-network-traversal
npm install @azure/communication-identity
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

## Examples

## Authentication

You can get a key and/or connection string from your Communication Services resource in [Azure Portal][azure_portal]. Once you have a key, you can authenticate the `CommunicationRelayClient` with any of the following methods:

### Create `KeyCredential` with `AzureKeyCredential` before initializing the client

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { CommunicationRelayClient } from "@azure/communication-network-traversal";

const credential = new AzureKeyCredential(KEY);
const client = new CommunicationRelayClient(ENDPOINT, credential);
```

### Using a connection string

```typescript
import { CommunicationRelayClient } from "@azure/communication-network-traversal";

const connectionString = `endpoint=ENDPOINT;accessKey=KEY`;
const client = new CommunicationRelayClient(connectionString);
```

### Using a `TokenCredential`

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { CommunicationRelayClient } from "@azure/communication-network-traversal";

const credential = new DefaultAzureCredential();
const client = new CommunicationRelayClient(ENDPOINT, credential);
```

If you use a key to initialize the client you will also need to provide the appropriate endpoint. You can get this endpoint from your Communication Services resource in [Azure Portal][azure_portal].

## Usage

### Creating an instance of CommunicationRelayClient

```typescript
import { CommunicationRelayClient } from "@azure/communication-network-traversal";

const client = new CommunicationRelayClient(CONNECTION_STRING);
```

### Creating an instance of CommunicationIdentityClient to create a user

```typescript
import { CommunicationIdentityClient } from "@azure/communication-identity";

const client = new CommunicationIdentityClient(CONNECTION_STRING);
```

Use the `createUser` method to create a new user.

```typescript
const user = await client.createUser();
```

### Getting the configurationRelay

Use the `getConfigurationRelay` method to get new TURN credentials providing a user

```typescript
const config = relayClient.getRelayConfiguration(user);
```

Also you can call the `getConfigurationRelay` method without providing a user

```typescript
const config = relayClient.getRelayConfiguration();
```

You can specify a RouteType when calling `getConfigurationRelay`

```typescript
const config = relayClient.getRelayConfiguration(user, "nearest");
```

## Troubleshooting

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/communication-network-traversal/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js)
