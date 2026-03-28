# @azure/arm-redhatopenshift client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-redhatopenshift in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                             |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [openShiftClustersCreateOrUpdateSample.js][openshiftclusterscreateorupdatesample]             | the operation returns properties of a OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_CreateOrUpdate.json                               |
| [openShiftClustersDeleteSample.js][openshiftclustersdeletesample]                             | the operation returns nothing. x-ms-original-file: 2025-07-25/OpenShiftClusters_Delete.json                                                                 |
| [openShiftClustersGetSample.js][openshiftclustersgetsample]                                   | the operation returns properties of a OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_Get.json                                          |
| [openShiftClustersListAdminCredentialsSample.js][openshiftclusterslistadmincredentialssample] | the operation returns the admin kubeconfig. x-ms-original-file: 2025-07-25/OpenShiftClusters_ListAdminCredentials.json                                      |
| [openShiftClustersListByResourceGroupSample.js][openshiftclusterslistbyresourcegroupsample]   | the operation returns properties of each OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_ListByResourceGroup.json                       |
| [openShiftClustersListCredentialsSample.js][openshiftclusterslistcredentialssample]           | the operation returns the credentials. x-ms-original-file: 2025-07-25/OpenShiftClusters_ListCredentials.json                                                |
| [openShiftClustersListSample.js][openshiftclusterslistsample]                                 | the operation returns properties of each OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_List.json                                      |
| [openShiftClustersUpdateSample.js][openshiftclustersupdatesample]                             | the operation returns properties of a OpenShift cluster. x-ms-original-file: 2025-07-25/OpenShiftClusters_Update.json                                       |
| [openShiftVersionsGetSample.js][openshiftversionsgetsample]                                   | this operation returns installable OpenShift version as a string. x-ms-original-file: 2025-07-25/OpenShiftVersions_Get.json                                 |
| [openShiftVersionsListSample.js][openshiftversionslistsample]                                 | the operation returns the installable OpenShift versions as a string. x-ms-original-file: 2025-07-25/OpenShiftVersions_List.json                            |
| [operationsListSample.js][operationslistsample]                                               | list the operations for the provider x-ms-original-file: 2025-07-25/Operations_List.json                                                                    |
| [platformWorkloadIdentityRoleSetGetSample.js][platformworkloadidentityrolesetgetsample]       | this operation returns Platform Workload Identity Role Set as a string x-ms-original-file: 2025-07-25/PlatformWorkloadIdentityRoleSet_Get.json              |
| [platformWorkloadIdentityRoleSetsListSample.js][platformworkloadidentityrolesetslistsample]   | this operation returns a list of Platform Workload Identity Role Sets as a string x-ms-original-file: 2025-07-25/PlatformWorkloadIdentityRoleSets_List.json |

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
node openShiftClustersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node openShiftClustersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[openshiftclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersCreateOrUpdateSample.js
[openshiftclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersDeleteSample.js
[openshiftclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersGetSample.js
[openshiftclusterslistadmincredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersListAdminCredentialsSample.js
[openshiftclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersListByResourceGroupSample.js
[openshiftclusterslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersListCredentialsSample.js
[openshiftclusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersListSample.js
[openshiftclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftClustersUpdateSample.js
[openshiftversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftVersionsGetSample.js
[openshiftversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/openShiftVersionsListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/operationsListSample.js
[platformworkloadidentityrolesetgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/platformWorkloadIdentityRoleSetGetSample.js
[platformworkloadidentityrolesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshift/arm-redhatopenshift/samples/v1/javascript/platformWorkloadIdentityRoleSetsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-redhatopenshift?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redhatopenshift/arm-redhatopenshift/README.md
