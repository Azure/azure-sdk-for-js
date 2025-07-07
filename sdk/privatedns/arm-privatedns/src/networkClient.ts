// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createNetwork, NetworkContext, NetworkClientOptionalParams } from "./api/index.js";
import {
  VirtualNetworkLinksOperations,
  _getVirtualNetworkLinksOperations,
} from "./classic/virtualNetworkLinks/index.js";
import {
  PrivateZonesOperations,
  _getPrivateZonesOperations,
} from "./classic/privateZones/index.js";
import { RecordSetsOperations, _getRecordSetsOperations } from "./classic/recordSets/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { NetworkClientOptionalParams } from "./api/networkContext.js";

export class NetworkClient {
  private _client: NetworkContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Private DNS Management Client. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: NetworkClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNetwork(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.virtualNetworkLinks = _getVirtualNetworkLinksOperations(this._client);
    this.privateZones = _getPrivateZonesOperations(this._client);
    this.recordSets = _getRecordSetsOperations(this._client);
  }

  /** The operation groups for virtualNetworkLinks */
  public readonly virtualNetworkLinks: VirtualNetworkLinksOperations;
  /** The operation groups for privateZones */
  public readonly privateZones: PrivateZonesOperations;
  /** The operation groups for recordSets */
  public readonly recordSets: RecordSetsOperations;
}
