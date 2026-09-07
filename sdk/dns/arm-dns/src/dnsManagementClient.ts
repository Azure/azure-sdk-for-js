// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsManagementContext, DnsManagementClientOptionalParams } from "./api/index.js";
import { createDnsManagement } from "./api/index.js";
import type { DnsResourceReferenceOperations } from "./classic/dnsResourceReference/index.js";
import { _getDnsResourceReferenceOperations } from "./classic/dnsResourceReference/index.js";
import type { DnssecConfigsOperations } from "./classic/dnssecConfigs/index.js";
import { _getDnssecConfigsOperations } from "./classic/dnssecConfigs/index.js";
import type { RecordSetsOperations } from "./classic/recordSets/index.js";
import { _getRecordSetsOperations } from "./classic/recordSets/index.js";
import type { ZonesOperations } from "./classic/zones/index.js";
import { _getZonesOperations } from "./classic/zones/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DnsManagementClientOptionalParams } from "./api/dnsManagementContext.js";

export class DnsManagementClient {
  private _client: DnsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The DNS Management Client. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DnsManagementClientOptionalParams = {},
  ) {
    this._client = createDnsManagement(credential, subscriptionId, options);
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
