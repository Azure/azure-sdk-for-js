// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MicrosoftAlertRulesIncidentsIncident,
  _MicrosoftAlertRulesIncidentsIncidentListResult,
} from "../../models/microsoft/alertRulesIncidents/models.js";
import {
  microsoftAlertRulesIncidentsIncidentDeserializer,
  microsoftAlertRulesIncidentsErrorResponseDeserializer,
  _microsoftAlertRulesIncidentsIncidentListResultDeserializer,
} from "../../models/microsoft/alertRulesIncidents/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertRuleIncidentsListByAlertRuleOptionalParams,
  AlertRuleIncidentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAlertRuleSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: AlertRuleIncidentsListByAlertRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/alertrules/{ruleName}/incidents{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2016-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByAlertRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<_MicrosoftAlertRulesIncidentsIncidentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftAlertRulesIncidentsIncidentListResultDeserializer(result.body);
}

/** Gets a list of incidents associated to an alert rule */
export function listByAlertRule(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: AlertRuleIncidentsListByAlertRuleOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftAlertRulesIncidentsIncident> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAlertRuleSend(context, resourceGroupName, ruleName, options),
    _listByAlertRuleDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2016-03-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  incidentName: string,
  options: AlertRuleIncidentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/microsoft.insights/alertrules/{ruleName}/incidents/{incidentName}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      incidentName: incidentName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2016-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftAlertRulesIncidentsIncident> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftAlertRulesIncidentsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftAlertRulesIncidentsIncidentDeserializer(result.body);
}

/** Gets an incident associated to an alert rule */
export async function get(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  incidentName: string,
  options: AlertRuleIncidentsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftAlertRulesIncidentsIncident> {
  const result = await _getSend(context, resourceGroupName, ruleName, incidentName, options);
  return _getDeserialize(result);
}
