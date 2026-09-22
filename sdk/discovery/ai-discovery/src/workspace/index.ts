// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { WorkspaceClient } from "./workspaceClient.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type { WorkspaceContext, WorkspaceClientOptionalParams } from "./api/index.js";
export type {
  ConversationsListOptionalParams,
  ConversationsDeleteOptionalParams,
  ConversationsUpdateOptionalParams,
  ConversationsCreateOptionalParams,
  ConversationsGetOptionalParams,
} from "./api/conversations/index.js";
export type {
  InvestigationsUpdateDiscoveryEngineOptionalParams,
  InvestigationsStopDiscoveryEngineOptionalParams,
  InvestigationsStartDiscoveryEngineOptionalParams,
  InvestigationsGetDiscoveryEngineMemoryOptionalParams,
  InvestigationsGetDiscoveryEngineOptionalParams,
  InvestigationsListOptionalParams,
  InvestigationsDeleteOptionalParams,
  InvestigationsUpdateOptionalParams,
  InvestigationsCreateOrReplaceOptionalParams,
  InvestigationsGetOperationStatusOptionalParams,
  InvestigationsGetOptionalParams,
} from "./api/investigations/index.js";
export type {
  TasksAddExecutionHistoryOptionalParams,
  TasksAddCommentOptionalParams,
  TasksStartOptionalParams,
  TasksDeleteOptionalParams,
  TasksUpdateOptionalParams,
  TasksCreateOptionalParams,
  TasksListOptionalParams,
  TasksGetOptionalParams,
} from "./api/tasks/index.js";
export type {
  ToolsGetComputeUsageOptionalParams,
  ToolsGetOperationsOptionalParams,
  ToolsCancelRunOptionalParams,
  ToolsRunOptionalParams,
  ToolsGetRunStatusOptionalParams,
} from "./api/tools/index.js";
export type {
  ConversationsOperations,
  InvestigationsOperations,
  TasksOperations,
  ToolsOperations,
} from "./classic/index.js";
