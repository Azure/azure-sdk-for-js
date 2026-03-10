// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext, AlertsManagementClientOptionalParams } from "./api/index.js";
import { createAlertsManagement } from "./api/index.js";
import type { PrometheusRuleGroupsOperations } from "./classic/prometheusRuleGroups/index.js";
import { _getPrometheusRuleGroupsOperations } from "./classic/prometheusRuleGroups/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AlertsManagementClientOptionalParams } from "./api/alertsManagementContext.js";

export class AlertsManagementClient {
  private _client: AlertsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Alerts Management Service provides a single pane of glass of alerts across Azure Monitor. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AlertsManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAlertsManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.prometheusRuleGroups = _getPrometheusRuleGroupsOperations(this._client);
  }

  /** The operation groups for prometheusRuleGroups */
  public readonly prometheusRuleGroups: PrometheusRuleGroupsOperations;
}
