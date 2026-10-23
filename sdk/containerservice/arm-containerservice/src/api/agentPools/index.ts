// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getUpgradeProfile,
  getAvailableAgentPoolVersions,
  upgradeNodeImageVersion,
  deleteMachines,
  abortLatestOperation,
  list,
  $delete,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  AgentPoolsGetUpgradeProfileOptionalParams,
  AgentPoolsGetAvailableAgentPoolVersionsOptionalParams,
  AgentPoolsUpgradeNodeImageVersionOptionalParams,
  AgentPoolsDeleteMachinesOptionalParams,
  AgentPoolsAbortLatestOperationOptionalParams,
  AgentPoolsListOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsCreateOrUpdateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "./options.js";
