# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [checkNameAvailability.ts][checknameavailability]                                             | Check if a service instance name is available. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/CheckNameAvailabilityPost.json                                                          |
| [createOrUpdateAServiceWithAllParameters.ts][createorupdateaservicewithallparameters]         | Create or update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceCreate.json                                                                |
| [createOrUpdateAServiceWithMinimumParameters.ts][createorupdateaservicewithminimumparameters] | Create or update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceCreateMinimum.json                                                         |
| [deleteService.ts][deleteservice]                                                             | Delete a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceDelete.json                                                                                          |
| [getMetadata.ts][getmetadata]                                                                 | Get the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceGet.json                                                                                |
| [getOperationResult.ts][getoperationresult]                                                   | Get the operation result for a long running operation. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/OperationResultsGet.json                                                        |
| [listAllServicesInResourceGroup.ts][listallservicesinresourcegroup]                           | Get all the service instances in a resource group. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceListByResourceGroup.json                                                     |
| [listAllServicesInSubscription.ts][listallservicesinsubscription]                             | Get all the service instances in a subscription. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceList.json                                                                      |
| [listOperations.ts][listoperations]                                                           | Lists all of the available Healthcare service REST API operations. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/OperationsList.json                                                 |
| [patchService.ts][patchservice]                                                               | Update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServicePatch.json                                                                           |
| [privateEndpointConnectionCreateOrUpdate.ts][privateendpointconnectioncreateorupdate]         | Update the state of the specified private endpoint connection associated with the service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceCreatePrivateEndpointConnection.json |
| [privateEndpointConnectionGetConnection.ts][privateendpointconnectiongetconnection]           | Gets the specified private endpoint connection associated with the service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceGetPrivateEndpointConnection.json                   |
| [privateEndpointConnectionList.ts][privateendpointconnectionlist]                             | Lists all private endpoint connections for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceListPrivateEndpointConnections.json                                       |
| [privateEndpointConnectionsDelete.ts][privateendpointconnectionsdelete]                       | Deletes a private endpoint connection. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/ServiceDeletePrivateEndpointConnection.json                                                     |
| [privateLinkResourcesGet.ts][privatelinkresourcesget]                                         | Gets a private link resource that need to be created for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/PrivateLinkResourceGet.json                                        |
| [privateLinkResourcesListGroupIds.ts][privatelinkresourceslistgroupids]                       | Gets the private link resources that need to be created for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2021-01-11/examples/PrivateLinkResourcesListByService.json                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/checkNameAvailability.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/checkNameAvailability.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/checkNameAvailability.ts
[createorupdateaservicewithallparameters]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/createOrUpdateAServiceWithAllParameters.ts
[createorupdateaservicewithminimumparameters]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/createOrUpdateAServiceWithMinimumParameters.ts
[deleteservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/deleteService.ts
[getmetadata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/getMetadata.ts
[getoperationresult]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/getOperationResult.ts
[listallservicesinresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/listAllServicesInResourceGroup.ts
[listallservicesinsubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/listAllServicesInSubscription.ts
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/listOperations.ts
[patchservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/patchService.ts
[privateendpointconnectioncreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/privateEndpointConnectionCreateOrUpdate.ts
[privateendpointconnectiongetconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/privateEndpointConnectionGetConnection.ts
[privateendpointconnectionlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/privateEndpointConnectionList.ts
[privateendpointconnectionsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/privateEndpointConnectionsDelete.ts
[privatelinkresourcesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/privateLinkResourcesGet.ts
[privatelinkresourceslistgroupids]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2/typescript/src/privateLinkResourcesListGroupIds.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-healthcareapis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthcareapis/arm-healthcareapis/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
