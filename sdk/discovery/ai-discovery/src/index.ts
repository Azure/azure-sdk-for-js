// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { WorkspaceClient } from "./workspace/workspaceClient.js";
export type { RestorePollerOptions as WorkspaceClientRestorePollerOptions } from "./workspace/restorePollerHelpers.js";
export { restorePoller as workspaceClientRestorePoller } from "./workspace/restorePollerHelpers.js";
export type {
  OperationState,
  PagedInvestigation,
  PagedWorkingMemoryEntry,
  PagedConversation,
  OperationStatusRunResultError,
  PagedOperation,
  RepeatabilityResult,
} from "./models/index.js";
export { KnownOperationState } from "./models/index.js";
export type {
  KnowledgeBase,
  StorageAssetReference,
  IndexingStatus,
  LastIndexingRun,
  IndexingMetrics,
  KnowledgeBaseOperationResponse,
  KnowledgeBaseOperationResponseUnion,
  KnowledgeBaseOperationType,
  KnowledgeBaseIndexingOperationResponse,
  IndexingOperationResult,
  KnowledgeBaseSearchOperationResponse,
  SearchResponse,
  SearchResultItem,
  Citation,
  CitationType,
  SearchRequest,
  KnowledgeBaseCreateOrUpdateContent,
} from "./models/microsoft/discovery/bookshelf/index.js";
export {
  KnownIndexingStatus,
  KnownKnowledgeBaseOperationType,
  KnownCitationType,
} from "./models/microsoft/discovery/bookshelf/index.js";
export type { ByType, Tag, ProvisioningState } from "./models/microsoft/discovery/common/index.js";
export { KnownByType, KnownProvisioningState } from "./models/microsoft/discovery/common/index.js";
export type {
  Investigation,
  InvestigationStatus,
  InvestigationOperationStatus,
  DiscoveryEngine,
  DiscoveryEngineStatus,
  WorkingMemoryEntry,
  WorkingMemoryEntryType,
  DiscoveryEngineUpdate,
  Conversation,
  RunResult,
  OutputDataUri,
  InlineFile,
  InputDataMount,
  StorageMountProtocol,
  OutputDataMount,
  InfraOverrides,
  Operation,
  RunStatus,
  ComputeUsage,
  SupercomputerUsage,
  NodepoolUsage,
  Task,
  TaskPriority,
  TaskAssignee,
  TaskComment,
  TaskStatus,
  ExecutionHistoryEntry,
  TaskResult,
  StartTaskRequest,
  TaskCreateOrUpdateContent,
  ConversationCreateOrUpdateContent,
  InvestigationCreateOrUpdateContent,
} from "./models/microsoft/discovery/workspace/index.js";
export {
  KnownInvestigationStatus,
  KnownDiscoveryEngineStatus,
  KnownWorkingMemoryEntryType,
  KnownStorageMountProtocol,
  KnownRunStatus,
  KnownTaskPriority,
  KnownTaskStatus,
} from "./models/microsoft/discovery/workspace/index.js";
export type { WorkspaceClientOptionalParams } from "./workspace/api/index.js";
export type {
  ConversationsListOptionalParams,
  ConversationsDeleteOptionalParams,
  ConversationsUpdateOptionalParams,
  ConversationsCreateOptionalParams,
  ConversationsGetOptionalParams,
} from "./workspace/api/conversations/index.js";
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
} from "./workspace/api/investigations/index.js";
export type {
  TasksAddExecutionHistoryOptionalParams,
  TasksAddCommentOptionalParams,
  TasksStartOptionalParams,
  TasksDeleteOptionalParams,
  TasksUpdateOptionalParams,
  TasksCreateOptionalParams,
  TasksListOptionalParams,
  TasksGetOptionalParams,
} from "./workspace/api/tasks/index.js";
export type {
  ToolsGetComputeUsageOptionalParams,
  ToolsGetOperationsOptionalParams,
  ToolsCancelRunOptionalParams,
  ToolsRunOptionalParams,
  ToolsGetRunStatusOptionalParams,
} from "./workspace/api/tools/index.js";
export type {
  ConversationsOperations,
  InvestigationsOperations,
  TasksOperations,
  ToolsOperations,
} from "./workspace/classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
export { BookshelfClient } from "./bookshelf/bookshelfClient.js";
export type { RestorePollerOptions as BookshelfClientRestorePollerOptions } from "./bookshelf/restorePollerHelpers.js";
export { restorePoller as bookshelfClientRestorePoller } from "./bookshelf/restorePollerHelpers.js";
export type { BookshelfClientOptionalParams } from "./bookshelf/api/index.js";
export type {
  KnowledgeBasesDeleteOptionalParams,
  KnowledgeBasesSearchOptionalParams,
  KnowledgeBasesCancelIndexingOptionalParams,
  KnowledgeBasesStartIndexingOptionalParams,
  KnowledgeBasesGetOperationStatusOptionalParams,
  KnowledgeBasesListOptionalParams,
  KnowledgeBasesGetOptionalParams,
  KnowledgeBasesCreateOrUpdateOptionalParams,
} from "./bookshelf/api/knowledgeBases/index.js";
export type { KnowledgeBasesOperations } from "./bookshelf/classic/index.js";
