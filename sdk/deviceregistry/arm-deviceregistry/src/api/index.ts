// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createDeviceRegistryManagement,
  DeviceRegistryManagementContext,
  DeviceRegistryManagementClientOptionalParams,
} from "./deviceRegistryManagementContext.js";
export {
  OperationsListOptionalParams,
  OperationStatusGetOptionalParams,
  AssetsGetOptionalParams,
  AssetsCreateOrReplaceOptionalParams,
  AssetsUpdateOptionalParams,
  AssetsDeleteOptionalParams,
  AssetsListByResourceGroupOptionalParams,
  AssetsListBySubscriptionOptionalParams,
  AssetEndpointProfilesGetOptionalParams,
  AssetEndpointProfilesCreateOrReplaceOptionalParams,
  AssetEndpointProfilesUpdateOptionalParams,
  AssetEndpointProfilesDeleteOptionalParams,
  AssetEndpointProfilesListByResourceGroupOptionalParams,
  AssetEndpointProfilesListBySubscriptionOptionalParams,
  BillingContainersGetOptionalParams,
  BillingContainersListBySubscriptionOptionalParams,
  DiscoveredAssetsGetOptionalParams,
  DiscoveredAssetsCreateOrReplaceOptionalParams,
  DiscoveredAssetsUpdateOptionalParams,
  DiscoveredAssetsDeleteOptionalParams,
  DiscoveredAssetsListByResourceGroupOptionalParams,
  DiscoveredAssetsListBySubscriptionOptionalParams,
  DiscoveredAssetEndpointProfilesGetOptionalParams,
  DiscoveredAssetEndpointProfilesCreateOrReplaceOptionalParams,
  DiscoveredAssetEndpointProfilesUpdateOptionalParams,
  DiscoveredAssetEndpointProfilesDeleteOptionalParams,
  DiscoveredAssetEndpointProfilesListByResourceGroupOptionalParams,
  DiscoveredAssetEndpointProfilesListBySubscriptionOptionalParams,
  SchemaRegistriesGetOptionalParams,
  SchemaRegistriesCreateOrReplaceOptionalParams,
  SchemaRegistriesUpdateOptionalParams,
  SchemaRegistriesDeleteOptionalParams,
  SchemaRegistriesListByResourceGroupOptionalParams,
  SchemaRegistriesListBySubscriptionOptionalParams,
  SchemasGetOptionalParams,
  SchemasCreateOrReplaceOptionalParams,
  SchemasDeleteOptionalParams,
  SchemasListBySchemaRegistryOptionalParams,
  SchemaVersionsGetOptionalParams,
  SchemaVersionsCreateOrReplaceOptionalParams,
  SchemaVersionsDeleteOptionalParams,
  SchemaVersionsListBySchemaOptionalParams,
} from "./options.js";
export {
  assetEndpointProfilesGet,
  assetEndpointProfilesCreateOrReplace,
  assetEndpointProfilesUpdate,
  assetEndpointProfilesDelete,
  assetEndpointProfilesListByResourceGroup,
  assetEndpointProfilesListBySubscription,
} from "./assetEndpointProfiles/index.js";
export {
  assetsGet,
  assetsCreateOrReplace,
  assetsUpdate,
  assetsDelete,
  assetsListByResourceGroup,
  assetsListBySubscription,
} from "./assets/index.js";
export {
  billingContainersGet,
  billingContainersListBySubscription,
} from "./billingContainers/index.js";
export {
  discoveredAssetEndpointProfilesGet,
  discoveredAssetEndpointProfilesCreateOrReplace,
  discoveredAssetEndpointProfilesUpdate,
  discoveredAssetEndpointProfilesDelete,
  discoveredAssetEndpointProfilesListByResourceGroup,
  discoveredAssetEndpointProfilesListBySubscription,
} from "./discoveredAssetEndpointProfiles/index.js";
export {
  discoveredAssetsGet,
  discoveredAssetsCreateOrReplace,
  discoveredAssetsUpdate,
  discoveredAssetsDelete,
  discoveredAssetsListByResourceGroup,
  discoveredAssetsListBySubscription,
} from "./discoveredAssets/index.js";
export { operationsList } from "./operations/index.js";
export { operationStatusGet } from "./operationStatus/index.js";
export {
  schemaRegistriesGet,
  schemaRegistriesCreateOrReplace,
  schemaRegistriesUpdate,
  schemaRegistriesDelete,
  schemaRegistriesListByResourceGroup,
  schemaRegistriesListBySubscription,
} from "./schemaRegistries/index.js";
export {
  schemasGet,
  schemasCreateOrReplace,
  schemasDelete,
  schemasListBySchemaRegistry,
} from "./schemas/index.js";
export {
  schemaVersionsGet,
  schemaVersionsCreateOrReplace,
  schemaVersionsDelete,
  schemaVersionsListBySchema,
} from "./schemaVersions/index.js";
