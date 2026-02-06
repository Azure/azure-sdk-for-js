// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getUpgradeProfile,
  getAvailableAgentPoolVersions,
  upgradeNodeImageVersion,
  deleteMachines,
  completeUpgrade,
  abortLatestOperation,
  list,
  $delete,
  createOrUpdate,
  get,
} from "./operations.js";
export {
  AgentPoolsGetUpgradeProfileOptionalParams,
  AgentPoolsGetAvailableAgentPoolVersionsOptionalParams,
  AgentPoolsUpgradeNodeImageVersionOptionalParams,
  AgentPoolsDeleteMachinesOptionalParams,
  AgentPoolsCompleteUpgradeOptionalParams,
  AgentPoolsAbortLatestOperationOptionalParams,
  AgentPoolsListOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsCreateOrUpdateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "./options.js";
