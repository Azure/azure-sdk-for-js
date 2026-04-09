// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccessReviewScheduleDefinitionsAssignedForMyApprovalListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. One custom filter option is supported : 'assignedToMeToReview()'. When specified $filter=assignedToMeToReview(), only items that are assigned to the calling user to review are returned */
  filter?: string;
}
