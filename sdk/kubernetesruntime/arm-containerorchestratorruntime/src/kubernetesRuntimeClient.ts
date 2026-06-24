// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KubernetesRuntimeContext,
  KubernetesRuntimeClientOptionalParams,
  createKubernetesRuntime,
} from "./api/index.js";
import { BgpPeersOperations, _getBgpPeersOperations } from "./classic/bgpPeers/index.js";
import {
  LoadBalancersOperations,
  _getLoadBalancersOperations,
} from "./classic/loadBalancers/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { ServicesOperations, _getServicesOperations } from "./classic/services/index.js";
import {
  StorageClassOperations,
  _getStorageClassOperations,
} from "./classic/storageClass/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { KubernetesRuntimeClientOptionalParams } from "./api/kubernetesRuntimeContext.js";

export class KubernetesRuntimeClient {
  private _client: KubernetesRuntimeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options: KubernetesRuntimeClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKubernetesRuntime(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.services = _getServicesOperations(this._client);
    this.bgpPeers = _getBgpPeersOperations(this._client);
    this.loadBalancers = _getLoadBalancersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.storageClass = _getStorageClassOperations(this._client);
  }

  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for bgpPeers */
  public readonly bgpPeers: BgpPeersOperations;
  /** The operation groups for loadBalancers */
  public readonly loadBalancers: LoadBalancersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for storageClass */
  public readonly storageClass: StorageClassOperations;
}
