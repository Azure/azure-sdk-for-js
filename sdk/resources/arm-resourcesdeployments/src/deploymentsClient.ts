// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeploymentsContext,
  DeploymentsClientOptionalParams,
  createDeployments,
} from "./api/index.js";
import {
  DeploymentOperationsOperations,
  _getDeploymentOperationsOperations,
} from "./classic/deploymentOperations/index.js";
import { DeploymentsOperations, _getDeploymentsOperations } from "./classic/deployments/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DeploymentsClientOptionalParams } from "./api/deploymentsContext.js";

export class DeploymentsClient {
  private _client: DeploymentsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: DeploymentsClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: DeploymentsClientOptionalParams,
  );
  /** Provides operations for working with deployments. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | DeploymentsClientOptionalParams,
    options?: DeploymentsClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDeployments(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.deploymentOperations = _getDeploymentOperationsOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
  }

  /** The operation groups for deploymentOperations */
  public readonly deploymentOperations: DeploymentOperationsOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
}
