# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [digitalTwinsCheckNameAvailabilitySample.ts][digitaltwinschecknameavailabilitysample]                     | Check if a DigitalTwinsInstance name is available. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsCheckNameAvailability_example.json                                                                                                                                                                                            |
| [digitalTwinsCreateOrUpdateSample.ts][digitaltwinscreateorupdatesample]                                   | Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsPut_example.json |
| [digitalTwinsDeleteSample.ts][digitaltwinsdeletesample]                                                   | Delete a DigitalTwinsInstance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsDelete_example.json                                                                                                                                                                                                                               |
| [digitalTwinsEndpointCreateOrUpdateSample.ts][digitaltwinsendpointcreateorupdatesample]                   | Create or update DigitalTwinsInstance endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsEndpointPut_example.json                                                                                                                                                                                                         |
| [digitalTwinsEndpointDeleteSample.ts][digitaltwinsendpointdeletesample]                                   | Delete a DigitalTwinsInstance endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsEndpointDelete_example.json                                                                                                                                                                                                              |
| [digitalTwinsEndpointGetSample.ts][digitaltwinsendpointgetsample]                                         | Get DigitalTwinsInstances Endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsEndpointGet_example.json                                                                                                                                                                                                                     |
| [digitalTwinsEndpointListSample.ts][digitaltwinsendpointlistsample]                                       | Get DigitalTwinsInstance Endpoints. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsEndpointsGet_example.json                                                                                                                                                                                                                    |
| [digitalTwinsGetSample.ts][digitaltwinsgetsample]                                                         | Get DigitalTwinsInstances resource. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsGet_example.json                                                                                                                                                                                                                             |
| [digitalTwinsListByResourceGroupSample.ts][digitaltwinslistbyresourcegroupsample]                         | Get all the DigitalTwinsInstances in a resource group. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsListByResourceGroup_example.json                                                                                                                                                                                          |
| [digitalTwinsListSample.ts][digitaltwinslistsample]                                                       | Get all the DigitalTwinsInstances in a subscription. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsList_example.json                                                                                                                                                                                                           |
| [digitalTwinsUpdateSample.ts][digitaltwinsupdatesample]                                                   | Update metadata of DigitalTwinsInstance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsPatch_example.json                                                                                                                                                                                                                      |
| [operationsListSample.ts][operationslistsample]                                                           | Lists all of the available DigitalTwins service REST API operations. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/DigitalTwinsOperationsList_example.json                                                                                                                                                                                 |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]       | Update the status of a private endpoint connection with the given name. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/PrivateEndpointConnectionPut_example.json                                                                                                                                                                            |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                       | Delete private endpoint connection with the specified name. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/PrivateEndpointConnectionDelete_example.json                                                                                                                                                                                     |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                             | Get private endpoint connection properties for the given private endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/PrivateEndpointConnectionByConnectionName_example.json                                                                                                                                                            |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                           | List private endpoint connection properties. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/PrivateEndpointConnectionsList_example.json                                                                                                                                                                                                     |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                         | Get the specified private link resource for the given Digital Twin. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/PrivateLinkResourcesByGroupId_example.json                                                                                                                                                                               |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                       | List private link resources for given Digital Twin. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/PrivateLinkResourcesList_example.json                                                                                                                                                                                                    |
| [timeSeriesDatabaseConnectionsCreateOrUpdateSample.ts][timeseriesdatabaseconnectionscreateorupdatesample] | Create or update a time series database connection. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/TimeSeriesDatabaseConnectionsPut_example.json                                                                                                                                                                                            |
| [timeSeriesDatabaseConnectionsDeleteSample.ts][timeseriesdatabaseconnectionsdeletesample]                 | Delete a time series database connection. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/TimeSeriesDatabaseConnectionsDelete_example.json                                                                                                                                                                                                   |
| [timeSeriesDatabaseConnectionsGetSample.ts][timeseriesdatabaseconnectionsgetsample]                       | Get the description of an existing time series database connection. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/TimeSeriesDatabaseConnectionsGet_example.json                                                                                                                                                                            |
| [timeSeriesDatabaseConnectionsListSample.ts][timeseriesdatabaseconnectionslistsample]                     | Get all existing time series database connections for this DigitalTwins instance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/preview/2021-06-30-preview/examples/TimeSeriesDatabaseConnectionsList_example.json                                                                                                                                                             |

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
node dist/digitalTwinsCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/digitalTwinsCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[digitaltwinschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsCheckNameAvailabilitySample.ts
[digitaltwinscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsCreateOrUpdateSample.ts
[digitaltwinsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsDeleteSample.ts
[digitaltwinsendpointcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsEndpointCreateOrUpdateSample.ts
[digitaltwinsendpointdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsEndpointDeleteSample.ts
[digitaltwinsendpointgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsEndpointGetSample.ts
[digitaltwinsendpointlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsEndpointListSample.ts
[digitaltwinsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsGetSample.ts
[digitaltwinslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsListByResourceGroupSample.ts
[digitaltwinslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsListSample.ts
[digitaltwinsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/digitalTwinsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/privateLinkResourcesListSample.ts
[timeseriesdatabaseconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/timeSeriesDatabaseConnectionsCreateOrUpdateSample.ts
[timeseriesdatabaseconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/timeSeriesDatabaseConnectionsDeleteSample.ts
[timeseriesdatabaseconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/timeSeriesDatabaseConnectionsGetSample.ts
[timeseriesdatabaseconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v1-beta/typescript/src/timeSeriesDatabaseConnectionsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-digitaltwins?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/arm-digitaltwins/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
