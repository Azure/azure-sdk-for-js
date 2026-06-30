# @azure/arm-informaticadatamanagement client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-informaticadatamanagement in some common scenarios.

| **File Name**                                                                                                                     | **Description**                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                                   | list the operations for the provider x-ms-original-file: 2025-11-27/Operations_List_MaximumSet_Gen.json                                                                                            |
| [organizationsCreateOrUpdateSample.ts][organizationscreateorupdatesample]                                                         | create a InformaticaOrganizationResource x-ms-original-file: 2025-11-27/Organizations_CreateOrUpdate_MaximumSet_Gen.json                                                                           |
| [organizationsDeleteSample.ts][organizationsdeletesample]                                                                         | delete a InformaticaOrganizationResource x-ms-original-file: 2025-11-27/Organizations_Delete_MaximumSet_Gen.json                                                                                   |
| [organizationsGetAllServerlessRuntimesSample.ts][organizationsgetallserverlessruntimessample]                                     | gets all serverless runtime resources in a given informatica organization resource. x-ms-original-file: 2025-11-27/Organizations_GetAllServerlessRuntimes_MaximumSet_Gen.json                      |
| [organizationsGetSample.ts][organizationsgetsample]                                                                               | get a InformaticaOrganizationResource x-ms-original-file: 2025-11-27/Organizations_Get_MaximumSet_Gen.json                                                                                         |
| [organizationsGetServerlessMetadataSample.ts][organizationsgetserverlessmetadatasample]                                           | gets Metadata of the serverless runtime environment. x-ms-original-file: 2025-11-27/Organizations_GetServerlessMetadata_MaximumSet_Gen.json                                                        |
| [organizationsListByResourceGroupSample.ts][organizationslistbyresourcegroupsample]                                               | list InformaticaOrganizationResource resources by resource group x-ms-original-file: 2025-11-27/Organizations_ListByResourceGroup_MaximumSet_Gen.json                                              |
| [organizationsListBySubscriptionSample.ts][organizationslistbysubscriptionsample]                                                 | list InformaticaOrganizationResource resources by subscription ID x-ms-original-file: 2025-11-27/Organizations_ListBySubscription_MaximumSet_Gen.json                                              |
| [organizationsUpdateSample.ts][organizationsupdatesample]                                                                         | update a InformaticaOrganizationResource x-ms-original-file: 2025-11-27/Organizations_Update_MaximumSet_Gen.json                                                                                   |
| [serverlessRuntimesCheckDependenciesSample.ts][serverlessruntimescheckdependenciessample]                                         | checks all dependencies for a serverless runtime resource x-ms-original-file: 2025-11-27/ServerlessRuntimes_CheckDependencies_MaximumSet_Gen.json                                                  |
| [serverlessRuntimesCreateOrUpdateSample.ts][serverlessruntimescreateorupdatesample]                                               | create a InformaticaServerlessRuntimeResource x-ms-original-file: 2025-11-27/ServerlessRuntimes_CreateOrUpdate_MaximumSet_Gen.json                                                                 |
| [serverlessRuntimesDeleteSample.ts][serverlessruntimesdeletesample]                                                               | delete a InformaticaServerlessRuntimeResource x-ms-original-file: 2025-11-27/ServerlessRuntimes_Delete_MaximumSet_Gen.json                                                                         |
| [serverlessRuntimesGetSample.ts][serverlessruntimesgetsample]                                                                     | get a InformaticaServerlessRuntimeResource x-ms-original-file: 2025-11-27/ServerlessRuntimes_Get_MaximumSet_Gen.json                                                                               |
| [serverlessRuntimesListByInformaticaOrganizationResourceSample.ts][serverlessruntimeslistbyinformaticaorganizationresourcesample] | list InformaticaServerlessRuntimeResource resources by InformaticaOrganizationResource x-ms-original-file: 2025-11-27/ServerlessRuntimes_ListByInformaticaOrganizationResource_MaximumSet_Gen.json |
| [serverlessRuntimesServerlessResourceByIdSample.ts][serverlessruntimesserverlessresourcebyidsample]                               | returns a serverless runtime resource by ID x-ms-original-file: 2025-11-27/ServerlessRuntimes_ServerlessResourceById_MaximumSet_Gen.json                                                           |
| [serverlessRuntimesStartFailedServerlessRuntimeSample.ts][serverlessruntimesstartfailedserverlessruntimesample]                   | starts a failed runtime resource x-ms-original-file: 2025-11-27/ServerlessRuntimes_StartFailedServerlessRuntime_MaximumSet_Gen.json                                                                |
| [serverlessRuntimesUpdateSample.ts][serverlessruntimesupdatesample]                                                               | update a InformaticaServerlessRuntimeResource x-ms-original-file: 2025-11-27/ServerlessRuntimes_Update_MaximumSet_Gen.json                                                                         |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/operationsListSample.ts
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsCreateOrUpdateSample.ts
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsDeleteSample.ts
[organizationsgetallserverlessruntimessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsGetAllServerlessRuntimesSample.ts
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsGetSample.ts
[organizationsgetserverlessmetadatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsGetServerlessMetadataSample.ts
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsListByResourceGroupSample.ts
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsListBySubscriptionSample.ts
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/organizationsUpdateSample.ts
[serverlessruntimescheckdependenciessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesCheckDependenciesSample.ts
[serverlessruntimescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesCreateOrUpdateSample.ts
[serverlessruntimesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesDeleteSample.ts
[serverlessruntimesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesGetSample.ts
[serverlessruntimeslistbyinformaticaorganizationresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesListByInformaticaOrganizationResourceSample.ts
[serverlessruntimesserverlessresourcebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesServerlessResourceByIdSample.ts
[serverlessruntimesstartfailedserverlessruntimesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesStartFailedServerlessRuntimeSample.ts
[serverlessruntimesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/informatica/arm-informaticadatamanagement/samples/v2/typescript/src/serverlessRuntimesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-informaticadatamanagement
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/informatica/arm-informaticadatamanagement/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
