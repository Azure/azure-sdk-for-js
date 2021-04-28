---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-iot
urlFragment: iot-device-update-javascript
---

# Azure Text Analytics client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Text Analytics in some common scenarios.

| **File Name**         | **Description**                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [updates.js][updates] | Demonstrates the use of a DeviceUpdateClient to list all the update providers that have been imported to Device Update for IoT Hub |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Device Update for IoT Hub instance][createinstance_azuredeviceupdateforiothubinstance]

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
node updates.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_ENDPOINT="<account endpoint>" INSTANCE_ID="<instance id>" node updates.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[updates]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/deviceupdate/iot-device-update/samples/v1/javascript/updates.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/iot-device-update
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuredeviceupdateforiothubinstance]: https://docs.microsoft.com/azure/iot-hub-device-update/understand-device-update
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/deviceupdate/iot-device-update/README.md
