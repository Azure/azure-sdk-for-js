// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  createAzureSphere,
  AzureSphereClientOptions,
  AzureSphereContext,
} from "./AzureSphereContext.js";
export {
  catalogsGet,
  catalogsCreateOrUpdate,
  catalogsUpdate,
  catalogsDeleteOperation,
  catalogsListByResourceGroup,
  catalogsListBySubscription,
  catalogsDeprecated,
  catalogsCountDevices,
  catalogsListDeviceInsights,
  catalogsListDevices,
  catalogsListDeployments,
  catalogsListDeviceGroups,
  catalogsUploadImage,
} from "./catalogs/index.js";
export {
  certificatesGet,
  certificatesListByCatalog,
  certificatesRetrieveCertChain,
  certificatesRetrieveProofOfPossessionNonce,
} from "./certificates/index.js";
export {
  deploymentsGet,
  deploymentsListByDeviceGroup,
  deploymentsCreateOrUpdate,
  deploymentsDeleteOperation,
} from "./deployments/index.js";
export {
  deviceGroupsListByProduct,
  deviceGroupsGet,
  deviceGroupsCreateOrUpdate,
  deviceGroupsDeleteOperation,
  deviceGroupsUpdate,
  deviceGroupsDeprecatedCountDevices,
  deviceGroupsCountDevices,
  deviceGroupsDeprecatedClaimDevices,
  deviceGroupsClaimDevices,
} from "./deviceGroups/index.js";
export {
  devicesGet,
  devicesCreateOrUpdate,
  devicesListByDeviceGroup,
  devicesDeleteOperation,
  devicesUpdate,
  devicesDeprecatedGenerateCapabilityImage,
  devicesGenerateCapabilityImage,
} from "./devices/index.js";
export {
  imagesGet,
  imagesListByCatalog,
  imagesCreateOrUpdate,
  imagesDeleteOperation,
} from "./images/index.js";
export { operationsList } from "./operations/index.js";
export {
  productsListByCatalog,
  productsGet,
  productsCreateOrUpdate,
  productsDeleteOperation,
  productsUpdate,
  productsGenerateDefaultDeviceGroups,
  productsDeprecated,
  productsCountDevices,
} from "./products/index.js";
