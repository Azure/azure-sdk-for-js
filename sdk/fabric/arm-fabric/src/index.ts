// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { FabricClient } from "./fabricClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  FabricCapacity,
  FabricCapacityProperties,
  ProvisioningState,
  ResourceState,
  CapacityOverageProperties,
  CapacityOverageState,
  CapacityAdministration,
  RpSku,
  RpSkuTier,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  FabricCapacityUpdate,
  FabricCapacityUpdateProperties,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  CheckNameAvailabilityReason,
  RpSkuDetailsForExistingResource,
  RpSkuDetailsForNewResource,
  Quota,
  QuotaName,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
} from "./models/index.js";
export {
  KnownProvisioningState,
  KnownResourceState,
  KnownCapacityOverageState,
  KnownRpSkuTier,
  KnownCreatedByType,
  KnownCheckNameAvailabilityReason,
  KnownOrigin,
  KnownActionType,
  KnownVersions,
} from "./models/index.js";
export type { FabricClientOptionalParams } from "./api/index.js";
export type {
  FabricCapacitiesListUsagesOptionalParams,
  FabricCapacitiesListSkusOptionalParams,
  FabricCapacitiesListSkusForCapacityOptionalParams,
  FabricCapacitiesCheckNameAvailabilityOptionalParams,
  FabricCapacitiesSuspendOptionalParams,
  FabricCapacitiesResumeOptionalParams,
  FabricCapacitiesListBySubscriptionOptionalParams,
  FabricCapacitiesListByResourceGroupOptionalParams,
  FabricCapacitiesDeleteOptionalParams,
  FabricCapacitiesUpdateOptionalParams,
  FabricCapacitiesCreateOrUpdateOptionalParams,
  FabricCapacitiesGetOptionalParams,
} from "./api/fabricCapacities/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { FabricCapacitiesOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
