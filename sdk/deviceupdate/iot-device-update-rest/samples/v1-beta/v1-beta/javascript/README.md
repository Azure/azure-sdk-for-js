# Azure IoT Hub Device Update rest client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure IoT Hub Device Update rest in some common scenarios.

| **File Name**                 | **Description**                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [getDevice.js][getdevice]     | Demonstrates the use of a DeviceUpdateClient to get a specific device information in Device Update for IoT Hub. |
| [getUpdate.js][getupdate]     | Demonstrates the use of a DeviceUpdateClient to get a specific update version in Device Update for IoT Hub.     |
| [listUpdates.js][listupdates] | Demonstrates the use of a DeviceUpdateClient to list all updates in Device Update for IoT Hub.                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Iot Device Update instance][createinstance_azureiotdeviceupdateinstance]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node getDevice.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" INSTANCE_ID="<instance id>" DEVICEUPDATE_DEVICE="<deviceupdate device>" node getDevice.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getdevice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1-beta/javascript/getDevice.js
[getupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1-beta/javascript/getUpdate.js
[listupdates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1-beta/javascript/listUpdates.js
[apiref]: https://docs.microsoft.com/rest/api/deviceupdate/2021-06-01-preview/device-update
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureiotdeviceupdateinstance]: https://docs.microsoft.com/azure/iot-hub-device-update/understand-device-update
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceupdate/iot-device-update-rest/README.md
