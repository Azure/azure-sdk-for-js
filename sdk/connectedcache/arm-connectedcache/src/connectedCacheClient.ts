// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConnectedCacheContext,
  ConnectedCacheClientOptionalParams,
  createConnectedCache,
} from "./api/index.js";
import {
  EnterpriseMccCacheNodesOperationsOperations,
  _getEnterpriseMccCacheNodesOperationsOperations,
} from "./classic/enterpriseMccCacheNodesOperations/index.js";
import {
  EnterpriseMccCustomersOperations,
  _getEnterpriseMccCustomersOperations,
} from "./classic/enterpriseMccCustomers/index.js";
import {
  IspCacheNodesOperationsOperations,
  _getIspCacheNodesOperationsOperations,
} from "./classic/ispCacheNodesOperations/index.js";
import {
  IspCustomersOperations,
  _getIspCustomersOperations,
} from "./classic/ispCustomers/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ConnectedCacheClientOptionalParams } from "./api/connectedCacheContext.js";

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
