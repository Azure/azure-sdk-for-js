// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getUpgradeProfile,
  getAvailableAgentPoolVersions,
  update,
  listBootstrapData,
  upgradeNodeImageVersion,
  deleteMachines,
  completeUpgrade,
  abortLatestOperation,
  list,
  $delete,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  AgentPoolsGetUpgradeProfileOptionalParams,
  AgentPoolsGetAvailableAgentPoolVersionsOptionalParams,
  AgentPoolsUpdateOptionalParams,
  AgentPoolsListBootstrapDataOptionalParams,
  AgentPoolsUpgradeNodeImageVersionOptionalParams,
  AgentPoolsDeleteMachinesOptionalParams,
  AgentPoolsCompleteUpgradeOptionalParams,
  AgentPoolsAbortLatestOperationOptionalParams,
  AgentPoolsListOptionalParams,
  AgentPoolsDeleteOptionalParams,
  AgentPoolsCreateOrUpdateOptionalParams,
  AgentPoolsGetOptionalParams,
} from "./options.js";
