# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [appliancesCreateOrUpdateSample.js][appliancescreateorupdatesample]                       | Creates or updates an Appliance in the specified Subscription and Resource Group. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesCreate_Update.json                                                     |
| [appliancesDeleteSample.js][appliancesdeletesample]                                       | Deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesDelete.json                                                  |
| [appliancesGetSample.js][appliancesgetsample]                                             | Gets the details of an Appliance with a specified resource group and name. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesGet.json                                                                      |
| [appliancesGetTelemetryConfigSample.js][appliancesgettelemetryconfigsample]               | Gets the telemetry config. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/TelemetryConfig.json                                                                                                                    |
| [appliancesGetUpgradeGraphSample.js][appliancesgetupgradegraphsample]                     | Gets the upgrade graph of an Appliance with a specified resource group and name and specific release train. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/UpgradeGraph.json                                      |
| [appliancesListByResourceGroupSample.js][applianceslistbyresourcegroupsample]             | Gets a list of Appliances in the specified subscription and resource group. The operation returns properties of each Appliance. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListByResourceGroup.json |
| [appliancesListBySubscriptionSample.js][applianceslistbysubscriptionsample]               | Gets a list of Appliances in the specified subscription. The operation returns properties of each Appliance x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListBySubscription.json                      |
| [appliancesListClusterUserCredentialSample.js][applianceslistclusterusercredentialsample] | Returns the cluster user credentials for the dedicated appliance. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListClusterUserCredential.json                                                         |
| [appliancesListKeysSample.js][applianceslistkeyssample]                                   | Returns the cluster customer credentials for the dedicated appliance. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListKeys.json                                                                      |
| [appliancesListOperationsSample.js][applianceslistoperationssample]                       | Lists all available Appliances operations. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesListOperations.json                                                                                           |
| [appliancesUpdateSample.js][appliancesupdatesample]                                       | Updates an Appliance with the specified Resource Name in the specified Resource Group and Subscription. x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/AppliancesPatch.json                                       |

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
node appliancesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env RESOURCECONNECTOR_SUBSCRIPTION_ID="<resourceconnector subscription id>" RESOURCECONNECTOR_RESOURCE_GROUP="<resourceconnector resource group>" node appliancesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[appliancescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesCreateOrUpdateSample.js
[appliancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesDeleteSample.js
[appliancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesGetSample.js
[appliancesgettelemetryconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesGetTelemetryConfigSample.js
[appliancesgetupgradegraphsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesGetUpgradeGraphSample.js
[applianceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesListByResourceGroupSample.js
[applianceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesListBySubscriptionSample.js
[applianceslistclusterusercredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesListClusterUserCredentialSample.js
[applianceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesListKeysSample.js
[applianceslistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesListOperationsSample.js
[appliancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourceconnector/arm-resourceconnector/samples/v1/javascript/appliancesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourceconnector?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourceconnector/arm-resourceconnector/README.md
