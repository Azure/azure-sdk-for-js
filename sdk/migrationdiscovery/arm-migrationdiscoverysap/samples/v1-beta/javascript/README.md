# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                             | List the operations for the provider x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/operations/preview/2023-10-01-preview/examples/Operations_List.json                                                                                                                                                                                                                                                                     |
| [sapDiscoverySitesCreateSample.js][sapdiscoverysitescreatesample]                           | Creates a discovery site resource for SAP Migration. This resource will be used to run system discovery and assessment with Azure Migrate. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Create.json                                                                                                                                               |
| [sapDiscoverySitesDeleteSample.js][sapdiscoverysitesdeletesample]                           | Deletes a SAP Migration discovery site resource and its child resources, that is the associated SAP Instances and Server Instances. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Delete.json                                                                                                                                                      |
| [sapDiscoverySitesGetSample.js][sapdiscoverysitesgetsample]                                 | Gets a SAP Migration discovery site resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Get.json                                                                                                                                                                                                                                               |
| [sapDiscoverySitesImportEntitiesSample.js][sapdiscoverysitesimportentitiessample]           | Import your SAP systems' inventory using the [Discovery template](https://go.microsoft.com/fwlink/?linkid=2249111) into your SAP Migration discovery site resource and it's child resources, the SAP instances and Server instances. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_ImportEntities.json                                             |
| [sapDiscoverySitesListByResourceGroupSample.js][sapdiscoverysiteslistbyresourcegroupsample] | Gets all SAP Migration discovery site resources in a Resource Group. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_ListByResourceGroup.json                                                                                                                                                                                                        |
| [sapDiscoverySitesListBySubscriptionSample.js][sapdiscoverysiteslistbysubscriptionsample]   | Gets all SAP Migration discovery site resources in a Subscription. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_ListBySubscription.json                                                                                                                                                                                                           |
| [sapDiscoverySitesUpdateSample.js][sapdiscoverysitesupdatesample]                           | Updates a SAP Migration discovery site resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Update.json                                                                                                                                                                                                                                         |
| [sapInstancesCreateSample.js][sapinstancescreatesample]                                     | Creates the SAP Instance resource. <br><br>This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Create.json                                                                                                                                     |
| [sapInstancesDeleteSample.js][sapinstancesdeletesample]                                     | Deletes the SAP Instance resource. <br><br>This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the SAP Migration discovery site resource, using the delete operation on it. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Delete.json        |
| [sapInstancesGetSample.js][sapinstancesgetsample]                                           | Gets the SAP Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Get.json                                                                                                                                                                                                                                                                  |
| [sapInstancesListBySapDiscoverySiteSample.js][sapinstanceslistbysapdiscoverysitesample]     | Lists the SAP Instance resources for the given SAP Migration discovery site resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_List.json                                                                                                                                                                                                           |
| [sapInstancesUpdateSample.js][sapinstancesupdatesample]                                     | Updates the SAP Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Update.json                                                                                                                                                                                                                                                            |
| [serverInstancesCreateSample.js][serverinstancescreatesample]                               | Creates the Server Instance resource. <br><br>;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Create.json                                                                                                                              |
| [serverInstancesDeleteSample.js][serverinstancesdeletesample]                               | Deletes the Server Instance resource. <br><br>;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the SAP Migration discovery site resource, using the delete operation on it. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Delete.json |
| [serverInstancesGetSample.js][serverinstancesgetsample]                                     | Gets the Server Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Get.json                                                                                                                                                                                                                                                            |
| [serverInstancesListBySapInstanceSample.js][serverinstanceslistbysapinstancesample]         | Lists the Server Instance resources for the given SAP Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_List.json                                                                                                                                                                                                                     |
| [serverInstancesUpdateSample.js][serverinstancesupdatesample]                               | Updates the Server Instance resource. This operation on a resource by end user will return a Bad Request error. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Update.json                                                                                                                                                                            |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MIGRATIONDISCOVERY_SUBSCRIPTION_ID="<migrationdiscovery subscription id>" node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/operationsListSample.js
[sapdiscoverysitescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapDiscoverySitesCreateSample.js
[sapdiscoverysitesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapDiscoverySitesDeleteSample.js
[sapdiscoverysitesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapDiscoverySitesGetSample.js
[sapdiscoverysitesimportentitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapDiscoverySitesImportEntitiesSample.js
[sapdiscoverysiteslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapDiscoverySitesListByResourceGroupSample.js
[sapdiscoverysiteslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapDiscoverySitesListBySubscriptionSample.js
[sapdiscoverysitesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapDiscoverySitesUpdateSample.js
[sapinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapInstancesCreateSample.js
[sapinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapInstancesDeleteSample.js
[sapinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapInstancesGetSample.js
[sapinstanceslistbysapdiscoverysitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapInstancesListBySapDiscoverySiteSample.js
[sapinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/sapInstancesUpdateSample.js
[serverinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/serverInstancesCreateSample.js
[serverinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/serverInstancesDeleteSample.js
[serverinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/serverInstancesGetSample.js
[serverinstanceslistbysapinstancesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/serverInstancesListBySapInstanceSample.js
[serverinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/javascript/serverInstancesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-migrationdiscoverysap?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/README.md
