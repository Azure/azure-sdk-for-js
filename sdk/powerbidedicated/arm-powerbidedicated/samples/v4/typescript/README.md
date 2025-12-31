# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [autoScaleVCoresCreateSample.ts][autoscalevcorescreatesample]                           | Provisions the specified auto scale v-core based on the configuration specified in the request. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/createAutoScaleVCore.json |
| [autoScaleVCoresDeleteSample.ts][autoscalevcoresdeletesample]                           | Deletes the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/deleteAutoScaleVCore.json                                                        |
| [autoScaleVCoresGetSample.ts][autoscalevcoresgetsample]                                 | Gets details about the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/getAutoScaleVCore.json                                                |
| [autoScaleVCoresListByResourceGroupSample.ts][autoscalevcoreslistbyresourcegroupsample] | Gets all the auto scale v-cores for the given resource group. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listAutoScaleVCoresInResourceGroup.json                     |
| [autoScaleVCoresListBySubscriptionSample.ts][autoscalevcoreslistbysubscriptionsample]   | Lists all the auto scale v-cores for the given subscription. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listAutoScaleVCoresInSubscription.json                       |
| [autoScaleVCoresUpdateSample.ts][autoscalevcoresupdatesample]                           | Updates the current state of the specified auto scale v-core. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateAutoScaleVCore.json                                   |
| [capacitiesCheckNameAvailabilitySample.ts][capacitieschecknameavailabilitysample]       | Check the name availability in the target location. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/checkNameAvailability.json                                            |
| [capacitiesCreateSample.ts][capacitiescreatesample]                                     | Provisions the specified Dedicated capacity based on the configuration specified in the request. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/createCapacity.json      |
| [capacitiesDeleteSample.ts][capacitiesdeletesample]                                     | Deletes the specified Dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/deleteCapacity.json                                                             |
| [capacitiesGetDetailsSample.ts][capacitiesgetdetailssample]                             | Gets details about the specified dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/getCapacity.json                                                     |
| [capacitiesListByResourceGroupSample.ts][capacitieslistbyresourcegroupsample]           | Gets all the Dedicated capacities for the given resource group. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listCapacitiesInResourceGroup.json                        |
| [capacitiesListSample.ts][capacitieslistsample]                                         | Lists all the Dedicated capacities for the given subscription. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listCapacitiesInSubscription.json                          |
| [capacitiesListSkusForCapacitySample.ts][capacitieslistskusforcapacitysample]           | Lists eligible SKUs for a PowerBI Dedicated resource. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listSKUsForExisting.json                                            |
| [capacitiesListSkusSample.ts][capacitieslistskussample]                                 | Lists eligible SKUs for PowerBI Dedicated resource provider. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/listSKUsForNew.json                                          |
| [capacitiesResumeSample.ts][capacitiesresumesample]                                     | Resumes operation of the specified Dedicated capacity instance. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/resumeCapacity.json                                       |
| [capacitiesSuspendSample.ts][capacitiessuspendsample]                                   | Suspends operation of the specified dedicated capacity instance. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/suspendCapacity.json                                     |
| [capacitiesUpdateSample.ts][capacitiesupdatesample]                                     | Updates the current state of the specified Dedicated capacity. x-ms-original-file: specification/powerbidedicated/resource-manager/Microsoft.PowerBIdedicated/stable/2021-01-01/examples/updateCapacity.json                                        |

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
node dist/autoScaleVCoresCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env POWERBIDEDICATED_SUBSCRIPTION_ID="<powerbidedicated subscription id>" POWERBIDEDICATED_RESOURCE_GROUP="<powerbidedicated resource group>" node dist/autoScaleVCoresCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autoscalevcorescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/autoScaleVCoresCreateSample.ts
[autoscalevcoresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/autoScaleVCoresDeleteSample.ts
[autoscalevcoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/autoScaleVCoresGetSample.ts
[autoscalevcoreslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/autoScaleVCoresListByResourceGroupSample.ts
[autoscalevcoreslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/autoScaleVCoresListBySubscriptionSample.ts
[autoscalevcoresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/autoScaleVCoresUpdateSample.ts
[capacitieschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesCheckNameAvailabilitySample.ts
[capacitiescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesCreateSample.ts
[capacitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesDeleteSample.ts
[capacitiesgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesGetDetailsSample.ts
[capacitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesListByResourceGroupSample.ts
[capacitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesListSample.ts
[capacitieslistskusforcapacitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesListSkusForCapacitySample.ts
[capacitieslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesListSkusSample.ts
[capacitiesresumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesResumeSample.ts
[capacitiessuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesSuspendSample.ts
[capacitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v4/typescript/src/capacitiesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-powerbidedicated?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/powerbidedicated/arm-powerbidedicated/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
