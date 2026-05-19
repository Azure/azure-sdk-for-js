// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext, AIProjectClientOptionalParams, createAIProject } from "./api/index.js";
import { AgentsOperations, _getAgentsOperations } from "./classic/agents/index.js";
import { BetaOperations, _getBetaOperations } from "./classic/beta/index.js";
import { ConnectionsOperations, _getConnectionsOperations } from "./classic/connections/index.js";
import { DatasetsOperations, _getDatasetsOperations } from "./classic/datasets/index.js";
import { DeploymentsOperations, _getDeploymentsOperations } from "./classic/deployments/index.js";
import {
  EvaluationRulesOperations,
  _getEvaluationRulesOperations,
} from "./classic/evaluationRules/index.js";
import { IndexesOperations, _getIndexesOperations } from "./classic/indexes/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AIProjectClientOptionalParams } from "./api/aiProjectContext.js";

export class AIProjectClient {
  private _client: AIProjectContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: AIProjectClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAIProject(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.indexes = _getIndexesOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.datasets = _getDatasetsOperations(this._client);
    this.connections = _getConnectionsOperations(this._client);
    this.evaluationRules = _getEvaluationRulesOperations(this._client);
    this.agents = _getAgentsOperations(this._client);
    this.beta = _getBetaOperations(this._client);
  }

  /** The operation groups for indexes */
  public readonly indexes: IndexesOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for datasets */
  public readonly datasets: DatasetsOperations;
  /** The operation groups for connections */
  public readonly connections: ConnectionsOperations;
  /** The operation groups for evaluationRules */
  public readonly evaluationRules: EvaluationRulesOperations;
  /** The operation groups for agents */
  public readonly agents: AgentsOperations;
  /** The operation groups for beta */
  public readonly beta: BetaOperations;
}
