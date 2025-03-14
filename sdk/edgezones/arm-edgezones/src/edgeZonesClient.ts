// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  _getExtendedZonesOperations,
  ExtendedZonesOperations,
} from "./classic/extendedZones/index.js";
import { _getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import { createEdgeZones, EdgeZonesContext, EdgeZonesClientOptionalParams } from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { EdgeZonesClientOptionalParams } from "./api/edgeZonesContext.js";

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
