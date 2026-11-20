# @azure/arm-migratecontainerappsassessments client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-migratecontainerappsassessments in some common scenarios.

| **File Name**                                                                                                                 | **Description**                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [assessedWebApplicationOperationsGetSample.ts][assessedwebapplicationoperationsgetsample]                                     | get a AssessedWebApplication x-ms-original-file: 2025-09-09-preview/AssessedWebApplicationOperations_Get_MaximumSet_Gen.json                                                                |
| [assessedWebApplicationOperationsListByParentSample.ts][assessedwebapplicationoperationslistbyparentsample]                   | list AssessedWebApplication resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/AssessedWebApplicationOperations_ListByParent_MaximumSet_Gen.json                   |
| [containerAppsAssessmentOperationsCreateSample.ts][containerappsassessmentoperationscreatesample]                             | create a ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Create_MaximumSet_Gen.json                                                        |
| [containerAppsAssessmentOperationsDeleteSample.ts][containerappsassessmentoperationsdeletesample]                             | delete a ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Delete_MaximumSet_Gen.json                                                        |
| [containerAppsAssessmentOperationsDownloadUrlSample.ts][containerappsassessmentoperationsdownloadurlsample]                   | get URL for downloading Azure Container Apps Assessment Report. x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_DownloadUrl_MaximumSet_Gen.json                    |
| [containerAppsAssessmentOperationsGetSample.ts][containerappsassessmentoperationsgetsample]                                   | get a ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Get_MaximumSet_Gen.json                                                              |
| [containerAppsAssessmentOperationsListByParentSample.ts][containerappsassessmentoperationslistbyparentsample]                 | list ContainerAppsAssessment resources by AssessmentProject x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_ListByParent_MaximumSet_Gen.json                       |
| [containerAppsCostDetailOperationsListByParentSample.ts][containerappscostdetailoperationslistbyparentsample]                 | list ContainerAppsCostDetail resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsCostDetailOperations_ListByParent_MaximumSet_Gen.json                 |
| [containerAppsManagedEnvironmentOperationsGetSample.ts][containerappsmanagedenvironmentoperationsgetsample]                   | get a ContainerAppsManagedEnvironment x-ms-original-file: 2025-09-09-preview/ContainerAppsManagedEnvironmentOperations_Get_MaximumSet_Gen.json                                              |
| [containerAppsManagedEnvironmentOperationsListByParentSample.ts][containerappsmanagedenvironmentoperationslistbyparentsample] | list ContainerAppsManagedEnvironment resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsManagedEnvironmentOperations_ListByParent_MaximumSet_Gen.json |
| [containerAppsOptionsOperationsGetSample.ts][containerappsoptionsoperationsgetsample]                                         | get a ContainerAppsAssessmentOptions x-ms-original-file: 2025-09-09-preview/ContainerAppsOptionsOperations_Get_MaximumSet_Gen.json                                                          |
| [containerAppsOptionsOperationsListByParentSample.ts][containerappsoptionsoperationslistbyparentsample]                       | list ContainerAppsAssessmentOptions resources by AssessmentProject x-ms-original-file: 2025-09-09-preview/ContainerAppsOptionsOperations_ListByParent_MaximumSet_Gen.json                   |
| [containerAppsSummaryOperationsGetSample.ts][containerappssummaryoperationsgetsample]                                         | get a ContainerAppsSummary x-ms-original-file: 2025-09-09-preview/ContainerAppsSummaryOperations_Get_MaximumSet_Gen.json                                                                    |
| [containerAppsSummaryOperationsListByParentSample.ts][containerappssummaryoperationslistbyparentsample]                       | list ContainerAppsSummary resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsSummaryOperations_ListByParent_MaximumSet_Gen.json                       |

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
node dist/assessedWebApplicationOperationsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/assessedWebApplicationOperationsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assessedwebapplicationoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/assessedWebApplicationOperationsGetSample.ts
[assessedwebapplicationoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/assessedWebApplicationOperationsListByParentSample.ts
[containerappsassessmentoperationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsAssessmentOperationsCreateSample.ts
[containerappsassessmentoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsAssessmentOperationsDeleteSample.ts
[containerappsassessmentoperationsdownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsAssessmentOperationsDownloadUrlSample.ts
[containerappsassessmentoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsAssessmentOperationsGetSample.ts
[containerappsassessmentoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsAssessmentOperationsListByParentSample.ts
[containerappscostdetailoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsCostDetailOperationsListByParentSample.ts
[containerappsmanagedenvironmentoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsManagedEnvironmentOperationsGetSample.ts
[containerappsmanagedenvironmentoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsManagedEnvironmentOperationsListByParentSample.ts
[containerappsoptionsoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsOptionsOperationsGetSample.ts
[containerappsoptionsoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsOptionsOperationsListByParentSample.ts
[containerappssummaryoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsSummaryOperationsGetSample.ts
[containerappssummaryoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/typescript/src/containerAppsSummaryOperationsListByParentSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-migratecontainerappsassessments?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/migrate/arm-migratecontainerappsassessments/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
