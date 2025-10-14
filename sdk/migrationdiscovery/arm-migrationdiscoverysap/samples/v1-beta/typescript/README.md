# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                             | List the operations for the provider x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/operations/preview/2023-10-01-preview/examples/Operations_List.json                                                                                                                                                                                                                                                                     |
| [sapDiscoverySitesCreateSample.ts][sapdiscoverysitescreatesample]                           | Creates a discovery site resource for SAP Migration. This resource will be used to run system discovery and assessment with Azure Migrate. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Create.json                                                                                                                                               |
| [sapDiscoverySitesDeleteSample.ts][sapdiscoverysitesdeletesample]                           | Deletes a SAP Migration discovery site resource and its child resources, that is the associated SAP Instances and Server Instances. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Delete.json                                                                                                                                                      |
| [sapDiscoverySitesGetSample.ts][sapdiscoverysitesgetsample]                                 | Gets a SAP Migration discovery site resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Get.json                                                                                                                                                                                                                                               |
| [sapDiscoverySitesImportEntitiesSample.ts][sapdiscoverysitesimportentitiessample]           | Import your SAP systems' inventory using the [Discovery template](https://go.microsoft.com/fwlink/?linkid=2249111) into your SAP Migration discovery site resource and it's child resources, the SAP instances and Server instances. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_ImportEntities.json                                             |
| [sapDiscoverySitesListByResourceGroupSample.ts][sapdiscoverysiteslistbyresourcegroupsample] | Gets all SAP Migration discovery site resources in a Resource Group. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_ListByResourceGroup.json                                                                                                                                                                                                        |
| [sapDiscoverySitesListBySubscriptionSample.ts][sapdiscoverysiteslistbysubscriptionsample]   | Gets all SAP Migration discovery site resources in a Subscription. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_ListBySubscription.json                                                                                                                                                                                                           |
| [sapDiscoverySitesUpdateSample.ts][sapdiscoverysitesupdatesample]                           | Updates a SAP Migration discovery site resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPDiscoverySites_Update.json                                                                                                                                                                                                                                         |
| [sapInstancesCreateSample.ts][sapinstancescreatesample]                                     | Creates the SAP Instance resource. <br><br>This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Create.json                                                                                                                                     |
| [sapInstancesDeleteSample.ts][sapinstancesdeletesample]                                     | Deletes the SAP Instance resource. <br><br>This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the SAP Migration discovery site resource, using the delete operation on it. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Delete.json        |
| [sapInstancesGetSample.ts][sapinstancesgetsample]                                           | Gets the SAP Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Get.json                                                                                                                                                                                                                                                                  |
| [sapInstancesListBySapDiscoverySiteSample.ts][sapinstanceslistbysapdiscoverysitesample]     | Lists the SAP Instance resources for the given SAP Migration discovery site resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_List.json                                                                                                                                                                                                           |
| [sapInstancesUpdateSample.ts][sapinstancesupdatesample]                                     | Updates the SAP Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/SAPInstances_Update.json                                                                                                                                                                                                                                                            |
| [serverInstancesCreateSample.ts][serverinstancescreatesample]                               | Creates the Server Instance resource. <br><br>;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Create.json                                                                                                                              |
| [serverInstancesDeleteSample.ts][serverinstancesdeletesample]                               | Deletes the Server Instance resource. <br><br>;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the SAP Migration discovery site resource, using the delete operation on it. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Delete.json |
| [serverInstancesGetSample.ts][serverinstancesgetsample]                                     | Gets the Server Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Get.json                                                                                                                                                                                                                                                            |
| [serverInstancesListBySapInstanceSample.ts][serverinstanceslistbysapinstancesample]         | Lists the Server Instance resources for the given SAP Instance resource. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_List.json                                                                                                                                                                                                                     |
| [serverInstancesUpdateSample.ts][serverinstancesupdatesample]                               | Updates the Server Instance resource. This operation on a resource by end user will return a Bad Request error. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/SAPDiscoverySites/preview/2023-10-01-preview/examples/ServerInstances_Update.json                                                                                                                                                                            |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env MIGRATIONDISCOVERY_SUBSCRIPTION_ID="<migrationdiscovery subscription id>" node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/operationsListSample.ts
[sapdiscoverysitescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapDiscoverySitesCreateSample.ts
[sapdiscoverysitesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapDiscoverySitesDeleteSample.ts
[sapdiscoverysitesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapDiscoverySitesGetSample.ts
[sapdiscoverysitesimportentitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapDiscoverySitesImportEntitiesSample.ts
[sapdiscoverysiteslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapDiscoverySitesListByResourceGroupSample.ts
[sapdiscoverysiteslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapDiscoverySitesListBySubscriptionSample.ts
[sapdiscoverysitesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapDiscoverySitesUpdateSample.ts
[sapinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapInstancesCreateSample.ts
[sapinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapInstancesDeleteSample.ts
[sapinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapInstancesGetSample.ts
[sapinstanceslistbysapdiscoverysitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapInstancesListBySapDiscoverySiteSample.ts
[sapinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/sapInstancesUpdateSample.ts
[serverinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/serverInstancesCreateSample.ts
[serverinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/serverInstancesDeleteSample.ts
[serverinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/serverInstancesGetSample.ts
[serverinstanceslistbysapinstancesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/serverInstancesListBySapInstanceSample.ts
[serverinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/samples/v1-beta/typescript/src/serverInstancesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-migrationdiscoverysap?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/migrationdiscovery/arm-migrationdiscoverysap/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
