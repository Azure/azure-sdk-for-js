// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DeviceUpdateClient } from "./deviceUpdateClient.js";
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
  UpdateInstance,
  UpdateInstanceProperties,
  ProvisioningState,
  AccountLinking,
  AccountLinkingState,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  UpdateInstanceUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
  CheckNameAvailabilityReason,
  LinkPreflightRequest,
  InboundCallerIdentity,
  LinkPreflightResponse,
  LinkPreflightStatus,
  LinkedResourceMetadata,
  LinkInitiateRequest,
  LinkNotifyRequest,
  LinkNotifyAction,
  LinkUpdateRequest,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownAccountLinkingState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownCheckNameAvailabilityReason,
  KnownLinkPreflightStatus,
  KnownLinkNotifyAction,
  KnownVersions,
} from "./models/index.js";
export type { DeviceUpdateClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  UpdateInstancesLinkUpdateOptionalParams,
  UpdateInstancesLinkNotifyOptionalParams,
  UpdateInstancesLinkInitiateOptionalParams,
  UpdateInstancesLinkPreflightOptionalParams,
  UpdateInstancesCheckNameAvailabilityOptionalParams,
  UpdateInstancesListBySubscriptionOptionalParams,
  UpdateInstancesListByResourceGroupOptionalParams,
  UpdateInstancesDeleteOptionalParams,
  UpdateInstancesUpdateOptionalParams,
  UpdateInstancesCreateOptionalParams,
  UpdateInstancesGetOptionalParams,
} from "./api/updateInstances/index.js";
export type { OperationsOperations, UpdateInstancesOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
