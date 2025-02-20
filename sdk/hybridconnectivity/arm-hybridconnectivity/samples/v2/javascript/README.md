# @azure/arm-hybridconnectivity client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-hybridconnectivity in some common scenarios.

| **File Name**                                                                                                                                       | **Description**                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [endpointsEndpointsCreateOrUpdateSample.js][endpointsendpointscreateorupdatesample]                                                                 | create or update the endpoint to the target resource. x-ms-original-file: 2024-12-01/EndpointsPutCustom.json                                           |
| [endpointsEndpointsDeleteSample.js][endpointsendpointsdeletesample]                                                                                 | deletes the endpoint access to the target resource. x-ms-original-file: 2024-12-01/EndpointsDeleteDefault.json                                         |
| [endpointsEndpointsGetSample.js][endpointsendpointsgetsample]                                                                                       | gets the endpoint to the resource. x-ms-original-file: 2024-12-01/EndpointsGetCustom.json                                                              |
| [endpointsEndpointsListCredentialsSample.js][endpointsendpointslistcredentialssample]                                                               | gets the endpoint access credentials to the resource. x-ms-original-file: 2024-12-01/EndpointsPostListCredentials.json                                 |
| [endpointsEndpointsListIngressGatewayCredentialsSample.js][endpointsendpointslistingressgatewaycredentialssample]                                   | gets the ingress gateway endpoint credentials x-ms-original-file: 2024-12-01/EndpointsPostListIngressGatewayCredentials.json                           |
| [endpointsEndpointsListManagedProxyDetailsSample.js][endpointsendpointslistmanagedproxydetailssample]                                               | fetches the managed proxy details x-ms-original-file: 2024-12-01/EndpointsPostListManagedProxyDetails.json                                             |
| [endpointsEndpointsListSample.js][endpointsendpointslistsample]                                                                                     | list of endpoints to the target resource. x-ms-original-file: 2024-12-01/EndpointsList.json                                                            |
| [endpointsEndpointsUpdateSample.js][endpointsendpointsupdatesample]                                                                                 | update the endpoint to the target resource. x-ms-original-file: 2024-12-01/EndpointsPatchDefault.json                                                  |
| [generateAwsTemplateGenerateAwsTemplatePostSample.js][generateawstemplategenerateawstemplatepostsample]                                             | retrieve AWS Cloud Formation template x-ms-original-file: 2024-12-01/GenerateAwsTemplate_Post.json                                                     |
| [inventoryInventoryGetSample.js][inventoryinventorygetsample]                                                                                       | get a InventoryResource x-ms-original-file: 2024-12-01/Inventory_Get.json                                                                              |
| [inventoryInventoryListBySolutionConfigurationSample.js][inventoryinventorylistbysolutionconfigurationsample]                                       | list InventoryResource resources by SolutionConfiguration x-ms-original-file: 2024-12-01/Inventory_ListBySolutionConfiguration.json                    |
| [operationsOperationsListSample.js][operationsoperationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2024-12-01/OperationsList.json                                                                |
| [publicCloudConnectorsPublicCloudConnectorsCreateOrUpdateSample.js][publiccloudconnectorspubliccloudconnectorscreateorupdatesample]                 | create a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_CreateOrUpdate.json                                                 |
| [publicCloudConnectorsPublicCloudConnectorsDeleteSample.js][publiccloudconnectorspubliccloudconnectorsdeletesample]                                 | delete a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Delete.json                                                         |
| [publicCloudConnectorsPublicCloudConnectorsGetSample.js][publiccloudconnectorspubliccloudconnectorsgetsample]                                       | get a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Get.json                                                               |
| [publicCloudConnectorsPublicCloudConnectorsListByResourceGroupSample.js][publiccloudconnectorspubliccloudconnectorslistbyresourcegroupsample]       | list PublicCloudConnector resources by resource group x-ms-original-file: 2024-12-01/PublicCloudConnectors_ListByResourceGroup.json                    |
| [publicCloudConnectorsPublicCloudConnectorsListBySubscriptionSample.js][publiccloudconnectorspubliccloudconnectorslistbysubscriptionsample]         | list PublicCloudConnector resources by subscription ID x-ms-original-file: 2024-12-01/PublicCloudConnectors_ListBySubscription.json                    |
| [publicCloudConnectorsPublicCloudConnectorsTestPermissionsSample.js][publiccloudconnectorspubliccloudconnectorstestpermissionssample]               | a long-running resource action. x-ms-original-file: 2024-12-01/PublicCloudConnectors_TestPermissions.json                                              |
| [publicCloudConnectorsPublicCloudConnectorsUpdateSample.js][publiccloudconnectorspubliccloudconnectorsupdatesample]                                 | update a PublicCloudConnector x-ms-original-file: 2024-12-01/PublicCloudConnectors_Update.json                                                         |
| [serviceConfigurationsServiceConfigurationsCreateOrupdateSample.js][serviceconfigurationsserviceconfigurationscreateorupdatesample]                 | create or update a service in serviceConfiguration for the endpoint resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsPutSSH.json          |
| [serviceConfigurationsServiceConfigurationsDeleteSample.js][serviceconfigurationsserviceconfigurationsdeletesample]                                 | deletes the service details to the target resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsDeleteSSH.json                                 |
| [serviceConfigurationsServiceConfigurationsGetSample.js][serviceconfigurationsserviceconfigurationsgetsample]                                       | gets the details about the service to the resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsGetSSH.json                                    |
| [serviceConfigurationsServiceConfigurationsListByEndpointResourceSample.js][serviceconfigurationsserviceconfigurationslistbyendpointresourcesample] | aPI to enumerate registered services in service configurations under a Endpoint Resource x-ms-original-file: 2024-12-01/ServiceConfigurationsList.json |
| [serviceConfigurationsServiceConfigurationsUpdateSample.js][serviceconfigurationsserviceconfigurationsupdatesample]                                 | update the service details in the service configurations of the target resource. x-ms-original-file: 2024-12-01/ServiceConfigurationsPatchSSH.json     |
| [solutionConfigurationsSolutionConfigurationsCreateOrUpdateSample.js][solutionconfigurationssolutionconfigurationscreateorupdatesample]             | create a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_CreateOrUpdate.json                                               |
| [solutionConfigurationsSolutionConfigurationsDeleteSample.js][solutionconfigurationssolutionconfigurationsdeletesample]                             | delete a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Delete.json                                                       |
| [solutionConfigurationsSolutionConfigurationsGetSample.js][solutionconfigurationssolutionconfigurationsgetsample]                                   | get a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Get.json                                                             |
| [solutionConfigurationsSolutionConfigurationsListSample.js][solutionconfigurationssolutionconfigurationslistsample]                                 | list SolutionConfiguration resources by parent x-ms-original-file: 2024-12-01/SolutionConfigurations_List.json                                         |
| [solutionConfigurationsSolutionConfigurationsSyncNowSample.js][solutionconfigurationssolutionconfigurationssyncnowsample]                           | trigger immediate sync with source cloud x-ms-original-file: 2024-12-01/SolutionConfigurations_SyncNow.json                                            |
| [solutionConfigurationsSolutionConfigurationsUpdateSample.js][solutionconfigurationssolutionconfigurationsupdatesample]                             | update a SolutionConfiguration x-ms-original-file: 2024-12-01/SolutionConfigurations_Update.json                                                       |
| [solutionTypesSolutionTypesGetSample.js][solutiontypessolutiontypesgetsample]                                                                       | get a SolutionTypeResource x-ms-original-file: 2024-12-01/SolutionTypes_Get.json                                                                       |
| [solutionTypesSolutionTypesListByResourceGroupSample.js][solutiontypessolutiontypeslistbyresourcegroupsample]                                       | list SolutionTypeResource resources by resource group x-ms-original-file: 2024-12-01/SolutionTypes_ListByResourceGroup.json                            |
| [solutionTypesSolutionTypesListBySubscriptionSample.js][solutiontypessolutiontypeslistbysubscriptionsample]                                         | list SolutionTypeResource resources by subscription ID x-ms-original-file: 2024-12-01/SolutionTypes_ListBySubscription.json                            |

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
node endpointsEndpointsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node endpointsEndpointsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[endpointsendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsCreateOrUpdateSample.js
[endpointsendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsDeleteSample.js
[endpointsendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsGetSample.js
[endpointsendpointslistcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsListCredentialsSample.js
[endpointsendpointslistingressgatewaycredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsListIngressGatewayCredentialsSample.js
[endpointsendpointslistmanagedproxydetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsListManagedProxyDetailsSample.js
[endpointsendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsListSample.js
[endpointsendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/endpointsEndpointsUpdateSample.js
[generateawstemplategenerateawstemplatepostsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/generateAwsTemplateGenerateAwsTemplatePostSample.js
[inventoryinventorygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/inventoryInventoryGetSample.js
[inventoryinventorylistbysolutionconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/inventoryInventoryListBySolutionConfigurationSample.js
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/operationsOperationsListSample.js
[publiccloudconnectorspubliccloudconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/publicCloudConnectorsPublicCloudConnectorsCreateOrUpdateSample.js
[publiccloudconnectorspubliccloudconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/publicCloudConnectorsPublicCloudConnectorsDeleteSample.js
[publiccloudconnectorspubliccloudconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/publicCloudConnectorsPublicCloudConnectorsGetSample.js
[publiccloudconnectorspubliccloudconnectorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/publicCloudConnectorsPublicCloudConnectorsListByResourceGroupSample.js
[publiccloudconnectorspubliccloudconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/publicCloudConnectorsPublicCloudConnectorsListBySubscriptionSample.js
[publiccloudconnectorspubliccloudconnectorstestpermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/publicCloudConnectorsPublicCloudConnectorsTestPermissionsSample.js
[publiccloudconnectorspubliccloudconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/publicCloudConnectorsPublicCloudConnectorsUpdateSample.js
[serviceconfigurationsserviceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/serviceConfigurationsServiceConfigurationsCreateOrupdateSample.js
[serviceconfigurationsserviceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/serviceConfigurationsServiceConfigurationsDeleteSample.js
[serviceconfigurationsserviceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/serviceConfigurationsServiceConfigurationsGetSample.js
[serviceconfigurationsserviceconfigurationslistbyendpointresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/serviceConfigurationsServiceConfigurationsListByEndpointResourceSample.js
[serviceconfigurationsserviceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/serviceConfigurationsServiceConfigurationsUpdateSample.js
[solutionconfigurationssolutionconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionConfigurationsSolutionConfigurationsCreateOrUpdateSample.js
[solutionconfigurationssolutionconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionConfigurationsSolutionConfigurationsDeleteSample.js
[solutionconfigurationssolutionconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionConfigurationsSolutionConfigurationsGetSample.js
[solutionconfigurationssolutionconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionConfigurationsSolutionConfigurationsListSample.js
[solutionconfigurationssolutionconfigurationssyncnowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionConfigurationsSolutionConfigurationsSyncNowSample.js
[solutionconfigurationssolutionconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionConfigurationsSolutionConfigurationsUpdateSample.js
[solutiontypessolutiontypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionTypesSolutionTypesGetSample.js
[solutiontypessolutiontypeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionTypesSolutionTypesListByResourceGroupSample.js
[solutiontypessolutiontypeslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridconnectivity/arm-hybridconnectivity/samples/v2/javascript/solutionTypesSolutionTypesListBySubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridconnectivity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridconnectivity/arm-hybridconnectivity/README.md
