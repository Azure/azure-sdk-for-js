// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext } from "../../api/costManagementContext.js";
import { listExternal, list, dismiss, get } from "../../api/alerts/operations.js";
import {
  AlertsListExternalOptionalParams,
  AlertsListOptionalParams,
  AlertsDismissOptionalParams,
  AlertsGetOptionalParams,
} from "../../api/alerts/options.js";
import {
  Alert,
  DismissAlertPayload,
  AlertsResult,
  ExternalCloudProviderType,
} from "../../models/models.js";

/** Interface representing a Alerts operations. */
export interface AlertsOperations {
  /** Lists the Alerts for external cloud provider type defined. */
  listExternal: (
    externalCloudProviderType: ExternalCloudProviderType,
    externalCloudProviderId: string,
    options?: AlertsListExternalOptionalParams,
  ) => Promise<AlertsResult>;
  /** Lists the alerts for scope defined. */
  list: (scope: string, options?: AlertsListOptionalParams) => Promise<AlertsResult>;
  /** Dismisses the specified alert */
  dismiss: (
    scope: string,
    alertId: string,
    parameters: DismissAlertPayload,
    options?: AlertsDismissOptionalParams,
  ) => Promise<Alert>;
  /** Gets the alert for the scope by alert ID. */
  get: (scope: string, alertId: string, options?: AlertsGetOptionalParams) => Promise<Alert>;
}

function _getAlerts(context: CostManagementContext) {
  return {
    listExternal: (
      externalCloudProviderType: ExternalCloudProviderType,
      externalCloudProviderId: string,
      options?: AlertsListExternalOptionalParams,
    ) => listExternal(context, externalCloudProviderType, externalCloudProviderId, options),
    list: (scope: string, options?: AlertsListOptionalParams) => list(context, scope, options),
    dismiss: (
      scope: string,
      alertId: string,
      parameters: DismissAlertPayload,
      options?: AlertsDismissOptionalParams,
    ) => dismiss(context, scope, alertId, parameters, options),
    get: (scope: string, alertId: string, options?: AlertsGetOptionalParams) =>
      get(context, scope, alertId, options),
  };
}

export function _getAlertsOperations(context: CostManagementContext): AlertsOperations {
  return {
    ..._getAlerts(context),
  };
}
