// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HealthDataAIServicesClient } from "./healthDataAIServicesClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type PrivateLinkResource,
  type PrivateLinkResourceProperties,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type PrivateEndpointConnectionResource,
  type PrivateEndpointConnectionProperties,
  type PrivateEndpoint,
  type PrivateLinkServiceConnectionState,
  KnownPrivateEndpointServiceConnectionStatus,
  type PrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  type PrivateEndpointConnectionProvisioningState,
  type DeidService,
  type DeidServiceProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type PrivateEndpointConnection,
  type PublicNetworkAccess,
  type ManagedServiceIdentity,
  KnownManagedServiceIdentityType,
  type ManagedServiceIdentityType,
  type UserAssignedIdentity,
  type TrackedResource,
  type DeidUpdate,
  type ManagedServiceIdentityUpdate,
  type DeidPropertiesUpdate,
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  KnownVersions,
} from "./models/index.js";
export type {
  HealthDataAIServicesClientOptionalParams,
  OperationsListOptionalParams,
  DeidServicesGetOptionalParams,
  DeidServicesListByResourceGroupOptionalParams,
  DeidServicesListBySubscriptionOptionalParams,
  DeidServicesCreateOptionalParams,
  DeidServicesUpdateOptionalParams,
  DeidServicesDeleteOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsListByDeidServiceOptionalParams,
  PrivateLinksListByDeidServiceOptionalParams,
} from "./api/index.js";
export type {
  DeidServicesOperations,
  OperationsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinksOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
