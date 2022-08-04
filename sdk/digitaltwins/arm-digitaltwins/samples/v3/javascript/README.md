# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [digitalTwinsCheckNameAvailabilitySample.js][digitaltwinschecknameavailabilitysample]                     | Check if a DigitalTwinsInstance name is available. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsCheckNameAvailability_example.json                                                                                                                                                                                            |
| [digitalTwinsCreateOrUpdateSample.js][digitaltwinscreateorupdatesample]                                   | Create or update the metadata of a DigitalTwinsInstance. The usual pattern to modify a property is to retrieve the DigitalTwinsInstance and security metadata, and then combine them with the modified values in a new body to update the DigitalTwinsInstance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsPut_example.json |
| [digitalTwinsDeleteSample.js][digitaltwinsdeletesample]                                                   | Delete a DigitalTwinsInstance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsDelete_example.json                                                                                                                                                                                                                               |
| [digitalTwinsEndpointCreateOrUpdateSample.js][digitaltwinsendpointcreateorupdatesample]                   | Create or update DigitalTwinsInstance endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsEndpointPut_example.json                                                                                                                                                                                                         |
| [digitalTwinsEndpointDeleteSample.js][digitaltwinsendpointdeletesample]                                   | Delete a DigitalTwinsInstance endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsEndpointDelete_example.json                                                                                                                                                                                                              |
| [digitalTwinsEndpointGetSample.js][digitaltwinsendpointgetsample]                                         | Get DigitalTwinsInstances Endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsEndpointGet_example.json                                                                                                                                                                                                                     |
| [digitalTwinsEndpointListSample.js][digitaltwinsendpointlistsample]                                       | Get DigitalTwinsInstance Endpoints. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsEndpointsGet_example.json                                                                                                                                                                                                                    |
| [digitalTwinsGetSample.js][digitaltwinsgetsample]                                                         | Get DigitalTwinsInstances resource. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsGet_example.json                                                                                                                                                                                                                             |
| [digitalTwinsListByResourceGroupSample.js][digitaltwinslistbyresourcegroupsample]                         | Get all the DigitalTwinsInstances in a resource group. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsListByResourceGroup_example.json                                                                                                                                                                                          |
| [digitalTwinsListSample.js][digitaltwinslistsample]                                                       | Get all the DigitalTwinsInstances in a subscription. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsList_example.json                                                                                                                                                                                                           |
| [digitalTwinsUpdateSample.js][digitaltwinsupdatesample]                                                   | Update metadata of DigitalTwinsInstance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsPatch_example.json                                                                                                                                                                                                                      |
| [operationsListSample.js][operationslistsample]                                                           | Lists all of the available DigitalTwins service REST API operations. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/DigitalTwinsOperationsList_example.json                                                                                                                                                                                 |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]       | Update the status of a private endpoint connection with the given name. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/PrivateEndpointConnectionPut_example.json                                                                                                                                                                            |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                       | Delete private endpoint connection with the specified name. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/PrivateEndpointConnectionDelete_example.json                                                                                                                                                                                     |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                             | Get private endpoint connection properties for the given private endpoint. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/PrivateEndpointConnectionByConnectionName_example.json                                                                                                                                                            |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                           | List private endpoint connection properties. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/PrivateEndpointConnectionsList_example.json                                                                                                                                                                                                     |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                         | Get the specified private link resource for the given Digital Twin. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/PrivateLinkResourcesByGroupId_example.json                                                                                                                                                                               |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                                       | List private link resources for given Digital Twin. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/PrivateLinkResourcesList_example.json                                                                                                                                                                                                    |
| [timeSeriesDatabaseConnectionsCreateOrUpdateSample.js][timeseriesdatabaseconnectionscreateorupdatesample] | Create or update a time series database connection. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/TimeSeriesDatabaseConnectionsPut_example.json                                                                                                                                                                                            |
| [timeSeriesDatabaseConnectionsDeleteSample.js][timeseriesdatabaseconnectionsdeletesample]                 | Delete a time series database connection. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/TimeSeriesDatabaseConnectionsDelete_example.json                                                                                                                                                                                                   |
| [timeSeriesDatabaseConnectionsGetSample.js][timeseriesdatabaseconnectionsgetsample]                       | Get the description of an existing time series database connection. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/TimeSeriesDatabaseConnectionsGet_example.json                                                                                                                                                                            |
| [timeSeriesDatabaseConnectionsListSample.js][timeseriesdatabaseconnectionslistsample]                     | Get all existing time series database connections for this DigitalTwins instance. x-ms-original-file: specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/stable/2022-05-31/examples/TimeSeriesDatabaseConnectionsList_example.json                                                                                                                                                             |

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
node digitalTwinsCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node digitalTwinsCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[digitaltwinschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsCheckNameAvailabilitySample.js
[digitaltwinscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsCreateOrUpdateSample.js
[digitaltwinsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsDeleteSample.js
[digitaltwinsendpointcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsEndpointCreateOrUpdateSample.js
[digitaltwinsendpointdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsEndpointDeleteSample.js
[digitaltwinsendpointgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsEndpointGetSample.js
[digitaltwinsendpointlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsEndpointListSample.js
[digitaltwinsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsGetSample.js
[digitaltwinslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsListByResourceGroupSample.js
[digitaltwinslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsListSample.js
[digitaltwinsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/digitalTwinsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/privateLinkResourcesListSample.js
[timeseriesdatabaseconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/timeSeriesDatabaseConnectionsCreateOrUpdateSample.js
[timeseriesdatabaseconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/timeSeriesDatabaseConnectionsDeleteSample.js
[timeseriesdatabaseconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/timeSeriesDatabaseConnectionsGetSample.js
[timeseriesdatabaseconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/digitaltwins/arm-digitaltwins/samples/v3/javascript/timeSeriesDatabaseConnectionsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-digitaltwins?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/arm-digitaltwins/README.md
