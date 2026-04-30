// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
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
export {
  type HealthDataAIServicesClientOptionalParams,
  type OperationsListOptionalParams,
  type DeidServicesGetOptionalParams,
  type DeidServicesListByResourceGroupOptionalParams,
  type DeidServicesListBySubscriptionOptionalParams,
  type DeidServicesCreateOptionalParams,
  type DeidServicesUpdateOptionalParams,
  type DeidServicesDeleteOptionalParams,
  type PrivateEndpointConnectionsGetOptionalParams,
  type PrivateEndpointConnectionsCreateOptionalParams,
  type PrivateEndpointConnectionsDeleteOptionalParams,
  type PrivateEndpointConnectionsListByDeidServiceOptionalParams,
  type PrivateLinksListByDeidServiceOptionalParams,
} from "./api/index.js";
export {
  type DeidServicesOperations,
  type OperationsOperations,
  type PrivateEndpointConnectionsOperations,
  type PrivateLinksOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
