// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type { ManagementContext, ManagementClientOptionalParams } from "./managementContext.js";
export { createManagement } from "./managementContext.js";
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
