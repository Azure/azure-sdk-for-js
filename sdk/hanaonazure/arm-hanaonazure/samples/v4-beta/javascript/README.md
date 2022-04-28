# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                   | Gets a list of SAP HANA management operations. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/HanaOperations_List.json                                                                                           |
| [providerInstancesCreateSample.js][providerinstancescreatesample] | Creates a provider instance for the specified subscription, resource group, SapMonitor name, and resource name. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/ProviderInstances_Create.json                     |
| [providerInstancesDeleteSample.js][providerinstancesdeletesample] | Deletes a provider instance for the specified subscription, resource group, SapMonitor name, and resource name. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/ProviderInstances_Delete.json                     |
| [providerInstancesGetSample.js][providerinstancesgetsample]       | Gets properties of a provider instance for the specified subscription, resource group, SapMonitor name, and resource name. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/ProviderInstances_Get.json             |
| [providerInstancesListSample.js][providerinstanceslistsample]     | Gets a list of provider instances in the specified SAP monitor. The operations returns various properties of each provider instances. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/ProviderInstances_List.json |
| [sapMonitorsCreateSample.js][sapmonitorscreatesample]             | Creates a SAP monitor for the specified subscription, resource group, and resource name. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_Create.json                                                  |
| [sapMonitorsDeleteSample.js][sapmonitorsdeletesample]             | Deletes a SAP monitor with the specified subscription, resource group, and monitor name. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_Delete.json                                                  |
| [sapMonitorsGetSample.js][sapmonitorsgetsample]                   | Gets properties of a SAP monitor for the specified subscription, resource group, and resource name. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_Get.json                                          |
| [sapMonitorsListSample.js][sapmonitorslistsample]                 | Gets a list of SAP monitors in the specified subscription. The operations returns various properties of each SAP monitor. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_List.json                   |
| [sapMonitorsUpdateSample.js][sapmonitorsupdatesample]             | Patches the Tags field of a SAP monitor for the specified subscription, resource group, and monitor name. x-ms-original-file: specification/hanaonazure/resource-manager/Microsoft.HanaOnAzure/preview/2020-02-07-preview/examples/SapMonitors_PatchTags_Delete.json                       |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/operationsListSample.js
[providerinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/providerInstancesCreateSample.js
[providerinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/providerInstancesDeleteSample.js
[providerinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/providerInstancesGetSample.js
[providerinstanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/providerInstancesListSample.js
[sapmonitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/sapMonitorsCreateSample.js
[sapmonitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/sapMonitorsDeleteSample.js
[sapmonitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/sapMonitorsGetSample.js
[sapmonitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/sapMonitorsListSample.js
[sapmonitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hanaonazure/arm-hanaonazure/samples/v4-beta/javascript/sapMonitorsUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hanaonazure?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hanaonazure/arm-hanaonazure/README.md
