// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ElasticSanManagement } from "./elasticSanManagement.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ElasticSan,
  ElasticSanProperties,
  Sku,
  SkuName,
  SkuTier,
  ProvisioningStates,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PublicNetworkAccess,
  AutoScaleProperties,
  ScaleUpProperties,
  AutoScalePolicyEnforcement,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  ElasticSanUpdate,
  ElasticSanUpdateProperties,
  Volume,
  VolumeProperties,
  SourceCreationData,
  VolumeCreateOption,
  IscsiTargetInfo,
  OperationalStatus,
  ManagedByInfo,
  VolumeUpdate,
  VolumeUpdateProperties,
  VolumeNameList,
  PreValidationResponse,
  DiskSnapshotList,
  VolumeGroup,
  Identity,
  IdentityType,
  UserAssignedIdentity,
  VolumeGroupProperties,
  StorageTargetType,
  EncryptionType,
  EncryptionProperties,
  KeyVaultProperties,
  EncryptionIdentity,
  NetworkRuleSet,
  VirtualNetworkRule,
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
  XMsDeleteSnapshots,
  XMsForceDelete,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownSkuName,
  KnownSkuTier,
  KnownProvisioningStates,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPublicNetworkAccess,
  KnownAutoScalePolicyEnforcement,
  KnownCreatedByType,
  KnownVolumeCreateOption,
  KnownOperationalStatus,
  KnownIdentityType,
  KnownStorageTargetType,
  KnownEncryptionType,
  KnownAction,
  KnownXMsDeleteSnapshots,
  KnownXMsForceDelete,
  KnownVersions,
} from "./models/index.js";
export type { ElasticSanManagementOptionalParams } from "./api/index.js";
export type {
  ElasticSansListBySubscriptionOptionalParams,
  ElasticSansListByResourceGroupOptionalParams,
  ElasticSansDeleteOptionalParams,
  ElasticSansUpdateOptionalParams,
  ElasticSansCreateOptionalParams,
  ElasticSansGetOptionalParams,
} from "./api/elasticSans/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type { PrivateLinkResourcesListByElasticSanOptionalParams } from "./api/privateLinkResources/index.js";
export type { SkusListOptionalParams } from "./api/skus/index.js";
export type {
  VolumeGroupsListByElasticSanOptionalParams,
  VolumeGroupsDeleteOptionalParams,
  VolumeGroupsUpdateOptionalParams,
  VolumeGroupsCreateOptionalParams,
  VolumeGroupsGetOptionalParams,
} from "./api/volumeGroups/index.js";
export type {
  VolumesPreRestoreOptionalParams,
  VolumesPreBackupOptionalParams,
  VolumesListByVolumeGroupOptionalParams,
  VolumesDeleteOptionalParams,
  VolumesUpdateOptionalParams,
  VolumesCreateOptionalParams,
  VolumesGetOptionalParams,
} from "./api/volumes/index.js";
export type {
  VolumeSnapshotsListByVolumeGroupOptionalParams,
  VolumeSnapshotsDeleteOptionalParams,
  VolumeSnapshotsCreateOptionalParams,
  VolumeSnapshotsGetOptionalParams,
} from "./api/volumeSnapshots/index.js";
export type {
  ElasticSansOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  SkusOperations,
  VolumeGroupsOperations,
  VolumesOperations,
  VolumeSnapshotsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
