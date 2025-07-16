// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createKubernetes,
  KubernetesContext,
  KubernetesClientOptionalParams,
} from "./api/index.js";
import {
  ConnectedClusterOperations,
  _getConnectedClusterOperations,
} from "./classic/connectedCluster/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { KubernetesClientOptionalParams } from "./api/kubernetesContext.js";

export class KubernetesClient {
  private _client: KubernetesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Connected Cluster Resource Provider API for onboarding a Kubernetes Cluster to Azure Arc */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: KubernetesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKubernetes(credential, subscriptionId, {
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
