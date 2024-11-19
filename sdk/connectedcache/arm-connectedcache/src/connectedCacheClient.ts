// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getEnterpriseCustomerOperationsOperations,
  EnterpriseCustomerOperationsOperations,
} from "./classic/enterpriseCustomerOperations/index.js";
import {
  getCacheNodesOperationsOperations,
  CacheNodesOperationsOperations,
} from "./classic/cacheNodesOperations/index.js";
import {
  getIspCustomersOperations,
  IspCustomersOperations,
} from "./classic/ispCustomers/index.js";
import {
  getIspCacheNodesOperationsOperations,
  IspCacheNodesOperationsOperations,
} from "./classic/ispCacheNodesOperations/index.js";
import {
  getEnterpriseMccCustomersOperations,
  EnterpriseMccCustomersOperations,
} from "./classic/enterpriseMccCustomers/index.js";
import {
  getEnterpriseMccCacheNodesOperationsOperations,
  EnterpriseMccCacheNodesOperationsOperations,
} from "./classic/enterpriseMccCacheNodesOperations/index.js";
import {
  createConnectedCache,
  ConnectedCacheContext,
  ConnectedCacheClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ConnectedCacheClientOptionalParams } from "./api/connectedCacheContext.js";

export class ConnectedCacheClient {
  private _client: ConnectedCacheContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Connected Cache Rest Api version 2023-05-01-preview */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ConnectedCacheClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createConnectedCache(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.enterpriseCustomerOperations =
      getEnterpriseCustomerOperationsOperations(this._client, subscriptionId);
    this.cacheNodesOperations = getCacheNodesOperationsOperations(
      this._client,
      subscriptionId,
    );
    this.ispCustomers = getIspCustomersOperations(this._client, subscriptionId);
    this.ispCacheNodesOperations = getIspCacheNodesOperationsOperations(
      this._client,
      subscriptionId,
    );
    this.enterpriseMccCustomers = getEnterpriseMccCustomersOperations(
      this._client,
      subscriptionId,
    );
    this.enterpriseMccCacheNodesOperations =
      getEnterpriseMccCacheNodesOperationsOperations(
        this._client,
        subscriptionId,
      );
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for EnterpriseCustomerOperations */
  public readonly enterpriseCustomerOperations: EnterpriseCustomerOperationsOperations;
  /** The operation groups for CacheNodesOperations */
  public readonly cacheNodesOperations: CacheNodesOperationsOperations;
  /** The operation groups for IspCustomers */
  public readonly ispCustomers: IspCustomersOperations;
  /** The operation groups for IspCacheNodesOperations */
  public readonly ispCacheNodesOperations: IspCacheNodesOperationsOperations;
  /** The operation groups for EnterpriseMccCustomers */
  public readonly enterpriseMccCustomers: EnterpriseMccCustomersOperations;
  /** The operation groups for EnterpriseMccCacheNodesOperations */
  public readonly enterpriseMccCacheNodesOperations: EnterpriseMccCacheNodesOperationsOperations;
}
