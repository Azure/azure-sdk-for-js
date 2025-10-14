# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [appliancesCreateOrUpdateSample.ts][appliancescreateorupdatesample]                       | Creates or updates an Appliance in the specified Subscription and Resource Group. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesCreate_Update.json                                                     |
| [appliancesDeleteSample.ts][appliancesdeletesample]                                       | Deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesDelete.json                                                  |
| [appliancesGetSample.ts][appliancesgetsample]                                             | Gets the details of an Appliance with a specified resource group and name. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesGet.json                                                                      |
| [appliancesGetTelemetryConfigSample.ts][appliancesgettelemetryconfigsample]               | Gets the telemetry config. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/TelemetryConfig.json                                                                                                                    |
| [appliancesGetUpgradeGraphSample.ts][appliancesgetupgradegraphsample]                     | Gets the upgrade graph of an Appliance with a specified resource group and name and specific release train. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/UpgradeGraph.json                                      |
| [appliancesListByResourceGroupSample.ts][applianceslistbyresourcegroupsample]             | Gets a list of Appliances in the specified subscription and resource group. The operation returns properties of each Appliance. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListByResourceGroup.json |
| [appliancesListBySubscriptionSample.ts][applianceslistbysubscriptionsample]               | Gets a list of Appliances in the specified subscription. The operation returns properties of each Appliance x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListBySubscription.json                      |
| [appliancesListClusterUserCredentialSample.ts][applianceslistclusterusercredentialsample] | Returns the cluster user credentials for the dedicated appliance. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListClusterUserCredential.json                                                         |
| [appliancesListKeysSample.ts][applianceslistkeyssample]                                   | Returns the cluster customer credentials for the dedicated appliance. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListKeys.json                                                                      |
| [appliancesListOperationsSample.ts][applianceslistoperationssample]                       | Lists all available Appliances operations. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListOperations.json                                                                                           |
| [appliancesUpdateSample.ts][appliancesupdatesample]                                       | Updates an Appliance with the specified Resource Name in the specified Resource Group and Subscription. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesPatch.json                                       |

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
node dist/appliancesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env RESOURCECONNECTOR_SUBSCRIPTION_ID="<resourceconnector subscription id>" RESOURCECONNECTOR_RESOURCE_GROUP="<resourceconnector resource group>" node dist/appliancesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[appliancescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesCreateOrUpdateSample.ts
[appliancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesDeleteSample.ts
[appliancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesGetSample.ts
[appliancesgettelemetryconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesGetTelemetryConfigSample.ts
[appliancesgetupgradegraphsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesGetUpgradeGraphSample.ts
[applianceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesListByResourceGroupSample.ts
[applianceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesListBySubscriptionSample.ts
[applianceslistclusterusercredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesListClusterUserCredentialSample.ts
[applianceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesListKeysSample.ts
[applianceslistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesListOperationsSample.ts
[appliancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/typescript/src/appliancesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourceconnector?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourceconnector/arm-resourceconnector/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
