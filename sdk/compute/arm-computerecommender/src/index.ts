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
  SpotPlacementScoresBase,
  PlacementScoresProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  SpotPlacementScoresInput,
  ResourceSize,
  SpotPlacementScoresResponse,
  PlacementScore,
  PlacementScoreValue,
  ComputePlacementScoresBase,
  ComputePlacementScoresInput,
  ComputePlacementScoresResponse,
  SkuMixPlacementBase,
  SkuMixPlacementProperties,
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
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownCreatedByType,
  KnownPlacementScoreValue,
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
export type {
  ComputePlacementScoresPostOptionalParams,
  ComputePlacementScoresGetOptionalParams,
} from "./api/computePlacementScores/index.js";
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
  ComputePlacementScoresOperations,
  OperationsOperations,
  SkuMixPlacementScoresOperations,
  SpotPlacementScoresOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
