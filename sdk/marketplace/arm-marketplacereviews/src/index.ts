// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { MarketplaceClient } from "./marketplaceClient.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  UserHasReview,
  UserHasReviewProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
} from "./models/index.js";
export { KnownOrigin, KnownActionType, KnownCreatedByType, KnownVersions } from "./models/index.js";
export type { MarketplaceClientOptionalParams } from "./api/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { RatingAndReviewsOperationsCheckUserHasReviewOptionalParams } from "./api/ratingAndReviewsOperations/index.js";
export type {
  OperationsOperations,
  RatingAndReviewsOperationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
