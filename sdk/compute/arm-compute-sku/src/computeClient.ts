// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext, ComputeClientOptionalParams } from "./api/index.js";
import { createCompute } from "./api/index.js";
import type { ResourceSkusOperations } from "./classic/resourceSkus/index.js";
import { _getResourceSkusOperations } from "./classic/resourceSkus/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeClientOptionalParams } from "./api/computeContext.js";

export class ComputeClient {
  private _client: ComputeContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Compute Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCompute(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.resourceSkus = _getResourceSkusOperations(this._client);
  }

  /** The operation groups for resourceSkus */
  public readonly resourceSkus: ResourceSkusOperations;
}
