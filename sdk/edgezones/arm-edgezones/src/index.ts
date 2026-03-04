// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeZonesClient } from "./edgeZonesClient.js";
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
  type ExtendedZone,
  type ExtendedZoneProperties,
  KnownProvisioningState,
  type ProvisioningState,
  KnownRegistrationState,
  type RegistrationState,
  type ProxyResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { EdgeZonesClientOptionalParams } from "./api/index.js";
export type {
  ExtendedZonesUnregisterOptionalParams,
  ExtendedZonesRegisterOptionalParams,
  ExtendedZonesListBySubscriptionOptionalParams,
  ExtendedZonesGetOptionalParams,
} from "./api/extendedZones/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { ExtendedZonesOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
