// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  deleteServiceGroup,
  updateServiceGroup,
  createOrUpdateServiceGroup,
} from "./operations.js";
export type {
  DeleteServiceGroupOptionalParams,
  UpdateServiceGroupOptionalParams,
  CreateOrUpdateServiceGroupOptionalParams,
} from "./options.js";
export type {
  ServiceGroupsManagementContext,
  ServiceGroupsManagementClientOptionalParams,
} from "./serviceGroupsManagementContext.js";
export { createServiceGroupsManagement } from "./serviceGroupsManagementContext.js";
