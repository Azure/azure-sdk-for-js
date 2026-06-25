// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { EdgeZonesClient } from "./edgeZonesClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ExtendedZone,
  ExtendedZoneProperties,
  ProvisioningState,
  RegistrationState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownRegistrationState,
  KnownCreatedByType,
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
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
