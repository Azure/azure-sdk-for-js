// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext, AgentsClientOptionalParams, createAgents } from "./api/index.js";
import {
  createThreadAndRun,
  deleteAgent,
  updateAgent,
  getAgent,
  listAgents,
  createAgent,
} from "./api/operations.js";
import {
  CreateThreadAndRunOptionalParams,
  DeleteAgentOptionalParams,
  UpdateAgentOptionalParams,
  GetAgentOptionalParams,
  ListAgentsOptionalParams,
  CreateAgentOptionalParams,
} from "./api/options.js";
import { FilesOperations, _getFilesOperations } from "./classic/files/index.js";
import { MessagesOperations, _getMessagesOperations } from "./classic/messages/index.js";
import { RunStepsOperations, _getRunStepsOperations } from "./classic/runSteps/index.js";
import { RunsOperations, _getRunsOperations } from "./classic/runs/index.js";
import { ThreadsOperations, _getThreadsOperations } from "./classic/threads/index.js";
import {
  VectorStoreFileBatchesOperations,
  _getVectorStoreFileBatchesOperations,
} from "./classic/vectorStoreFileBatches/index.js";
import {
  VectorStoreFilesOperations,
  _getVectorStoreFilesOperations,
} from "./classic/vectorStoreFiles/index.js";
import {
  VectorStoresOperations,
  _getVectorStoresOperations,
} from "./classic/vectorStores/index.js";
import { Agent, AgentDeletionStatus, ThreadRun } from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AgentsClientOptionalParams } from "./api/agentsContext.js";

export class AgentsClient {
  private _client: AgentsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: AgentsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAgents(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.vectorStoreFileBatches = _getVectorStoreFileBatchesOperations(this._client);
    this.vectorStoreFiles = _getVectorStoreFilesOperations(this._client);
    this.vectorStores = _getVectorStoresOperations(this._client);
    this.files = _getFilesOperations(this._client);
    this.runSteps = _getRunStepsOperations(this._client);
    this.runs = _getRunsOperations(this._client);
    this.messages = _getMessagesOperations(this._client);
    this.threads = _getThreadsOperations(this._client);
  }

  /** Creates a new agent thread and immediately starts a run using that new thread. */
  createThreadAndRun(
    assistantId: string,
    options: CreateThreadAndRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return createThreadAndRun(this._client, assistantId, options);
  }

  /** Deletes an agent. */
  deleteAgent(
    assistantId: string,
    options: DeleteAgentOptionalParams = { requestOptions: {} },
  ): Promise<AgentDeletionStatus> {
    return deleteAgent(this._client, assistantId, options);
  }

  /** Modifies an existing agent. */
  updateAgent(
    assistantId: string,
    options: UpdateAgentOptionalParams = { requestOptions: {} },
  ): Promise<Agent> {
    return updateAgent(this._client, assistantId, options);
  }

  /** Retrieves an existing agent. */
  getAgent(
    assistantId: string,
    options: GetAgentOptionalParams = { requestOptions: {} },
  ): Promise<Agent> {
    return getAgent(this._client, assistantId, options);
  }

  /** Gets a list of agents that were previously created. */
  listAgents(
    options: ListAgentsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Agent> {
    return listAgents(this._client, options);
  }

  /** Creates a new agent. */
  createAgent(
    model: string,
    options: CreateAgentOptionalParams = { requestOptions: {} },
  ): Promise<Agent> {
    return createAgent(this._client, model, options);
  }

  /** The operation groups for vectorStoreFileBatches */
  public readonly vectorStoreFileBatches: VectorStoreFileBatchesOperations;
  /** The operation groups for vectorStoreFiles */
  public readonly vectorStoreFiles: VectorStoreFilesOperations;
  /** The operation groups for vectorStores */
  public readonly vectorStores: VectorStoresOperations;
  /** The operation groups for files */
  public readonly files: FilesOperations;
  /** The operation groups for runSteps */
  public readonly runSteps: RunStepsOperations;
  /** The operation groups for runs */
  public readonly runs: RunsOperations;
  /** The operation groups for messages */
  public readonly messages: MessagesOperations;
  /** The operation groups for threads */
  public readonly threads: ThreadsOperations;
}
