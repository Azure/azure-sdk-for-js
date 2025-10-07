// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext, ContainerServiceClientOptionalParams } from "./api/index.js";
import { createContainerService } from "./api/index.js";
import type { NodeCustomizationsOperations } from "./classic/nodeCustomizations/index.js";
import { _getNodeCustomizationsOperations } from "./classic/nodeCustomizations/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ContainerServiceClientOptionalParams } from "./api/containerServiceContext.js";

export class ContainerServiceClient {
  private _client: ContainerServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Kubernetes Node Customization api client. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ContainerServiceClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContainerService(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.nodeCustomizations = _getNodeCustomizationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for nodeCustomizations */
  public readonly nodeCustomizations: NodeCustomizationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
