// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { getRequiredAmlFSSubnetsSize, checkAmlFSSubnets } from "./operations.js";
export type {
  GetRequiredAmlFSSubnetsSizeOptionalParams,
  CheckAmlFSSubnetsOptionalParams,
} from "./options.js";
export type {
  StorageCacheManagementContext,
  StorageCacheManagementClientOptionalParams,
} from "./storageCacheManagementContext.js";
export { createStorageCacheManagement } from "./storageCacheManagementContext.js";
