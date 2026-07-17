// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext, ContainerServiceClientOptionalParams } from "./api/index.js";
import { createContainerService } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PreparedImageSpecificationsOperations } from "./classic/preparedImageSpecifications/index.js";
import { _getPreparedImageSpecificationsOperations } from "./classic/preparedImageSpecifications/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ContainerServiceClientOptionalParams } from "./api/containerServiceContext.js";

export class ContainerServiceClient {
  private _client: ContainerServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Kubernetes Prepared Image Specification api client. */
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
    this.preparedImageSpecifications = _getPreparedImageSpecificationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for preparedImageSpecifications */
  public readonly preparedImageSpecifications: PreparedImageSpecificationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
