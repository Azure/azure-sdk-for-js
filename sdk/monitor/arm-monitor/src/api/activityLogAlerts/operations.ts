// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MicrosoftActivityLogAlertsActivityLogAlertResource,
  MicrosoftActivityLogAlertsAlertRulePatchObject,
  _MicrosoftActivityLogAlertsAlertRuleList,
} from "../../models/microsoft/activityLogAlerts/models.js";
import {
  microsoftActivityLogAlertsActivityLogAlertResourceSerializer,
  microsoftActivityLogAlertsActivityLogAlertResourceDeserializer,
  microsoftActivityLogAlertsErrorResponseDeserializer,
  microsoftActivityLogAlertsAlertRulePatchObjectSerializer,
  _microsoftActivityLogAlertsAlertRuleListDeserializer,
} from "../../models/microsoft/activityLogAlerts/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ActivityLogAlertsListBySubscriptionIdOptionalParams,
  ActivityLogAlertsListByResourceGroupOptionalParams,
  ActivityLogAlertsDeleteOptionalParams,
  ActivityLogAlertsUpdateOptionalParams,
  ActivityLogAlertsCreateOrUpdateOptionalParams,
  ActivityLogAlertsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionIdSend(
  context: Client,
  options: ActivityLogAlertsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/activityLogAlerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2023-01-01-preview",
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

export async function _listBySubscriptionIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_MicrosoftActivityLogAlertsAlertRuleList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActivityLogAlertsErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftActivityLogAlertsAlertRuleListDeserializer(result.body);
}

/** Get a list of all Activity Log Alert rules in a subscription. */
export function listBySubscriptionId(
  context: Client,
  options: ActivityLogAlertsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdSend(context, options),
    _listBySubscriptionIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-01-01-preview" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ActivityLogAlertsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/activityLogAlerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2023-01-01-preview",
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
): Promise<_MicrosoftActivityLogAlertsAlertRuleList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActivityLogAlertsErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftActivityLogAlertsAlertRuleListDeserializer(result.body);
}

/** Get a list of all Activity Log Alert rules in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ActivityLogAlertsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-01-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  options: ActivityLogAlertsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/activityLogAlerts/{activityLogAlertName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activityLogAlertName: activityLogAlertName,
      "api%2Dversion": "2023-01-01-preview",
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
    error.details = microsoftActivityLogAlertsErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an Activity Log Alert rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  options: ActivityLogAlertsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, activityLogAlertName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  activityLogAlertRulePatch: MicrosoftActivityLogAlertsAlertRulePatchObject,
  options: ActivityLogAlertsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/activityLogAlerts/{activityLogAlertName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activityLogAlertName: activityLogAlertName,
      "api%2Dversion": "2023-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftActivityLogAlertsAlertRulePatchObjectSerializer(activityLogAlertRulePatch),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActivityLogAlertsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActivityLogAlertsActivityLogAlertResourceDeserializer(result.body);
}

/** Updates 'tags' and 'enabled' fields in an existing Alert rule. This method is used to update the Alert rule tags, and to enable or disable the Alert rule. To update other fields use CreateOrUpdate operation. */
export async function update(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  activityLogAlertRulePatch: MicrosoftActivityLogAlertsAlertRulePatchObject,
  options: ActivityLogAlertsUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    activityLogAlertName,
    activityLogAlertRulePatch,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  activityLogAlertRule: MicrosoftActivityLogAlertsActivityLogAlertResource,
  options: ActivityLogAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/activityLogAlerts/{activityLogAlertName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activityLogAlertName: activityLogAlertName,
      "api%2Dversion": "2023-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftActivityLogAlertsActivityLogAlertResourceSerializer(activityLogAlertRule),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActivityLogAlertsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActivityLogAlertsActivityLogAlertResourceDeserializer(result.body);
}

/** Create a new Activity Log Alert rule or update an existing one. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  activityLogAlertRule: MicrosoftActivityLogAlertsActivityLogAlertResource,
  options: ActivityLogAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    activityLogAlertName,
    activityLogAlertRule,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  options: ActivityLogAlertsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/activityLogAlerts/{activityLogAlertName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activityLogAlertName: activityLogAlertName,
      "api%2Dversion": "2023-01-01-preview",
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
): Promise<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftActivityLogAlertsErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftActivityLogAlertsActivityLogAlertResourceDeserializer(result.body);
}

/** Get an Activity Log Alert rule. */
export async function get(
  context: Client,
  resourceGroupName: string,
  activityLogAlertName: string,
  options: ActivityLogAlertsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftActivityLogAlertsActivityLogAlertResource> {
  const result = await _getSend(context, resourceGroupName, activityLogAlertName, options);
  return _getDeserialize(result);
}
