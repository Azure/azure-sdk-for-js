// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { FileSharesClient } from "./fileSharesClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  FileShare,
  FileShareProperties,
  MediaTier,
  Redundancy,
  Protocol,
  ScaleMode,
  NfsProtocolProperties,
  ShareRootSquash,
  EncryptionInTransitRequired,
  PublicAccessProperties,
  FileShareProvisioningState,
  PublicNetworkAccess,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  MigrationState,
  FileShareEncryption,
  InfrastructureEncryption,
  CustomerManagedKeyEncryption,
  KeyEncryptionKeyIdentity,
  KeyEncryptionKeyIdentityType,
  ErrorDetail,
  ErrorAdditionalInfo,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  ErrorResponse,
  FileShareUpdate,
  FileShareUpdateProperties,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
  StartRedundancyConversionRequest,
  StartRedundancyConversionInput,
  RedundancyConversionStatusResponse,
  RedundancyConversionStatusOutput,
  RedundancyConversionStatus,
  FileShareSnapshot,
  FileShareSnapshotProperties,
  ProxyResource,
  FileShareSnapshotUpdate,
  FileShareSnapshotUpdateProperties,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  FileShareUsageDataResponse,
  FileShareUsageDataOutput,
  LiveSharesUsageData,
  FileShareLimitsRequest,
  FileShareOfferInput,
  FileShareLimitsResponse,
  FileShareLimitsOutput,
  FileShareLimits,
  FileShareProvisioningConstants,
  FileShareProvisioningRecommendationRequest,
  FileShareProvisioningRecommendationInput,
  FileShareProvisioningRecommendationResponse,
  FileShareProvisioningRecommendationOutput,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
} from "./models/index.js";
export {
  KnownMediaTier,
  KnownRedundancy,
  KnownProtocol,
  KnownScaleMode,
  KnownShareRootSquash,
  KnownEncryptionInTransitRequired,
  KnownFileShareProvisioningState,
  KnownPublicNetworkAccess,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownInfrastructureEncryption,
  KnownKeyEncryptionKeyIdentityType,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownCheckNameAvailabilityReason,
  KnownRedundancyConversionStatus,
  KnownOrigin,
  KnownActionType,
  KnownVersions,
} from "./models/index.js";
export type { FileSharesClientOptionalParams } from "./api/index.js";
export type {
  FileSharesGetRedundancyConversionStatusOptionalParams,
  FileSharesStartRedundancyConversionOptionalParams,
  FileSharesCheckNameAvailabilityOptionalParams,
  FileSharesListByParentOptionalParams,
  FileSharesListBySubscriptionOptionalParams,
  FileSharesDeleteOptionalParams,
  FileSharesUpdateOptionalParams,
  FileSharesCreateOrUpdateOptionalParams,
  FileSharesGetOptionalParams,
} from "./api/fileShares/index.js";
export type {
  FileShareSnapshotsListByFileShareOptionalParams,
  FileShareSnapshotsDeleteFileShareSnapshotOptionalParams,
  FileShareSnapshotsUpdateFileShareSnapshotOptionalParams,
  FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams,
  FileShareSnapshotsGetFileShareSnapshotOptionalParams,
} from "./api/fileShareSnapshots/index.js";
export type {
  InformationalOperationsGetProvisioningRecommendationOptionalParams,
  InformationalOperationsGetLimitsOptionalParams,
  InformationalOperationsGetUsageDataOptionalParams,
} from "./api/informationalOperations/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByFileShareOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  FileSharesOperations,
  FileShareSnapshotsOperations,
  InformationalOperationsOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
