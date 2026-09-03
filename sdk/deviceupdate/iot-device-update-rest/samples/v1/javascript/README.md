# Azure IoT Hub Device Update rest client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure IoT Hub Device Update rest in some common scenarios.

| **File Name**                   | **Description**                                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [deleteUpdate.js][deleteupdate] | Demonstrates the use of a Update Delete.                                                                        |
| [deployUpdate.js][deployupdate] | Demonstrates the use of a Update Deployment.                                                                    |
| [getDevice.js][getdevice]       | Demonstrates the use of a DeviceUpdateClient to get a specific device information in Device Update for IoT Hub. |
| [getUpdate.js][getupdate]       | Demonstrates the use of a DeviceUpdateClient to get a specific update version in Device Update for IoT Hub.     |
| [importUpdate.js][importupdate] | Demonstrates the use of a Update Import.                                                                        |
| [listUpdates.js][listupdates]   | Demonstrates the use of a DeviceUpdateClient to list all updates in Device Update for IoT Hub.                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node deleteUpdate.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ENDPOINT="<endpoint>" INSTANCE_ID="<instance id>" DEVICEUPDATE_UPDATE_PROVIDER="<deviceupdate update provider>" DEVICEUPDATE_UPDATE_NAME="<deviceupdate update name>" DEVICEUPDATE_UPDATE_VERSION="<deviceupdate update version>" node deleteUpdate.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deleteupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1/javascript/deleteUpdate.js
[deployupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1/javascript/deployUpdate.js
[getdevice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1/javascript/getDevice.js
[getupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1/javascript/getUpdate.js
[importupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1/javascript/importUpdate.js
[listupdates]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceupdate/iot-device-update-rest/samples/v1/javascript/listUpdates.js
[apiref]: https://learn.microsoft.com/rest/api/deviceupdate/2021-06-01-preview/device-update
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureiotdeviceupdateinstance]: https://learn.microsoft.com/azure/iot-hub-device-update/understand-device-update
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceupdate/iot-device-update-rest/README.md
