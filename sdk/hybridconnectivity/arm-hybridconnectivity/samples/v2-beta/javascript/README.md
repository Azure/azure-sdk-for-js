# @azure/arm-hybridconnectivity client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-hybridconnectivity in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                                         | create or update the endpoint to the target resource. x-ms-original-file: 2024-12-01/EndpointsPutCustom.json                                           |
| [endpointsDeleteSample.js][endpointsdeletesample]                                                         | deletes the endpoint access to the target resource. x-ms-original-file: 2024-12-01/EndpointsDeleteDefault.json                                         |
| [endpointsGetSample.js][endpointsgetsample]                                                               | gets the endpoint to the resource. x-ms-original-file: 2024-12-01/EndpointsGetCustom.json                                                              |
| [endpointsListCredentialsSample.js][endpointslistcredentialssample]                                       | gets the endpoint access credentials to the resource. x-ms-original-file: 2024-12-01/EndpointsPostListCredentials.json                                 |
| [endpointsListIngressGatewayCredentialsSample.js][endpointslistingressgatewaycredentialssample]           | gets the ingress gateway endpoint credentials x-ms-original-file: 2024-12-01/EndpointsPostListIngressGatewayCredentials.json                           |
| [endpointsListManagedProxyDetailsSample.js][endpointslistmanagedproxydetailssample]                       | fetches the managed proxy details x-ms-original-file: 2024-12-01/EndpointsPostListManagedProxyDetails.json                                             |
| [endpointsListSample.js][endpointslistsample]                                                             | list of endpoints to the target resource. x-ms-original-file: 2024-12-01/EndpointsList.json                                                            |
| [endpointsUpdateSample.js][endpointsupdatesample]                                                         | update the endpoint to the target resource. x-ms-original-file: 2024-12-01/EndpointsPatchDefault.json                                                  |
| [generateAwsTemplatePostSample.js][generateawstemplatepostsample]                                         | retrieve AWS Cloud Formation template x-ms-original-file: 2024-12-01/GenerateAwsTemplate_Post.json                                                     |
| [inventoryGetSample.js][inventorygetsample]                                                               | get a InventoryResource x-ms-original-file: 2024-12-01/Inventory_Get.json                                                                              |
| [inventoryListBySolutionConfigurationSample.js][inventorylistbysolutionconfigurationsample]               | list InventoryResource resources by SolutionConfiguration x-ms-original-file: 2024-12-01/Inventory_ListBySolutionConfiguration.json                    |
| [operationsListSample.js][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2024-12-01/OperationsList.json                                                                |
| [publicCloudConnectorsCreateOrUpdateSample.js][publiccloudconnectorscreateorupdatesample]                 | create a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_CreateOrUpdate.json                                                 |
| [publicCloudConnectorsDeleteSample.js][publiccloudconnectorsdeletesample]                                 | delete a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Delete.json                                                         |
| [publicCloudConnectorsGetSample.js][publiccloudconnectorsgetsample]                                       | get a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Get.json                                                               |
| [publicCloudConnectorsListByResourceGroupSample.js][publiccloudconnectorslistbyresourcegroupsample]       | list PublicCloudConnector resources by resource group x-ms-original-file: 2024-12-01/PublicCloudConnectors_ListByResourceGroup.json                    |
| [publicCloudConnectorsListBySubscriptionSample.js][publiccloudconnectorslistbysubscriptionsample]         | list PublicCloudConnector resources by subscription ID x-ms-original-file: 2024-12-01/PublicCloudConnectors_ListBySubscription.json                    |
| [publicCloudConnectorsTestPermissionsSample.js][publiccloudconnectorstestpermissionssample]               | a long-running resource action. x-ms-original-file: 2024-12-01/PublicCloudConnectors_TestPermissions.json                                              |
| [publicCloudConnectorsUpdateSample.js][publiccloudconnectorsupdatesample]                                 | update a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Update.json                                                         |
| [serviceConfigurationsCreateOrupdateSample.js][serviceconfigurationscreateorupdatesample]                 | create or update a service in serviceConfiguration for the endpoint resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsPutSSH.json          |
| [serviceConfigurationsDeleteSample.js][serviceconfigurationsdeletesample]                                 | deletes the service details to the target resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsDeleteSSH.json                                 |
| [serviceConfigurationsGetSample.js][serviceconfigurationsgetsample]                                       | gets the details about the service to the resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsGetSSH.json                                    |
| [serviceConfigurationsListByEndpointResourceSample.js][serviceconfigurationslistbyendpointresourcesample] | aPI to enumerate registered services in service configurations under a Endpoint Resource x-ms-original-file: 2024-12-01/ServiceConfigurationsList.json |
| [serviceConfigurationsUpdateSample.js][serviceconfigurationsupdatesample]                                 | update the service details in the service configurations of the target resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsPatchSSH.json     |
| [solutionConfigurationsCreateOrUpdateSample.js][solutionconfigurationscreateorupdatesample]               | create a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_CreateOrUpdate.json                                               |
| [solutionConfigurationsDeleteSample.js][solutionconfigurationsdeletesample]                               | delete a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Delete.json                                                       |
| [solutionConfigurationsGetSample.js][solutionconfigurationsgetsample]                                     | get a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Get.json                                                             |
| [solutionConfigurationsListSample.js][solutionconfigurationslistsample]                                   | list SolutionConfiguration resources by parent x-ms-original-file: 2024-12-01/SolutionConfigurations_List.json                                         |
| [solutionConfigurationsSyncNowSample.js][solutionconfigurationssyncnowsample]                             | trigger immediate sync with source cloud x-ms-original-file: 2024-12-01/SolutionConfigurations_SyncNow.json                                            |
| [solutionConfigurationsUpdateSample.js][solutionconfigurationsupdatesample]                               | update a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Update.json                                                       |
| [solutionTypesGetSample.js][solutiontypesgetsample]                                                       | get a SolutionTypeResource x-ms-original-file: 2024-12-01/SolutionTypes_Get.json                                                                       |
| [solutionTypesListByResourceGroupSample.js][solutiontypeslistbyresourcegroupsample]                       | list SolutionTypeResource resources by resource group x-ms-original-file: 2024-12-01/SolutionTypes_ListByResourceGroup.json                            |
| [solutionTypesListBySubscriptionSample.js][solutiontypeslistbysubscriptionsample]                         | list SolutionTypeResource resources by subscription ID x-ms-original-file: 2024-12-01/SolutionTypes_ListBySubscription.json                            |

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
node endpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node endpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsGetSample.js
[endpointslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsListCredentialsSample.js
[endpointslistingressgatewaycredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsListIngressGatewayCredentialsSample.js
[endpointslistmanagedproxydetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsListManagedProxyDetailsSample.js
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsListSample.js
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/endpointsUpdateSample.js
[generateawstemplatepostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/generateAwsTemplatePostSample.js
[inventorygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/inventoryGetSample.js
[inventorylistbysolutionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/inventoryListBySolutionConfigurationSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/operationsListSample.js
[publiccloudconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/publicCloudConnectorsCreateOrUpdateSample.js
[publiccloudconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/publicCloudConnectorsDeleteSample.js
[publiccloudconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/publicCloudConnectorsGetSample.js
[publiccloudconnectorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/publicCloudConnectorsListByResourceGroupSample.js
[publiccloudconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/publicCloudConnectorsListBySubscriptionSample.js
[publiccloudconnectorstestpermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/publicCloudConnectorsTestPermissionsSample.js
[publiccloudconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/publicCloudConnectorsUpdateSample.js
[serviceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/serviceConfigurationsCreateOrupdateSample.js
[serviceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/serviceConfigurationsDeleteSample.js
[serviceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/serviceConfigurationsGetSample.js
[serviceconfigurationslistbyendpointresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/serviceConfigurationsListByEndpointResourceSample.js
[serviceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/serviceConfigurationsUpdateSample.js
[solutionconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionConfigurationsCreateOrUpdateSample.js
[solutionconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionConfigurationsDeleteSample.js
[solutionconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionConfigurationsGetSample.js
[solutionconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionConfigurationsListSample.js
[solutionconfigurationssyncnowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionConfigurationsSyncNowSample.js
[solutionconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionConfigurationsUpdateSample.js
[solutiontypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionTypesGetSample.js
[solutiontypeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionTypesListByResourceGroupSample.js
[solutiontypeslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2-beta/javascript/solutionTypesListBySubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridconnectivity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridconnectivity/arm-hybridconnectivity/README.md
