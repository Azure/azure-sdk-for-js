// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccessReviewScheduleDefinitionsStopOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccessReviewScheduleDefinitionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Other than standard filters, one custom filter option is supported : 'assignedToMeToReview()'. When one specified $filter=assignedToMeToReview(), only items that are assigned to the calling user to review are returned */
  filter?: string;
}

/** Optional parameters. */
export interface AccessReviewScheduleDefinitionsDeleteByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccessReviewScheduleDefinitionsCreateOrUpdateByIdOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccessReviewScheduleDefinitionsGetByIdOptionalParams extends OperationOptions {}
