// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext, AIProjectClientOptionalParams } from "./api/index.js";
import { createAIProject } from "./api/index.js";
import type { AgentsOperations } from "./classic/agents/index.js";
import { _getAgentsOperations } from "./classic/agents/index.js";
import type { BetaOperations } from "./classic/beta/index.js";
import { _getBetaOperations } from "./classic/beta/index.js";
import type { ConnectionsOperations } from "./classic/connections/index.js";
import { _getConnectionsOperations } from "./classic/connections/index.js";
import type { DatasetsOperations } from "./classic/datasets/index.js";
import { _getDatasetsOperations } from "./classic/datasets/index.js";
import type { DeploymentsOperations } from "./classic/deployments/index.js";
import { _getDeploymentsOperations } from "./classic/deployments/index.js";
import type { EvaluationRulesOperations } from "./classic/evaluationRules/index.js";
import { _getEvaluationRulesOperations } from "./classic/evaluationRules/index.js";
import type { IndexesOperations } from "./classic/indexes/index.js";
import { _getIndexesOperations } from "./classic/indexes/index.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AIProjectClientOptionalParams } from "./api/aiProjectContext.js";

export class AIProjectClient {
  private _client: AIProjectContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
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
