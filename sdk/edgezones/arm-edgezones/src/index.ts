// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeZonesClient } from "./edgeZonesClient.js";
export {
  ExtendedZone,
  ExtendedZoneProperties,
  ProvisioningState,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  KnownRegistrationState,
  RegistrationState,
  ProxyResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
} from "./models/index.js";
export {
  EdgeZonesClientOptionalParams,
  OperationsListOptionalParams,
  ExtendedZonesGetOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesUnregisterOptionalParams,
} from "./api/index.js";
export { ExtendedZonesOperations, OperationsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
