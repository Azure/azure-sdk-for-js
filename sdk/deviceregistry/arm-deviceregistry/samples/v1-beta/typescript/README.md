# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [assetEndpointProfilesCreateOrReplaceSample.ts][assetendpointprofilescreateorreplacesample]         | Create a AssetEndpointProfile x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Create_AssetEndpointProfile.json                                      |
| [assetEndpointProfilesDeleteSample.ts][assetendpointprofilesdeletesample]                           | Delete a AssetEndpointProfile x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Delete_AssetEndpointProfile.json                                      |
| [assetEndpointProfilesGetSample.ts][assetendpointprofilesgetsample]                                 | Get a AssetEndpointProfile x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Get_AssetEndpointProfile.json                                            |
| [assetEndpointProfilesListByResourceGroupSample.ts][assetendpointprofileslistbyresourcegroupsample] | List AssetEndpointProfile resources by resource group x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/List_AssetEndpointProfiles_ResourceGroup.json |
| [assetEndpointProfilesListBySubscriptionSample.ts][assetendpointprofileslistbysubscriptionsample]   | List AssetEndpointProfile resources by subscription ID x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/List_AssetEndpointProfiles_Subscription.json |
| [assetEndpointProfilesUpdateSample.ts][assetendpointprofilesupdatesample]                           | Update a AssetEndpointProfile x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Update_AssetEndpointProfile.json                                      |
| [assetsCreateOrReplaceSample.ts][assetscreateorreplacesample]                                       | Create a Asset x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Create_Asset_With_ExternalAssetId.json                                               |
| [assetsDeleteSample.ts][assetsdeletesample]                                                         | Delete a Asset x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Delete_Asset.json                                                                    |
| [assetsGetSample.ts][assetsgetsample]                                                               | Get a Asset x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Get_Asset.json                                                                          |
| [assetsListByResourceGroupSample.ts][assetslistbyresourcegroupsample]                               | List Asset resources by resource group x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/List_Assets_ResourceGroup.json                               |
| [assetsListBySubscriptionSample.ts][assetslistbysubscriptionsample]                                 | List Asset resources by subscription ID x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/List_Assets_Subscription.json                               |
| [assetsUpdateSample.ts][assetsupdatesample]                                                         | Update a Asset x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Update_Asset.json                                                                    |
| [operationStatusGetSample.ts][operationstatusgetsample]                                             | Returns the current status of an async operation. x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/Get_OperationStatus.json                          |
| [operationsListSample.ts][operationslistsample]                                                     | List the operations for the provider x-ms-original-file: specification/deviceregistry/resource-manager/Microsoft.DeviceRegistry/preview/2023-11-01-preview/examples/List_Operations.json                                           |

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
node dist/assetEndpointProfilesCreateOrReplaceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env DEVICEREGISTRY_SUBSCRIPTION_ID="<deviceregistry subscription id>" DEVICEREGISTRY_RESOURCE_GROUP="<deviceregistry resource group>" node dist/assetEndpointProfilesCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesCreateOrReplaceSample.ts
[assetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesDeleteSample.ts
[assetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesGetSample.ts
[assetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesListByResourceGroupSample.ts
[assetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesListBySubscriptionSample.ts
[assetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesUpdateSample.ts
[assetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsCreateOrReplaceSample.ts
[assetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsDeleteSample.ts
[assetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsGetSample.ts
[assetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsListByResourceGroupSample.ts
[assetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsListBySubscriptionSample.ts
[assetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsUpdateSample.ts
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/operationStatusGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-deviceregistry?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/arm-deviceregistry/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
