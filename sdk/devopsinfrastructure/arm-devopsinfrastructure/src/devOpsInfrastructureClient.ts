// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import { getPoolsOperations, PoolsOperations } from "./classic/pools/index.js";
import {
  getResourceDetailsOperations,
  ResourceDetailsOperations,
} from "./classic/resourceDetails/index.js";
import { getSkuOperations, SkuOperations } from "./classic/sku/index.js";
import {
  getSubscriptionUsagesOperations,
  SubscriptionUsagesOperations,
} from "./classic/subscriptionUsages/index.js";
import {
  getImageVersionsOperations,
  ImageVersionsOperations,
} from "./classic/imageVersions/index.js";
import {
  createDevOpsInfrastructure,
  DevOpsInfrastructureContext,
  DevOpsInfrastructureClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { DevOpsInfrastructureClientOptionalParams } from "./api/devOpsInfrastructureContext.js";

export class DevOpsInfrastructureClient {
  private _client: DevOpsInfrastructureContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DevOpsInfrastructureClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDevOpsInfrastructure(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.pools = getPoolsOperations(this._client, subscriptionId);
    this.resourceDetails = getResourceDetailsOperations(this._client, subscriptionId);
    this.sku = getSkuOperations(this._client, subscriptionId);
    this.subscriptionUsages = getSubscriptionUsagesOperations(this._client, subscriptionId);
    this.imageVersions = getImageVersionsOperations(this._client, subscriptionId);
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for Pools */
  public readonly pools: PoolsOperations;
  /** The operation groups for ResourceDetails */
  public readonly resourceDetails: ResourceDetailsOperations;
  /** The operation groups for Sku */
  public readonly sku: SkuOperations;
  /** The operation groups for SubscriptionUsages */
  public readonly subscriptionUsages: SubscriptionUsagesOperations;
  /** The operation groups for ImageVersions */
  public readonly imageVersions: ImageVersionsOperations;
}
