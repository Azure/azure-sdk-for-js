# Azure Device Registry software update client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for the Azure Device Registry software update client.

Software Update for Device Registry is an Azure service that enables customers to publish updates for their IoT devices to the cloud, and then deploy that update to their devices (approve updates to groups of devices managed and provisioned in Device Registry). It leverages the proven security and reliability of the Windows Update platform, optimized for IoT devices. It works globally and knows when and how to update devices, enabling customers to focus on their business goals and let Software Update for Device Registry handle the updates.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/iot-device-registry-software-update)
- [Package (NPM)](https://www.npmjs.com/package/@azure/iot-device-registry-software-update)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/iot-device-registry-software-update?view=azure-node-preview)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/iot-device-registry-software-update` package

Install the Azure Device Registry software update client library for JavaScript with `npm`:

```bash
npm install @azure/iot-device-registry-software-update
```

### Create and authenticate a `DeviceRegistrySoftwareUpdateClient`

To create a client object to access the Azure Device Registry software update API, you need the resource endpoint hostname (without a protocol, for example `contoso.api.adu.microsoft.com`) and a `credential`. The Azure Device Registry software update client can use Microsoft Entra credentials to authenticate.
You can find the endpoint for your Azure Device Registry software update resource in the [Azure Portal][azure_portal]. If it is shown as a URL, pass only its hostname.

You can authenticate with Microsoft Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing Microsoft Entra token](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new Microsoft Entra application and grant access to Azure Device Registry software update** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create a Microsoft Entra application check out [this guide](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:ReadmeSampleCreateClient_Node
import { DeviceRegistrySoftwareUpdateClient } from "@azure/iot-device-registry-software-update";
import { DefaultAzureCredential } from "@azure/identity";

const client = new DeviceRegistrySoftwareUpdateClient(
  "contoso.api.adu.microsoft.com",
  new DefaultAzureCredential(),
);
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { DeviceRegistrySoftwareUpdateClient } from "@azure/iot-device-registry-software-update";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const client = new DeviceRegistrySoftwareUpdateClient("contoso.api.adu.microsoft.com", credential);
```

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### `DeviceRegistrySoftwareUpdateClient`

`DeviceRegistrySoftwareUpdateClient` is the primary interface for developers using the Azure Device Registry software update client library. Explore the methods on this client object to understand the different features of the Azure Device Registry software update service that you can access.

## Examples

### List software update providers

```ts snippet:ReadmeSampleListProviders
import { DeviceRegistrySoftwareUpdateClient } from "@azure/iot-device-registry-software-update";
import { DefaultAzureCredential } from "@azure/identity";

const client = new DeviceRegistrySoftwareUpdateClient(
  "contoso.api.adu.microsoft.com",
  new DefaultAzureCredential(),
);
for await (const provider of client.softwareUpdate.listProviders()) {
  console.log(provider);
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
