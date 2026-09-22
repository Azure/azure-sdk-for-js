// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AlertsManagementContext,
  AlertsManagementClientOptionalParams,
  createAlertsManagement,
} from "./api/index.js";
import { AlertsOperations, _getAlertsOperations } from "./classic/alerts/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { AlertsManagementClientOptionalParams } from "./api/alertsManagementContext.js";

export class AlertsManagementClient {
  private _client: AlertsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Alerts Management Service provides a single pane of glass of alerts across Azure Monitor. */
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
    this.alerts = _getAlertsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for alerts */
  public readonly alerts: AlertsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
