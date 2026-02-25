// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable tsdoc/syntax */

import OpenAI from "openai";
import type { ClientOptions as OpenAIClientOptions } from "openai";
import { getBearerTokenProvider } from "@azure/identity";
import { createAIProject, AIProjectContext, AIProjectClientOptionalParams } from "./api/index.js";
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
import { TelemetryOperations, _getTelemetryOperations } from "./classic/telemetry/index.js";
import { TokenCredential } from "@azure/core-auth";
import { overwriteOpenAIClient } from "./overwriteOpenAIClient.js";
import { getCustomFetch } from "./getCustomFetch.js";
import { getOpenAIDefaultHeaders } from "./util.js";

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
 * @property {DeploymentsOperations} deployments - The operation groups for deployments
 * @property {IndexesOperations} indexes - The operation groups for indexes
 * @property {DatasetsOperations} datasets - The operation groups for datasets
 * @property {ConnectionsOperations} connections - The operation groups for connections
 * @property {AgentsOperations} agents - The operation groups for agents
 * @property {BetaOperations} beta - The operation groups for beta include beta features:
 * - Memory Stores
 * - Evaluators
 * - Evaluation Rules
 * - Evaluation Taxonomies
 * - Insights
 * - Schedules
 * - Red Teams
 * @property {TelemetryOperations} telemetry - The operation groups for telemetry
 * @property {getEndpointUrl} getEndpointUrl - gets the endpoint of the client
 * @property {getOpenAIClient} getOpenAIClient - gets the OpenAI client with optional OpenAI client options
 */
export class AIProjectClient {
  private _cognitiveScopeClient: AIProjectContext;
  private _azureScopeClient: AIProjectContext;
  private _endpoint: string;
  private _credential: TokenCredential;
  private _options: AIProjectClientOptionalParams;

  constructor(
    endpoint: string,
    credential: TokenCredential,
    options: AIProjectClientOptionalParams = {},
  ) {
    this._endpoint = endpoint;
    this._credential = credential;
    this._options = options;
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions ? `${prefixFromOptions}` : "";
    this._cognitiveScopeClient = createAIProject(endpoint, this._credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
      credentials: {
        ...options.credentials,
        scopes: ["https://ai.azure.com/.default"],
      },
    });
    this._azureScopeClient = createAIProject(endpoint, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });

    this.indexes = _getIndexesOperations(this._azureScopeClient);
    this.deployments = _getDeploymentsOperations(this._azureScopeClient);
    this.datasets = _getDatasetsOperations(this._azureScopeClient, this._options);
    this.connections = _getConnectionsOperations(this._azureScopeClient);
    this.evaluationRules = _getEvaluationRulesOperations(this._azureScopeClient);
    this.agents = _getAgentsOperations(this._azureScopeClient);
    this.beta = _getBetaOperations(this._cognitiveScopeClient);
    this.telemetry = _getTelemetryOperations(this.connections);
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
  /** The operation groups for beta include beta features:
   * - Memory Stores
   * - Evaluators
   * - Evaluation Rules
   * - Evaluation Taxonomies
   * - Insights
   * - Schedules
   * - Red Teams
   */
  public readonly beta: BetaOperations;
  /** The operation groups for telemetry */
  public readonly telemetry: TelemetryOperations;
  /**
   * gets the OpenAI client
   * @returns the OpenAI client
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public getOpenAIClient(opts?: OpenAIClientOptions): OpenAI {
    const scope = "https://ai.azure.com/.default";
    let customFetch: NonNullable<ConstructorParameters<typeof OpenAI>[0]>["fetch"];

    if (
      this._options.additionalPolicies?.find((policy) => policy.policy.name === "recording policy")
    ) {
      customFetch = getCustomFetch(this._azureScopeClient.pipeline, this._options.httpClient);
    }

    const defaultHeaders = getOpenAIDefaultHeaders(
      opts?.defaultHeaders,
      this._options?.userAgentOptions?.userAgentPrefix,
    );

    // Destructure opts to exclude defaultHeaders, then override specific properties
    const { defaultHeaders: _ignoredHeaders, ...restOpts } = opts || {};
    const openAIOptions: ConstructorParameters<typeof OpenAI>[0] = {
      ...restOpts,
      apiKey: getBearerTokenProvider(this._credential, scope),
      baseURL: `${this._endpoint}/openai`,
      defaultQuery: { "api-version": this._options?.apiVersion || "2025-11-15-preview" },
      dangerouslyAllowBrowser: true,
      defaultHeaders: defaultHeaders.toJSON({ preserveCase: true }),
      fetch: customFetch,
    };

    const openaiClient = new OpenAI(openAIOptions);
    return overwriteOpenAIClient(openaiClient);
  }
  /**
   * gets the endpoint of the client
   * @returns the endpoint of the client
   */
  public get endpoint(): string {
    return this._endpoint;
  }
}
