// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ElasticSanManagement } from "./elasticSanManagement.js";
export { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ElasticSan,
  ElasticSanProperties,
  Sku,
  KnownSkuName,
  SkuName,
  KnownSkuTier,
  SkuTier,
  KnownProvisioningStates,
  ProvisioningStates,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  KnownPrivateEndpointServiceConnectionStatus,
  PrivateEndpointServiceConnectionStatus,
  KnownPublicNetworkAccess,
  PublicNetworkAccess,
  AutoScaleProperties,
  ScaleUpProperties,
  KnownAutoScalePolicyEnforcement,
  AutoScalePolicyEnforcement,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  TrackedResource,
  ElasticSanUpdate,
  ElasticSanUpdateProperties,
  Volume,
  VolumeProperties,
  SourceCreationData,
  KnownVolumeCreateOption,
  VolumeCreateOption,
  IscsiTargetInfo,
  KnownOperationalStatus,
  OperationalStatus,
  ManagedByInfo,
  VolumeUpdate,
  VolumeUpdateProperties,
  VolumeNameList,
  PreValidationResponse,
  DiskSnapshotList,
  VolumeGroup,
  Identity,
  KnownIdentityType,
  IdentityType,
  UserAssignedIdentity,
  VolumeGroupProperties,
  KnownStorageTargetType,
  StorageTargetType,
  KnownEncryptionType,
  EncryptionType,
  EncryptionProperties,
  KeyVaultProperties,
  EncryptionIdentity,
  NetworkRuleSet,
  VirtualNetworkRule,
  KnownAction,
  Action,
  VolumeGroupUpdate,
  VolumeGroupUpdateProperties,
  PrivateLinkResourceListResult,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
  Snapshot,
  SnapshotProperties,
  SnapshotCreationData,
  SkuInformation,
  SkuLocationInfo,
  SKUCapability,
  KnownXMsDeleteSnapshots,
  XMsDeleteSnapshots,
  KnownXMsForceDelete,
  XMsForceDelete,
  KnownVersions,
} from "./models/index.js";
export { ElasticSanManagementOptionalParams } from "./api/index.js";
export {
  ElasticSansListBySubscriptionOptionalParams,
  ElasticSansListByResourceGroupOptionalParams,
  ElasticSansDeleteOptionalParams,
  ElasticSansUpdateOptionalParams,
  ElasticSansCreateOptionalParams,
  ElasticSansGetOptionalParams,
} from "./api/elasticSans/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export { PrivateLinkResourcesListByElasticSanOptionalParams } from "./api/privateLinkResources/index.js";
export { SkusListOptionalParams } from "./api/skus/index.js";
export {
  VolumeGroupsListByElasticSanOptionalParams,
  VolumeGroupsDeleteOptionalParams,
  VolumeGroupsUpdateOptionalParams,
  VolumeGroupsCreateOptionalParams,
  VolumeGroupsGetOptionalParams,
} from "./api/volumeGroups/index.js";
export {
  VolumesPreRestoreOptionalParams,
  VolumesPreBackupOptionalParams,
  VolumesListByVolumeGroupOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOptionalParams,
  VolumesGetOptionalParams,
} from "./api/volumes/index.js";
export {
  VolumeSnapshotsListByVolumeGroupOptionalParams,
  VolumeSnapshotsDeleteOptionalParams,
  VolumeSnapshotsCreateOptionalParams,
  VolumeSnapshotsGetOptionalParams,
} from "./api/volumeSnapshots/index.js";
export {
  ElasticSansOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  SkusOperations,
  VolumeGroupsOperations,
  VolumesOperations,
  VolumeSnapshotsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
