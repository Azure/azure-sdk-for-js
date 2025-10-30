# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [autoScaleVCoresCreateSample.js][autoscalevcorescreatesample]                           | Provisions the specified auto scale v-core based on the configuration specified in the request. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/createAutoScaleVCore.json |
| [autoScaleVCoresDeleteSample.js][autoscalevcoresdeletesample]                           | Deletes the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/deleteAutoScaleVCore.json                                                        |
| [autoScaleVCoresGetSample.js][autoscalevcoresgetsample]                                 | Gets details about the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/getAutoScaleVCore.json                                                |
| [autoScaleVCoresListByResourceGroupSample.js][autoscalevcoreslistbyresourcegroupsample] | Gets all the auto scale v-cores for the given resource group. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listAutoScaleVCoresInResourceGroup.json                     |
| [autoScaleVCoresListBySubscriptionSample.js][autoscalevcoreslistbysubscriptionsample]   | Lists all the auto scale v-cores for the given subscription. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listAutoScaleVCoresInSubscription.json                       |
| [autoScaleVCoresUpdateSample.js][autoscalevcoresupdatesample]                           | Updates the current state of the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateAutoScaleVCore.json                                   |
| [capacitiesCheckNameAvailabilitySample.js][capacitieschecknameavailabilitysample]       | Check the name availability in the target location. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/checkNameAvailability.json                                            |
| [capacitiesCreateSample.js][capacitiescreatesample]                                     | Provisions the specified Dedicated capacity based on the configuration specified in the request. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/createCapacity.json      |
| [capacitiesDeleteSample.js][capacitiesdeletesample]                                     | Deletes the specified Dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/deleteCapacity.json                                                             |
| [capacitiesGetDetailsSample.js][capacitiesgetdetailssample]                             | Gets details about the specified dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/getCapacity.json                                                     |
| [capacitiesListByResourceGroupSample.js][capacitieslistbyresourcegroupsample]           | Gets all the Dedicated capacities for the given resource group. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listCapacitiesInResourceGroup.json                        |
| [capacitiesListSample.js][capacitieslistsample]                                         | Lists all the Dedicated capacities for the given subscription. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listCapacitiesInSubscription.json                          |
| [capacitiesListSkusForCapacitySample.js][capacitieslistskusforcapacitysample]           | Lists eligible SKUs for a PowerBI Dedicated resource. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listSKUsForExisting.json                                            |
| [capacitiesListSkusSample.js][capacitieslistskussample]                                 | Lists eligible SKUs for PowerBI Dedicated resource provider. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listSKUsForNew.json                                          |
| [capacitiesResumeSample.js][capacitiesresumesample]                                     | Resumes operation of the specified Dedicated capacity instance. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/resumeCapacity.json                                       |
| [capacitiesSuspendSample.js][capacitiessuspendsample]                                   | Suspends operation of the specified dedicated capacity instance. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/suspendCapacity.json                                     |
| [capacitiesUpdateSample.js][capacitiesupdatesample]                                     | Updates the current state of the specified Dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateCapacity.json                                        |

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
cross-env POWERBIDEDICATED_SUBSCRIPTION_ID="<powerbidedicated subscription id>" POWERBIDEDICATED_RESOURCE_GROUP="<powerbidedicated resource group>" node autoScaleVCoresCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autoscalevcorescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/autoScaleVCoresCreateSample.js
[autoscalevcoresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/autoScaleVCoresDeleteSample.js
[autoscalevcoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/autoScaleVCoresGetSample.js
[autoscalevcoreslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/autoScaleVCoresListByResourceGroupSample.js
[autoscalevcoreslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/autoScaleVCoresListBySubscriptionSample.js
[autoscalevcoresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/autoScaleVCoresUpdateSample.js
[capacitieschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesCheckNameAvailabilitySample.js
[capacitiescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesCreateSample.js
[capacitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesDeleteSample.js
[capacitiesgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesGetDetailsSample.js
[capacitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesListByResourceGroupSample.js
[capacitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesListSample.js
[capacitieslistskusforcapacitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesListSkusForCapacitySample.js
[capacitieslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesListSkusSample.js
[capacitiesresumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesResumeSample.js
[capacitiessuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesSuspendSample.js
[capacitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/javascript/capacitiesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-powerbidedicated?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/powerbidedicated/arm-powerbidedicated/README.md
