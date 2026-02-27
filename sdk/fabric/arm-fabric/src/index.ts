// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { FabricClient } from "./fabricClient.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type FabricCapacity,
  type FabricCapacityProperties,
  type ProvisioningState,
  KnownProvisioningState,
  KnownResourceState,
  type ResourceState,
  type CapacityAdministration,
  type RpSku,
  KnownRpSkuTier,
  type RpSkuTier,
  type TrackedResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type FabricCapacityUpdate,
  type FabricCapacityUpdateProperties,
  type CheckNameAvailabilityRequest,
  type CheckNameAvailabilityResponse,
  KnownCheckNameAvailabilityReason,
  type CheckNameAvailabilityReason,
  type RpSkuDetailsForExistingResource,
  type RpSkuDetailsForNewResource,
} from "./models/index.js";
export type {
  FabricClientOptionalParams,
  FabricCapacitiesGetOptionalParams,
  FabricCapacitiesCreateOrUpdateOptionalParams,
  FabricCapacitiesUpdateOptionalParams,
  FabricCapacitiesDeleteOptionalParams,
  FabricCapacitiesListByResourceGroupOptionalParams,
  FabricCapacitiesListBySubscriptionOptionalParams,
  FabricCapacitiesResumeOptionalParams,
  FabricCapacitiesSuspendOptionalParams,
  FabricCapacitiesCheckNameAvailabilityOptionalParams,
  FabricCapacitiesListSkusForCapacityOptionalParams,
  FabricCapacitiesListSkusOptionalParams,
  OperationsListOptionalParams,
} from "./api/index.js";
export type { FabricCapacitiesOperations, OperationsOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
