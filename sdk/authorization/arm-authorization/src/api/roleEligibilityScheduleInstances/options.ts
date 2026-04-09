// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RoleEligibilityScheduleInstancesListForScopeOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. Use $filter=atScope() to return all role assignment schedules at or above the scope. Use $filter=principalId eq {id} to return all role assignment schedules at, above or below the scope for the specified principal. Use $filter=assignedTo('{userId}') to return all role eligibility schedules for the user. Use $filter=asTarget() to return all role eligibility schedules created for the current user. */
  filter?: string;
}

/** Optional parameters. */
export interface RoleEligibilityScheduleInstancesGetOptionalParams extends OperationOptions {}
