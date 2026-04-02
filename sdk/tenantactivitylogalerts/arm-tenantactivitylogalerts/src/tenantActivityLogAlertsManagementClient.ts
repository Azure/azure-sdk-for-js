// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TenantActivityLogAlertsManagementContext,
  TenantActivityLogAlertsManagementClientOptionalParams,
} from "./api/index.js";
import { createTenantActivityLogAlertsManagement } from "./api/index.js";
import type { TenantActivityLogAlertsOperations } from "./classic/tenantActivityLogAlerts/index.js";
import { _getTenantActivityLogAlertsOperations } from "./classic/tenantActivityLogAlerts/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { TenantActivityLogAlertsManagementClientOptionalParams } from "./api/tenantActivityLogAlertsManagementContext.js";

export class TenantActivityLogAlertsManagementClient {
  private _client: TenantActivityLogAlertsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Tenant Level Activity Log Alert Rules provides rules creation on management group level. */
  constructor(
    credential: TokenCredential,
    options: TenantActivityLogAlertsManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createTenantActivityLogAlertsManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.tenantActivityLogAlerts = _getTenantActivityLogAlertsOperations(this._client);
  }

  /** The operation groups for tenantActivityLogAlerts */
  public readonly tenantActivityLogAlerts: TenantActivityLogAlertsOperations;
}
