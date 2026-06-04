// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { PowerBIDedicated } from "./powerBIDedicated.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationProperties,
  ServiceSpecification,
  MetricSpecification,
  MetricSpecificationDimensionsItem,
  LogSpecification,
  ErrorResponse,
  DedicatedCapacity,
  DedicatedCapacityProperties,
  State,
  CapacityProvisioningState,
  CapacitySku,
  CapacitySkuTier,
  DedicatedCapacityMutableProperties,
  DedicatedCapacityAdministrators,
  Mode,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  DedicatedCapacityUpdateParameters,
  SkuEnumerationForExistingResourceResult,
  SkuDetailsForExistingResource,
  SkuEnumerationForNewResourceResult,
  CheckCapacityNameAvailabilityParameters,
  CheckCapacityNameAvailabilityResult,
  AutoScaleVCore,
  AutoScaleVCoreProperties,
  VCoreProvisioningState,
  AutoScaleVCoreSku,
  VCoreSkuTier,
  AutoScaleVCoreMutableProperties,
  AutoScaleVCoreUpdateParameters,
} from "./models/index.js";
export {
  KnownState,
  KnownCapacityProvisioningState,
  KnownCapacitySkuTier,
  KnownMode,
  KnownCreatedByType,
  KnownVCoreProvisioningState,
  KnownVCoreSkuTier,
  KnownVersions,
} from "./models/index.js";
export type { PowerBIDedicatedOptionalParams } from "./api/index.js";
export type {
  AutoScaleVCoresListBySubscriptionOptionalParams,
  AutoScaleVCoresListByResourceGroupOptionalParams,
  AutoScaleVCoresDeleteOptionalParams,
  AutoScaleVCoresUpdateOptionalParams,
  AutoScaleVCoresCreateOptionalParams,
  AutoScaleVCoresGetOptionalParams,
} from "./api/autoScaleVCores/index.js";
export type {
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
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  AutoScaleVCoresOperations,
  CapacitiesOperations,
  OperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
