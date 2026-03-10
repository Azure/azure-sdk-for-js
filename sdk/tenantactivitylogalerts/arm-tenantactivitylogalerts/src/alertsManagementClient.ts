// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext, AlertsManagementClientOptionalParams } from "./api/index.js";
import { createAlertsManagement } from "./api/index.js";
import type { TenantActivityLogAlertsOperations } from "./classic/tenantActivityLogAlerts/index.js";
import { _getTenantActivityLogAlertsOperations } from "./classic/tenantActivityLogAlerts/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AlertsManagementClientOptionalParams } from "./api/alertsManagementContext.js";

export class AlertsManagementClient {
  private _client: AlertsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Tenant Level Activity Log Alert Rules provides rules creation on management group level. */
  constructor(credential: TokenCredential, options: AlertsManagementClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAlertsManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.tenantActivityLogAlerts = _getTenantActivityLogAlertsOperations(this._client);
  }

  /** The operation groups for tenantActivityLogAlerts */
  public readonly tenantActivityLogAlerts: TenantActivityLogAlertsOperations;
}
