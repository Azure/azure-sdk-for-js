// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable tsdoc/syntax */

import { AgentsClient } from "@azure/ai-agents";
import { createAIProject, AIProjectContext, AIProjectClientOptionalParams } from "./api/index.js";
import { DeploymentsOperations, _getDeploymentsOperations } from "./classic/deployments/index.js";
import { IndexesOperations, _getIndexesOperations } from "./classic/indexes/index.js";
import { DatasetsOperations, _getDatasetsOperations } from "./classic/datasets/index.js";
import { ConnectionsOperations, _getConnectionsOperations } from "./classic/connections/index.js";
import { InferenceOperations, _getInferenceOperations } from "./classic/inference/index.js";
import { TelemetryOperations, _getTelemetryOperations } from "./classic/telemetry/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

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
 * @property {InferenceOperations} inference - The operation groups for inference
 * @property {TelemetryOperations} telemetry - The operation groups for telemetry
 */
export class AIProjectClient {
  private _cognitiveScopeClient: AIProjectContext;
  private _azureScopeClient: AIProjectContext;
  private _endpoint: string;
  private _credential: TokenCredential;
  private _agents: AgentsClient | undefined;
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
    this._cognitiveScopeClient = createAIProject(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });

    this._azureScopeClient = createAIProject(endpointParam, credential, {
      ...options,
      credentials: {
        ...options.credentials,
        scopes: ["https://ai.azure.com/.default"],
      },
      userAgentOptions: { userAgentPrefix },
    });

    this.pipeline = this._cognitiveScopeClient.pipeline;
    this.deployments = _getDeploymentsOperations(this._azureScopeClient);
    this.indexes = _getIndexesOperations(this._azureScopeClient);
    this.datasets = _getDatasetsOperations(this._azureScopeClient, this._options);
    this.connections = _getConnectionsOperations(this._azureScopeClient);
    this.inference = _getInferenceOperations(this._cognitiveScopeClient, this.connections);
    this.telemetry = _getTelemetryOperations(this.connections);
  }

  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for indexes */
  public readonly indexes: IndexesOperations;
  /** The operation groups for datasets */
  public readonly datasets: DatasetsOperations;
  /** The operation groups for connections */
  public readonly connections: ConnectionsOperations;
  /** The operation groups for inference */
  public readonly inference: InferenceOperations;
  /** The operation groups for telemetry */
  public readonly telemetry: TelemetryOperations;
  /**
   * gets the endpoint of the client
   * @returns the endpoint of the client
   */
  public getEndpointUrl(): string {
    return this._endpoint;
  }

  /**
   * Creates a new instance of AzureAIProjectClient
   * @param endpoint - The endpoint to use
   * @param credential - The credential to use
   * @param options - The parameter for all optional parameters
   */
  static fromEndpoint(
    endpoint: string,
    credential: TokenCredential,
    options: AIProjectClientOptionalParams = {},
  ): AIProjectClient {
    return new AIProjectClient(endpoint, credential, options);
  }

  /**
   * Get the AgentsClient associated with this AIProjectClient.
   *
   * @returns The AgentsClient associated with this AIProjectClient
   */
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-subclients
  public get agents(): AgentsClient {
    const { apiVersion, ...clientOptions } = this._options;

    if (!this._agents) {
      this._agents = new AgentsClient(this._endpoint, this._credential, {
        ...clientOptions,
        userAgentOptions: this._cognitiveScopeClient.getUserAgent(),
      });
    }
    return this._agents;
  }
}
