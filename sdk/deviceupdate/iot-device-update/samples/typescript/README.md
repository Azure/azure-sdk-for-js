---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-iot-device-update
urlFragment: azure-iot-device-update-typescript
---

# Azure Device Update for IoT Hub client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Device Update for IoT Hub in some common scenarios.

| **File Name**                          | **Description**                                                     |
| -------------------------------------- | ------------------------------------------------------------------- |
| [updates.ts][alternativedocumentinput] | Shows how to use some list operations for Device Update for IoT Hub |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs. Samples retrieve credentials to access the Device Update for IoT Hub endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/updates.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[updates]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/deviceupdate/iot-device-update/samples/typescript/src/updates.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/iot-device-update
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/deviceupdate/iot-device-update/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
