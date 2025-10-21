# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [containerHostMappingsGetContainerHostMappingSample.js][containerhostmappingsgetcontainerhostmappingsample] | Returns container host mapping object for a container host resource ID if an associated controller exists. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ContainerHostMappingsGetContainerHostMapping_example.json |
| [controllersCreateSample.js][controllerscreatesample]                                                       | Creates an Azure Dev Spaces Controller with the specified create parameters. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersCreate_example.json                                                          |
| [controllersDeleteSample.js][controllersdeletesample]                                                       | Deletes an existing Azure Dev Spaces Controller. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersDelete_example.json                                                                                      |
| [controllersGetSample.js][controllersgetsample]                                                             | Gets the properties for an Azure Dev Spaces Controller. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersGet_example.json                                                                                  |
| [controllersListByResourceGroupSample.js][controllerslistbyresourcegroupsample]                             | Lists all the Azure Dev Spaces Controllers with their properties in the specified resource group and subscription. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersListByResourceGroup_example.json       |
| [controllersListConnectionDetailsSample.js][controllerslistconnectiondetailssample]                         | Lists connection details for the underlying container resources of an Azure Dev Spaces Controller. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersListConnectionDetails_example.json                     |
| [controllersListSample.js][controllerslistsample]                                                           | Lists all the Azure Dev Spaces Controllers with their properties in the subscription. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersList_example.json                                                   |
| [controllersUpdateSample.js][controllersupdatesample]                                                       | Updates the properties of an existing Azure Dev Spaces Controller with the specified update parameters. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersUpdate_example.json                               |

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
node containerHostMappingsGetContainerHostMappingSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node containerHostMappingsGetContainerHostMappingSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containerhostmappingsgetcontainerhostmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/containerHostMappingsGetContainerHostMappingSample.js
[controllerscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/controllersCreateSample.js
[controllersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/controllersDeleteSample.js
[controllersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/controllersGetSample.js
[controllerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/controllersListByResourceGroupSample.js
[controllerslistconnectiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/controllersListConnectionDetailsSample.js
[controllerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/controllersListSample.js
[controllersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/javascript/controllersUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-devspaces?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devspaces/arm-devspaces/README.md
