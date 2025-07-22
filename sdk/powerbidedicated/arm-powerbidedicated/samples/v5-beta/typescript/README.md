# @azure/arm-powerbidedicated client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-powerbidedicated in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                          |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [autoScaleVCoresCreateSample.ts][autoscalevcorescreatesample]                           | provisions the specified auto scale v-core based on the configuration specified in the request. x-ms-original-file: 2021-01-01/createAutoScaleVCore.json |
| [autoScaleVCoresDeleteSample.ts][autoscalevcoresdeletesample]                           | deletes the specified auto scale v-core. x-ms-original-file: 2021-01-01/deleteAutoScaleVCore.json                                                        |
| [autoScaleVCoresGetSample.ts][autoscalevcoresgetsample]                                 | gets details about the specified auto scale v-core. x-ms-original-file: 2021-01-01/getAutoScaleVCore.json                                                |
| [autoScaleVCoresListByResourceGroupSample.ts][autoscalevcoreslistbyresourcegroupsample] | gets all the auto scale v-cores for the given resource group. x-ms-original-file: 2021-01-01/listAutoScaleVCoresInResourceGroup.json                     |
| [autoScaleVCoresListBySubscriptionSample.ts][autoscalevcoreslistbysubscriptionsample]   | lists all the auto scale v-cores for the given subscription. x-ms-original-file: 2021-01-01/listAutoScaleVCoresInSubscription.json                       |
| [autoScaleVCoresUpdateSample.ts][autoscalevcoresupdatesample]                           | updates the current state of the specified auto scale v-core. x-ms-original-file: 2021-01-01/updateAutoScaleVCore.json                                   |
| [capacitiesCheckNameAvailabilitySample.ts][capacitieschecknameavailabilitysample]       | check the name availability in the target location. x-ms-original-file: 2021-01-01/checkNameAvailability.json                                            |
| [capacitiesCreateSample.ts][capacitiescreatesample]                                     | provisions the specified Dedicated capacity based on the configuration specified in the request. x-ms-original-file: 2021-01-01/createCapacity.json      |
| [capacitiesDeleteSample.ts][capacitiesdeletesample]                                     | deletes the specified Dedicated capacity. x-ms-original-file: 2021-01-01/deleteCapacity.json                                                             |
| [capacitiesGetDetailsSample.ts][capacitiesgetdetailssample]                             | gets details about the specified dedicated capacity. x-ms-original-file: 2021-01-01/getCapacity.json                                                     |
| [capacitiesListByResourceGroupSample.ts][capacitieslistbyresourcegroupsample]           | gets all the Dedicated capacities for the given resource group. x-ms-original-file: 2021-01-01/listCapacitiesInResourceGroup.json                        |
| [capacitiesListSample.ts][capacitieslistsample]                                         | lists all the Dedicated capacities for the given subscription. x-ms-original-file: 2021-01-01/listCapacitiesInSubscription.json                          |
| [capacitiesListSkusForCapacitySample.ts][capacitieslistskusforcapacitysample]           | lists eligible SKUs for a PowerBI Dedicated resource. x-ms-original-file: 2021-01-01/listSKUsForExisting.json                                            |
| [capacitiesListSkusSample.ts][capacitieslistskussample]                                 | lists eligible SKUs for PowerBI Dedicated resource provider. x-ms-original-file: 2021-01-01/listSKUsForNew.json                                          |
| [capacitiesResumeSample.ts][capacitiesresumesample]                                     | resumes operation of the specified Dedicated capacity instance. x-ms-original-file: 2021-01-01/resumeCapacity.json                                       |
| [capacitiesSuspendSample.ts][capacitiessuspendsample]                                   | suspends operation of the specified dedicated capacity instance. x-ms-original-file: 2021-01-01/suspendCapacity.json                                     |
| [capacitiesUpdateSample.ts][capacitiesupdatesample]                                     | updates the current state of the specified Dedicated capacity. x-ms-original-file: 2021-01-01/updateCapacity.json                                        |
| [operationsListSample.ts][operationslistsample]                                         | list the operations for the provider x-ms-original-file: 2021-01-01/operations.json                                                                      |

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
npx dev-tool run vendored cross-env  node dist/autoScaleVCoresCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autoscalevcorescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/autoScaleVCoresCreateSample.ts
[autoscalevcoresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/autoScaleVCoresDeleteSample.ts
[autoscalevcoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/autoScaleVCoresGetSample.ts
[autoscalevcoreslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/autoScaleVCoresListByResourceGroupSample.ts
[autoscalevcoreslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/autoScaleVCoresListBySubscriptionSample.ts
[autoscalevcoresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/autoScaleVCoresUpdateSample.ts
[capacitieschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesCheckNameAvailabilitySample.ts
[capacitiescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesCreateSample.ts
[capacitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesDeleteSample.ts
[capacitiesgetdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesGetDetailsSample.ts
[capacitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesListByResourceGroupSample.ts
[capacitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesListSample.ts
[capacitieslistskusforcapacitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesListSkusForCapacitySample.ts
[capacitieslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesListSkusSample.ts
[capacitiesresumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesResumeSample.ts
[capacitiessuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesSuspendSample.ts
[capacitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/capacitiesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/powerbidedicated/arm-powerbidedicated/samples/v5-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-powerbidedicated?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/powerbidedicated/arm-powerbidedicated/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
