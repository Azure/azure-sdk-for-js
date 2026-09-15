// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppContext, AppClientOptionalParams } from "./api/index.js";
import { createApp } from "./api/index.js";
import type { AgentSpacesOperations } from "./classic/agentSpaces/index.js";
import { _getAgentSpacesOperations } from "./classic/agentSpaces/index.js";
import type { AgentSpacesConnectorsOperations } from "./classic/agentSpacesConnectors/index.js";
import { _getAgentSpacesConnectorsOperations } from "./classic/agentSpacesConnectors/index.js";
import type { AgentsOperations } from "./classic/agents/index.js";
import { _getAgentsOperations } from "./classic/agents/index.js";
import type { AgentsConnectorsOperations } from "./classic/agentsConnectors/index.js";
import { _getAgentsConnectorsOperations } from "./classic/agentsConnectors/index.js";
import type { SupportedAgentModelsOperations } from "./classic/supportedAgentModels/index.js";
import { _getSupportedAgentModelsOperations } from "./classic/supportedAgentModels/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AppClientOptionalParams } from "./api/appContext.js";

export class AppClient {
  private _client: AppContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.App Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AppClientOptionalParams = {},
  ) {
    this._client = createApp(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.supportedAgentModels = _getSupportedAgentModelsOperations(this._client);
    this.agentSpacesConnectors = _getAgentSpacesConnectorsOperations(this._client);
    this.agentSpaces = _getAgentSpacesOperations(this._client);
    this.agentsConnectors = _getAgentsConnectorsOperations(this._client);
    this.agents = _getAgentsOperations(this._client);
  }

  /** The operation groups for supportedAgentModels */
  public readonly supportedAgentModels: SupportedAgentModelsOperations;
  /** The operation groups for agentSpacesConnectors */
  public readonly agentSpacesConnectors: AgentSpacesConnectorsOperations;
  /** The operation groups for agentSpaces */
  public readonly agentSpaces: AgentSpacesOperations;
  /** The operation groups for agentsConnectors */
  public readonly agentsConnectors: AgentsConnectorsOperations;
  /** The operation groups for agents */
  public readonly agents: AgentsOperations;
}
