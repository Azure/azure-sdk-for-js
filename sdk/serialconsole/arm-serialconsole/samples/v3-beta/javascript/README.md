# @azure/arm-serialconsole client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-serialconsole in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getConsoleStatusSample.js][getconsolestatussample]                                                   | gets whether or not Serial Console is disabled for a given subscription x-ms-original-file: 2024-07-01/SerialConsoleStatus.json                           |
| [listOperationsSample.js][listoperationssample]                                                       | gets a list of Serial Console API operations. x-ms-original-file: 2024-07-01/GetOperationsExample.json                                                    |
| [serialConsoleOperationGroupDisableConsoleSample.js][serialconsoleoperationgroupdisableconsolesample] | disables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: 2024-07-01/DisableConsoleExamples.json |
| [serialConsoleOperationGroupEnableConsoleSample.js][serialconsoleoperationgroupenableconsolesample]   | enables the Serial Console service for all VMs and VM scale sets in the provided subscription x-ms-original-file: 2024-07-01/EnableConsoleExamples.json   |
| [serialPortsConnectSample.js][serialportsconnectsample]                                               | connect to serial port of the target resource x-ms-original-file: 2024-07-01/SerialPortConnectVM.json                                                     |
| [serialPortsCreateSample.js][serialportscreatesample]                                                 | creates or updates a serial port x-ms-original-file: 2024-07-01/CreateSerialPort.json                                                                     |
| [serialPortsGetSample.js][serialportsgetsample]                                                       | gets the configured settings for a serial port x-ms-original-file: 2024-07-01/GetSerialPort.json                                                          |
| [serialPortsListBySubscriptionsSample.js][serialportslistbysubscriptionssample]                       | handles requests to list all SerialPort resources in a subscription. x-ms-original-file: 2024-07-01/ListSerialPortSubscription.json                       |
| [serialPortsListSample.js][serialportslistsample]                                                     | lists all of the configured serial ports for a parent resource x-ms-original-file: 2024-07-01/ListSerialPort.json                                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node getConsoleStatusSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node getConsoleStatusSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[getconsolestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/getConsoleStatusSample.js
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/listOperationsSample.js
[serialconsoleoperationgroupdisableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/serialConsoleOperationGroupDisableConsoleSample.js
[serialconsoleoperationgroupenableconsolesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/serialConsoleOperationGroupEnableConsoleSample.js
[serialportsconnectsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/serialPortsConnectSample.js
[serialportscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/serialPortsCreateSample.js
[serialportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/serialPortsGetSample.js
[serialportslistbysubscriptionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/serialPortsListBySubscriptionsSample.js
[serialportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/serialconsole/arm-serialconsole/samples/v3-beta/javascript/serialPortsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-serialconsole?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/serialconsole/arm-serialconsole/README.md
