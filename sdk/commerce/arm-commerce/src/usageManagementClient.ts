// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UsageManagementContext, UsageManagementClientOptionalParams } from "./api/index.js";
import { createUsageManagement } from "./api/index.js";
import type { RateCardOperations } from "./classic/rateCard/index.js";
import { _getRateCardOperations } from "./classic/rateCard/index.js";
import type { UsageAggregatesOperations } from "./classic/usageAggregates/index.js";
import { _getUsageAggregatesOperations } from "./classic/usageAggregates/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { UsageManagementClientOptionalParams } from "./api/usageManagementContext.js";

export class UsageManagementClient {
  private _client: UsageManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: UsageManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createUsageManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.rateCard = _getRateCardOperations(this._client);
    this.usageAggregates = _getUsageAggregatesOperations(this._client);
  }

  /** The operation groups for rateCard */
  public readonly rateCard: RateCardOperations;
  /** The operation groups for usageAggregates */
  public readonly usageAggregates: UsageAggregatesOperations;
}
