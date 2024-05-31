# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                                     | **Description**                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                                   | List the operations for the provider x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Operations_List_MaximumSet_Gen.json                                                                                            |
| [organizationsCreateOrUpdateSample.js][organizationscreateorupdatesample]                                                         | Create a InformaticaOrganizationResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_CreateOrUpdate_MaximumSet_Gen.json                                                                           |
| [organizationsDeleteSample.js][organizationsdeletesample]                                                                         | Delete a InformaticaOrganizationResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_Delete_MaximumSet_Gen.json                                                                                   |
| [organizationsGetAllServerlessRuntimesSample.js][organizationsgetallserverlessruntimessample]                                     | Gets all serverless runtime resources in a given informatica organization resource. x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_GetAllServerlessRuntimes_MaximumSet_Gen.json                      |
| [organizationsGetSample.js][organizationsgetsample]                                                                               | Get a InformaticaOrganizationResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_Get_MaximumSet_Gen.json                                                                                         |
| [organizationsGetServerlessMetadataSample.js][organizationsgetserverlessmetadatasample]                                           | Gets Metadata of the serverless runtime environment. x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_GetServerlessMetadata_MaximumSet_Gen.json                                                        |
| [organizationsListByResourceGroupSample.js][organizationslistbyresourcegroupsample]                                               | List InformaticaOrganizationResource resources by resource group x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_ListByResourceGroup_MaximumSet_Gen.json                                              |
| [organizationsListBySubscriptionSample.js][organizationslistbysubscriptionsample]                                                 | List InformaticaOrganizationResource resources by subscription ID x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_ListBySubscription_MaximumSet_Gen.json                                              |
| [organizationsUpdateSample.js][organizationsupdatesample]                                                                         | Update a InformaticaOrganizationResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/Organizations_Update_MaximumSet_Gen.json                                                                                   |
| [serverlessRuntimesCheckDependenciesSample.js][serverlessruntimescheckdependenciessample]                                         | Checks all dependencies for a serverless runtime resource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_CheckDependencies_MaximumSet_Gen.json                                                  |
| [serverlessRuntimesCreateOrUpdateSample.js][serverlessruntimescreateorupdatesample]                                               | Create a InformaticaServerlessRuntimeResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_CreateOrUpdate_MaximumSet_Gen.json                                                                 |
| [serverlessRuntimesDeleteSample.js][serverlessruntimesdeletesample]                                                               | Delete a InformaticaServerlessRuntimeResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_Delete_MaximumSet_Gen.json                                                                         |
| [serverlessRuntimesGetSample.js][serverlessruntimesgetsample]                                                                     | Get a InformaticaServerlessRuntimeResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_Get_MaximumSet_Gen.json                                                                               |
| [serverlessRuntimesListByInformaticaOrganizationResourceSample.js][serverlessruntimeslistbyinformaticaorganizationresourcesample] | List InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_ListByInformaticaOrganizationResource_MaximumSet_Gen.json |
| [serverlessRuntimesServerlessResourceByIdSample.js][serverlessruntimesserverlessresourcebyidsample]                               | Returns a serverless runtime resource by ID x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_ServerlessResourceById_MaximumSet_Gen.json                                                           |
| [serverlessRuntimesStartFailedServerlessRuntimeSample.js][serverlessruntimesstartfailedserverlessruntimesample]                   | Starts a failed runtime resource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_StartFailedServerlessRuntime_MaximumSet_Gen.json                                                                |
| [serverlessRuntimesUpdateSample.js][serverlessruntimesupdatesample]                                                               | Update a InformaticaServerlessRuntimeResource x-ms-original-file: specification/informatica/resource-manager/Informatica.DataManagement/stable/2024-05-08/examples/ServerlessRuntimes_Update_MaximumSet_Gen.json                                                                         |

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
npx cross-env INFORMATICA_SUBSCRIPTION_ID="<informatica subscription id>" node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/operationsListSample.js
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsCreateOrUpdateSample.js
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsDeleteSample.js
[organizationsgetallserverlessruntimessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsGetAllServerlessRuntimesSample.js
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsGetSample.js
[organizationsgetserverlessmetadatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsGetServerlessMetadataSample.js
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsListByResourceGroupSample.js
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsListBySubscriptionSample.js
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/organizationsUpdateSample.js
[serverlessruntimescheckdependenciessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesCheckDependenciesSample.js
[serverlessruntimescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesCreateOrUpdateSample.js
[serverlessruntimesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesDeleteSample.js
[serverlessruntimesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesGetSample.js
[serverlessruntimeslistbyinformaticaorganizationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesListByInformaticaOrganizationResourceSample.js
[serverlessruntimesserverlessresourcebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesServerlessResourceByIdSample.js
[serverlessruntimesstartfailedserverlessruntimesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesStartFailedServerlessRuntimeSample.js
[serverlessruntimesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v1-beta/javascript/serverlessRuntimesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-informaticadatamanagement?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/informatica/arm-informaticadatamanagement/README.md
