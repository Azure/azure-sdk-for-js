// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RoleEligibilityScheduleRequestsValidateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleEligibilityScheduleRequestsCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleEligibilityScheduleRequestsListForScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role eligibility schedule requests at or above the scope. Use $filter=principalId eq {id} to return all role eligibility schedule requests at, above or below the scope for the specified principal. Use $filter=asRequestor() to return all role eligibility schedule requests requested by the current user. Use $filter=asTarget() to return all role eligibility schedule requests created for the current user. Use $filter=asApprover() to return all role eligibility schedule requests where the current user is an approver. */
  filter?: string;
}

/** Optional parameters. */
export interface RoleEligibilityScheduleRequestsCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RoleEligibilityScheduleRequestsGetOptionalParams extends OperationOptions {}
