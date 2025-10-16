// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ComputeManagementContext,
  ComputeManagementClientOptionalParams,
} from "./api/index.js";
import { createComputeManagement } from "./api/index.js";
import type { ResourceSkusOperations } from "./classic/resourceSkus/index.js";
import { _getResourceSkusOperations } from "./classic/resourceSkus/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeManagementClientOptionalParams } from "./api/computeManagementContext.js";

export class ComputeManagementClient {
  private _client: ComputeManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Compute Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.resourceSkus = _getResourceSkusOperations(this._client);
  }

  /** The operation groups for resourceSkus */
  public readonly resourceSkus: ResourceSkusOperations;
}
