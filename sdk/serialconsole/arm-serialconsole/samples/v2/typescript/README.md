# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [disableConsoleSample.ts][disableconsolesample]                                 | Disables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/DisableConsoleExamples.json |
| [enableConsoleSample.ts][enableconsolesample]                                   | Enables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/EnableConsoleExamples.json   |
| [getConsoleStatusSample.ts][getconsolestatussample]                             | Gets whether or not Serial Console is disabled for a given subscription x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/SerialConsoleStatus.json                           |
| [listOperationsSample.ts][listoperationssample]                                 | Gets a list of Serial Console API operations. x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/GetOperationsExample.json                                                    |
| [serialPortsConnectSample.ts][serialportsconnectsample]                         | Connect to serial port of the target resource x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/SerialPortConnectVMSS.json                                                   |
| [serialPortsCreateSample.ts][serialportscreatesample]                           | Creates or updates a serial port x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/CreateSerialPort.json                                                                     |
| [serialPortsDeleteSample.ts][serialportsdeletesample]                           | Deletes a serial port x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/DeleteSerialPort.json                                                                                |
| [serialPortsGetSample.ts][serialportsgetsample]                                 | Gets the configured settings for a serial port x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/GetSerialPort.json                                                          |
| [serialPortsListBySubscriptionsSample.ts][serialportslistbysubscriptionssample] | Handles requests to list all SerialPort resources in a subscription. x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/ListSerialPortSubscription.json                       |
| [serialPortsListSample.ts][serialportslistsample]                               | Lists all of the configured serial ports for a parent resource x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/ListSerialPort.json                                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/disableConsoleSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/disableConsoleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[disableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/disableConsoleSample.ts
[enableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/enableConsoleSample.ts
[getconsolestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/getConsoleStatusSample.ts
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/listOperationsSample.ts
[serialportsconnectsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/serialPortsConnectSample.ts
[serialportscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/serialPortsCreateSample.ts
[serialportsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/serialPortsDeleteSample.ts
[serialportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/serialPortsGetSample.ts
[serialportslistbysubscriptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/serialPortsListBySubscriptionsSample.ts
[serialportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/typescript/src/serialPortsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-serialconsole?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/serialconsole/arm-serialconsole/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
