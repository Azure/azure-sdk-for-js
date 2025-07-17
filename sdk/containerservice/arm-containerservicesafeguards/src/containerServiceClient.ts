// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createContainerService,
  ContainerServiceContext,
  ContainerServiceClientOptionalParams,
} from "./api/index.js";
import {
  DeploymentSafeguardsOperations,
  _getDeploymentSafeguardsOperations,
} from "./classic/deploymentSafeguards/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ContainerServiceClientOptionalParams } from "./api/containerServiceContext.js";

export class ContainerServiceClient {
  private _client: ContainerServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Kubernetes Service Deployment Safeguards API Client. */
  constructor(credential: TokenCredential, options: ContainerServiceClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContainerService(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.deploymentSafeguards = _getDeploymentSafeguardsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for deploymentSafeguards */
  public readonly deploymentSafeguards: DeploymentSafeguardsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
