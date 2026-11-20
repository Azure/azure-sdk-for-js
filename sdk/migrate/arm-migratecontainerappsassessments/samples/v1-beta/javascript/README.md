# @azure/arm-migratecontainerappsassessments client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-migratecontainerappsassessments in some common scenarios.

| **File Name**                                                                                                                 | **Description**                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [assessedWebApplicationOperationsGetSample.js][assessedwebapplicationoperationsgetsample]                                     | get a AssessedWebApplication x-ms-original-file: 2025-09-09-preview/AssessedWebApplicationOperations_Get_MaximumSet_Gen.json                                                                |
| [assessedWebApplicationOperationsListByParentSample.js][assessedwebapplicationoperationslistbyparentsample]                   | list AssessedWebApplication resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/AssessedWebApplicationOperations_ListByParent_MaximumSet_Gen.json                   |
| [containerAppsAssessmentOperationsCreateSample.js][containerappsassessmentoperationscreatesample]                             | create a ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Create_MaximumSet_Gen.json                                                        |
| [containerAppsAssessmentOperationsDeleteSample.js][containerappsassessmentoperationsdeletesample]                             | delete a ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Delete_MaximumSet_Gen.json                                                        |
| [containerAppsAssessmentOperationsDownloadUrlSample.js][containerappsassessmentoperationsdownloadurlsample]                   | get URL for downloading Azure Container Apps Assessment Report. x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_DownloadUrl_MaximumSet_Gen.json                    |
| [containerAppsAssessmentOperationsGetSample.js][containerappsassessmentoperationsgetsample]                                   | get a ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_Get_MaximumSet_Gen.json                                                              |
| [containerAppsAssessmentOperationsListByParentSample.js][containerappsassessmentoperationslistbyparentsample]                 | list ContainerAppsAssessment resources by AssessmentProject x-ms-original-file: 2025-09-09-preview/ContainerAppsAssessmentOperations_ListByParent_MaximumSet_Gen.json                       |
| [containerAppsCostDetailOperationsListByParentSample.js][containerappscostdetailoperationslistbyparentsample]                 | list ContainerAppsCostDetail resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsCostDetailOperations_ListByParent_MaximumSet_Gen.json                 |
| [containerAppsManagedEnvironmentOperationsGetSample.js][containerappsmanagedenvironmentoperationsgetsample]                   | get a ContainerAppsManagedEnvironment x-ms-original-file: 2025-09-09-preview/ContainerAppsManagedEnvironmentOperations_Get_MaximumSet_Gen.json                                              |
| [containerAppsManagedEnvironmentOperationsListByParentSample.js][containerappsmanagedenvironmentoperationslistbyparentsample] | list ContainerAppsManagedEnvironment resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsManagedEnvironmentOperations_ListByParent_MaximumSet_Gen.json |
| [containerAppsOptionsOperationsGetSample.js][containerappsoptionsoperationsgetsample]                                         | get a ContainerAppsAssessmentOptions x-ms-original-file: 2025-09-09-preview/ContainerAppsOptionsOperations_Get_MaximumSet_Gen.json                                                          |
| [containerAppsOptionsOperationsListByParentSample.js][containerappsoptionsoperationslistbyparentsample]                       | list ContainerAppsAssessmentOptions resources by AssessmentProject x-ms-original-file: 2025-09-09-preview/ContainerAppsOptionsOperations_ListByParent_MaximumSet_Gen.json                   |
| [containerAppsSummaryOperationsGetSample.js][containerappssummaryoperationsgetsample]                                         | get a ContainerAppsSummary x-ms-original-file: 2025-09-09-preview/ContainerAppsSummaryOperations_Get_MaximumSet_Gen.json                                                                    |
| [containerAppsSummaryOperationsListByParentSample.js][containerappssummaryoperationslistbyparentsample]                       | list ContainerAppsSummary resources by ContainerAppsAssessment x-ms-original-file: 2025-09-09-preview/ContainerAppsSummaryOperations_ListByParent_MaximumSet_Gen.json                       |

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
node assessedWebApplicationOperationsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node assessedWebApplicationOperationsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assessedwebapplicationoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/assessedWebApplicationOperationsGetSample.js
[assessedwebapplicationoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/assessedWebApplicationOperationsListByParentSample.js
[containerappsassessmentoperationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsAssessmentOperationsCreateSample.js
[containerappsassessmentoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsAssessmentOperationsDeleteSample.js
[containerappsassessmentoperationsdownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsAssessmentOperationsDownloadUrlSample.js
[containerappsassessmentoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsAssessmentOperationsGetSample.js
[containerappsassessmentoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsAssessmentOperationsListByParentSample.js
[containerappscostdetailoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsCostDetailOperationsListByParentSample.js
[containerappsmanagedenvironmentoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsManagedEnvironmentOperationsGetSample.js
[containerappsmanagedenvironmentoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsManagedEnvironmentOperationsListByParentSample.js
[containerappsoptionsoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsOptionsOperationsGetSample.js
[containerappsoptionsoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsOptionsOperationsListByParentSample.js
[containerappssummaryoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsSummaryOperationsGetSample.js
[containerappssummaryoperationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migratecontainerappsassessments/samples/v1-beta/javascript/containerAppsSummaryOperationsListByParentSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-migratecontainerappsassessments?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/migrate/arm-migratecontainerappsassessments/README.md
