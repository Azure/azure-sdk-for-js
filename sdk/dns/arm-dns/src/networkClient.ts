// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createNetwork, NetworkContext, NetworkClientOptionalParams } from "./api/index.js";
import {
  DnsResourceReferenceOperations,
  _getDnsResourceReferenceOperations,
} from "./classic/dnsResourceReference/index.js";
import { ZonesOperations, _getZonesOperations } from "./classic/zones/index.js";
import { RecordSetsOperations, _getRecordSetsOperations } from "./classic/recordSets/index.js";
import {
  DnssecConfigsOperations,
  _getDnssecConfigsOperations,
} from "./classic/dnssecConfigs/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { NetworkClientOptionalParams } from "./api/networkContext.js";

export class NetworkClient {
  private _client: NetworkContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The DNS Management Client. */
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
    this.dnsResourceReference = _getDnsResourceReferenceOperations(this._client);
    this.zones = _getZonesOperations(this._client);
    this.recordSets = _getRecordSetsOperations(this._client);
    this.dnssecConfigs = _getDnssecConfigsOperations(this._client);
  }

  /** The operation groups for dnsResourceReference */
  public readonly dnsResourceReference: DnsResourceReferenceOperations;
  /** The operation groups for zones */
  public readonly zones: ZonesOperations;
  /** The operation groups for recordSets */
  public readonly recordSets: RecordSetsOperations;
  /** The operation groups for dnssecConfigs */
  public readonly dnssecConfigs: DnssecConfigsOperations;
}
