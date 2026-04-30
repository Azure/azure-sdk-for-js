// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeZonesClient } from "./edgeZonesClient.js";
export {
  type ExtendedZone,
  type ExtendedZoneProperties,
  type ProvisioningState,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  KnownRegistrationState,
  type RegistrationState,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
} from "./models/index.js";
export {
  type EdgeZonesClientOptionalParams,
  type OperationsListOptionalParams,
  type ExtendedZonesGetOptionalParams,
  type ExtendedZonesListBySubscriptionOptionalParams,
  type ExtendedZonesRegisterOptionalParams,
  type ExtendedZonesUnregisterOptionalParams,
} from "./api/index.js";
export { type ExtendedZonesOperations, type OperationsOperations } from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
