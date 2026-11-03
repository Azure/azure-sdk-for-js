# @azure/arm-servicefabric client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-servicefabric in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applicationTypeVersionsCreateOrUpdateSample.js][applicationtypeversionscreateorupdatesample] | create or update a Service Fabric application type version resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionPutOperation_example.json                                                                                                                                           |
| [applicationTypeVersionsDeleteSample.js][applicationtypeversionsdeletesample]                 | delete a Service Fabric application type version resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionDeleteOperation_example.json                                                                                                                                                  |
| [applicationTypeVersionsGetSample.js][applicationtypeversionsgetsample]                       | get a Service Fabric application type version resource created or in the process of being created in the Service Fabric application type name resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionGetOperation_example.json                                                                                |
| [applicationTypeVersionsListSample.js][applicationtypeversionslistsample]                     | gets all application type version resources created or in the process of being created in the Service Fabric application type name resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeVersionListOperation_example.json                                                                                          |
| [applicationTypesCreateOrUpdateSample.js][applicationtypescreateorupdatesample]               | create or update a Service Fabric application type name resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNamePutOperation_example.json                                                                                                                                                 |
| [applicationTypesDeleteSample.js][applicationtypesdeletesample]                               | delete a Service Fabric application type name resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNameDeleteOperation_example.json                                                                                                                                                        |
| [applicationTypesGetSample.js][applicationtypesgetsample]                                     | get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNameGetOperation_example.json                                                                                                    |
| [applicationTypesListSample.js][applicationtypeslistsample]                                   | gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationTypeNameListOperation_example.json                                                                                                              |
| [applicationsCreateOrUpdateSample.js][applicationscreateorupdatesample]                       | create or update a Service Fabric application resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationPutOperation_example_max.json                                                                                                                                                               |
| [applicationsDeleteSample.js][applicationsdeletesample]                                       | delete a Service Fabric application resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationDeleteOperation_example.json                                                                                                                                                                          |
| [applicationsGetSample.js][applicationsgetsample]                                             | get a Service Fabric application resource created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationGetOperation_example.json                                                                                                                      |
| [applicationsListSample.js][applicationslistsample]                                           | gets all application resources created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: 2026-03-01-preview/ApplicationListOperation_example.json                                                                                                                                |
| [applicationsUpdateSample.js][applicationsupdatesample]                                       | update a Service Fabric application resource with the specified name. x-ms-original-file: 2026-03-01-preview/ApplicationPatchOperation_example.json                                                                                                                                                                           |
| [clusterVersionsGetByEnvironmentSample.js][clusterversionsgetbyenvironmentsample]             | gets information about an available Service Fabric cluster code version by environment. x-ms-original-file: 2026-03-01-preview/ClusterVersionsGetByEnvironment_example.json                                                                                                                                                   |
| [clusterVersionsGetSample.js][clusterversionsgetsample]                                       | gets information about an available Service Fabric cluster code version. x-ms-original-file: 2026-03-01-preview/ClusterVersionsGet_example.json                                                                                                                                                                               |
| [clusterVersionsListByEnvironmentSample.js][clusterversionslistbyenvironmentsample]           | gets all available code versions for Service Fabric cluster resources by environment. x-ms-original-file: 2026-03-01-preview/ClusterVersionsListByEnvironment.json                                                                                                                                                            |
| [clusterVersionsListSample.js][clusterversionslistsample]                                     | gets all available code versions for Service Fabric cluster resources by location. x-ms-original-file: 2026-03-01-preview/ClusterVersionsList_example.json                                                                                                                                                                    |
| [clustersCreateOrUpdateSample.js][clusterscreateorupdatesample]                               | create or update a Service Fabric cluster resource with the specified name. x-ms-original-file: 2026-03-01-preview/ClusterPutOperation_example_max.json                                                                                                                                                                       |
| [clustersDeleteSample.js][clustersdeletesample]                                               | delete a Service Fabric cluster resource with the specified name. x-ms-original-file: 2026-03-01-preview/ClusterDeleteOperation_example.json                                                                                                                                                                                  |
| [clustersGetSample.js][clustersgetsample]                                                     | get a Service Fabric cluster resource created or in the process of being created in the specified resource group. x-ms-original-file: 2026-03-01-preview/ClusterGetOperation_example.json                                                                                                                                     |
| [clustersListByResourceGroupSample.js][clusterslistbyresourcegroupsample]                     | gets all Service Fabric cluster resources created or in the process of being created in the resource group. x-ms-original-file: 2026-03-01-preview/ClusterListByResourceGroupOperation_example.json                                                                                                                           |
| [clustersListSample.js][clusterslistsample]                                                   | gets all Service Fabric cluster resources created or in the process of being created in the subscription. x-ms-original-file: 2026-03-01-preview/ClusterListOperation_example.json                                                                                                                                            |
| [clustersListUpgradableVersionsSample.js][clusterslistupgradableversionssample]               | if a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. x-ms-original-file: 2026-03-01-preview/ListUpgradableVersionsMinMax_example.json |
| [clustersUpdateSample.js][clustersupdatesample]                                               | update the configuration of a Service Fabric cluster resource with the specified name. x-ms-original-file: 2026-03-01-preview/ClusterPatchOperation_example.json                                                                                                                                                              |
| [operationsListSample.js][operationslistsample]                                               | get the list of available Service Fabric resource provider API operations. x-ms-original-file: 2026-03-01-preview/Operations_example.json                                                                                                                                                                                     |
| [servicesCreateOrUpdateSample.js][servicescreateorupdatesample]                               | create or update a Service Fabric service resource with the specified name. x-ms-original-file: 2026-03-01-preview/ServicePutOperation_example_max.json                                                                                                                                                                       |
| [servicesDeleteSample.js][servicesdeletesample]                                               | delete a Service Fabric service resource with the specified name. x-ms-original-file: 2026-03-01-preview/ServiceDeleteOperation_example.json                                                                                                                                                                                  |
| [servicesGetSample.js][servicesgetsample]                                                     | get a Service Fabric service resource created or in the process of being created in the Service Fabric application resource. x-ms-original-file: 2026-03-01-preview/ServiceGetOperation_example.json                                                                                                                          |
| [servicesListSample.js][serviceslistsample]                                                   | gets all service resources created or in the process of being created in the Service Fabric application resource. x-ms-original-file: 2026-03-01-preview/ServiceListOperation_example.json                                                                                                                                    |
| [servicesUpdateSample.js][servicesupdatesample]                                               | update a Service Fabric service resource with the specified name. x-ms-original-file: 2026-03-01-preview/ServicePatchOperation_example.json                                                                                                                                                                                   |
| [unsupportedVmSizesGetSample.js][unsupportedvmsizesgetsample]                                 | get unsupported vm size for Service Fabric Clusters. x-ms-original-file: 2026-03-01-preview/UnsupportedVMSizesGet_example.json                                                                                                                                                                                                |
| [unsupportedVmSizesListSample.js][unsupportedvmsizeslistsample]                               | get the lists of unsupported vm sizes for Service Fabric Clusters. x-ms-original-file: 2026-03-01-preview/UnsupportedVMSizesList_example.json                                                                                                                                                                                 |

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
node applicationTypeVersionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node applicationTypeVersionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applicationtypeversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypeVersionsCreateOrUpdateSample.js
[applicationtypeversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypeVersionsDeleteSample.js
[applicationtypeversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypeVersionsGetSample.js
[applicationtypeversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypeVersionsListSample.js
[applicationtypescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypesCreateOrUpdateSample.js
[applicationtypesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypesDeleteSample.js
[applicationtypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypesGetSample.js
[applicationtypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationTypesListSample.js
[applicationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationsCreateOrUpdateSample.js
[applicationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationsDeleteSample.js
[applicationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationsGetSample.js
[applicationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationsListSample.js
[applicationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/applicationsUpdateSample.js
[clusterversionsgetbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clusterVersionsGetByEnvironmentSample.js
[clusterversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clusterVersionsGetSample.js
[clusterversionslistbyenvironmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clusterVersionsListByEnvironmentSample.js
[clusterversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clusterVersionsListSample.js
[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clustersCreateOrUpdateSample.js
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clustersDeleteSample.js
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clustersGetSample.js
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clustersListByResourceGroupSample.js
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clustersListSample.js
[clusterslistupgradableversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clustersListUpgradableVersionsSample.js
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/clustersUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/operationsListSample.js
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/servicesCreateOrUpdateSample.js
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/servicesDeleteSample.js
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/servicesGetSample.js
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/servicesListSample.js
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/servicesUpdateSample.js
[unsupportedvmsizesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/unsupportedVmSizesGetSample.js
[unsupportedvmsizeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric/samples/v4-beta/javascript/unsupportedVmSizesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-servicefabric?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicefabric/arm-servicefabric/README.md
