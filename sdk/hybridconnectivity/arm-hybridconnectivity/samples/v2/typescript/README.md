# @azure/arm-hybridconnectivity client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-hybridconnectivity in some common scenarios.

| **File Name**                                                                                                                                       | **Description**                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [endpointsEndpointsCreateOrUpdateSample.ts][endpointsendpointscreateorupdatesample]                                                                 | create or update the endpoint to the target resource. x-ms-original-file: 2024-12-01/EndpointsPutCustom.json                                           |
| [endpointsEndpointsDeleteSample.ts][endpointsendpointsdeletesample]                                                                                 | deletes the endpoint access to the target resource. x-ms-original-file: 2024-12-01/EndpointsDeleteDefault.json                                         |
| [endpointsEndpointsGetSample.ts][endpointsendpointsgetsample]                                                                                       | gets the endpoint to the resource. x-ms-original-file: 2024-12-01/EndpointsGetCustom.json                                                              |
| [endpointsEndpointsListCredentialsSample.ts][endpointsendpointslistcredentialssample]                                                               | gets the endpoint access credentials to the resource. x-ms-original-file: 2024-12-01/EndpointsPostListCredentials.json                                 |
| [endpointsEndpointsListIngressGatewayCredentialsSample.ts][endpointsendpointslistingressgatewaycredentialssample]                                   | gets the ingress gateway endpoint credentials x-ms-original-file: 2024-12-01/EndpointsPostListIngressGatewayCredentials.json                           |
| [endpointsEndpointsListManagedProxyDetailsSample.ts][endpointsendpointslistmanagedproxydetailssample]                                               | fetches the managed proxy details x-ms-original-file: 2024-12-01/EndpointsPostListManagedProxyDetails.json                                             |
| [endpointsEndpointsListSample.ts][endpointsendpointslistsample]                                                                                     | list of endpoints to the target resource. x-ms-original-file: 2024-12-01/EndpointsList.json                                                            |
| [endpointsEndpointsUpdateSample.ts][endpointsendpointsupdatesample]                                                                                 | update the endpoint to the target resource. x-ms-original-file: 2024-12-01/EndpointsPatchDefault.json                                                  |
| [generateAwsTemplateGenerateAwsTemplatePostSample.ts][generateawstemplategenerateawstemplatepostsample]                                             | retrieve AWS Cloud Formation template x-ms-original-file: 2024-12-01/GenerateAwsTemplate_Post.json                                                     |
| [inventoryInventoryGetSample.ts][inventoryinventorygetsample]                                                                                       | get a InventoryResource x-ms-original-file: 2024-12-01/Inventory_Get.json                                                                              |
| [inventoryInventoryListBySolutionConfigurationSample.ts][inventoryinventorylistbysolutionconfigurationsample]                                       | list InventoryResource resources by SolutionConfiguration x-ms-original-file: 2024-12-01/Inventory_ListBySolutionConfiguration.json                    |
| [operationsOperationsListSample.ts][operationsoperationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2024-12-01/OperationsList.json                                                                |
| [publicCloudConnectorsPublicCloudConnectorsCreateOrUpdateSample.ts][publiccloudconnectorspubliccloudconnectorscreateorupdatesample]                 | create a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_CreateOrUpdate.json                                                 |
| [publicCloudConnectorsPublicCloudConnectorsDeleteSample.ts][publiccloudconnectorspubliccloudconnectorsdeletesample]                                 | delete a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Delete.json                                                         |
| [publicCloudConnectorsPublicCloudConnectorsGetSample.ts][publiccloudconnectorspubliccloudconnectorsgetsample]                                       | get a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Get.json                                                               |
| [publicCloudConnectorsPublicCloudConnectorsListByResourceGroupSample.ts][publiccloudconnectorspubliccloudconnectorslistbyresourcegroupsample]       | list PublicCloudConnector resources by resource group x-ms-original-file: 2024-12-01/PublicCloudConnectors_ListByResourceGroup.json                    |
| [publicCloudConnectorsPublicCloudConnectorsListBySubscriptionSample.ts][publiccloudconnectorspubliccloudconnectorslistbysubscriptionsample]         | list PublicCloudConnector resources by subscription ID x-ms-original-file: 2024-12-01/PublicCloudConnectors_ListBySubscription.json                    |
| [publicCloudConnectorsPublicCloudConnectorsTestPermissionsSample.ts][publiccloudconnectorspubliccloudconnectorstestpermissionssample]               | a long-running resource action. x-ms-original-file: 2024-12-01/PublicCloudConnectors_TestPermissions.json                                              |
| [publicCloudConnectorsPublicCloudConnectorsUpdateSample.ts][publiccloudconnectorspubliccloudconnectorsupdatesample]                                 | update a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Update.json                                                         |
| [serviceConfigurationsServiceConfigurationsCreateOrupdateSample.ts][serviceconfigurationsserviceconfigurationscreateorupdatesample]                 | create or update a service in serviceConfiguration for the endpoint resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsPutSSH.json          |
| [serviceConfigurationsServiceConfigurationsDeleteSample.ts][serviceconfigurationsserviceconfigurationsdeletesample]                                 | deletes the service details to the target resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsDeleteSSH.json                                 |
| [serviceConfigurationsServiceConfigurationsGetSample.ts][serviceconfigurationsserviceconfigurationsgetsample]                                       | gets the details about the service to the resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsGetSSH.json                                    |
| [serviceConfigurationsServiceConfigurationsListByEndpointResourceSample.ts][serviceconfigurationsserviceconfigurationslistbyendpointresourcesample] | aPI to enumerate registered services in service configurations under a Endpoint Resource x-ms-original-file: 2024-12-01/ServiceConfigurationsList.json |
| [serviceConfigurationsServiceConfigurationsUpdateSample.ts][serviceconfigurationsserviceconfigurationsupdatesample]                                 | update the service details in the service configurations of the target resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsPatchSSH.json     |
| [solutionConfigurationsSolutionConfigurationsCreateOrUpdateSample.ts][solutionconfigurationssolutionconfigurationscreateorupdatesample]             | create a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_CreateOrUpdate.json                                               |
| [solutionConfigurationsSolutionConfigurationsDeleteSample.ts][solutionconfigurationssolutionconfigurationsdeletesample]                             | delete a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Delete.json                                                       |
| [solutionConfigurationsSolutionConfigurationsGetSample.ts][solutionconfigurationssolutionconfigurationsgetsample]                                   | get a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Get.json                                                             |
| [solutionConfigurationsSolutionConfigurationsListSample.ts][solutionconfigurationssolutionconfigurationslistsample]                                 | list SolutionConfiguration resources by parent x-ms-original-file: 2024-12-01/SolutionConfigurations_List.json                                         |
| [solutionConfigurationsSolutionConfigurationsSyncNowSample.ts][solutionconfigurationssolutionconfigurationssyncnowsample]                           | trigger immediate sync with source cloud x-ms-original-file: 2024-12-01/SolutionConfigurations_SyncNow.json                                            |
| [solutionConfigurationsSolutionConfigurationsUpdateSample.ts][solutionconfigurationssolutionconfigurationsupdatesample]                             | update a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Update.json                                                       |
| [solutionTypesSolutionTypesGetSample.ts][solutiontypessolutiontypesgetsample]                                                                       | get a SolutionTypeResource x-ms-original-file: 2024-12-01/SolutionTypes_Get.json                                                                       |
| [solutionTypesSolutionTypesListByResourceGroupSample.ts][solutiontypessolutiontypeslistbyresourcegroupsample]                                       | list SolutionTypeResource resources by resource group x-ms-original-file: 2024-12-01/SolutionTypes_ListByResourceGroup.json                            |
| [solutionTypesSolutionTypesListBySubscriptionSample.ts][solutiontypessolutiontypeslistbysubscriptionsample]                                         | list SolutionTypeResource resources by subscription ID x-ms-original-file: 2024-12-01/SolutionTypes_ListBySubscription.json                            |

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
node dist/endpointsEndpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/endpointsEndpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointsendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsCreateOrUpdateSample.ts
[endpointsendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsDeleteSample.ts
[endpointsendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsGetSample.ts
[endpointsendpointslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsListCredentialsSample.ts
[endpointsendpointslistingressgatewaycredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsListIngressGatewayCredentialsSample.ts
[endpointsendpointslistmanagedproxydetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsListManagedProxyDetailsSample.ts
[endpointsendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsListSample.ts
[endpointsendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/endpointsEndpointsUpdateSample.ts
[generateawstemplategenerateawstemplatepostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/generateAwsTemplateGenerateAwsTemplatePostSample.ts
[inventoryinventorygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/inventoryInventoryGetSample.ts
[inventoryinventorylistbysolutionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/inventoryInventoryListBySolutionConfigurationSample.ts
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/operationsOperationsListSample.ts
[publiccloudconnectorspubliccloudconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsPublicCloudConnectorsCreateOrUpdateSample.ts
[publiccloudconnectorspubliccloudconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsPublicCloudConnectorsDeleteSample.ts
[publiccloudconnectorspubliccloudconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsPublicCloudConnectorsGetSample.ts
[publiccloudconnectorspubliccloudconnectorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsPublicCloudConnectorsListByResourceGroupSample.ts
[publiccloudconnectorspubliccloudconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsPublicCloudConnectorsListBySubscriptionSample.ts
[publiccloudconnectorspubliccloudconnectorstestpermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsPublicCloudConnectorsTestPermissionsSample.ts
[publiccloudconnectorspubliccloudconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/publicCloudConnectorsPublicCloudConnectorsUpdateSample.ts
[serviceconfigurationsserviceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsServiceConfigurationsCreateOrupdateSample.ts
[serviceconfigurationsserviceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsServiceConfigurationsDeleteSample.ts
[serviceconfigurationsserviceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsServiceConfigurationsGetSample.ts
[serviceconfigurationsserviceconfigurationslistbyendpointresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsServiceConfigurationsListByEndpointResourceSample.ts
[serviceconfigurationsserviceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/serviceConfigurationsServiceConfigurationsUpdateSample.ts
[solutionconfigurationssolutionconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsSolutionConfigurationsCreateOrUpdateSample.ts
[solutionconfigurationssolutionconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsSolutionConfigurationsDeleteSample.ts
[solutionconfigurationssolutionconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsSolutionConfigurationsGetSample.ts
[solutionconfigurationssolutionconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsSolutionConfigurationsListSample.ts
[solutionconfigurationssolutionconfigurationssyncnowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsSolutionConfigurationsSyncNowSample.ts
[solutionconfigurationssolutionconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionConfigurationsSolutionConfigurationsUpdateSample.ts
[solutiontypessolutiontypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionTypesSolutionTypesGetSample.ts
[solutiontypessolutiontypeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionTypesSolutionTypesListByResourceGroupSample.ts
[solutiontypessolutiontypeslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/typescript/src/solutionTypesSolutionTypesListBySubscriptionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridconnectivity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridconnectivity/arm-hybridconnectivity/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
