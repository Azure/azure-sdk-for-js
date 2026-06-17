// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
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
  ComputeDiagnosticBase,
  DiagnosticProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  SpotPlacementScoresInput,
  ResourceSize,
  SpotPlacementScoresResponse,
  PlacementScore,
} from "./models/index.js";
export { KnownOrigin, KnownActionType, KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { ComputeRecommenderManagementClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  SpotPlacementScoresPostOptionalParams,
  SpotPlacementScoresGetOptionalParams,
} from "./api/spotPlacementScores/index.js";
export type { OperationsOperations, SpotPlacementScoresOperations } from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
