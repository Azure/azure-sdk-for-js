// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createSpatio, SpatioContext, SpatioClientOptionalParams } from "./api/index.js";
import { GeoCatalogsOperations, _getGeoCatalogsOperations } from "./classic/geoCatalogs/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { SpatioClientOptionalParams } from "./api/spatioContext.js";

export class SpatioClient {
  private _client: SpatioContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Planetary Computer Pro Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: SpatioClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSpatio(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.geoCatalogs = _getGeoCatalogsOperations(this._client);
  }

  /** The operation groups for geoCatalogs */
  public readonly geoCatalogs: GeoCatalogsOperations;
}
