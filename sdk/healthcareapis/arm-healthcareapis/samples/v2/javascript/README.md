# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [checkNameAvailability.js][checknameavailability]                                             | Check if a service instance name is available. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/CheckNameAvailabilityPost.json                                                          |
| [createOrUpdateAServiceWithAllParameters.js][createorupdateaservicewithallparameters]         | Create or update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceCreate.json                                                                |
| [createOrUpdateAServiceWithMinimumParameters.js][createorupdateaservicewithminimumparameters] | Create or update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceCreateMinimum.json                                                         |
| [deleteService.js][deleteservice]                                                             | Delete a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceDelete.json                                                                                          |
| [getMetadata.js][getmetadata]                                                                 | Get the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceGet.json                                                                                |
| [getOperationResult.js][getoperationresult]                                                   | Get the operation result for a long running operation. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/OperationResultsGet.json                                                        |
| [listAllServicesInResourceGroup.js][listallservicesinresourcegroup]                           | Get all the service instances in a resource group. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceListByResourceGroup.json                                                     |
| [listAllServicesInSubscription.js][listallservicesinsubscription]                             | Get all the service instances in a subscription. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceList.json                                                                      |
| [listOperations.js][listoperations]                                                           | Lists all of the available Healthcare service REST API operations. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/OperationsList.json                                                 |
| [patchService.js][patchservice]                                                               | Update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServicePatch.json                                                                           |
| [privateEndpointConnectionCreateOrUpdate.js][privateendpointconnectioncreateorupdate]         | Update the state of the specified private endpoint connection associated with the service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceCreatePrivateEndpointConnection.json |
| [privateEndpointConnectionGetConnection.js][privateendpointconnectiongetconnection]           | Gets the specified private endpoint connection associated with the service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceGetPrivateEndpointConnection.json                   |
| [privateEndpointConnectionList.js][privateendpointconnectionlist]                             | Lists all private endpoint connections for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceListPrivateEndpointConnections.json                                       |
| [privateEndpointConnectionsDelete.js][privateendpointconnectionsdelete]                       | Deletes a private endpoint connection. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceDeletePrivateEndpointConnection.json                                                     |
| [privateLinkResourcesGet.js][privatelinkresourcesget]                                         | Gets a private link resource that need to be created for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/PrivateLinkResourceGet.json                                        |
| [privateLinkResourcesListGroupIds.js][privatelinkresourceslistgroupids]                       | Gets the private link resources that need to be created for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/PrivateLinkResourcesListByService.json                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node checkNameAvailability.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node checkNameAvailability.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/checkNameAvailability.js
[createorupdateaservicewithallparameters]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/createOrUpdateAServiceWithAllParameters.js
[createorupdateaservicewithminimumparameters]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/createOrUpdateAServiceWithMinimumParameters.js
[deleteservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/deleteService.js
[getmetadata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/getMetadata.js
[getoperationresult]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/getOperationResult.js
[listallservicesinresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/listAllServicesInResourceGroup.js
[listallservicesinsubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/listAllServicesInSubscription.js
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/listOperations.js
[patchservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/patchService.js
[privateendpointconnectioncreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/privateEndpointConnectionCreateOrUpdate.js
[privateendpointconnectiongetconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/privateEndpointConnectionGetConnection.js
[privateendpointconnectionlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/privateEndpointConnectionList.js
[privateendpointconnectionsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/privateEndpointConnectionsDelete.js
[privatelinkresourcesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/privateLinkResourcesGet.js
[privatelinkresourceslistgroupids]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/javascript/privateLinkResourcesListGroupIds.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-healthcareapis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthcareapis/arm-healthcareapis/README.md
