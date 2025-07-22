// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PowerBIDedicatedClient } from "./powerBIDedicatedClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  ServiceSpecification,
  MetricSpecification,
  MetricSpecificationDimensionsItem,
  LogSpecification,
  ErrorResponse,
  DedicatedCapacity,
  CapacitySku,
  KnownCapacitySkuTier,
  CapacitySkuTier,
  DedicatedCapacityProperties,
  KnownState,
  State,
  KnownCapacityProvisioningState,
  CapacityProvisioningState,
  DedicatedCapacityMutableProperties,
  DedicatedCapacityAdministrators,
  KnownMode,
  Mode,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  DedicatedCapacityUpdateParameters,
  OkResponse,
  SkuEnumerationForExistingResourceResult,
  SkuDetailsForExistingResource,
  SkuEnumerationForNewResourceResult,
  CheckCapacityNameAvailabilityParameters,
  CheckCapacityNameAvailabilityResult,
  AutoScaleVCore,
  AutoScaleVCoreSku,
  KnownVCoreSkuTier,
  VCoreSkuTier,
  AutoScaleVCoreProperties,
  KnownVCoreProvisioningState,
  VCoreProvisioningState,
  AutoScaleVCoreMutableProperties,
  AutoScaleVCoreUpdateParameters,
  KnownVersions,
} from "./models/index.js";
export { PowerBIDedicatedClientOptionalParams } from "./api/index.js";
export {
  AutoScaleVCoresListBySubscriptionOptionalParams,
  AutoScaleVCoresListByResourceGroupOptionalParams,
  AutoScaleVCoresDeleteOptionalParams,
  AutoScaleVCoresUpdateOptionalParams,
  AutoScaleVCoresCreateOptionalParams,
  AutoScaleVCoresGetOptionalParams,
} from "./api/autoScaleVCores/index.js";
export {
  CapacitiesCheckNameAvailabilityOptionalParams,
  CapacitiesListSkusOptionalParams,
  CapacitiesListSkusForCapacityOptionalParams,
  CapacitiesResumeOptionalParams,
  CapacitiesSuspendOptionalParams,
  CapacitiesListOptionalParams,
  CapacitiesListByResourceGroupOptionalParams,
  CapacitiesDeleteOptionalParams,
  CapacitiesUpdateOptionalParams,
  CapacitiesCreateOptionalParams,
  CapacitiesGetDetailsOptionalParams,
} from "./api/capacities/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  AutoScaleVCoresOperations,
  CapacitiesOperations,
  OperationsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
