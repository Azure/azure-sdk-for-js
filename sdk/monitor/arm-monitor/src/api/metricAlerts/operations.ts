// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MicrosoftMetricAlertMetricAlertResource,
  MicrosoftMetricAlertMetricAlertResourcePatch,
  _MicrosoftMetricAlertMetricAlertResourceCollection,
} from "../../models/microsoft/metricAlert/models.js";
import {
  microsoftMetricAlertMetricAlertResourceSerializer,
  microsoftMetricAlertMetricAlertResourceDeserializer,
  microsoftMetricAlertErrorResponseDeserializer,
  microsoftMetricAlertMetricAlertResourcePatchSerializer,
  _microsoftMetricAlertMetricAlertResourceCollectionDeserializer,
} from "../../models/microsoft/metricAlert/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetricAlertsListBySubscriptionOptionalParams,
  MetricAlertsListByResourceGroupOptionalParams,
  MetricAlertsDeleteOptionalParams,
  MetricAlertsUpdateOptionalParams,
  MetricAlertsCreateOrUpdateOptionalParams,
  MetricAlertsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: MetricAlertsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/metricAlerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-03-01-preview",
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
): Promise<_MicrosoftMetricAlertMetricAlertResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftMetricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftMetricAlertMetricAlertResourceCollectionDeserializer(result.body);
}

/** Retrieve alert rule definitions in a subscription. */
export function listBySubscription(
  context: Client,
  options: MetricAlertsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftMetricAlertMetricAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-01-preview" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: MetricAlertsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-03-01-preview",
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
): Promise<_MicrosoftMetricAlertMetricAlertResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftMetricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return _microsoftMetricAlertMetricAlertResourceCollectionDeserializer(result.body);
}

/** Retrieve alert rule definitions in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MetricAlertsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftMetricAlertMetricAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-03-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2024-03-01-preview",
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
    error.details = microsoftMetricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an alert rule definition. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, ruleName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftMetricAlertMetricAlertResourcePatch,
  options: MetricAlertsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2024-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftMetricAlertMetricAlertResourcePatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftMetricAlertMetricAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftMetricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftMetricAlertMetricAlertResourceDeserializer(result.body);
}

/** Update an metric alert definition. */
export async function update(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftMetricAlertMetricAlertResourcePatch,
  options: MetricAlertsUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftMetricAlertMetricAlertResource> {
  const result = await _updateSend(context, resourceGroupName, ruleName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftMetricAlertMetricAlertResource,
  options: MetricAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2024-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftMetricAlertMetricAlertResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftMetricAlertMetricAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftMetricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftMetricAlertMetricAlertResourceDeserializer(result.body);
}

/** Create or update an metric alert definition. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftMetricAlertMetricAlertResource,
  options: MetricAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftMetricAlertMetricAlertResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    ruleName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2024-03-01-preview",
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
): Promise<MicrosoftMetricAlertMetricAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftMetricAlertErrorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftMetricAlertMetricAlertResourceDeserializer(result.body);
}

/** Retrieve an alert rule definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftMetricAlertMetricAlertResource> {
  const result = await _getSend(context, resourceGroupName, ruleName, options);
  return _getDeserialize(result);
}
