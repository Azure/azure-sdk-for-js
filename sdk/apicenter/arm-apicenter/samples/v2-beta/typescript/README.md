# @azure/arm-apicenter client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-apicenter in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                      |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [apiDefinitionsCreateOrUpdateSample.ts][apidefinitionscreateorupdatesample]           | creates new or updates existing API definition. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_CreateOrUpdate.json            |
| [apiDefinitionsDeleteSample.ts][apidefinitionsdeletesample]                           | deletes specified API definition. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Delete.json                                  |
| [apiDefinitionsExportSpecificationSample.ts][apidefinitionsexportspecificationsample] | exports the API specification. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_ExportSpecification.json                        |
| [apiDefinitionsGetSample.ts][apidefinitionsgetsample]                                 | returns details of the API definition. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Get.json                                |
| [apiDefinitionsHeadSample.ts][apidefinitionsheadsample]                               | checks if specified API definition exists. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Head.json                           |
| [apiDefinitionsImportSpecificationSample.ts][apidefinitionsimportspecificationsample] | imports the API specification. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_ImportSpecification.json                        |
| [apiDefinitionsListSample.ts][apidefinitionslistsample]                               | returns a collection of API definitions. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_List.json                             |
| [apiSourcesCreateOrUpdateSample.ts][apisourcescreateorupdatesample]                   | creates new or updates existing API source. x-ms-original-file: 2024-06-01-preview/ApiSources_CreateOrUpdate.json                    |
| [apiSourcesDeleteSample.ts][apisourcesdeletesample]                                   | deletes specified API source. x-ms-original-file: 2024-06-01-preview/ApiSources_Delete.json                                          |
| [apiSourcesGetSample.ts][apisourcesgetsample]                                         | returns details of the API source. x-ms-original-file: 2024-06-01-preview/ApiSources_Get.json                                        |
| [apiSourcesHeadSample.ts][apisourcesheadsample]                                       | checks if specified API source exists. x-ms-original-file: 2024-06-01-preview/ApiSources_Head.json                                   |
| [apiSourcesListSample.ts][apisourceslistsample]                                       | returns a collection of API sources. x-ms-original-file: 2024-06-01-preview/ApiSources_List.json                                     |
| [apiVersionsCreateOrUpdateSample.ts][apiversionscreateorupdatesample]                 | creates new or updates existing API version. x-ms-original-file: 2024-06-01-preview/ApiVersions_CreateOrUpdate.json                  |
| [apiVersionsDeleteSample.ts][apiversionsdeletesample]                                 | deletes specified API version x-ms-original-file: 2024-06-01-preview/ApiVersions_Delete.json                                         |
| [apiVersionsGetSample.ts][apiversionsgetsample]                                       | returns details of the API version. x-ms-original-file: 2024-06-01-preview/ApiVersions_Get.json                                      |
| [apiVersionsHeadSample.ts][apiversionsheadsample]                                     | checks if specified API version exists. x-ms-original-file: 2024-06-01-preview/ApiVersions_Head.json                                 |
| [apiVersionsListSample.ts][apiversionslistsample]                                     | returns a collection of API versions. x-ms-original-file: 2024-06-01-preview/ApiVersions_List.json                                   |
| [apisCreateOrUpdateSample.ts][apiscreateorupdatesample]                               | creates new or updates existing API. x-ms-original-file: 2024-06-01-preview/Apis_CreateOrUpdate.json                                 |
| [apisDeleteSample.ts][apisdeletesample]                                               | deletes specified API. x-ms-original-file: 2024-06-01-preview/Apis_Delete.json                                                       |
| [apisGetSample.ts][apisgetsample]                                                     | returns details of the API. x-ms-original-file: 2024-06-01-preview/Apis_Get.json                                                     |
| [apisHeadSample.ts][apisheadsample]                                                   | checks if specified API exists. x-ms-original-file: 2024-06-01-preview/Apis_Head.json                                                |
| [apisListSample.ts][apislistsample]                                                   | returns a collection of APIs. x-ms-original-file: 2024-06-01-preview/Apis_List.json                                                  |
| [deletedServicesDeleteSample.ts][deletedservicesdeletesample]                         | permanently deletes specified service. x-ms-original-file: 2024-06-01-preview/DeletedServices_Delete.json                            |
| [deletedServicesGetSample.ts][deletedservicesgetsample]                               | returns details of the soft-deleted service. x-ms-original-file: 2024-06-01-preview/DeletedServices_Get.json                         |
| [deletedServicesListBySubscriptionSample.ts][deletedserviceslistbysubscriptionsample] | lists services within an Azure subscription. x-ms-original-file: 2024-06-01-preview/DeletedServices_List.json                        |
| [deletedServicesListSample.ts][deletedserviceslistsample]                             | lists soft-deleted services. x-ms-original-file: 2024-06-01-preview/DeletedServices_ListBySubscription.json                          |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]                 | creates new or updates existing API deployment. x-ms-original-file: 2024-06-01-preview/Deployments_CreateOrUpdate.json               |
| [deploymentsDeleteSample.ts][deploymentsdeletesample]                                 | deletes API deployment. x-ms-original-file: 2024-06-01-preview/Deployments_Delete.json                                               |
| [deploymentsGetSample.ts][deploymentsgetsample]                                       | returns details of the API deployment. x-ms-original-file: 2024-06-01-preview/Deployments_Get.json                                   |
| [deploymentsHeadSample.ts][deploymentsheadsample]                                     | checks if specified API deployment exists. x-ms-original-file: 2024-06-01-preview/Deployments_Head.json                              |
| [deploymentsListSample.ts][deploymentslistsample]                                     | returns a collection of API deployments. x-ms-original-file: 2024-06-01-preview/Deployments_List.json                                |
| [environmentsCreateOrUpdateSample.ts][environmentscreateorupdatesample]               | creates new or updates existing environment. x-ms-original-file: 2024-06-01-preview/Environments_CreateOrUpdate.json                 |
| [environmentsDeleteSample.ts][environmentsdeletesample]                               | deletes the environment. x-ms-original-file: 2024-06-01-preview/Environments_Delete.json                                             |
| [environmentsGetSample.ts][environmentsgetsample]                                     | returns details of the environment. x-ms-original-file: 2024-06-01-preview/Environments_Get.json                                     |
| [environmentsHeadSample.ts][environmentsheadsample]                                   | checks if specified environment exists. x-ms-original-file: 2024-06-01-preview/Environments_Head.json                                |
| [environmentsListSample.ts][environmentslistsample]                                   | returns a collection of environments. x-ms-original-file: 2024-06-01-preview/Environments_List.json                                  |
| [metadataSchemasCreateOrUpdateSample.ts][metadataschemascreateorupdatesample]         | creates new or updates existing metadata schema. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_CreateOrUpdate.json          |
| [metadataSchemasDeleteSample.ts][metadataschemasdeletesample]                         | deletes specified metadata schema. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Delete.json                                |
| [metadataSchemasGetSample.ts][metadataschemasgetsample]                               | returns details of the metadata schema. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Get.json                              |
| [metadataSchemasHeadSample.ts][metadataschemasheadsample]                             | checks if specified metadata schema exists. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Head.json                         |
| [metadataSchemasListSample.ts][metadataschemaslistsample]                             | returns a collection of metadata schemas. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_List.json                           |
| [operationsListSample.ts][operationslistsample]                                       | list the operations for the provider x-ms-original-file: 2024-06-01-preview/Operations_List.json                                     |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]                       | creates new or updates existing API. x-ms-original-file: 2024-06-01-preview/Services_CreateOrUpdate.json                             |
| [servicesDeleteSample.ts][servicesdeletesample]                                       | deletes specified service. x-ms-original-file: 2024-06-01-preview/Services_Delete.json                                               |
| [servicesExportMetadataSchemaSample.ts][servicesexportmetadataschemasample]           | exports the effective metadata schema. x-ms-original-file: 2024-06-01-preview/Services_ExportMetadataSchema.json                     |
| [servicesGetSample.ts][servicesgetsample]                                             | returns details of the service. x-ms-original-file: 2024-06-01-preview/Services_Get.json                                             |
| [servicesListByResourceGroupSample.ts][serviceslistbyresourcegroupsample]             | returns a collection of services within the resource group. x-ms-original-file: 2024-06-01-preview/Services_ListByResourceGroup.json |
| [servicesListBySubscriptionSample.ts][serviceslistbysubscriptionsample]               | lists services within an Azure subscription. x-ms-original-file: 2024-06-01-preview/Services_ListBySubscription.json                 |
| [servicesUpdateSample.ts][servicesupdatesample]                                       | updates existing service. x-ms-original-file: 2024-06-01-preview/Services_Update.json                                                |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                   | creates new or updates existing workspace. x-ms-original-file: 2024-06-01-preview/Workspaces_CreateOrUpdate.json                     |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                   | deletes specified workspace. x-ms-original-file: 2024-06-01-preview/Workspaces_Delete.json                                           |
| [workspacesGetSample.ts][workspacesgetsample]                                         | returns details of the workspace. x-ms-original-file: 2024-06-01-preview/Workspaces_Get.json                                         |
| [workspacesHeadSample.ts][workspacesheadsample]                                       | checks if specified workspace exists. x-ms-original-file: 2024-06-01-preview/Workspaces_Head.json                                    |
| [workspacesListSample.ts][workspaceslistsample]                                       | returns a collection of workspaces. x-ms-original-file: 2024-06-01-preview/Workspaces_List.json                                      |

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
node dist/apiDefinitionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/apiDefinitionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[apidefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiDefinitionsCreateOrUpdateSample.ts
[apidefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiDefinitionsDeleteSample.ts
[apidefinitionsexportspecificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiDefinitionsExportSpecificationSample.ts
[apidefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiDefinitionsGetSample.ts
[apidefinitionsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiDefinitionsHeadSample.ts
[apidefinitionsimportspecificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiDefinitionsImportSpecificationSample.ts
[apidefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiDefinitionsListSample.ts
[apisourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiSourcesCreateOrUpdateSample.ts
[apisourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiSourcesDeleteSample.ts
[apisourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiSourcesGetSample.ts
[apisourcesheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiSourcesHeadSample.ts
[apisourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiSourcesListSample.ts
[apiversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiVersionsCreateOrUpdateSample.ts
[apiversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiVersionsDeleteSample.ts
[apiversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiVersionsGetSample.ts
[apiversionsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiVersionsHeadSample.ts
[apiversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apiVersionsListSample.ts
[apiscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apisCreateOrUpdateSample.ts
[apisdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apisDeleteSample.ts
[apisgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apisGetSample.ts
[apisheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apisHeadSample.ts
[apislistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/apisListSample.ts
[deletedservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deletedServicesDeleteSample.ts
[deletedservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deletedServicesGetSample.ts
[deletedserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deletedServicesListBySubscriptionSample.ts
[deletedserviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deletedServicesListSample.ts
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deploymentsDeleteSample.ts
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deploymentsGetSample.ts
[deploymentsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deploymentsHeadSample.ts
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/deploymentsListSample.ts
[environmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/environmentsCreateOrUpdateSample.ts
[environmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/environmentsDeleteSample.ts
[environmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/environmentsGetSample.ts
[environmentsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/environmentsHeadSample.ts
[environmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/environmentsListSample.ts
[metadataschemascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/metadataSchemasCreateOrUpdateSample.ts
[metadataschemasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/metadataSchemasDeleteSample.ts
[metadataschemasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/metadataSchemasGetSample.ts
[metadataschemasheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/metadataSchemasHeadSample.ts
[metadataschemaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/metadataSchemasListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/operationsListSample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/servicesDeleteSample.ts
[servicesexportmetadataschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/servicesExportMetadataSchemaSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/servicesGetSample.ts
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/servicesListByResourceGroupSample.ts
[serviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/servicesListBySubscriptionSample.ts
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/servicesUpdateSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/workspacesGetSample.ts
[workspacesheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/workspacesHeadSample.ts
[workspaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/typescript/src/workspacesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-apicenter?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/apicenter/arm-apicenter/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
