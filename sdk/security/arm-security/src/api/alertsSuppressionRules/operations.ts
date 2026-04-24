// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type {
  AlertsSuppressionRulesAPIAlertsSuppressionRule,
  _AlertsSuppressionRulesAPIAlertsSuppressionRulesList,
} from "../../models/alertsSuppressionRulesAPI/models.js";
import {
  alertsSuppressionRulesAPIAlertsSuppressionRuleSerializer,
  alertsSuppressionRulesAPIAlertsSuppressionRuleDeserializer,
  _alertsSuppressionRulesAPIAlertsSuppressionRulesListDeserializer,
} from "../../models/alertsSuppressionRulesAPI/models.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertsSuppressionRulesListOptionalParams,
  AlertsSuppressionRulesDeleteOptionalParams,
  AlertsSuppressionRulesUpdateOptionalParams,
  AlertsSuppressionRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AlertsSuppressionRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/alertsSuppressionRules{?api%2Dversion,AlertType}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2019-01-01-preview",
      AlertType: options?.alertType,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertsSuppressionRulesAPIAlertsSuppressionRulesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _alertsSuppressionRulesAPIAlertsSuppressionRulesListDeserializer(result.body);
}

/** List of all the dismiss rules for the given subscription */
export function list(
  context: Client,
  options: AlertsSuppressionRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertsSuppressionRulesAPIAlertsSuppressionRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-01-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  alertsSuppressionRuleName: string,
  options: AlertsSuppressionRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/alertsSuppressionRules/{alertsSuppressionRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      alertsSuppressionRuleName: alertsSuppressionRuleName,
      "api%2Dversion": "2019-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete dismiss alert rule for this subscription. */
export async function $delete(
  context: Client,
  alertsSuppressionRuleName: string,
  options: AlertsSuppressionRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, alertsSuppressionRuleName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  alertsSuppressionRuleName: string,
  alertsSuppressionRule: AlertsSuppressionRulesAPIAlertsSuppressionRule,
  options: AlertsSuppressionRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/alertsSuppressionRules/{alertsSuppressionRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      alertsSuppressionRuleName: alertsSuppressionRuleName,
      "api%2Dversion": "2019-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: alertsSuppressionRulesAPIAlertsSuppressionRuleSerializer(alertsSuppressionRule),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertsSuppressionRulesAPIAlertsSuppressionRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return alertsSuppressionRulesAPIAlertsSuppressionRuleDeserializer(result.body);
}

/** Update existing rule or create new rule if it doesn't exist */
export async function update(
  context: Client,
  alertsSuppressionRuleName: string,
  alertsSuppressionRule: AlertsSuppressionRulesAPIAlertsSuppressionRule,
  options: AlertsSuppressionRulesUpdateOptionalParams = { requestOptions: {} },
): Promise<AlertsSuppressionRulesAPIAlertsSuppressionRule> {
  const result = await _updateSend(
    context,
    alertsSuppressionRuleName,
    alertsSuppressionRule,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  alertsSuppressionRuleName: string,
  options: AlertsSuppressionRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/alertsSuppressionRules/{alertsSuppressionRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      alertsSuppressionRuleName: alertsSuppressionRuleName,
      "api%2Dversion": "2019-01-01-preview",
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
): Promise<AlertsSuppressionRulesAPIAlertsSuppressionRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return alertsSuppressionRulesAPIAlertsSuppressionRuleDeserializer(result.body);
}

/** Get dismiss rule, with name: {alertsSuppressionRuleName}, for the given subscription */
export async function get(
  context: Client,
  alertsSuppressionRuleName: string,
  options: AlertsSuppressionRulesGetOptionalParams = { requestOptions: {} },
): Promise<AlertsSuppressionRulesAPIAlertsSuppressionRule> {
  const result = await _getSend(context, alertsSuppressionRuleName, options);
  return _getDeserialize(result);
}
