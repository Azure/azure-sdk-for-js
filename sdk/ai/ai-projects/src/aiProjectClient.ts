// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createAIProject,
  AIProjectContext,
  AIProjectClientOptionalParams,
} from "./api/index.js";
import {
  RedTeamsOperations,
  _getRedTeamsOperations,
} from "./classic/redTeams/index.js";
import {
  DeploymentsOperations,
  _getDeploymentsOperations,
} from "./classic/deployments/index.js";
import {
  IndexesOperations,
  _getIndexesOperations,
} from "./classic/indexes/index.js";
import {
  DatasetsOperations,
  _getDatasetsOperations,
} from "./classic/datasets/index.js";
import {
  EvaluationsOperations,
  _getEvaluationsOperations,
} from "./classic/evaluations/index.js";
import {
  ConnectionsOperations,
  _getConnectionsOperations,
} from "./classic/connections/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

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
    this.redTeams = _getRedTeamsOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.indexes = _getIndexesOperations(this._client);
    this.datasets = _getDatasetsOperations(this._client);
    this.evaluations = _getEvaluationsOperations(this._client);
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
}
