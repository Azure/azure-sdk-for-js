# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [customLocationsCreateOrUpdateSample.ts][customlocationscreateorupdatesample]                     | Creates or updates a Custom Location in the specified Subscription and Resource Group x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsCreate_Update.json                                                                                                  |
| [customLocationsDeleteSample.ts][customlocationsdeletesample]                                     | Deletes the Custom Location with the specified Resource Name, Resource Group, and Subscription Id. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsDelete.json                                                                                            |
| [customLocationsFindTargetResourceGroupSample.ts][customlocationsfindtargetresourcegroupsample]   | Returns the target resource group associated with the resource sync rules of the Custom Location that match the rules passed in with the Find Target Resource Group Request. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsFindTargetResourceGroup.json |
| [customLocationsGetSample.ts][customlocationsgetsample]                                           | Gets the details of the customLocation with a specified resource group and name. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsGet.json                                                                                                                 |
| [customLocationsListByResourceGroupSample.ts][customlocationslistbyresourcegroupsample]           | Gets a list of Custom Locations in the specified subscription and resource group. The operation returns properties of each Custom Location. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsListByResourceGroup.json                                      |
| [customLocationsListBySubscriptionSample.ts][customlocationslistbysubscriptionsample]             | Gets a list of Custom Locations in the specified subscription. The operation returns properties of each Custom Location x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsListBySubscription.json                                                           |
| [customLocationsListEnabledResourceTypesSample.ts][customlocationslistenabledresourcetypessample] | Gets the list of the Enabled Resource Types. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsListEnabledResourceTypes.json                                                                                                                                |
| [customLocationsListOperationsSample.ts][customlocationslistoperationssample]                     | Lists all available Custom Locations operations. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsListOperations.json                                                                                                                                      |
| [customLocationsUpdateSample.ts][customlocationsupdatesample]                                     | Updates a Custom Location with the specified Resource Name in the specified Resource Group and Subscription. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsPatch.json                                                                                   |
| [resourceSyncRulesCreateOrUpdateSample.ts][resourcesyncrulescreateorupdatesample]                 | Creates or updates a Resource Sync Rule in the parent Custom Location, Subscription Id and Resource Group x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/ResourceSyncRulesCreate_Update.json                                                                            |
| [resourceSyncRulesDeleteSample.ts][resourcesyncrulesdeletesample]                                 | Deletes the Resource Sync Rule with the specified Resource Sync Rule Name, Custom Location Resource Name, Resource Group, and Subscription Id. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/ResourceSyncRulesDelete.json                                              |
| [resourceSyncRulesGetSample.ts][resourcesyncrulesgetsample]                                       | Gets the details of the resourceSyncRule with a specified resource group, subscription id Custom Location resource name and Resource Sync Rule name. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/ResourceSyncRulesGet.json                                           |
| [resourceSyncRulesListByCustomLocationIdSample.ts][resourcesyncruleslistbycustomlocationidsample] | Gets a list of Resource Sync Rules in the specified subscription. The operation returns properties of each Resource Sync Rule x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/ResourceSyncRulesListByCustomLocationID.json                                               |
| [resourceSyncRulesUpdateSample.ts][resourcesyncrulesupdatesample]                                 | Updates a Resource Sync Rule with the specified Resource Sync Rule name in the specified Resource Group, Subscription and Custom Location name. x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/ResourceSyncRulesPatch.json                                              |

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
node dist/customLocationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env EXTENDEDLOCATION_SUBSCRIPTION_ID="<extendedlocation subscription id>" EXTENDEDLOCATION_RESOURCE_GROUP="<extendedlocation resource group>" node dist/customLocationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[customlocationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsCreateOrUpdateSample.ts
[customlocationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsDeleteSample.ts
[customlocationsfindtargetresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsFindTargetResourceGroupSample.ts
[customlocationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsGetSample.ts
[customlocationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsListByResourceGroupSample.ts
[customlocationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsListBySubscriptionSample.ts
[customlocationslistenabledresourcetypessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsListEnabledResourceTypesSample.ts
[customlocationslistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsListOperationsSample.ts
[customlocationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/customLocationsUpdateSample.ts
[resourcesyncrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/resourceSyncRulesCreateOrUpdateSample.ts
[resourcesyncrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/resourceSyncRulesDeleteSample.ts
[resourcesyncrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/resourceSyncRulesGetSample.ts
[resourcesyncruleslistbycustomlocationidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/resourceSyncRulesListByCustomLocationIdSample.ts
[resourcesyncrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/extendedlocation/arm-extendedlocation/samples/v1-beta/typescript/src/resourceSyncRulesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-extendedlocation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/extendedlocation/arm-extendedlocation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
