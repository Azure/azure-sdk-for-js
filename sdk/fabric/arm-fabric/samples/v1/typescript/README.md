# @azure/arm-fabric client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-fabric in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                              |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [fabricCapacitiesCheckNameAvailabilitySample.ts][fabriccapacitieschecknameavailabilitysample] | implements local CheckNameAvailability operations x-ms-original-file: 2023-11-01/FabricCapacities_CheckNameAvailability.json |
| [fabricCapacitiesCreateOrUpdateSample.ts][fabriccapacitiescreateorupdatesample]               | create a FabricCapacity x-ms-original-file: 2023-11-01/FabricCapacities_CreateOrUpdate.json                                  |
| [fabricCapacitiesDeleteSample.ts][fabriccapacitiesdeletesample]                               | delete a FabricCapacity x-ms-original-file: 2023-11-01/FabricCapacities_Delete.json                                          |
| [fabricCapacitiesGetSample.ts][fabriccapacitiesgetsample]                                     | get a FabricCapacity x-ms-original-file: 2023-11-01/FabricCapacities_Get.json                                                |
| [fabricCapacitiesListByResourceGroupSample.ts][fabriccapacitieslistbyresourcegroupsample]     | list FabricCapacity resources by resource group x-ms-original-file: 2023-11-01/FabricCapacities_ListByResourceGroup.json     |
| [fabricCapacitiesListBySubscriptionSample.ts][fabriccapacitieslistbysubscriptionsample]       | list FabricCapacity resources by subscription ID x-ms-original-file: 2023-11-01/FabricCapacities_ListBySubscription.json     |
| [fabricCapacitiesListSkusForCapacitySample.ts][fabriccapacitieslistskusforcapacitysample]     | list eligible SKUs for a Microsoft Fabric resource x-ms-original-file: 2023-11-01/FabricCapacities_ListSkusForCapacity.json  |
| [fabricCapacitiesListSkusSample.ts][fabriccapacitieslistskussample]                           | list eligible SKUs for Microsoft Fabric resource provider x-ms-original-file: 2023-11-01/FabricCapacities_ListSkus.json      |
| [fabricCapacitiesResumeSample.ts][fabriccapacitiesresumesample]                               | resume operation of the specified Fabric capacity instance. x-ms-original-file: 2023-11-01/FabricCapacities_Resume.json      |
| [fabricCapacitiesSuspendSample.ts][fabriccapacitiessuspendsample]                             | suspend operation of the specified Fabric capacity instance. x-ms-original-file: 2023-11-01/FabricCapacities_Suspend.json    |
| [fabricCapacitiesUpdateSample.ts][fabriccapacitiesupdatesample]                               | update a FabricCapacity x-ms-original-file: 2023-11-01/FabricCapacities_Update.json                                          |
| [operationsListSample.ts][operationslistsample]                                               | list the operations for the provider x-ms-original-file: 2023-11-01/Operations_List.json                                     |

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
node dist/fabricCapacitiesCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/fabricCapacitiesCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fabriccapacitieschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesCheckNameAvailabilitySample.ts
[fabriccapacitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesCreateOrUpdateSample.ts
[fabriccapacitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesDeleteSample.ts
[fabriccapacitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesGetSample.ts
[fabriccapacitieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesListByResourceGroupSample.ts
[fabriccapacitieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesListBySubscriptionSample.ts
[fabriccapacitieslistskusforcapacitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesListSkusForCapacitySample.ts
[fabriccapacitieslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesListSkusSample.ts
[fabriccapacitiesresumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesResumeSample.ts
[fabriccapacitiessuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesSuspendSample.ts
[fabriccapacitiesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/fabricCapacitiesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fabric/arm-fabric/samples/v1/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-fabric?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/fabric/arm-fabric/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
