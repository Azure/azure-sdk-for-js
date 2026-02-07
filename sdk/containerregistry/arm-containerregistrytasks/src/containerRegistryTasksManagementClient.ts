// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContainerRegistryTasksManagementContext,
  ContainerRegistryTasksManagementClientOptionalParams,
} from "./api/index.js";
import { createContainerRegistryTasksManagement } from "./api/index.js";
import type { AgentPoolsOperations } from "./classic/agentPools/index.js";
import { _getAgentPoolsOperations } from "./classic/agentPools/index.js";
import type { RegistriesOperations } from "./classic/registries/index.js";
import { _getRegistriesOperations } from "./classic/registries/index.js";
import type { RunsOperations } from "./classic/runs/index.js";
import { _getRunsOperations } from "./classic/runs/index.js";
import type { TaskRunsOperations } from "./classic/taskRuns/index.js";
import { _getTaskRunsOperations } from "./classic/taskRuns/index.js";
import type { TasksOperations } from "./classic/tasks/index.js";
import { _getTasksOperations } from "./classic/tasks/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ContainerRegistryTasksManagementClientOptionalParams } from "./api/containerRegistryTasksManagementContext.js";

export class ContainerRegistryTasksManagementClient {
  private _client: ContainerRegistryTasksManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Microsoft Azure Container Registry management API provides create, read, update, and delete functionality for Azure Container Registry resources including registries, replications, webhooks, tasks, runs, and other registry components. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ContainerRegistryTasksManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContainerRegistryTasksManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.registries = _getRegistriesOperations(this._client);
    this.tasks = _getTasksOperations(this._client);
    this.taskRuns = _getTaskRunsOperations(this._client);
    this.runs = _getRunsOperations(this._client);
    this.agentPools = _getAgentPoolsOperations(this._client);
  }

  /** The operation groups for registries */
  public readonly registries: RegistriesOperations;
  /** The operation groups for tasks */
  public readonly tasks: TasksOperations;
  /** The operation groups for taskRuns */
  public readonly taskRuns: TaskRunsOperations;
  /** The operation groups for runs */
  public readonly runs: RunsOperations;
  /** The operation groups for agentPools */
  public readonly agentPools: AgentPoolsOperations;
}
