# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [disableConsoleSample.js][disableconsolesample]                                 | Disables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/DisableConsoleExamples.json |
| [enableConsoleSample.js][enableconsolesample]                                   | Enables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/EnableConsoleExamples.json   |
| [getConsoleStatusSample.js][getconsolestatussample]                             | Gets whether or not Serial Console is disabled for a given subscription x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/SerialConsoleStatus.json                           |
| [listOperationsSample.js][listoperationssample]                                 | Gets a list of Serial Console API operations. x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/GetOperationsExample.json                                                    |
| [serialPortsConnectSample.js][serialportsconnectsample]                         | Connect to serial port of the target resource x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/SerialPortConnectVMSS.json                                                   |
| [serialPortsCreateSample.js][serialportscreatesample]                           | Creates or updates a serial port x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/CreateSerialPort.json                                                                     |
| [serialPortsDeleteSample.js][serialportsdeletesample]                           | Deletes a serial port x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/DeleteSerialPort.json                                                                                |
| [serialPortsGetSample.js][serialportsgetsample]                                 | Gets the configured settings for a serial port x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/GetSerialPort.json                                                          |
| [serialPortsListBySubscriptionsSample.js][serialportslistbysubscriptionssample] | Handles requests to list all SerialPort resources in a subscription. x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/ListSerialPortSubscription.json                       |
| [serialPortsListSample.js][serialportslistsample]                               | Lists all of the configured serial ports for a parent resource x-ms-original-file: specification/serialconsole/resource-manager/Microsoft.SerialConsole/stable/2018-05-01/examples/ListSerialPort.json                                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] to run these sample programs.

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
node disableConsoleSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node disableConsoleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[disableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/disableConsoleSample.js
[enableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/enableConsoleSample.js
[getconsolestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/getConsoleStatusSample.js
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/listOperationsSample.js
[serialportsconnectsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/serialPortsConnectSample.js
[serialportscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/serialPortsCreateSample.js
[serialportsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/serialPortsDeleteSample.js
[serialportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/serialPortsGetSample.js
[serialportslistbysubscriptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/serialPortsListBySubscriptionsSample.js
[serialportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v2/javascript/serialPortsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-serialconsole?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/serialconsole/arm-serialconsole/README.md
