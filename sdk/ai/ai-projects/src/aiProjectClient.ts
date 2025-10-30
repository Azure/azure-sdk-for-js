// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable tsdoc/syntax */

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

/**
 * The main client for the AIProjectClient service. It provides access to the various operations available in the service.
 * @class AIProjectClient
 * @extends {AIProjectContext}
 * @description The main client for the AIProjectClient
 * @constructor
 * @param {string} endpoint - The endpoint to use
 * @param {TokenCredential} credential - The credential to use
 * @param {AIProjectClientOptionalParams} [options] - Optional parameters for the client.
 * @property {RedTeamsOperations} redTeams - The operation groups for redTeams
 * @property {DeploymentsOperations} deployments - The operation groups for deployments
 * @property {IndexesOperations} indexes - The operation groups for indexes
 * @property {DatasetsOperations} datasets - The operation groups for datasets
 * @property {ConnectionsOperations} connections - The operation groups for connections
 * @property {MemoryStoresOperations} memoryStores - The operation groups for memoryStores
 * @property {AgentsOperations} agents - The operation groups for agents
 */
export class AIProjectClient {
  private _cognitiveScopeClient: AIProjectContext;
  private _azureScopeClient: AIProjectContext;
  private _endpoint: string;
  private _credential: TokenCredential;
  private _options: AIProjectClientOptionalParams;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: AIProjectClientOptionalParams = {},
  ) {
    this._endpoint = endpointParam;
    this._credential = credential;
    this._options = options;
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._cognitiveScopeClient = createAIProject(endpointParam, this._credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
      credentials: {
        ...options.credentials,
        scopes: ["https://ai.azure.com/.default"],
      },
    });
    this._azureScopeClient = createAIProject(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });

    this.pipeline = this._cognitiveScopeClient.pipeline;
    this.schedules = _getSchedulesOperations(this._cognitiveScopeClient);
    this.insights = _getInsightsOperations(this._cognitiveScopeClient);
    this.evaluators = _getEvaluatorsOperations(this._cognitiveScopeClient);
    this.evaluationTaxonomies = _getEvaluationTaxonomiesOperations(this._cognitiveScopeClient);
    this.evaluationRules = _getEvaluationRulesOperations(this._cognitiveScopeClient);
    this.redTeams = _getRedTeamsOperations(this._cognitiveScopeClient);
    this.deployments = _getDeploymentsOperations(this._azureScopeClient);
    this.indexes = _getIndexesOperations(this._azureScopeClient);
    this.datasets = _getDatasetsOperations(this._azureScopeClient, this._options);
    this.connections = _getConnectionsOperations(this._azureScopeClient);
    this.memoryStores = _getMemoryStoresOperations(this._cognitiveScopeClient);
    this.agents = _getAgentsOperations(this._azureScopeClient);
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
  /**
   * gets the endpoint of the client
   * @returns the endpoint of the client
   */
  public getEndpointUrl(): string {
    return this._endpoint;
  }
}
