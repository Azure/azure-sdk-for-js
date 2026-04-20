// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { listByAlertRule, get } from "../../api/alertRuleIncidents/operations.js";
import type {
  AlertRuleIncidentsListByAlertRuleOptionalParams,
  AlertRuleIncidentsGetOptionalParams,
} from "../../api/alertRuleIncidents/options.js";
import type { MicrosoftAlertRulesIncidentsIncident } from "../../models/microsoft/alertRulesIncidents/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AlertRuleIncidents operations. */
export interface AlertRuleIncidentsOperations {
  /** Gets a list of incidents associated to an alert rule */
  listByAlertRule: (
    resourceGroupName: string,
    ruleName: string,
    options?: AlertRuleIncidentsListByAlertRuleOptionalParams,
  ) => PagedAsyncIterableIterator<MicrosoftAlertRulesIncidentsIncident>;
  /** Gets an incident associated to an alert rule */
  get: (
    resourceGroupName: string,
    ruleName: string,
    incidentName: string,
    options?: AlertRuleIncidentsGetOptionalParams,
  ) => Promise<MicrosoftAlertRulesIncidentsIncident>;
}

function _getAlertRuleIncidents(context: MonitorContext) {
  return {
    listByAlertRule: (
      resourceGroupName: string,
      ruleName: string,
      options?: AlertRuleIncidentsListByAlertRuleOptionalParams,
    ) => listByAlertRule(context, resourceGroupName, ruleName, options),
    get: (
      resourceGroupName: string,
      ruleName: string,
      incidentName: string,
      options?: AlertRuleIncidentsGetOptionalParams,
    ) => get(context, resourceGroupName, ruleName, incidentName, options),
  };
}

export function _getAlertRuleIncidentsOperations(
  context: MonitorContext,
): AlertRuleIncidentsOperations {
  return {
    ..._getAlertRuleIncidents(context),
  };
}
