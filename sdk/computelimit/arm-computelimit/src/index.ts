// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ComputeLimitClient } from "./computeLimitClient.js";
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
  GuestSubscription,
  GuestSubscriptionProperties,
  ResourceProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  SharedLimit,
  SharedLimitProperties,
  LimitName,
  Feature,
  FeatureProperties,
  FeatureState,
  OperationStatusResult,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownResourceProvisioningState,
  KnownCreatedByType,
  KnownFeatureState,
  KnownVersions,
} from "./models/index.js";
export type { ComputeLimitClientOptionalParams } from "./api/index.js";
export type {
  FeaturesEnableOptionalParams,
  FeaturesListBySubscriptionLocationResourceOptionalParams,
  FeaturesGetOptionalParams,
} from "./api/features/index.js";
export type {
  GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  GuestSubscriptionsDeleteOptionalParams,
  GuestSubscriptionsCreateOptionalParams,
  GuestSubscriptionsGetOptionalParams,
} from "./api/guestSubscriptions/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SharedLimitsListBySubscriptionLocationResourceOptionalParams,
  SharedLimitsDeleteOptionalParams,
  SharedLimitsCreateOptionalParams,
  SharedLimitsGetOptionalParams,
} from "./api/sharedLimits/index.js";
export type {
  FeaturesOperations,
  GuestSubscriptionsOperations,
  OperationsOperations,
  SharedLimitsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
