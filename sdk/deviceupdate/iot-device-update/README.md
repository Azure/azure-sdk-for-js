# Azure Device Update for IoT Hub client library for JavaScript

The library provides access to the Device Update for IoT Hub service that enables customers to publish updates for their IoT devices to the cloud, and then deploy these updates to their devices (approve updates to groups of devices managed and provisioned in IoT Hub).

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk) | [Product documentation](https://docs.microsoft.com/en-us/azure/iot-hub-device-update/understand-device-update)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Prerequisites

- Microsoft Azure Subscription: To call Microsoft Azure services, you need to create an [Azure subscription](https://azure.microsoft.com/free/)
- Device Update for IoT Hub instance
- Azure IoT Hub instance

### Install the `@azure/iot-device-update` package

Install the Azure Device Update for IoT Hub client library for JavaScript with `npm`:

```bash
npm install @azure/iot-device-update
```

## Key concepts

Device Update for IoT Hub is a managed service that enables you to deploy over-the-air updates for your IoT devices. The client library has three main components:

- **Updates**: update management (import, enumerate, delete, etc.)
- **Devices**: device management (enumerate devices and retrieve device properties)
- **Deployments**: deployment management (start and monitor update deployments to a set of devices)

You can learn more about Device Update for IoT Hub by visiting [Device Update for IoT Hub](https://github.com/azure/iot-hub-device-update).

## Examples

You can familiarize yourself with different APIs using [Samples](./src/samples).

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fdeviceupdate%2Fiot-device-update%2FREADME.png)
