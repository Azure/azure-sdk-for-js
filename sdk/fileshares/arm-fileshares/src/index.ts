// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
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
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  FileShareUpdate,
  FileShareUpdateProperties,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
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
  KnownShareRootSquash,
  KnownEncryptionInTransitRequired,
  KnownFileShareProvisioningState,
  KnownPublicNetworkAccess,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownCreatedByType,
  KnownCheckNameAvailabilityReason,
  KnownOrigin,
  KnownActionType,
  KnownVersions,
} from "./models/index.js";
export type { FileSharesClientOptionalParams } from "./api/index.js";
export type {
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
