// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ElasticSanManagement } from "./elasticSanManagement.js";
export { type SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type ElasticSan,
  type ElasticSanProperties,
  type Sku,
  KnownSkuName,
  type SkuName,
  KnownSkuTier,
  type SkuTier,
  KnownProvisioningStates,
  type ProvisioningStates,
  type PrivateEndpointConnection,
  type PrivateEndpointConnectionProperties,
  type PrivateEndpoint,
  type PrivateLinkServiceConnectionState,
  KnownPrivateEndpointServiceConnectionStatus,
  type PrivateEndpointServiceConnectionStatus,
  KnownPublicNetworkAccess,
  type PublicNetworkAccess,
  type AutoScaleProperties,
  type ScaleUpProperties,
  KnownAutoScalePolicyEnforcement,
  type AutoScalePolicyEnforcement,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type TrackedResource,
  type ElasticSanUpdate,
  type ElasticSanUpdateProperties,
  type Volume,
  type VolumeProperties,
  type SourceCreationData,
  KnownVolumeCreateOption,
  type VolumeCreateOption,
  type IscsiTargetInfo,
  KnownOperationalStatus,
  type OperationalStatus,
  type ManagedByInfo,
  type VolumeUpdate,
  type VolumeUpdateProperties,
  type VolumeNameList,
  type PreValidationResponse,
  type DiskSnapshotList,
  type VolumeGroup,
  type Identity,
  KnownIdentityType,
  type IdentityType,
  type UserAssignedIdentity,
  type VolumeGroupProperties,
  KnownStorageTargetType,
  type StorageTargetType,
  KnownEncryptionType,
  type EncryptionType,
  type EncryptionProperties,
  type KeyVaultProperties,
  type EncryptionIdentity,
  type NetworkRuleSet,
  type VirtualNetworkRule,
  KnownAction,
  type Action,
  type VolumeGroupUpdate,
  type VolumeGroupUpdateProperties,
  type PrivateLinkResourceListResult,
  type PrivateLinkResource,
  type PrivateLinkResourceProperties,
  type Snapshot,
  type SnapshotProperties,
  type SnapshotCreationData,
  type SkuInformation,
  type SkuLocationInfo,
  type SKUCapability,
  KnownXMsDeleteSnapshots,
  type XMsDeleteSnapshots,
  KnownXMsForceDelete,
  type XMsForceDelete,
  KnownVersions,
} from "./models/index.js";
export { type ElasticSanManagementOptionalParams } from "./api/index.js";
export {
  type ElasticSansListBySubscriptionOptionalParams,
  type ElasticSansListByResourceGroupOptionalParams,
  type ElasticSansDeleteOptionalParams,
  type ElasticSansUpdateOptionalParams,
  type ElasticSansCreateOptionalParams,
  type ElasticSansGetOptionalParams,
} from "./api/elasticSans/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type PrivateEndpointConnectionsListOptionalParams,
  type PrivateEndpointConnectionsDeleteOptionalParams,
  type PrivateEndpointConnectionsCreateOptionalParams,
  type PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export { type PrivateLinkResourcesListByElasticSanOptionalParams } from "./api/privateLinkResources/index.js";
export { type SkusListOptionalParams } from "./api/skus/index.js";
export {
  type VolumeGroupsListByElasticSanOptionalParams,
  type VolumeGroupsDeleteOptionalParams,
  type VolumeGroupsUpdateOptionalParams,
  type VolumeGroupsCreateOptionalParams,
  type VolumeGroupsGetOptionalParams,
} from "./api/volumeGroups/index.js";
export {
  type VolumesPreRestoreOptionalParams,
  type VolumesPreBackupOptionalParams,
  type VolumesListByVolumeGroupOptionalParams,
  type VolumesDeleteOptionalParams,
  type VolumesUpdateOptionalParams,
  type VolumesCreateOptionalParams,
  type VolumesGetOptionalParams,
} from "./api/volumes/index.js";
export {
  type VolumeSnapshotsListByVolumeGroupOptionalParams,
  type VolumeSnapshotsDeleteOptionalParams,
  type VolumeSnapshotsCreateOptionalParams,
  type VolumeSnapshotsGetOptionalParams,
} from "./api/volumeSnapshots/index.js";
export {
  type ElasticSansOperations,
  type OperationsOperations,
  type PrivateEndpointConnectionsOperations,
  type PrivateLinkResourcesOperations,
  type SkusOperations,
  type VolumeGroupsOperations,
  type VolumesOperations,
  type VolumeSnapshotsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
