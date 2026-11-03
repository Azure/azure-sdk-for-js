// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AlertProcessingRulesManagementContext,
  AlertProcessingRulesManagementClientOptionalParams,
} from "./api/index.js";
import { createAlertProcessingRulesManagement } from "./api/index.js";
import type { AlertProcessingRulesOperations } from "./classic/alertProcessingRules/index.js";
import { _getAlertProcessingRulesOperations } from "./classic/alertProcessingRules/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AlertProcessingRulesManagementClientOptionalParams } from "./api/alertProcessingRulesManagementContext.js";

export class AlertProcessingRulesManagementClient {
  private _client: AlertProcessingRulesManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** APIs for Azure alert processing rules CRUD operations. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AlertProcessingRulesManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAlertProcessingRulesManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.alertProcessingRules = _getAlertProcessingRulesOperations(this._client);
  }

  /** The operation groups for alertProcessingRules */
  public readonly alertProcessingRules: AlertProcessingRulesOperations;
}
