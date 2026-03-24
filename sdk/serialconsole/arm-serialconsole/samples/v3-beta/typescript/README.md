# @azure/arm-serialconsole client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-serialconsole in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getConsoleStatusSample.ts][getconsolestatussample]                                                   | gets whether or not Serial Console is disabled for a given subscription x-ms-original-file: 2024-07-01/SerialConsoleStatus.json                           |
| [listOperationsSample.ts][listoperationssample]                                                       | gets a list of Serial Console API operations. x-ms-original-file: 2024-07-01/GetOperationsExample.json                                                    |
| [serialConsoleOperationGroupDisableConsoleSample.ts][serialconsoleoperationgroupdisableconsolesample] | disables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: 2024-07-01/DisableConsoleExamples.json |
| [serialConsoleOperationGroupEnableConsoleSample.ts][serialconsoleoperationgroupenableconsolesample]   | enables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: 2024-07-01/EnableConsoleExamples.json   |
| [serialPortsConnectSample.ts][serialportsconnectsample]                                               | connect to serial port of the target resource x-ms-original-file: 2024-07-01/SerialPortConnectVM.json                                                     |
| [serialPortsCreateSample.ts][serialportscreatesample]                                                 | creates or updates a serial port x-ms-original-file: 2024-07-01/CreateSerialPort.json                                                                     |
| [serialPortsGetSample.ts][serialportsgetsample]                                                       | gets the configured settings for a serial port x-ms-original-file: 2024-07-01/GetSerialPort.json                                                          |
| [serialPortsListBySubscriptionsSample.ts][serialportslistbysubscriptionssample]                       | handles requests to list all SerialPort resources in a subscription. x-ms-original-file: 2024-07-01/ListSerialPortSubscription.json                       |
| [serialPortsListSample.ts][serialportslistsample]                                                     | lists all of the configured serial ports for a parent resource x-ms-original-file: 2024-07-01/ListSerialPort.json                                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
node dist/getConsoleStatusSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/getConsoleStatusSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getconsolestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/getConsoleStatusSample.ts
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/listOperationsSample.ts
[serialconsoleoperationgroupdisableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/serialConsoleOperationGroupDisableConsoleSample.ts
[serialconsoleoperationgroupenableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/serialConsoleOperationGroupEnableConsoleSample.ts
[serialportsconnectsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/serialPortsConnectSample.ts
[serialportscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/serialPortsCreateSample.ts
[serialportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/serialPortsGetSample.ts
[serialportslistbysubscriptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/serialPortsListBySubscriptionsSample.ts
[serialportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/typescript/src/serialPortsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-serialconsole?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/serialconsole/arm-serialconsole/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
