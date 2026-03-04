// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ComputeLimitClient } from "./computeLimitClient.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type GuestSubscription,
  type GuestSubscriptionProperties,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type SharedLimit,
  type SharedLimitProperties,
  type LimitName,
  KnownVersions,
} from "./models/index.js";
export { type ComputeLimitClientOptionalParams } from "./api/index.js";
export {
  type GuestSubscriptionsListBySubscriptionLocationResourceOptionalParams,
  type GuestSubscriptionsDeleteOptionalParams,
  type GuestSubscriptionsCreateOptionalParams,
  type GuestSubscriptionsGetOptionalParams,
} from "./api/guestSubscriptions/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type SharedLimitsListBySubscriptionLocationResourceOptionalParams,
  type SharedLimitsDeleteOptionalParams,
  type SharedLimitsCreateOptionalParams,
  type SharedLimitsGetOptionalParams,
} from "./api/sharedLimits/index.js";
export {
  type GuestSubscriptionsOperations,
  type OperationsOperations,
  type SharedLimitsOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
