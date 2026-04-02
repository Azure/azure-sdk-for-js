// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HealthDataAIServicesClient } from "./healthDataAIServicesClient.js";
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
  DeidService,
  DeidServiceProperties,
  ProvisioningState,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  PublicNetworkAccess,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  PrivateEndpointConnectionResource,
  ProxyResource,
  PrivateLinkResource,
  PrivateLinkResourceProperties,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { HealthDataAIServicesClientOptionalParams } from "./api/index.js";
export type {
  DeidServicesDeleteOptionalParams,
  DeidServicesCreateOptionalParams,
  DeidServicesListBySubscriptionOptionalParams,
  DeidServicesListByResourceGroupOptionalParams,
  DeidServicesGetOptionalParams,
} from "./api/deidServices/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  PrivateEndpointConnectionsListByDeidServiceOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type { PrivateLinksListByDeidServiceOptionalParams } from "./api/privateLinks/index.js";
export type {
  DeidServicesOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinksOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
