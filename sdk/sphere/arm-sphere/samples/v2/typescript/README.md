# @azure/arm-sphere client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-sphere in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [catalogsCountDevicesSample.ts][catalogscountdevicessample]                                             | counts devices in catalog. x-ms-original-file: 2024-04-01/PostCountDevicesCatalog.json                                                                                                                                                                                                      |
| [catalogsCreateOrUpdateSample.ts][catalogscreateorupdatesample]                                         | create a Catalog x-ms-original-file: 2024-04-01/PutCatalog.json                                                                                                                                                                                                                             |
| [catalogsDeleteSample.ts][catalogsdeletesample]                                                         | delete a Catalog x-ms-original-file: 2024-04-01/DeleteCatalog.json                                                                                                                                                                                                                          |
| [catalogsGetSample.ts][catalogsgetsample]                                                               | get a Catalog x-ms-original-file: 2024-04-01/GetCatalog.json                                                                                                                                                                                                                                |
| [catalogsListByResourceGroupSample.ts][catalogslistbyresourcegroupsample]                               | list Catalog resources by resource group x-ms-original-file: 2024-04-01/GetCatalogsRG.json                                                                                                                                                                                                  |
| [catalogsListBySubscriptionSample.ts][catalogslistbysubscriptionsample]                                 | list Catalog resources by subscription ID x-ms-original-file: 2024-04-01/GetCatalogsSub.json                                                                                                                                                                                                |
| [catalogsListDeploymentsSample.ts][catalogslistdeploymentssample]                                       | lists deployments for catalog. x-ms-original-file: 2024-04-01/PostListDeploymentsByCatalog.json                                                                                                                                                                                             |
| [catalogsListDeviceGroupsSample.ts][catalogslistdevicegroupssample]                                     | list the device groups for the catalog. x-ms-original-file: 2024-04-01/PostListDeviceGroupsCatalog.json                                                                                                                                                                                     |
| [catalogsListDeviceInsightsSample.ts][catalogslistdeviceinsightssample]                                 | lists device insights for catalog. x-ms-original-file: 2024-04-01/PostListDeviceInsightsCatalog.json                                                                                                                                                                                        |
| [catalogsListDevicesSample.ts][catalogslistdevicessample]                                               | lists devices for catalog. x-ms-original-file: 2024-04-01/PostListDevicesByCatalog.json                                                                                                                                                                                                     |
| [catalogsUpdateSample.ts][catalogsupdatesample]                                                         | update a Catalog x-ms-original-file: 2024-04-01/PatchCatalog.json                                                                                                                                                                                                                           |
| [catalogsUploadImageSample.ts][catalogsuploadimagesample]                                               | creates an image. Use this action when the image ID is unknown. x-ms-original-file: 2024-04-01/PostUploadImageCatalog.json                                                                                                                                                                  |
| [certificatesGetSample.ts][certificatesgetsample]                                                       | get a Certificate x-ms-original-file: 2024-04-01/GetCertificate.json                                                                                                                                                                                                                        |
| [certificatesListByCatalogSample.ts][certificateslistbycatalogsample]                                   | list Certificate resources by Catalog x-ms-original-file: 2024-04-01/GetCertificates.json                                                                                                                                                                                                   |
| [certificatesRetrieveCertChainSample.ts][certificatesretrievecertchainsample]                           | retrieves cert chain. x-ms-original-file: 2024-04-01/PostRetrieveCatalogCertChain.json                                                                                                                                                                                                      |
| [certificatesRetrieveProofOfPossessionNonceSample.ts][certificatesretrieveproofofpossessionnoncesample] | gets the proof of possession nonce. x-ms-original-file: 2024-04-01/PostRetrieveProofOfPossessionNonce.json                                                                                                                                                                                  |
| [deploymentsCreateOrUpdateSample.ts][deploymentscreateorupdatesample]                                   | create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PutDeployment.json                                                                                                          |
| [deploymentsDeleteSample.ts][deploymentsdeletesample]                                                   | delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/DeleteDeployment.json                                                                                                       |
| [deploymentsGetSample.ts][deploymentsgetsample]                                                         | get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDeployment.json                                                                                                             |
| [deploymentsListByDeviceGroupSample.ts][deploymentslistbydevicegroupsample]                             | list Deployment resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDeployments.json                                                                                    |
| [deviceGroupsClaimDevicesSample.ts][devicegroupsclaimdevicessample]                                     | bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only. x-ms-original-file: 2024-04-01/PostClaimDevices.json                                                                                          |
| [deviceGroupsCountDevicesSample.ts][devicegroupscountdevicessample]                                     | counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PostCountDevicesDeviceGroup.json                                                                                 |
| [deviceGroupsCreateOrUpdateSample.ts][devicegroupscreateorupdatesample]                                 | create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PutDeviceGroup.json                                                                                                        |
| [deviceGroupsDeleteSample.ts][devicegroupsdeletesample]                                                 | delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/DeleteDeviceGroup.json                                                                                                     |
| [deviceGroupsGetSample.ts][devicegroupsgetsample]                                                       | get a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDeviceGroup.json                                                                                                           |
| [deviceGroupsListByProductSample.ts][devicegroupslistbyproductsample]                                   | list DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/GetDeviceGroups.json                                                                                                      |
| [deviceGroupsUpdateSample.ts][devicegroupsupdatesample]                                                 | update a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PatchDeviceGroup.json                                                                                                      |
| [devicesCreateOrUpdateSample.ts][devicescreateorupdatesample]                                           | create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only. x-ms-original-file: 2024-04-01/PutDevice.json                                                                                                                |
| [devicesDeleteSample.ts][devicesdeletesample]                                                           | delete a Device x-ms-original-file: 2024-04-01/DeleteDevice.json                                                                                                                                                                                                                            |
| [devicesGenerateCapabilityImageSample.ts][devicesgeneratecapabilityimagesample]                         | generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product. x-ms-original-file: 2024-04-01/PostGenerateDeviceCapabilityImage.json |
| [devicesGetSample.ts][devicesgetsample]                                                                 | get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product. x-ms-original-file: 2024-04-01/GetDevice.json                                                                                             |
| [devicesListByDeviceGroupSample.ts][deviceslistbydevicegroupsample]                                     | list Device resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDevices.json                                                                                            |
| [devicesUpdateSample.ts][devicesupdatesample]                                                           | update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level. x-ms-original-file: 2024-04-01/PatchDevice.json                                                                                                              |
| [imagesCreateOrUpdateSample.ts][imagescreateorupdatesample]                                             | create a Image x-ms-original-file: 2024-04-01/PutImage.json                                                                                                                                                                                                                                 |
| [imagesDeleteSample.ts][imagesdeletesample]                                                             | delete a Image x-ms-original-file: 2024-04-01/DeleteImage.json                                                                                                                                                                                                                              |
| [imagesGetSample.ts][imagesgetsample]                                                                   | get a Image x-ms-original-file: 2024-04-01/GetImage.json                                                                                                                                                                                                                                    |
| [imagesListByCatalogSample.ts][imageslistbycatalogsample]                                               | list Image resources by Catalog x-ms-original-file: 2024-04-01/GetImages.json                                                                                                                                                                                                               |
| [operationsListSample.ts][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2024-04-01/GetOperations.json                                                                                                                                                                                                      |
| [productsCountDevicesSample.ts][productscountdevicessample]                                             | counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PostCountDevicesProduct.json                                                                                                          |
| [productsCreateOrUpdateSample.ts][productscreateorupdatesample]                                         | create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PutProduct.json                                                                                                                                |
| [productsDeleteSample.ts][productsdeletesample]                                                         | delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name' x-ms-original-file: 2024-04-01/DeleteProduct.json                                                                                                                             |
| [productsGenerateDefaultDeviceGroupsSample.ts][productsgeneratedefaultdevicegroupssample]               | generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PostGenerateDefaultDeviceGroups.json                                                                            |
| [productsGetSample.ts][productsgetsample]                                                               | get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/GetProduct.json                                                                                                                                   |
| [productsListByCatalogSample.ts][productslistbycatalogsample]                                           | list Product resources by Catalog x-ms-original-file: 2024-04-01/GetProducts.json                                                                                                                                                                                                           |
| [productsUpdateSample.ts][productsupdatesample]                                                         | update a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PatchProduct.json                                                                                                                              |

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
node dist/catalogsCountDevicesSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/catalogsCountDevicesSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[catalogscountdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsCountDevicesSample.ts
[catalogscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsCreateOrUpdateSample.ts
[catalogsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsDeleteSample.ts
[catalogsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsGetSample.ts
[catalogslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsListByResourceGroupSample.ts
[catalogslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsListBySubscriptionSample.ts
[catalogslistdeploymentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsListDeploymentsSample.ts
[catalogslistdevicegroupssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsListDeviceGroupsSample.ts
[catalogslistdeviceinsightssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsListDeviceInsightsSample.ts
[catalogslistdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsListDevicesSample.ts
[catalogsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsUpdateSample.ts
[catalogsuploadimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/catalogsUploadImageSample.ts
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/certificatesGetSample.ts
[certificateslistbycatalogsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/certificatesListByCatalogSample.ts
[certificatesretrievecertchainsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/certificatesRetrieveCertChainSample.ts
[certificatesretrieveproofofpossessionnoncesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/certificatesRetrieveProofOfPossessionNonceSample.ts
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deploymentsCreateOrUpdateSample.ts
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deploymentsDeleteSample.ts
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deploymentsGetSample.ts
[deploymentslistbydevicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deploymentsListByDeviceGroupSample.ts
[devicegroupsclaimdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deviceGroupsClaimDevicesSample.ts
[devicegroupscountdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deviceGroupsCountDevicesSample.ts
[devicegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deviceGroupsCreateOrUpdateSample.ts
[devicegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deviceGroupsDeleteSample.ts
[devicegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deviceGroupsGetSample.ts
[devicegroupslistbyproductsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deviceGroupsListByProductSample.ts
[devicegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/deviceGroupsUpdateSample.ts
[devicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/devicesCreateOrUpdateSample.ts
[devicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/devicesDeleteSample.ts
[devicesgeneratecapabilityimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/devicesGenerateCapabilityImageSample.ts
[devicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/devicesGetSample.ts
[deviceslistbydevicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/devicesListByDeviceGroupSample.ts
[devicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/devicesUpdateSample.ts
[imagescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/imagesCreateOrUpdateSample.ts
[imagesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/imagesDeleteSample.ts
[imagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/imagesGetSample.ts
[imageslistbycatalogsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/imagesListByCatalogSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/operationsListSample.ts
[productscountdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/productsCountDevicesSample.ts
[productscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/productsCreateOrUpdateSample.ts
[productsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/productsDeleteSample.ts
[productsgeneratedefaultdevicegroupssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/productsGenerateDefaultDeviceGroupsSample.ts
[productsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/productsGetSample.ts
[productslistbycatalogsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/productsListByCatalogSample.ts
[productsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/typescript/src/productsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sphere
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sphere/arm-sphere/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
