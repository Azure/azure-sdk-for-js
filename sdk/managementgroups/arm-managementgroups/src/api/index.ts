// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type {
  ManagementGroupsAPIContext,
  ManagementGroupsAPIOptionalParams,
} from "./managementGroupsAPIContext.js";
export { createManagementGroupsAPI } from "./managementGroupsAPIContext.js";
export { tenantBackfillStatus, startTenantBackfill, checkNameAvailability } from "./operations.js";
export type {
  TenantBackfillStatusOptionalParams,
  StartTenantBackfillOptionalParams,
  CheckNameAvailabilityOptionalParams,
} from "./options.js";
