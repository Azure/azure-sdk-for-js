// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  getUpgradeProfile,
  getAvailableAgentPoolVersions,
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
