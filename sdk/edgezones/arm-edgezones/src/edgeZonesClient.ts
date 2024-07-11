// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getExtendedZonesOperations,
  ExtendedZonesOperations,
} from "./classic/extendedZones/index.js";
import {
  createEdgeZones,
  EdgeZonesClientOptionalParams,
  EdgeZonesContext,
} from "./api/index.js";

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
      : "azsdk-js-client";

    this._client = createEdgeZones(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.extendedZones = getExtendedZonesOperations(
      this._client,
      subscriptionId,
    );
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for ExtendedZones */
  public readonly extendedZones: ExtendedZonesOperations;
}
