// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ScopeAccessReviewScheduleDefinitionsStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScopeAccessReviewScheduleDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Other than standard filters, one custom filter option is supported : 'assignedToMeToReview()'. When one specified $filter=assignedToMeToReview(), only items that are assigned to the calling user to review are returned */
  filter?: string;
}

/** Optional parameters. */
export interface ScopeAccessReviewScheduleDefinitionsDeleteByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScopeAccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ScopeAccessReviewScheduleDefinitionsGetByIdOptionalParams extends OperationOptions {}
