// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesContext, EdgeZonesClientOptionalParams, createEdgeZones } from "./api/index.js";
import {
  ExtendedZonesOperations,
  _getExtendedZonesOperations,
} from "./classic/extendedZones/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { EdgeZonesClientOptionalParams } from "./api/edgeZonesContext.js";

export class EdgeZonesClient {
  private _client: EdgeZonesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: EdgeZonesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createEdgeZones(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.extendedZones = _getExtendedZonesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for extendedZones */
  public readonly extendedZones: ExtendedZonesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
