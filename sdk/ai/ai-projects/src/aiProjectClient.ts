// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createAIProject, AIProjectContext, AIProjectClientOptionalParams } from "./api/index.js";
import { AgentsOperations, _getAgentsOperations } from "./classic/agents/index.js";
import { ConnectionsOperations, _getConnectionsOperations } from "./classic/connections/index.js";
import { DatasetsOperations, _getDatasetsOperations } from "./classic/datasets/index.js";
import { DeploymentsOperations, _getDeploymentsOperations } from "./classic/deployments/index.js";
import {
  EvaluationRulesOperations,
  _getEvaluationRulesOperations,
} from "./classic/evaluationRules/index.js";
import {
  EvaluationTaxonomiesOperations,
  _getEvaluationTaxonomiesOperations,
} from "./classic/evaluationTaxonomies/index.js";
import { EvaluatorsOperations, _getEvaluatorsOperations } from "./classic/evaluators/index.js";
import { IndexesOperations, _getIndexesOperations } from "./classic/indexes/index.js";
import { InsightsOperations, _getInsightsOperations } from "./classic/insights/index.js";
import {
  MemoryStoresOperations,
  _getMemoryStoresOperations,
} from "./classic/memoryStores/index.js";
import { RedTeamsOperations, _getRedTeamsOperations } from "./classic/redTeams/index.js";
import { SchedulesOperations, _getSchedulesOperations } from "./classic/schedules/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { AIProjectClientOptionalParams } from "./api/aiProjectContext.js";

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
    this.schedules = _getSchedulesOperations(this._client);
    this.insights = _getInsightsOperations(this._client);
    this.evaluators = _getEvaluatorsOperations(this._client);
    this.evaluationTaxonomies = _getEvaluationTaxonomiesOperations(this._client);
    this.evaluationRules = _getEvaluationRulesOperations(this._client);
    this.redTeams = _getRedTeamsOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.indexes = _getIndexesOperations(this._client);
    this.datasets = _getDatasetsOperations(this._client);
    this.connections = _getConnectionsOperations(this._client);
    this.memoryStores = _getMemoryStoresOperations(this._client);
    this.agents = _getAgentsOperations(this._client);
  }

  /** The operation groups for schedules */
  public readonly schedules: SchedulesOperations;
  /** The operation groups for insights */
  public readonly insights: InsightsOperations;
  /** The operation groups for evaluators */
  public readonly evaluators: EvaluatorsOperations;
  /** The operation groups for evaluationTaxonomies */
  public readonly evaluationTaxonomies: EvaluationTaxonomiesOperations;
  /** The operation groups for evaluationRules */
  public readonly evaluationRules: EvaluationRulesOperations;
  /** The operation groups for redTeams */
  public readonly redTeams: RedTeamsOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for indexes */
  public readonly indexes: IndexesOperations;
  /** The operation groups for datasets */
  public readonly datasets: DatasetsOperations;
  /** The operation groups for connections */
  public readonly connections: ConnectionsOperations;
  /** The operation groups for memoryStores */
  public readonly memoryStores: MemoryStoresOperations;
  /** The operation groups for agents */
  public readonly agents: AgentsOperations;
}
