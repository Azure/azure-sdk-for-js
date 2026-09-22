// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PreviewAlertRuleManagementContext,
  PreviewAlertRuleManagementClientOptionalParams,
} from "./api/index.js";
import { createPreviewAlertRuleManagement } from "./api/index.js";
import { previewAlertRule } from "./api/operations.js";
import type { PreviewAlertRuleOptionalParams } from "./api/options.js";
import type { PreviewAlertRuleRequest, PreviewAlertRuleResponse } from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { PreviewAlertRuleManagementClientOptionalParams } from "./api/previewAlertRuleManagementContext.js";

export class PreviewAlertRuleManagementClient {
  private _client: PreviewAlertRuleManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Preview Alert Rule API provides the ability to retrieve the results of a simulated historical execution of an alert rule */
  constructor(
    credential: TokenCredential,
    options: PreviewAlertRuleManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPreviewAlertRuleManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Retrieves the results of a simulated historical execution of an alert rule */
  previewAlertRule(
    resourceId: string,
    parameters: PreviewAlertRuleRequest,
    options: PreviewAlertRuleOptionalParams = { requestOptions: {} },
  ): Promise<PreviewAlertRuleResponse> {
    return previewAlertRule(this._client, resourceId, parameters, options);
  }
}
