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
  KnownProvisioningState,
  ProvisioningState,
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
  KnownVersions,
} from "./models/index.js";
export { EdgeZonesClientOptionalParams } from "./api/index.js";
export {
  ExtendedZonesUnregisterOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesGetOptionalParams,
} from "./api/extendedZones/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export { ExtendedZonesOperations, OperationsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
