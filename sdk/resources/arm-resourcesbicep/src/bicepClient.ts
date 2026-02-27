// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BicepContext, BicepClientOptionalParams } from "./api/index.js";
import { createBicep } from "./api/index.js";
import type {
  DecompileOperationGroupOperations} from "./classic/decompileOperationGroup/index.js";
import {
  _getDecompileOperationGroupOperations,
} from "./classic/decompileOperationGroup/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { BicepClientOptionalParams } from "./api/bicepContext.js";

export class BicepClient {
  private _client: BicepContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Bicep Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: BicepClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBicep(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.decompileOperationGroup = _getDecompileOperationGroupOperations(this._client);
  }

  /** The operation groups for decompileOperationGroup */
  public readonly decompileOperationGroup: DecompileOperationGroupOperations;
}
