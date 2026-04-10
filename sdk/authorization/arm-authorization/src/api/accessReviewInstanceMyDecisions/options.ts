// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccessReviewInstanceMyDecisionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Other than standard filters, one custom filter option is supported : 'assignedToMeToReview()'. When one specified $filter=assignedToMeToReview(), only items that are assigned to the calling user to review are returned */
  filter?: string;
}

/** Optional parameters. */
export interface AccessReviewInstanceMyDecisionsPatchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccessReviewInstanceMyDecisionsGetByIdOptionalParams extends OperationOptions {}
