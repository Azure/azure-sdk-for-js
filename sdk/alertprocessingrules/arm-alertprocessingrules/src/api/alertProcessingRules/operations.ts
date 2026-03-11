// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext as Client } from "../index.js";
import type {
  AlertProcessingRule,
  PatchObject,
  _AlertProcessingRulesList,
} from "../../models/models.js";
import {
  alertProcessingRuleSerializer,
  alertProcessingRuleDeserializer,
  errorResponseDeserializer,
  patchObjectSerializer,
  _alertProcessingRulesListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertProcessingRulesListBySubscriptionOptionalParams,
  AlertProcessingRulesListByResourceGroupOptionalParams,
  AlertProcessingRulesDeleteOptionalParams,
  AlertProcessingRulesUpdateOptionalParams,
  AlertProcessingRulesCreateOrUpdateOptionalParams,
  AlertProcessingRulesGetByNameOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: AlertProcessingRulesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AlertsManagement/actionRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2021-08-08",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertProcessingRulesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _alertProcessingRulesListDeserializer(result.body);
}

/** List all alert processing rules in a subscription. */
export function listBySubscription(
  context: Client,
  options: AlertProcessingRulesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertProcessingRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2021-08-08" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AlertProcessingRulesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/actionRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2021-08-08",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertProcessingRulesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _alertProcessingRulesListDeserializer(result.body);
}

/** List all alert processing rules in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AlertProcessingRulesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertProcessingRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2021-08-08" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  options: AlertProcessingRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/actionRules/{alertProcessingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      alertProcessingRuleName: alertProcessingRuleName,
      "api%2Dversion": context.apiVersion ?? "2021-08-08",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an alert processing rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  options: AlertProcessingRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, alertProcessingRuleName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  alertProcessingRulePatch: PatchObject,
  options: AlertProcessingRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/actionRules/{alertProcessingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      alertProcessingRuleName: alertProcessingRuleName,
      "api%2Dversion": context.apiVersion ?? "2021-08-08",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchObjectSerializer(alertProcessingRulePatch),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertProcessingRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return alertProcessingRuleDeserializer(result.body);
}

/** Enable, disable, or update tags for an alert processing rule. */
export async function update(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  alertProcessingRulePatch: PatchObject,
  options: AlertProcessingRulesUpdateOptionalParams = { requestOptions: {} },
): Promise<AlertProcessingRule> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    alertProcessingRuleName,
    alertProcessingRulePatch,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  alertProcessingRule: AlertProcessingRule,
  options: AlertProcessingRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/actionRules/{alertProcessingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      alertProcessingRuleName: alertProcessingRuleName,
      "api%2Dversion": context.apiVersion ?? "2021-08-08",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: alertProcessingRuleSerializer(alertProcessingRule),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertProcessingRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return alertProcessingRuleDeserializer(result.body);
}

/** Create or update an alert processing rule. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  alertProcessingRule: AlertProcessingRule,
  options: AlertProcessingRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AlertProcessingRule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    alertProcessingRuleName,
    alertProcessingRule,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getByNameSend(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  options: AlertProcessingRulesGetByNameOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/actionRules/{alertProcessingRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      alertProcessingRuleName: alertProcessingRuleName,
      "api%2Dversion": context.apiVersion ?? "2021-08-08",
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

export async function _getByNameDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertProcessingRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return alertProcessingRuleDeserializer(result.body);
}

/** Get an alert processing rule by name. */
export async function getByName(
  context: Client,
  resourceGroupName: string,
  alertProcessingRuleName: string,
  options: AlertProcessingRulesGetByNameOptionalParams = { requestOptions: {} },
): Promise<AlertProcessingRule> {
  const result = await _getByNameSend(context, resourceGroupName, alertProcessingRuleName, options);
  return _getByNameDeserialize(result);
}
