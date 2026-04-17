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
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownResourceProvisioningState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { ComputeLimitClientOptionalParams } from "./api/index.js";
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
  GuestSubscriptionsOperations,
  OperationsOperations,
  SharedLimitsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
