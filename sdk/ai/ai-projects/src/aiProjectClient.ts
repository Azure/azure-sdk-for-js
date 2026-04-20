// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable tsdoc/syntax */

import OpenAI from "openai";
import { getBearerTokenProvider } from "@azure/identity";
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
import type { TelemetryOperations } from "./classic/telemetry/index.js";
import { _getTelemetryOperations } from "./classic/telemetry/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { overwriteOpenAIClient } from "./overwriteOpenAIClient.js";
import { getCustomFetch } from "./getCustomFetch.js";
import { getOpenAIDefaultHeaders } from "./util.js";
import type { OpenAIClientOptionsWithAzureAgent } from "./azureAgent.interface.js";
import { KnownApiVersions } from "./models/models.js";

export type { AIProjectClientOptionalParams } from "./api/aiProjectContext.js";

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
 * - Evaluation Taxonomies
 * - Insights
 * - Schedules
 * - Red Teams
 * - Toolboxes
 * - agents
 * - skills
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
   * - Evaluation Taxonomies
   * - Insights
   * - Schedules
   * - Red Teams
   * - Toolboxes
   * - agents
   * - skills
   */
  public readonly beta: BetaOperations;
  /** The operation groups for telemetry */
  public readonly telemetry: TelemetryOperations;
  /**
   * gets the OpenAI client
   * @returns the OpenAI client
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
  public getOpenAIClient(optsWithAzureAgent?: OpenAIClientOptionsWithAzureAgent): OpenAI {
    const scope = "https://ai.azure.com/.default";
    const { azureConfig, ...opts } = optsWithAzureAgent || {};
    let customFetch: NonNullable<ConstructorParameters<typeof OpenAI>[0]>["fetch"];

    if (
      this._options.additionalPolicies?.find((policy) => policy.policy.name === "recording policy")
    ) {
      customFetch = getCustomFetch(this._azureScopeClient.pipeline, this._options.httpClient);
    }

    let baseURL: string;
    if (opts?.baseURL) {
      baseURL = opts.baseURL;
    } else if (azureConfig?.agentName) {
      if (!azureConfig.allowPreview) {
        throw new Error(
          "Calling `getOpenAIClient` with an `agentName` requires you to set `allowPreview: true`" +
            "\nwhen providing azureConfig. Note that preview features are under development and " +
            "\nsubject to change. They should not be used in production environments.",
        );
      }
      baseURL = `${this._endpoint}/agents/${azureConfig.agentName}/endpoint/protocols/openai`;
    } else {
      baseURL = `${this._endpoint}/openai/v1`;
    }

    const defaultHeaders = getOpenAIDefaultHeaders(
      opts?.defaultHeaders,
      this._options?.userAgentOptions?.userAgentPrefix,
    );

    // When targeting an agent endpoint, add the foundry-features header if not already set
    if (azureConfig?.agentName && !defaultHeaders.has("foundry-features")) {
      defaultHeaders.set("foundry-features", "HostedAgents=V1Preview,AgentEndpoints=V1Preview");
    }

    // When targeting an agent endpoint, add api-version to defaultQuery if not already present
    const defaultQuery = {
      ...(opts?.defaultQuery || {}),
    };
    if (azureConfig?.agentName && !defaultQuery["api-version"]) {
      defaultQuery["api-version"] = this._options.apiVersion ?? KnownApiVersions.v1;
    }

    // Destructure opts to exclude defaultHeaders, baseURL, and defaultQuery, then override specific properties
    const {
      defaultHeaders: _ignoredHeaders,
      baseURL: _ignoredBaseURL,
      defaultQuery: _ignoredQuery,
      ...restOpts
    } = opts || {};
    const openAIOptions: ConstructorParameters<typeof OpenAI>[0] = {
      ...restOpts,
      apiKey: getBearerTokenProvider(this._credential, scope),
      baseURL,
      dangerouslyAllowBrowser: true,
      defaultHeaders: defaultHeaders.toJSON({ preserveCase: true }),
      defaultQuery: Object.keys(defaultQuery).length > 0 ? defaultQuery : undefined,
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
