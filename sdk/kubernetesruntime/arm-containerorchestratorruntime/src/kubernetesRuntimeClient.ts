// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getStorageClassOperations, StorageClassOperations } from "./classic/storageClass/index.js";
import { getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  getLoadBalancersOperations,
  LoadBalancersOperations,
} from "./classic/loadBalancers/index.js";
import { getBgpPeersOperations, BgpPeersOperations } from "./classic/bgpPeers/index.js";
import { getServicesOperations, ServicesOperations } from "./classic/services/index.js";
import {
  createKubernetesRuntime,
  KubernetesRuntimeContext,
  KubernetesRuntimeClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { KubernetesRuntimeClientOptionalParams } from "./api/kubernetesRuntimeContext.js";

export class KubernetesRuntimeClient {
  private _client: KubernetesRuntimeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options: KubernetesRuntimeClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : "azsdk-js-client";
    this._client = createKubernetesRuntime(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.storageClass = getStorageClassOperations(this._client);
    this.operations = getOperationsOperations(this._client);
    this.loadBalancers = getLoadBalancersOperations(this._client);
    this.bgpPeers = getBgpPeersOperations(this._client);
    this.services = getServicesOperations(this._client);
  }

  /** The operation groups for StorageClass */
  public readonly storageClass: StorageClassOperations;
  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for LoadBalancers */
  public readonly loadBalancers: LoadBalancersOperations;
  /** The operation groups for BgpPeers */
  public readonly bgpPeers: BgpPeersOperations;
  /** The operation groups for Services */
  public readonly services: ServicesOperations;
}
