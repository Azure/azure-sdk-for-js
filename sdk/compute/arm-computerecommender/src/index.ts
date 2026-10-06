// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ComputeRecommenderManagementClient } from "./computeRecommenderManagementClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SkuMixPlacementBase,
  SkuMixPlacementProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  SkuMixPlacementRequest,
  SkuMixPlacementCapacityProfile,
  SkuMixPlacementCapacityType,
  SkuMixPlacementPriority,
  SkuMixPlacementSpotPriorityProfile,
  SkuMixPlacementAllocationStrategy,
  SkuMixPlacementOSType,
  SkuMixPlacementZoneAllocationPolicy,
  SkuMixPlacementZonalDistributionStrategy,
  SkuMixPlacementZonePreference,
  SkuMixPlacementInstanceDescription,
  SkuMixPlacementVMSize,
  SkuMixPlacementResponse,
  SkuMixPlacementDeploymentChoice,
  SkuMixPlacementItem,
  SkuMixPlacementPartialFulfillmentReason,
  SkuMixPlacementCapacityLimit,
  SkuMixPlacementCapacityLimitReason,
  ComputeDiagnosticBase,
  DiagnosticProperties,
  SpotPlacementScoresInput,
  ResourceSize,
  SpotPlacementScoresResponse,
  PlacementScore,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownSkuMixPlacementCapacityType,
  KnownSkuMixPlacementPriority,
  KnownSkuMixPlacementAllocationStrategy,
  KnownSkuMixPlacementOSType,
  KnownSkuMixPlacementZonalDistributionStrategy,
  KnownSkuMixPlacementPartialFulfillmentReason,
  KnownSkuMixPlacementCapacityLimitReason,
  KnownVersions,
} from "./models/index.js";
export type { ComputeRecommenderManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SkuMixPlacementScoresPostOptionalParams,
  SkuMixPlacementScoresGetOptionalParams,
} from "./api/skuMixPlacementScores/index.js";
export type {
  SpotPlacementScoresPostOptionalParams,
  SpotPlacementScoresGetOptionalParams,
} from "./api/spotPlacementScores/index.js";
export type {
  OperationsOperations,
  SkuMixPlacementScoresOperations,
  SpotPlacementScoresOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
