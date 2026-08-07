// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext, ContainerServiceClientOptionalParams } from "./api/index.js";
import { createContainerService } from "./api/index.js";
import type { AIManagerNamespacesOperations } from "./classic/aiManagerNamespaces/index.js";
import { _getAIManagerNamespacesOperations } from "./classic/aiManagerNamespaces/index.js";
import type { AIManagersOperations } from "./classic/aiManagers/index.js";
import { _getAIManagersOperations } from "./classic/aiManagers/index.js";
import type { AIModelsOperations } from "./classic/aiModels/index.js";
import { _getAIModelsOperations } from "./classic/aiModels/index.js";
import type { ModelDeploymentsOperations } from "./classic/modelDeployments/index.js";
import { _getModelDeploymentsOperations } from "./classic/modelDeployments/index.js";
import type { ModelSourcesOperations } from "./classic/modelSources/index.js";
import { _getModelSourcesOperations } from "./classic/modelSources/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ContainerServiceClientOptionalParams } from "./api/containerServiceContext.js";

export class ContainerServiceClient {
  private _client: ContainerServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Kubernetes AI Manager api client. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ContainerServiceClientOptionalParams = {},
  ) {
    this._client = createContainerService(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.modelDeployments = _getModelDeploymentsOperations(this._client);
    this.modelSources = _getModelSourcesOperations(this._client);
    this.aiModels = _getAIModelsOperations(this._client);
    this.aiManagerNamespaces = _getAIManagerNamespacesOperations(this._client);
    this.aiManagers = _getAIManagersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for modelDeployments */
  public readonly modelDeployments: ModelDeploymentsOperations;
  /** The operation groups for modelSources */
  public readonly modelSources: ModelSourcesOperations;
  /** The operation groups for aiModels */
  public readonly aiModels: AIModelsOperations;
  /** The operation groups for aiManagerNamespaces */
  public readonly aiManagerNamespaces: AIManagerNamespacesOperations;
  /** The operation groups for aiManagers */
  public readonly aiManagers: AIManagersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
