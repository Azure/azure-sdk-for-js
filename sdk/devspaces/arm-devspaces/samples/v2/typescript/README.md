# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [containerHostMappingsGetContainerHostMappingSample.ts][containerhostmappingsgetcontainerhostmappingsample] | Returns container host mapping object for a container host resource ID if an associated controller exists. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ContainerHostMappingsGetContainerHostMapping_example.json |
| [controllersCreateSample.ts][controllerscreatesample]                                                       | Creates an Azure Dev Spaces Controller with the specified create parameters. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersCreate_example.json                                                          |
| [controllersDeleteSample.ts][controllersdeletesample]                                                       | Deletes an existing Azure Dev Spaces Controller. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersDelete_example.json                                                                                      |
| [controllersGetSample.ts][controllersgetsample]                                                             | Gets the properties for an Azure Dev Spaces Controller. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersGet_example.json                                                                                  |
| [controllersListByResourceGroupSample.ts][controllerslistbyresourcegroupsample]                             | Lists all the Azure Dev Spaces Controllers with their properties in the specified resource group and subscription. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersListByResourceGroup_example.json       |
| [controllersListConnectionDetailsSample.ts][controllerslistconnectiondetailssample]                         | Lists connection details for the underlying container resources of an Azure Dev Spaces Controller. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersListConnectionDetails_example.json                     |
| [controllersListSample.ts][controllerslistsample]                                                           | Lists all the Azure Dev Spaces Controllers with their properties in the subscription. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersList_example.json                                                   |
| [controllersUpdateSample.ts][controllersupdatesample]                                                       | Updates the properties of an existing Azure Dev Spaces Controller with the specified update parameters. x-ms-original-file: specification/devspaces/resource-manager/Microsoft.DevSpaces/stable/2019-04-01/examples/ControllersUpdate_example.json                               |

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
node dist/containerHostMappingsGetContainerHostMappingSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/containerHostMappingsGetContainerHostMappingSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containerhostmappingsgetcontainerhostmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/containerHostMappingsGetContainerHostMappingSample.ts
[controllerscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/controllersCreateSample.ts
[controllersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/controllersDeleteSample.ts
[controllersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/controllersGetSample.ts
[controllerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/controllersListByResourceGroupSample.ts
[controllerslistconnectiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/controllersListConnectionDetailsSample.ts
[controllerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/controllersListSample.ts
[controllersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/devspaces/arm-devspaces/samples/v2/typescript/src/controllersUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-devspaces?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/devspaces/arm-devspaces/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
