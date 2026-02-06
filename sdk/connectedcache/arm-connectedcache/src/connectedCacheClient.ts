// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectedCacheContext, ConnectedCacheClientOptionalParams } from "./api/index.js";
import { createConnectedCache } from "./api/index.js";
import type { EnterpriseMccCacheNodesOperationsOperations } from "./classic/enterpriseMccCacheNodesOperations/index.js";
import { _getEnterpriseMccCacheNodesOperationsOperations } from "./classic/enterpriseMccCacheNodesOperations/index.js";
import type { EnterpriseMccCustomersOperations } from "./classic/enterpriseMccCustomers/index.js";
import { _getEnterpriseMccCustomersOperations } from "./classic/enterpriseMccCustomers/index.js";
import type { IspCacheNodesOperationsOperations } from "./classic/ispCacheNodesOperations/index.js";
import { _getIspCacheNodesOperationsOperations } from "./classic/ispCacheNodesOperations/index.js";
import type { IspCustomersOperations } from "./classic/ispCustomers/index.js";
import { _getIspCustomersOperations } from "./classic/ispCustomers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
    this._client = createConnectedCache(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.enterpriseMccCacheNodesOperations = _getEnterpriseMccCacheNodesOperationsOperations(
      this._client,
    );
    this.enterpriseMccCustomers = _getEnterpriseMccCustomersOperations(this._client);
    this.ispCacheNodesOperations = _getIspCacheNodesOperationsOperations(this._client);
    this.ispCustomers = _getIspCustomersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for enterpriseMccCacheNodesOperations */
  public readonly enterpriseMccCacheNodesOperations: EnterpriseMccCacheNodesOperationsOperations;
  /** The operation groups for enterpriseMccCustomers */
  public readonly enterpriseMccCustomers: EnterpriseMccCustomersOperations;
  /** The operation groups for ispCacheNodesOperations */
  public readonly ispCacheNodesOperations: IspCacheNodesOperationsOperations;
  /** The operation groups for ispCustomers */
  public readonly ispCustomers: IspCustomersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
