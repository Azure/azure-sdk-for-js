# @azure/arm-hybridconnectivity client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-hybridconnectivity in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [endpointsCreateOrUpdateSample.ts][endpointscreateorupdatesample]                                         | create or update the endpoint to the target resource. x-ms-original-file: 2027-01-01/Endpoints_CreateOrUpdate_MaximumSet_Gen.json                                                        |
| [endpointsDeleteSample.ts][endpointsdeletesample]                                                         | deletes the endpoint access to the target resource. x-ms-original-file: 2027-01-01/Endpoints_Delete_MaximumSet_Gen.json                                                                  |
| [endpointsGetSample.ts][endpointsgetsample]                                                               | gets the endpoint to the resource. x-ms-original-file: 2027-01-01/Endpoints_Get_MaximumSet_Gen.json                                                                                      |
| [endpointsListCredentialsSample.ts][endpointslistcredentialssample]                                       | gets the endpoint access credentials to the resource. x-ms-original-file: 2027-01-01/Endpoints_ListCredentials_MaximumSet_Gen.json                                                       |
| [endpointsListIngressGatewayCredentialsSample.ts][endpointslistingressgatewaycredentialssample]           | gets the ingress gateway endpoint credentials x-ms-original-file: 2027-01-01/Endpoints_ListIngressGatewayCredentials_MaximumSet_Gen.json                                                 |
| [endpointsListManagedProxyDetailsSample.ts][endpointslistmanagedproxydetailssample]                       | fetches the managed proxy details x-ms-original-file: 2027-01-01/Endpoints_ListManagedProxyDetails_MaximumSet_Gen.json                                                                   |
| [endpointsListSample.ts][endpointslistsample]                                                             | list of endpoints to the target resource. x-ms-original-file: 2027-01-01/Endpoints_List_MaximumSet_Gen.json                                                                              |
| [endpointsUpdateSample.ts][endpointsupdatesample]                                                         | update the endpoint to the target resource. x-ms-original-file: 2027-01-01/Endpoints_Update_MaximumSet_Gen.json                                                                          |
| [generateAwsTemplatePostSample.ts][generateawstemplatepostsample]                                         | retrieve AWS Cloud Formation template x-ms-original-file: 2027-01-01/GenerateAwsTemplate_Post_MaximumSet_Gen.json                                                                        |
| [generateGcpTemplatePostSample.ts][generategcptemplatepostsample]                                         | retrieve GCP Access Control template x-ms-original-file: 2027-01-01/GenerateGcpTemplate_Post_MaximumSet_Gen.json                                                                         |
| [inventoryGetSample.ts][inventorygetsample]                                                               | get a InventoryResource x-ms-original-file: 2027-01-01/Inventory_Get_MaximumSet_Gen.json                                                                                                 |
| [inventoryListBySolutionConfigurationSample.ts][inventorylistbysolutionconfigurationsample]               | list InventoryResource resources by SolutionConfiguration x-ms-original-file: 2027-01-01/Inventory_ListBySolutionConfiguration_MaximumSet_Gen.json                                       |
| [operationsListSample.ts][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2027-01-01/Operations_List_MaximumSet_Gen.json                                                                                  |
| [publicCloudConnectorsCreateOrUpdateSample.ts][publiccloudconnectorscreateorupdatesample]                 | create a PublicCloudConnector x-ms-original-file: 2027-01-01/PublicCloudConnectors_CreateOrUpdate_MaximumSet_Gen.json                                                                    |
| [publicCloudConnectorsDeleteSample.ts][publiccloudconnectorsdeletesample]                                 | delete a PublicCloudConnector x-ms-original-file: 2027-01-01/PublicCloudConnectors_Delete_MaximumSet_Gen.json                                                                            |
| [publicCloudConnectorsGetSample.ts][publiccloudconnectorsgetsample]                                       | get a PublicCloudConnector x-ms-original-file: 2027-01-01/PublicCloudConnectors_Get_MaximumSet_Gen.json                                                                                  |
| [publicCloudConnectorsListByResourceGroupSample.ts][publiccloudconnectorslistbyresourcegroupsample]       | list PublicCloudConnector resources by resource group x-ms-original-file: 2027-01-01/PublicCloudConnectors_ListByResourceGroup_MaximumSet_Gen.json                                       |
| [publicCloudConnectorsListBySubscriptionSample.ts][publiccloudconnectorslistbysubscriptionsample]         | list PublicCloudConnector resources by subscription ID x-ms-original-file: 2027-01-01/PublicCloudConnectors_ListBySubscription_MaximumSet_Gen.json                                       |
| [publicCloudConnectorsTestPermissionsSample.ts][publiccloudconnectorstestpermissionssample]               | a long-running resource action. x-ms-original-file: 2027-01-01/PublicCloudConnectors_TestPermissions_MaximumSet_Gen.json                                                                 |
| [publicCloudConnectorsUpdateSample.ts][publiccloudconnectorsupdatesample]                                 | update a PublicCloudConnector x-ms-original-file: 2027-01-01/PublicCloudConnectors_Update_MaximumSet_Gen.json                                                                            |
| [serviceConfigurationsCreateOrupdateSample.ts][serviceconfigurationscreateorupdatesample]                 | create or update a service in serviceConfiguration for the endpoint resource. x-ms-original-file: 2027-01-01/ServiceConfigurations_CreateOrupdate_MaximumSet_Gen.json                    |
| [serviceConfigurationsDeleteSample.ts][serviceconfigurationsdeletesample]                                 | deletes the service details to the target resource. x-ms-original-file: 2027-01-01/ServiceConfigurations_Delete_MaximumSet_Gen.json                                                      |
| [serviceConfigurationsGetSample.ts][serviceconfigurationsgetsample]                                       | gets the details about the service to the resource. x-ms-original-file: 2027-01-01/ServiceConfigurations_Get_MaximumSet_Gen.json                                                         |
| [serviceConfigurationsListByEndpointResourceSample.ts][serviceconfigurationslistbyendpointresourcesample] | aPI to enumerate registered services in service configurations under a Endpoint Resource x-ms-original-file: 2027-01-01/ServiceConfigurations_ListByEndpointResource_MaximumSet_Gen.json |
| [serviceConfigurationsUpdateSample.ts][serviceconfigurationsupdatesample]                                 | update the service details in the service configurations of the target resource. x-ms-original-file: 2027-01-01/ServiceConfigurations_Update_MaximumSet_Gen.json                         |
| [solutionConfigurationsCreateOrUpdateSample.ts][solutionconfigurationscreateorupdatesample]               | create a SolutionConfiguration x-ms-original-file: 2027-01-01/SolutionConfigurations_CreateOrUpdate_MaximumSet_Gen.json                                                                  |
| [solutionConfigurationsDeleteSample.ts][solutionconfigurationsdeletesample]                               | delete a SolutionConfiguration x-ms-original-file: 2027-01-01/SolutionConfigurations_Delete_MaximumSet_Gen.json                                                                          |
| [solutionConfigurationsGetSample.ts][solutionconfigurationsgetsample]                                     | get a SolutionConfiguration x-ms-original-file: 2027-01-01/SolutionConfigurations_Get_MaximumSet_Gen.json                                                                                |
| [solutionConfigurationsListSample.ts][solutionconfigurationslistsample]                                   | list SolutionConfiguration resources by parent x-ms-original-file: 2027-01-01/SolutionConfigurations_List_MaximumSet_Gen.json                                                            |
| [solutionConfigurationsSyncNowSample.ts][solutionconfigurationssyncnowsample]                             | trigger immediate sync with source cloud x-ms-original-file: 2027-01-01/SolutionConfigurations_SyncNow_MaximumSet_Gen.json                                                               |
| [solutionConfigurationsUpdateSample.ts][solutionconfigurationsupdatesample]                               | update a SolutionConfiguration x-ms-original-file: 2027-01-01/SolutionConfigurations_Update_MaximumSet_Gen.json                                                                          |
| [solutionTypesGetSample.ts][solutiontypesgetsample]                                                       | get a SolutionTypeResource x-ms-original-file: 2027-01-01/SolutionTypes_Get_MaximumSet_Gen.json                                                                                          |
| [solutionTypesListByResourceGroupSample.ts][solutiontypeslistbyresourcegroupsample]                       | list SolutionTypeResource resources by resource group x-ms-original-file: 2027-01-01/SolutionTypes_ListByResourceGroup_MaximumSet_Gen.json                                               |
| [solutionTypesListBySubscriptionSample.ts][solutiontypeslistbysubscriptionsample]                         | list SolutionTypeResource resources by subscription ID x-ms-original-file: 2027-01-01/SolutionTypes_ListBySubscription_MaximumSet_Gen.json                                               |

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
node dist/endpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsCreateOrUpdateSample.ts
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsDeleteSample.ts
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsGetSample.ts
[endpointslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsListCredentialsSample.ts
[endpointslistingressgatewaycredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsListIngressGatewayCredentialsSample.ts
[endpointslistmanagedproxydetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsListManagedProxyDetailsSample.ts
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsListSample.ts
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsUpdateSample.ts
[generateawstemplatepostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/generateAwsTemplatePostSample.ts
[generategcptemplatepostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/generateGcpTemplatePostSample.ts
[inventorygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/inventoryGetSample.ts
[inventorylistbysolutionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/inventoryListBySolutionConfigurationSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/operationsListSample.ts
[publiccloudconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsCreateOrUpdateSample.ts
[publiccloudconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsDeleteSample.ts
[publiccloudconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsGetSample.ts
[publiccloudconnectorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsListByResourceGroupSample.ts
[publiccloudconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsListBySubscriptionSample.ts
[publiccloudconnectorstestpermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsTestPermissionsSample.ts
[publiccloudconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsUpdateSample.ts
[serviceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsCreateOrupdateSample.ts
[serviceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsDeleteSample.ts
[serviceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsGetSample.ts
[serviceconfigurationslistbyendpointresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsListByEndpointResourceSample.ts
[serviceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsUpdateSample.ts
[solutionconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsCreateOrUpdateSample.ts
[solutionconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsDeleteSample.ts
[solutionconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsGetSample.ts
[solutionconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsListSample.ts
[solutionconfigurationssyncnowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsSyncNowSample.ts
[solutionconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsUpdateSample.ts
[solutiontypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionTypesGetSample.ts
[solutiontypeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionTypesListByResourceGroupSample.ts
[solutiontypeslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionTypesListBySubscriptionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridconnectivity
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridconnectivity/arm-hybridconnectivity/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
