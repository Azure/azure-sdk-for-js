// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext, ComputeLimitClientOptionalParams } from "./api/index.js";
import { createComputeLimit } from "./api/index.js";
import type { GuestSubscriptionsOperations } from "./classic/guestSubscriptions/index.js";
import { _getGuestSubscriptionsOperations } from "./classic/guestSubscriptions/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SharedLimitsOperations } from "./classic/sharedLimits/index.js";
import { _getSharedLimitsOperations } from "./classic/sharedLimits/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ComputeLimitClientOptionalParams } from "./api/computeLimitContext.js";

export class ComputeLimitClient {
  private _client: ComputeLimitContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft Azure Compute Limit Resource Provider. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ComputeLimitClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createComputeLimit(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.sharedLimits = _getSharedLimitsOperations(this._client);
    this.guestSubscriptions = _getGuestSubscriptionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for sharedLimits */
  public readonly sharedLimits: SharedLimitsOperations;
  /** The operation groups for guestSubscriptions */
  public readonly guestSubscriptions: GuestSubscriptionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
