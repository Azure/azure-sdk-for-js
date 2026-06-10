// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConnectedKubernetesContext,
  ConnectedKubernetesClientOptionalParams,
} from "./api/index.js";
import { createConnectedKubernetes } from "./api/index.js";
import type { ConnectedClusterOperations } from "./classic/connectedCluster/index.js";
import { _getConnectedClusterOperations } from "./classic/connectedCluster/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ConnectedKubernetesClientOptionalParams } from "./api/connectedKubernetesContext.js";

export class ConnectedKubernetesClient {
  private _client: ConnectedKubernetesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: ConnectedKubernetesClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: ConnectedKubernetesClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | ConnectedKubernetesClientOptionalParams,
    options?: ConnectedKubernetesClientOptionalParams,
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
    this._client = createConnectedKubernetes(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.connectedCluster = _getConnectedClusterOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for connectedCluster */
  public readonly connectedCluster: ConnectedClusterOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
