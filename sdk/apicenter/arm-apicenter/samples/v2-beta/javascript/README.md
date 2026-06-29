# @azure/arm-apicenter client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-apicenter in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                      |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [apiDefinitionsCreateOrUpdateSample.js][apidefinitionscreateorupdatesample]           | creates new or updates existing API definition. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_CreateOrUpdate.json            |
| [apiDefinitionsDeleteSample.js][apidefinitionsdeletesample]                           | deletes specified API definition. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Delete.json                                  |
| [apiDefinitionsExportSpecificationSample.js][apidefinitionsexportspecificationsample] | exports the API specification. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_ExportSpecification.json                        |
| [apiDefinitionsGetSample.js][apidefinitionsgetsample]                                 | returns details of the API definition. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Get.json                                |
| [apiDefinitionsHeadSample.js][apidefinitionsheadsample]                               | checks if specified API definition exists. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Head.json                           |
| [apiDefinitionsImportSpecificationSample.js][apidefinitionsimportspecificationsample] | imports the API specification. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_ImportSpecification.json                        |
| [apiDefinitionsListSample.js][apidefinitionslistsample]                               | returns a collection of API definitions. x-ms-original-file: 2024-06-01-preview/ApiDefinitions_List.json                             |
| [apiSourcesCreateOrUpdateSample.js][apisourcescreateorupdatesample]                   | creates new or updates existing API source. x-ms-original-file: 2024-06-01-preview/ApiSources_CreateOrUpdate.json                    |
| [apiSourcesDeleteSample.js][apisourcesdeletesample]                                   | deletes specified API source. x-ms-original-file: 2024-06-01-preview/ApiSources_Delete.json                                          |
| [apiSourcesGetSample.js][apisourcesgetsample]                                         | returns details of the API source. x-ms-original-file: 2024-06-01-preview/ApiSources_Get.json                                        |
| [apiSourcesHeadSample.js][apisourcesheadsample]                                       | checks if specified API source exists. x-ms-original-file: 2024-06-01-preview/ApiSources_Head.json                                   |
| [apiSourcesListSample.js][apisourceslistsample]                                       | returns a collection of API sources. x-ms-original-file: 2024-06-01-preview/ApiSources_List.json                                     |
| [apiVersionsCreateOrUpdateSample.js][apiversionscreateorupdatesample]                 | creates new or updates existing API version. x-ms-original-file: 2024-06-01-preview/ApiVersions_CreateOrUpdate.json                  |
| [apiVersionsDeleteSample.js][apiversionsdeletesample]                                 | deletes specified API version x-ms-original-file: 2024-06-01-preview/ApiVersions_Delete.json                                         |
| [apiVersionsGetSample.js][apiversionsgetsample]                                       | returns details of the API version. x-ms-original-file: 2024-06-01-preview/ApiVersions_Get.json                                      |
| [apiVersionsHeadSample.js][apiversionsheadsample]                                     | checks if specified API version exists. x-ms-original-file: 2024-06-01-preview/ApiVersions_Head.json                                 |
| [apiVersionsListSample.js][apiversionslistsample]                                     | returns a collection of API versions. x-ms-original-file: 2024-06-01-preview/ApiVersions_List.json                                   |
| [apisCreateOrUpdateSample.js][apiscreateorupdatesample]                               | creates new or updates existing API. x-ms-original-file: 2024-06-01-preview/Apis_CreateOrUpdate.json                                 |
| [apisDeleteSample.js][apisdeletesample]                                               | deletes specified API. x-ms-original-file: 2024-06-01-preview/Apis_Delete.json                                                       |
| [apisGetSample.js][apisgetsample]                                                     | returns details of the API. x-ms-original-file: 2024-06-01-preview/Apis_Get.json                                                     |
| [apisHeadSample.js][apisheadsample]                                                   | checks if specified API exists. x-ms-original-file: 2024-06-01-preview/Apis_Head.json                                                |
| [apisListSample.js][apislistsample]                                                   | returns a collection of APIs. x-ms-original-file: 2024-06-01-preview/Apis_List.json                                                  |
| [deletedServicesDeleteSample.js][deletedservicesdeletesample]                         | permanently deletes specified service. x-ms-original-file: 2024-06-01-preview/DeletedServices_Delete.json                            |
| [deletedServicesGetSample.js][deletedservicesgetsample]                               | returns details of the soft-deleted service. x-ms-original-file: 2024-06-01-preview/DeletedServices_Get.json                         |
| [deletedServicesListBySubscriptionSample.js][deletedserviceslistbysubscriptionsample] | lists services within an Azure subscription. x-ms-original-file: 2024-06-01-preview/DeletedServices_List.json                        |
| [deletedServicesListSample.js][deletedserviceslistsample]                             | lists soft-deleted services. x-ms-original-file: 2024-06-01-preview/DeletedServices_ListBySubscription.json                          |
| [deploymentsCreateOrUpdateSample.js][deploymentscreateorupdatesample]                 | creates new or updates existing API deployment. x-ms-original-file: 2024-06-01-preview/Deployments_CreateOrUpdate.json               |
| [deploymentsDeleteSample.js][deploymentsdeletesample]                                 | deletes API deployment. x-ms-original-file: 2024-06-01-preview/Deployments_Delete.json                                               |
| [deploymentsGetSample.js][deploymentsgetsample]                                       | returns details of the API deployment. x-ms-original-file: 2024-06-01-preview/Deployments_Get.json                                   |
| [deploymentsHeadSample.js][deploymentsheadsample]                                     | checks if specified API deployment exists. x-ms-original-file: 2024-06-01-preview/Deployments_Head.json                              |
| [deploymentsListSample.js][deploymentslistsample]                                     | returns a collection of API deployments. x-ms-original-file: 2024-06-01-preview/Deployments_List.json                                |
| [environmentsCreateOrUpdateSample.js][environmentscreateorupdatesample]               | creates new or updates existing environment. x-ms-original-file: 2024-06-01-preview/Environments_CreateOrUpdate.json                 |
| [environmentsDeleteSample.js][environmentsdeletesample]                               | deletes the environment. x-ms-original-file: 2024-06-01-preview/Environments_Delete.json                                             |
| [environmentsGetSample.js][environmentsgetsample]                                     | returns details of the environment. x-ms-original-file: 2024-06-01-preview/Environments_Get.json                                     |
| [environmentsHeadSample.js][environmentsheadsample]                                   | checks if specified environment exists. x-ms-original-file: 2024-06-01-preview/Environments_Head.json                                |
| [environmentsListSample.js][environmentslistsample]                                   | returns a collection of environments. x-ms-original-file: 2024-06-01-preview/Environments_List.json                                  |
| [metadataSchemasCreateOrUpdateSample.js][metadataschemascreateorupdatesample]         | creates new or updates existing metadata schema. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_CreateOrUpdate.json          |
| [metadataSchemasDeleteSample.js][metadataschemasdeletesample]                         | deletes specified metadata schema. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Delete.json                                |
| [metadataSchemasGetSample.js][metadataschemasgetsample]                               | returns details of the metadata schema. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Get.json                              |
| [metadataSchemasHeadSample.js][metadataschemasheadsample]                             | checks if specified metadata schema exists. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_Head.json                         |
| [metadataSchemasListSample.js][metadataschemaslistsample]                             | returns a collection of metadata schemas. x-ms-original-file: 2024-06-01-preview/MetadataSchemas_List.json                           |
| [operationsListSample.js][operationslistsample]                                       | list the operations for the provider x-ms-original-file: 2024-06-01-preview/Operations_List.json                                     |
| [servicesCreateOrUpdateSample.js][servicescreateorupdatesample]                       | creates new or updates existing API. x-ms-original-file: 2024-06-01-preview/Services_CreateOrUpdate.json                             |
| [servicesDeleteSample.js][servicesdeletesample]                                       | deletes specified service. x-ms-original-file: 2024-06-01-preview/Services_Delete.json                                               |
| [servicesExportMetadataSchemaSample.js][servicesexportmetadataschemasample]           | exports the effective metadata schema. x-ms-original-file: 2024-06-01-preview/Services_ExportMetadataSchema.json                     |
| [servicesGetSample.js][servicesgetsample]                                             | returns details of the service. x-ms-original-file: 2024-06-01-preview/Services_Get.json                                             |
| [servicesListByResourceGroupSample.js][serviceslistbyresourcegroupsample]             | returns a collection of services within the resource group. x-ms-original-file: 2024-06-01-preview/Services_ListByResourceGroup.json |
| [servicesListBySubscriptionSample.js][serviceslistbysubscriptionsample]               | lists services within an Azure subscription. x-ms-original-file: 2024-06-01-preview/Services_ListBySubscription.json                 |
| [servicesUpdateSample.js][servicesupdatesample]                                       | updates existing service. x-ms-original-file: 2024-06-01-preview/Services_Update.json                                                |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]                   | creates new or updates existing workspace. x-ms-original-file: 2024-06-01-preview/Workspaces_CreateOrUpdate.json                     |
| [workspacesDeleteSample.js][workspacesdeletesample]                                   | deletes specified workspace. x-ms-original-file: 2024-06-01-preview/Workspaces_Delete.json                                           |
| [workspacesGetSample.js][workspacesgetsample]                                         | returns details of the workspace. x-ms-original-file: 2024-06-01-preview/Workspaces_Get.json                                         |
| [workspacesHeadSample.js][workspacesheadsample]                                       | checks if specified workspace exists. x-ms-original-file: 2024-06-01-preview/Workspaces_Head.json                                    |
| [workspacesListSample.js][workspaceslistsample]                                       | returns a collection of workspaces. x-ms-original-file: 2024-06-01-preview/Workspaces_List.json                                      |

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
node apiDefinitionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node apiDefinitionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[apidefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiDefinitionsCreateOrUpdateSample.js
[apidefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiDefinitionsDeleteSample.js
[apidefinitionsexportspecificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiDefinitionsExportSpecificationSample.js
[apidefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiDefinitionsGetSample.js
[apidefinitionsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiDefinitionsHeadSample.js
[apidefinitionsimportspecificationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiDefinitionsImportSpecificationSample.js
[apidefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiDefinitionsListSample.js
[apisourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiSourcesCreateOrUpdateSample.js
[apisourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiSourcesDeleteSample.js
[apisourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiSourcesGetSample.js
[apisourcesheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiSourcesHeadSample.js
[apisourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiSourcesListSample.js
[apiversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiVersionsCreateOrUpdateSample.js
[apiversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiVersionsDeleteSample.js
[apiversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiVersionsGetSample.js
[apiversionsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiVersionsHeadSample.js
[apiversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apiVersionsListSample.js
[apiscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apisCreateOrUpdateSample.js
[apisdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apisDeleteSample.js
[apisgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apisGetSample.js
[apisheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apisHeadSample.js
[apislistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/apisListSample.js
[deletedservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deletedServicesDeleteSample.js
[deletedservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deletedServicesGetSample.js
[deletedserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deletedServicesListBySubscriptionSample.js
[deletedserviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deletedServicesListSample.js
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deploymentsCreateOrUpdateSample.js
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deploymentsDeleteSample.js
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deploymentsGetSample.js
[deploymentsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deploymentsHeadSample.js
[deploymentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/deploymentsListSample.js
[environmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/environmentsCreateOrUpdateSample.js
[environmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/environmentsDeleteSample.js
[environmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/environmentsGetSample.js
[environmentsheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/environmentsHeadSample.js
[environmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/environmentsListSample.js
[metadataschemascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/metadataSchemasCreateOrUpdateSample.js
[metadataschemasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/metadataSchemasDeleteSample.js
[metadataschemasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/metadataSchemasGetSample.js
[metadataschemasheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/metadataSchemasHeadSample.js
[metadataschemaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/metadataSchemasListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/operationsListSample.js
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/servicesCreateOrUpdateSample.js
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/servicesDeleteSample.js
[servicesexportmetadataschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/servicesExportMetadataSchemaSample.js
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/servicesGetSample.js
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/servicesListByResourceGroupSample.js
[serviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/servicesListBySubscriptionSample.js
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/servicesUpdateSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/workspacesGetSample.js
[workspacesheadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/workspacesHeadSample.js
[workspaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/apicenter/arm-apicenter/samples/v2-beta/javascript/workspacesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-apicenter?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/apicenter/arm-apicenter/README.md
