// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageClassOperations } from "./classic/storageClass/index.js";
import { getStorageClassOperations } from "./classic/storageClass/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { getOperationsOperations } from "./classic/operations/index.js";
import type {
  LoadBalancersOperations} from "./classic/loadBalancers/index.js";
import {
  getLoadBalancersOperations
} from "./classic/loadBalancers/index.js";
import type { BgpPeersOperations } from "./classic/bgpPeers/index.js";
import { getBgpPeersOperations } from "./classic/bgpPeers/index.js";
import type { ServicesOperations } from "./classic/services/index.js";
import { getServicesOperations } from "./classic/services/index.js";
import type {
  KubernetesRuntimeContext,
  KubernetesRuntimeClientOptionalParams} from "./api/index.js";
import {
  createKubernetesRuntime
} from "./api/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { KubernetesRuntimeClientOptionalParams } from "./api/kubernetesRuntimeContext.js";

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
