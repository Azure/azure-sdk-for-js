// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkspaceClientOptionalParams, WorkspaceContext, createWorkspace } from "./api/index.js";
import {
  ConversationsOperations,
  _getConversationsOperations,
} from "./classic/conversations/index.js";
import {
  InvestigationsOperations,
  _getInvestigationsOperations,
} from "./classic/investigations/index.js";
import { TasksOperations, _getTasksOperations } from "./classic/tasks/index.js";
import { ToolsOperations, _getToolsOperations } from "./classic/tools/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { WorkspaceClientOptionalParams } from "./api/workspaceContext.js";

export class WorkspaceClient {
  private _client: WorkspaceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: WorkspaceClientOptionalParams = {},
  ) {
    this._client = createWorkspace(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
    this.tasks = _getTasksOperations(this._client);
    this.tools = _getToolsOperations(this._client);
    this.conversations = _getConversationsOperations(this._client);
    this.investigations = _getInvestigationsOperations(this._client);
  }

  /** The operation groups for tasks */
  public readonly tasks: TasksOperations;
  /** The operation groups for tools */
  public readonly tools: ToolsOperations;
  /** The operation groups for conversations */
  public readonly conversations: ConversationsOperations;
  /** The operation groups for investigations */
  public readonly investigations: InvestigationsOperations;
}
