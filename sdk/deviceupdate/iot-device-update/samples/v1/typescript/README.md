---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-iot
urlFragment: iot-device-update-typescript
---

# Azure IoT Hub Device Update client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure IoT Hub Device Update in some common scenarios.

| **File Name**         | **Description**                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [updates.ts][updates] | Demonstrates the use of a DeviceUpdateClient to list all the update providers that have been imported to Device Update for IoT Hub |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/updates.ts
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ACCOUNT_ENDPOINT="<account endpoint>" INSTANCE_ID="<instance id>" node dist/updates.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[updates]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/deviceupdate/iot-device-update/samples/v1/typescript/src/updates.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/iot-device-update
[freesub]: https://azure.microsoft.com/free/
[createinstance_azuredeviceupdateforiothubinstance]: https://docs.microsoft.com/azure/iot-hub-device-update/understand-device-update
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/deviceupdate/iot-device-update/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
