// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SubscriptionClient } from "./subscriptionClient.js";
export type {
  ResourceName,
  CheckResourceNameResult,
  ResourceNameStatus,
  CloudError,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  Location,
  LocationType,
  LocationMetadata,
  RegionType,
  RegionCategory,
  PairedRegion,
  AvailabilityZoneMappings,
  Subscription,
  SubscriptionState,
  SubscriptionPolicies,
  SpendingLimit,
  ManagedByTenant,
  CheckZonePeersRequest,
  CheckZonePeersResult,
  AvailabilityZonePeers,
  Peers,
  TenantIdDescription,
  TenantCategory,
} from "./models/index.js";
export {
  KnownResourceNameStatus,
  KnownOrigin,
  KnownActionType,
  KnownRegionType,
  KnownRegionCategory,
  KnownVersions,
} from "./models/index.js";
export type {
  CheckResourceNameOptionalParams,
  SubscriptionClientOptionalParams,
} from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SubscriptionsCheckZonePeersOptionalParams,
  SubscriptionsListOptionalParams,
  SubscriptionsGetOptionalParams,
  SubscriptionsListLocationsOptionalParams,
} from "./api/subscriptions/index.js";
export type { TenantsListOptionalParams } from "./api/tenants/index.js";
export type {
  OperationsOperations,
  SubscriptionsOperations,
  TenantsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
