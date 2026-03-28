# @azure/arm-redhatopenshift client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-redhatopenshift in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                             |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [openShiftClustersCreateOrUpdateSample.ts][openshiftclusterscreateorupdatesample]             | the operation returns properties of a OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_CreateOrUpdate.json                               |
| [openShiftClustersDeleteSample.ts][openshiftclustersdeletesample]                             | the operation returns nothing. x-ms-original-file: 2025-07-25/OpenShiftClusters_Delete.json                                                                 |
| [openShiftClustersGetSample.ts][openshiftclustersgetsample]                                   | the operation returns properties of a OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_Get.json                                          |
| [openShiftClustersListAdminCredentialsSample.ts][openshiftclusterslistadmincredentialssample] | the operation returns the admin kubeconfig. x-ms-original-file: 2025-07-25/OpenShiftClusters_ListAdminCredentials.json                                      |
| [openShiftClustersListByResourceGroupSample.ts][openshiftclusterslistbyresourcegroupsample]   | the operation returns properties of each OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_ListByResourceGroup.json                       |
| [openShiftClustersListCredentialsSample.ts][openshiftclusterslistcredentialssample]           | the operation returns the credentials. x-ms-original-file: 2025-07-25/OpenShiftClusters_ListCredentials.json                                                |
| [openShiftClustersListSample.ts][openshiftclusterslistsample]                                 | the operation returns properties of each OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_List.json                                      |
| [openShiftClustersUpdateSample.ts][openshiftclustersupdatesample]                             | the operation returns properties of a OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_Update.json                                       |
| [openShiftVersionsGetSample.ts][openshiftversionsgetsample]                                   | this operation returns installable OpenShift version as a string. x-ms-original-file: 2025-07-25/OpenShiftVersions_Get.json                                 |
| [openShiftVersionsListSample.ts][openshiftversionslistsample]                                 | the operation returns the installable OpenShift versions as a string. x-ms-original-file: 2025-07-25/OpenShiftVersions_List.json                            |
| [operationsListSample.ts][operationslistsample]                                               | list the operations for the provider x-ms-original-file: 2025-07-25/Operations_List.json                                                                    |
| [platformWorkloadIdentityRoleSetGetSample.ts][platformworkloadidentityrolesetgetsample]       | this operation returns Platform Workload Identity Role Set as a string x-ms-original-file: 2025-07-25/PlatformWorkloadIdentityRoleSet_Get.json              |
| [platformWorkloadIdentityRoleSetsListSample.ts][platformworkloadidentityrolesetslistsample]   | this operation returns a list of Platform Workload Identity Role Sets as a string x-ms-original-file: 2025-07-25/PlatformWorkloadIdentityRoleSets_List.json |

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
node dist/openShiftClustersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/openShiftClustersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[openshiftclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersCreateOrUpdateSample.ts
[openshiftclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersDeleteSample.ts
[openshiftclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersGetSample.ts
[openshiftclusterslistadmincredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersListAdminCredentialsSample.ts
[openshiftclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersListByResourceGroupSample.ts
[openshiftclusterslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersListCredentialsSample.ts
[openshiftclusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersListSample.ts
[openshiftclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftClustersUpdateSample.ts
[openshiftversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftVersionsGetSample.ts
[openshiftversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/openShiftVersionsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/operationsListSample.ts
[platformworkloadidentityrolesetgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/platformWorkloadIdentityRoleSetGetSample.ts
[platformworkloadidentityrolesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/typescript/src/platformWorkloadIdentityRoleSetsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-redhatopenshift?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redhatopenshift/arm-redhatopenshift/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
