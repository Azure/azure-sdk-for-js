// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PrivateDnsManagementContext,
  PrivateDnsManagementClientOptionalParams,
} from "./api/index.js";
import { createPrivateDnsManagement } from "./api/index.js";
import type { PrivateZonesOperations } from "./classic/privateZones/index.js";
import { _getPrivateZonesOperations } from "./classic/privateZones/index.js";
import type { RecordSetsOperations } from "./classic/recordSets/index.js";
import { _getRecordSetsOperations } from "./classic/recordSets/index.js";
import type { VirtualNetworkLinksOperations } from "./classic/virtualNetworkLinks/index.js";
import { _getVirtualNetworkLinksOperations } from "./classic/virtualNetworkLinks/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { PrivateDnsManagementClientOptionalParams } from "./api/privateDnsManagementContext.js";

export class PrivateDnsManagementClient {
  private _client: PrivateDnsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Private DNS Management Client. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PrivateDnsManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPrivateDnsManagement(credential, subscriptionId, {
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
