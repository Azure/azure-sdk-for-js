// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  restart,
  redeploy,
  listAvailableSizes,
  listByHostGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  DedicatedHostsRestartOptionalParams,
  DedicatedHostsRedeployOptionalParams,
  DedicatedHostsListAvailableSizesOptionalParams,
  DedicatedHostsListByHostGroupOptionalParams,
  DedicatedHostsDeleteOptionalParams,
  DedicatedHostsUpdateOptionalParams,
  DedicatedHostsCreateOrUpdateOptionalParams,
  DedicatedHostsGetOptionalParams,
} from "./options.js";
