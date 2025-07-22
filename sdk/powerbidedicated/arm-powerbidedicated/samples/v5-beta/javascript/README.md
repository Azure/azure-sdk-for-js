# @azure/arm-powerbidedicated client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-powerbidedicated in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                          |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [autoScaleVCoresCreateSample.js][autoscalevcorescreatesample]                           | provisions the specified auto scale v-core based on the configuration specified in the request. x-ms-original-file: 2021-01-01/createAutoScaleVCore.json |
| [autoScaleVCoresDeleteSample.js][autoscalevcoresdeletesample]                           | deletes the specified auto scale v-core. x-ms-original-file: 2021-01-01/deleteAutoScaleVCore.json                                                        |
| [autoScaleVCoresGetSample.js][autoscalevcoresgetsample]                                 | gets details about the specified auto scale v-core. x-ms-original-file: 2021-01-01/getAutoScaleVCore.json                                                |
| [autoScaleVCoresListByResourceGroupSample.js][autoscalevcoreslistbyresourcegroupsample] | gets all the auto scale v-cores for the given resource group. x-ms-original-file: 2021-01-01/listAutoScaleVCoresInResourceGroup.json                     |
| [autoScaleVCoresListBySubscriptionSample.js][autoscalevcoreslistbysubscriptionsample]   | lists all the auto scale v-cores for the given subscription. x-ms-original-file: 2021-01-01/listAutoScaleVCoresInSubscription.json                       |
| [autoScaleVCoresUpdateSample.js][autoscalevcoresupdatesample]                           | updates the current state of the specified auto scale v-core. x-ms-original-file: 2021-01-01/updateAutoScaleVCore.json                                   |
| [capacitiesCheckNameAvailabilitySample.js][capacitieschecknameavailabilitysample]       | check the name availability in the target location. x-ms-original-file: 2021-01-01/checkNameAvailability.json                                            |
| [capacitiesCreateSample.js][capacitiescreatesample]                                     | provisions the specified Dedicated capacity based on the configuration specified in the request. x-ms-original-file: 2021-01-01/createCapacity.json      |
| [capacitiesDeleteSample.js][capacitiesdeletesample]                                     | deletes the specified Dedicated capacity. x-ms-original-file: 2021-01-01/deleteCapacity.json                                                             |
| [capacitiesGetDetailsSample.js][capacitiesgetdetailssample]                             | gets details about the specified dedicated capacity. x-ms-original-file: 2021-01-01/getCapacity.json                                                     |
| [capacitiesListByResourceGroupSample.js][capacitieslistbyresourcegroupsample]           | gets all the Dedicated capacities for the given resource group. x-ms-original-file: 2021-01-01/listCapacitiesInResourceGroup.json                        |
| [capacitiesListSample.js][capacitieslistsample]                                         | lists all the Dedicated capacities for the given subscription. x-ms-original-file: 2021-01-01/listCapacitiesInSubscription.json                          |
| [capacitiesListSkusForCapacitySample.js][capacitieslistskusforcapacitysample]           | lists eligible SKUs for a PowerBI Dedicated resource. x-ms-original-file: 2021-01-01/listSKUsForExisting.json                                            |
| [capacitiesListSkusSample.js][capacitieslistskussample]                                 | lists eligible SKUs for PowerBI Dedicated resource provider. x-ms-original-file: 2021-01-01/listSKUsForNew.json                                          |
| [capacitiesResumeSample.js][capacitiesresumesample]                                     | resumes operation of the specified Dedicated capacity instance. x-ms-original-file: 2021-01-01/resumeCapacity.json                                       |
| [capacitiesSuspendSample.js][capacitiessuspendsample]                                   | suspends operation of the specified dedicated capacity instance. x-ms-original-file: 2021-01-01/suspendCapacity.json                                     |
| [capacitiesUpdateSample.js][capacitiesupdatesample]                                     | updates the current state of the specified Dedicated capacity. x-ms-original-file: 2021-01-01/updateCapacity.json                                        |
| [operationsListSample.js][operationslistsample]                                         | list the operations for the provider x-ms-original-file: 2021-01-01/operations.json                                                                      |

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
node autoScaleVCoresCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node autoScaleVCoresCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autoscalevcorescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/autoScaleVCoresCreateSample.js
[autoscalevcoresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/autoScaleVCoresDeleteSample.js
[autoscalevcoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/autoScaleVCoresGetSample.js
[autoscalevcoreslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/autoScaleVCoresListByResourceGroupSample.js
[autoscalevcoreslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/autoScaleVCoresListBySubscriptionSample.js
[autoscalevcoresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/autoScaleVCoresUpdateSample.js
[capacitieschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesCheckNameAvailabilitySample.js
[capacitiescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesCreateSample.js
[capacitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesDeleteSample.js
[capacitiesgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesGetDetailsSample.js
[capacitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesListByResourceGroupSample.js
[capacitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesListSample.js
[capacitieslistskusforcapacitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesListSkusForCapacitySample.js
[capacitieslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesListSkusSample.js
[capacitiesresumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesResumeSample.js
[capacitiessuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesSuspendSample.js
[capacitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/capacitiesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-powerbidedicated?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/powerbidedicated/arm-powerbidedicated/README.md
