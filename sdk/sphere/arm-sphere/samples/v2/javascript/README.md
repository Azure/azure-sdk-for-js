# @azure/arm-sphere client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-sphere in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [catalogsCountDevicesSample.js][catalogscountdevicessample]                                             | counts devices in catalog. x-ms-original-file: 2024-04-01/PostCountDevicesCatalog.json                                                                                                                                                                                                      |
| [catalogsCreateOrUpdateSample.js][catalogscreateorupdatesample]                                         | create a Catalog x-ms-original-file: 2024-04-01/PutCatalog.json                                                                                                                                                                                                                             |
| [catalogsDeleteSample.js][catalogsdeletesample]                                                         | delete a Catalog x-ms-original-file: 2024-04-01/DeleteCatalog.json                                                                                                                                                                                                                          |
| [catalogsGetSample.js][catalogsgetsample]                                                               | get a Catalog x-ms-original-file: 2024-04-01/GetCatalog.json                                                                                                                                                                                                                                |
| [catalogsListByResourceGroupSample.js][catalogslistbyresourcegroupsample]                               | list Catalog resources by resource group x-ms-original-file: 2024-04-01/GetCatalogsRG.json                                                                                                                                                                                                  |
| [catalogsListBySubscriptionSample.js][catalogslistbysubscriptionsample]                                 | list Catalog resources by subscription ID x-ms-original-file: 2024-04-01/GetCatalogsSub.json                                                                                                                                                                                                |
| [catalogsListDeploymentsSample.js][catalogslistdeploymentssample]                                       | lists deployments for catalog. x-ms-original-file: 2024-04-01/PostListDeploymentsByCatalog.json                                                                                                                                                                                             |
| [catalogsListDeviceGroupsSample.js][catalogslistdevicegroupssample]                                     | list the device groups for the catalog. x-ms-original-file: 2024-04-01/PostListDeviceGroupsCatalog.json                                                                                                                                                                                     |
| [catalogsListDeviceInsightsSample.js][catalogslistdeviceinsightssample]                                 | lists device insights for catalog. x-ms-original-file: 2024-04-01/PostListDeviceInsightsCatalog.json                                                                                                                                                                                        |
| [catalogsListDevicesSample.js][catalogslistdevicessample]                                               | lists devices for catalog. x-ms-original-file: 2024-04-01/PostListDevicesByCatalog.json                                                                                                                                                                                                     |
| [catalogsUpdateSample.js][catalogsupdatesample]                                                         | update a Catalog x-ms-original-file: 2024-04-01/PatchCatalog.json                                                                                                                                                                                                                           |
| [catalogsUploadImageSample.js][catalogsuploadimagesample]                                               | creates an image. Use this action when the image ID is unknown. x-ms-original-file: 2024-04-01/PostUploadImageCatalog.json                                                                                                                                                                  |
| [certificatesGetSample.js][certificatesgetsample]                                                       | get a Certificate x-ms-original-file: 2024-04-01/GetCertificate.json                                                                                                                                                                                                                        |
| [certificatesListByCatalogSample.js][certificateslistbycatalogsample]                                   | list Certificate resources by Catalog x-ms-original-file: 2024-04-01/GetCertificates.json                                                                                                                                                                                                   |
| [certificatesRetrieveCertChainSample.js][certificatesretrievecertchainsample]                           | retrieves cert chain. x-ms-original-file: 2024-04-01/PostRetrieveCatalogCertChain.json                                                                                                                                                                                                      |
| [certificatesRetrieveProofOfPossessionNonceSample.js][certificatesretrieveproofofpossessionnoncesample] | gets the proof of possession nonce. x-ms-original-file: 2024-04-01/PostRetrieveProofOfPossessionNonce.json                                                                                                                                                                                  |
| [deploymentsCreateOrUpdateSample.js][deploymentscreateorupdatesample]                                   | create a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PutDeployment.json                                                                                                          |
| [deploymentsDeleteSample.js][deploymentsdeletesample]                                                   | delete a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/DeleteDeployment.json                                                                                                       |
| [deploymentsGetSample.js][deploymentsgetsample]                                                         | get a Deployment. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDeployment.json                                                                                                             |
| [deploymentsListByDeviceGroupSample.js][deploymentslistbydevicegroupsample]                             | list Deployment resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDeployments.json                                                                                    |
| [deviceGroupsClaimDevicesSample.js][devicegroupsclaimdevicessample]                                     | bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only. x-ms-original-file: 2024-04-01/PostClaimDevices.json                                                                                          |
| [deviceGroupsCountDevicesSample.js][devicegroupscountdevicessample]                                     | counts devices in device group. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PostCountDevicesDeviceGroup.json                                                                                 |
| [deviceGroupsCreateOrUpdateSample.js][devicegroupscreateorupdatesample]                                 | create a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PutDeviceGroup.json                                                                                                        |
| [deviceGroupsDeleteSample.js][devicegroupsdeletesample]                                                 | delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/DeleteDeviceGroup.json                                                                                                     |
| [deviceGroupsGetSample.js][devicegroupsgetsample]                                                       | get a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDeviceGroup.json                                                                                                           |
| [deviceGroupsListByProductSample.js][devicegroupslistbyproductsample]                                   | list DeviceGroup resources by Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/GetDeviceGroups.json                                                                                                      |
| [deviceGroupsUpdateSample.js][devicegroupsupdatesample]                                                 | update a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/PatchDeviceGroup.json                                                                                                      |
| [devicesCreateOrUpdateSample.js][devicescreateorupdatesample]                                           | create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only. x-ms-original-file: 2024-04-01/PutDevice.json                                                                                                                |
| [devicesDeleteSample.js][devicesdeletesample]                                                           | delete a Device x-ms-original-file: 2024-04-01/DeleteDevice.json                                                                                                                                                                                                                            |
| [devicesGenerateCapabilityImageSample.js][devicesgeneratecapabilityimagesample]                         | generates the capability image for the device. Use '.unassigned' or '.default' for the device group and product names to generate the image for a device that does not belong to a specific device group and product. x-ms-original-file: 2024-04-01/PostGenerateDeviceCapabilityImage.json |
| [devicesGetSample.js][devicesgetsample]                                                                 | get a Device. Use '.unassigned' or '.default' for the device group and product names when a device does not belong to a device group and product. x-ms-original-file: 2024-04-01/GetDevice.json                                                                                             |
| [devicesListByDeviceGroupSample.js][deviceslistbydevicegroupsample]                                     | list Device resources by DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name. x-ms-original-file: 2024-04-01/GetDevices.json                                                                                            |
| [devicesUpdateSample.js][devicesupdatesample]                                                           | update a Device. Use '.unassigned' or '.default' for the device group and product names to move a device to the catalog level. x-ms-original-file: 2024-04-01/PatchDevice.json                                                                                                              |
| [imagesCreateOrUpdateSample.js][imagescreateorupdatesample]                                             | create a Image x-ms-original-file: 2024-04-01/PutImage.json                                                                                                                                                                                                                                 |
| [imagesDeleteSample.js][imagesdeletesample]                                                             | delete a Image x-ms-original-file: 2024-04-01/DeleteImage.json                                                                                                                                                                                                                              |
| [imagesGetSample.js][imagesgetsample]                                                                   | get a Image x-ms-original-file: 2024-04-01/GetImage.json                                                                                                                                                                                                                                    |
| [imagesListByCatalogSample.js][imageslistbycatalogsample]                                               | list Image resources by Catalog x-ms-original-file: 2024-04-01/GetImages.json                                                                                                                                                                                                               |
| [operationsListSample.js][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2024-04-01/GetOperations.json                                                                                                                                                                                                      |
| [productsCountDevicesSample.js][productscountdevicessample]                                             | counts devices in product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PostCountDevicesProduct.json                                                                                                          |
| [productsCreateOrUpdateSample.js][productscreateorupdatesample]                                         | create a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PutProduct.json                                                                                                                                |
| [productsDeleteSample.js][productsdeletesample]                                                         | delete a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name' x-ms-original-file: 2024-04-01/DeleteProduct.json                                                                                                                             |
| [productsGenerateDefaultDeviceGroupsSample.js][productsgeneratedefaultdevicegroupssample]               | generates default device groups for the product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PostGenerateDefaultDeviceGroups.json                                                                            |
| [productsGetSample.js][productsgetsample]                                                               | get a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/GetProduct.json                                                                                                                                   |
| [productsListByCatalogSample.js][productslistbycatalogsample]                                           | list Product resources by Catalog x-ms-original-file: 2024-04-01/GetProducts.json                                                                                                                                                                                                           |
| [productsUpdateSample.js][productsupdatesample]                                                         | update a Product. '.default' and '.unassigned' are system defined values and cannot be used for product name. x-ms-original-file: 2024-04-01/PatchProduct.json                                                                                                                              |

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
node catalogsCountDevicesSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node catalogsCountDevicesSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[catalogscountdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsCountDevicesSample.js
[catalogscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsCreateOrUpdateSample.js
[catalogsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsDeleteSample.js
[catalogsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsGetSample.js
[catalogslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsListByResourceGroupSample.js
[catalogslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsListBySubscriptionSample.js
[catalogslistdeploymentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsListDeploymentsSample.js
[catalogslistdevicegroupssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsListDeviceGroupsSample.js
[catalogslistdeviceinsightssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsListDeviceInsightsSample.js
[catalogslistdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsListDevicesSample.js
[catalogsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsUpdateSample.js
[catalogsuploadimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/catalogsUploadImageSample.js
[certificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/certificatesGetSample.js
[certificateslistbycatalogsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/certificatesListByCatalogSample.js
[certificatesretrievecertchainsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/certificatesRetrieveCertChainSample.js
[certificatesretrieveproofofpossessionnoncesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/certificatesRetrieveProofOfPossessionNonceSample.js
[deploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deploymentsCreateOrUpdateSample.js
[deploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deploymentsDeleteSample.js
[deploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deploymentsGetSample.js
[deploymentslistbydevicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deploymentsListByDeviceGroupSample.js
[devicegroupsclaimdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deviceGroupsClaimDevicesSample.js
[devicegroupscountdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deviceGroupsCountDevicesSample.js
[devicegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deviceGroupsCreateOrUpdateSample.js
[devicegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deviceGroupsDeleteSample.js
[devicegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deviceGroupsGetSample.js
[devicegroupslistbyproductsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deviceGroupsListByProductSample.js
[devicegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/deviceGroupsUpdateSample.js
[devicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/devicesCreateOrUpdateSample.js
[devicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/devicesDeleteSample.js
[devicesgeneratecapabilityimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/devicesGenerateCapabilityImageSample.js
[devicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/devicesGetSample.js
[deviceslistbydevicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/devicesListByDeviceGroupSample.js
[devicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/devicesUpdateSample.js
[imagescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/imagesCreateOrUpdateSample.js
[imagesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/imagesDeleteSample.js
[imagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/imagesGetSample.js
[imageslistbycatalogsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/imagesListByCatalogSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/operationsListSample.js
[productscountdevicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/productsCountDevicesSample.js
[productscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/productsCreateOrUpdateSample.js
[productsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/productsDeleteSample.js
[productsgeneratedefaultdevicegroupssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/productsGenerateDefaultDeviceGroupsSample.js
[productsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/productsGetSample.js
[productslistbycatalogsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/productsListByCatalogSample.js
[productsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sphere/arm-sphere/samples/v2/javascript/productsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sphere
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sphere/arm-sphere/README.md
