// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createAIProject, AIProjectContext, AIProjectClientOptionalParams } from "./api/index.js";
import { RedTeamsOperations, _getRedTeamsOperations } from "./classic/redTeams/index.js";
import { DeploymentsOperations, _getDeploymentsOperations } from "./classic/deployments/index.js";
import { IndexesOperations, _getIndexesOperations } from "./classic/indexes/index.js";
import { DatasetsOperations, _getDatasetsOperations } from "./classic/datasets/index.js";
import { EvaluationsOperations, _getEvaluationsOperations } from "./classic/evaluations/index.js";
import { ConnectionsOperations, _getConnectionsOperations } from "./classic/connections/index.js";
import { InferenceOperations, _getInferenceOperations } from "./classic/inference/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";

export { AIProjectClientOptionalParams } from "./api/aiProjectContext.js";

export class AIProjectClient {
  private _client: AIProjectContext;
  private _endpoint: string;
  private _credential: KeyCredential | TokenCredential;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: AIProjectClientOptionalParams = {},
  ) {
    this._endpoint = endpointParam;
    this._credential = credential;
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAIProject(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.redTeams = _getRedTeamsOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.indexes = _getIndexesOperations(this._client);
    this.datasets = _getDatasetsOperations(this._client);
    this.evaluations = _getEvaluationsOperations(this._client);
    this.inference = _getInferenceOperations(this._client);
    this.connections = _getConnectionsOperations(this._client);
  }

  /** The operation groups for redTeams */
  public readonly redTeams: RedTeamsOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for indexes */
  public readonly indexes: IndexesOperations;
  /** The operation groups for datasets */
  public readonly datasets: DatasetsOperations;
  /** The operation groups for evaluations */
  public readonly evaluations: EvaluationsOperations;
  /** The operation groups for connections */
  public readonly connections: ConnectionsOperations;
  /** The operation groups for inference */
  public readonly inference: InferenceOperations;

  /**
   * gets the endpoint of the client
   * @returns the endpoint of the client
   */
  public getEndpointUrl(): string {
    return this._endpoint;
  }

  /**
   * gets the credential of the client
   * @returns the credential of the client
   */
  public getCredential(): KeyCredential | TokenCredential {
    return this._credential;
  }

  /**
   * Creates a new instance of AzureAIProjectClient
   * @param endpoint - The endpoint to use
   * @param credential - The credential to use
   * @param options - The parameter for all optional parameters
   */
  static fromEndpoint(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: AIProjectClientOptionalParams = {},
  ): AIProjectClient {
    return new AIProjectClient(endpoint, credential, options);
  }
}
