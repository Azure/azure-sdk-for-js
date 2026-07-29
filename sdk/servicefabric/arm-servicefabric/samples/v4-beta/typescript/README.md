# @azure/arm-servicefabric client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-servicefabric in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applicationTypeVersionsCreateOrUpdateSample.ts][applicationtypeversionscreateorupdatesample] | create or update a Service Fabric application type version resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionPutOperation_example.json                                                                                                                                           |
| [applicationTypeVersionsDeleteSample.ts][applicationtypeversionsdeletesample]                 | delete a Service Fabric application type version resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionDeleteOperation_example.json                                                                                                                                                  |
| [applicationTypeVersionsGetSample.ts][applicationtypeversionsgetsample]                       | get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionGetOperation_example.json                                                                                |
| [applicationTypeVersionsListSample.ts][applicationtypeversionslistsample]                     | gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionListOperation_example.json                                                                                          |
| [applicationTypesCreateOrUpdateSample.ts][applicationtypescreateorupdatesample]               | create or update a Service Fabric application type name resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNamePutOperation_example.json                                                                                                                                                 |
| [applicationTypesDeleteSample.ts][applicationtypesdeletesample]                               | delete a Service Fabric application type name resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNameDeleteOperation_example.json                                                                                                                                                        |
| [applicationTypesGetSample.ts][applicationtypesgetsample]                                     | get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNameGetOperation_example.json                                                                                                    |
| [applicationTypesListSample.ts][applicationtypeslistsample]                                   | gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNameListOperation_example.json                                                                                                              |
| [applicationsCreateOrUpdateSample.ts][applicationscreateorupdatesample]                       | create or update a Service Fabric application resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationPutOperation_example_max.json                                                                                                                                                               |
| [applicationsDeleteSample.ts][applicationsdeletesample]                                       | delete a Service Fabric application resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationDeleteOperation_example.json                                                                                                                                                                          |
| [applicationsGetSample.ts][applicationsgetsample]                                             | get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationGetOperation_example.json                                                                                                                      |
| [applicationsListSample.ts][applicationslistsample]                                           | gets all application resources created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationListOperation_example.json                                                                                                                                |
| [applicationsUpdateSample.ts][applicationsupdatesample]                                       | update a Service Fabric application resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationPatchOperation_example.json                                                                                                                                                                           |
| [clusterVersionsGetByEnvironmentSample.ts][clusterversionsgetbyenvironmentsample]             | gets information about an available Service Fabric cluster code version by environment. x-ms-original-file: 2026-03-01-preview/ClusterVersionsGetByEnvironment_example.json                                                                                                                                                   |
| [clusterVersionsGetSample.ts][clusterversionsgetsample]                                       | gets information about an available Service Fabric cluster code version. x-ms-original-file: 2026-03-01-preview/ClusterVersionsGet_example.json                                                                                                                                                                               |
| [clusterVersionsListByEnvironmentSample.ts][clusterversionslistbyenvironmentsample]           | gets all available code versions for Service Fabric cluster resources by environment. x-ms-original-file: 2026-03-01-preview/ClusterVersionsListByEnvironment.json                                                                                                                                                            |
| [clusterVersionsListSample.ts][clusterversionslistsample]                                     | gets all available code versions for Service Fabric cluster resources by location. x-ms-original-file: 2026-03-01-preview/ClusterVersionsList_example.json                                                                                                                                                                    |
| [clustersCreateOrUpdateSample.ts][clusterscreateorupdatesample]                               | create or update a Service Fabric cluster resource with the specified name. x-ms-original-file: 2026-03-01-preview/ClusterPutOperation_example_max.json                                                                                                                                                                       |
| [clustersDeleteSample.ts][clustersdeletesample]                                               | delete a Service Fabric cluster resource with the specified name. x-ms-original-file: 2026-03-01-preview/ClusterDeleteOperation_example.json                                                                                                                                                                                  |
| [clustersGetSample.ts][clustersgetsample]                                                     | get a Service Fabric cluster resource created or in the process of being created in the specified resource group. x-ms-original-file: 2026-03-01-preview/ClusterGetOperation_example.json                                                                                                                                     |
| [clustersListByResourceGroupSample.ts][clusterslistbyresourcegroupsample]                     | gets all Service Fabric cluster resources created or in the process of being created in the resource group. x-ms-original-file: 2026-03-01-preview/ClusterListByResourceGroupOperation_example.json                                                                                                                           |
| [clustersListSample.ts][clusterslistsample]                                                   | gets all Service Fabric cluster resources created or in the process of being created in the subscription. x-ms-original-file: 2026-03-01-preview/ClusterListOperation_example.json                                                                                                                                            |
| [clustersListUpgradableVersionsSample.ts][clusterslistupgradableversionssample]               | if a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. x-ms-original-file: 2026-03-01-preview/ListUpgradableVersionsMinMax_example.json |
| [clustersUpdateSample.ts][clustersupdatesample]                                               | update the configuration of a Service Fabric cluster resource with the specified name. x-ms-original-file: 2026-03-01-preview/ClusterPatchOperation_example.json                                                                                                                                                              |
| [operationsListSample.ts][operationslistsample]                                               | get the list of available Service Fabric resource provider API operations. x-ms-original-file: 2026-03-01-preview/Operations_example.json                                                                                                                                                                                     |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]                               | create or update a Service Fabric service resource with the specified name. x-ms-original-file: 2026-03-01-preview/ServicePutOperation_example_max.json                                                                                                                                                                       |
| [servicesDeleteSample.ts][servicesdeletesample]                                               | delete a Service Fabric service resource with the specified name. x-ms-original-file: 2026-03-01-preview/ServiceDeleteOperation_example.json                                                                                                                                                                                  |
| [servicesGetSample.ts][servicesgetsample]                                                     | get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. x-ms-original-file: 2026-03-01-preview/ServiceGetOperation_example.json                                                                                                                          |
| [servicesListSample.ts][serviceslistsample]                                                   | gets all service resources created or in the process of being created in the Service Fabric application resource. x-ms-original-file: 2026-03-01-preview/ServiceListOperation_example.json                                                                                                                                    |
| [servicesUpdateSample.ts][servicesupdatesample]                                               | update a Service Fabric service resource with the specified name. x-ms-original-file: 2026-03-01-preview/ServicePatchOperation_example.json                                                                                                                                                                                   |
| [unsupportedVmSizesGetSample.ts][unsupportedvmsizesgetsample]                                 | get unsupported vm size for Service Fabric Clusters. x-ms-original-file: 2026-03-01-preview/UnsupportedVMSizesGet_example.json                                                                                                                                                                                                |
| [unsupportedVmSizesListSample.ts][unsupportedvmsizeslistsample]                               | get the lists of unsupported vm sizes for Service Fabric Clusters. x-ms-original-file: 2026-03-01-preview/UnsupportedVMSizesList_example.json                                                                                                                                                                                 |

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
node dist/applicationTypeVersionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/applicationTypeVersionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applicationtypeversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypeVersionsCreateOrUpdateSample.ts
[applicationtypeversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypeVersionsDeleteSample.ts
[applicationtypeversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypeVersionsGetSample.ts
[applicationtypeversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypeVersionsListSample.ts
[applicationtypescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypesCreateOrUpdateSample.ts
[applicationtypesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypesDeleteSample.ts
[applicationtypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypesGetSample.ts
[applicationtypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationTypesListSample.ts
[applicationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationsCreateOrUpdateSample.ts
[applicationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationsDeleteSample.ts
[applicationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationsGetSample.ts
[applicationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationsListSample.ts
[applicationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/applicationsUpdateSample.ts
[clusterversionsgetbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clusterVersionsGetByEnvironmentSample.ts
[clusterversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clusterVersionsGetSample.ts
[clusterversionslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clusterVersionsListByEnvironmentSample.ts
[clusterversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clusterVersionsListSample.ts
[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clustersCreateOrUpdateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clustersDeleteSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clustersGetSample.ts
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clustersListByResourceGroupSample.ts
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clustersListSample.ts
[clusterslistupgradableversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clustersListUpgradableVersionsSample.ts
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/clustersUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/operationsListSample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/servicesDeleteSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/servicesGetSample.ts
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/servicesListSample.ts
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/servicesUpdateSample.ts
[unsupportedvmsizesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/unsupportedVmSizesGetSample.ts
[unsupportedvmsizeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/typescript/src/unsupportedVmSizesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicefabric?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicefabric/arm-servicefabric/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
