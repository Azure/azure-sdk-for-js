// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MetricAlertApiMetricAlertResource,
  MetricAlertApiMetricAlertResourcePatch,
  _MetricAlertApiMetricAlertResourceCollection,
} from "../../models/metricAlertApi/models.js";
import {
  metricAlertApiMetricAlertResourceSerializer,
  metricAlertApiMetricAlertResourceDeserializer,
  metricAlertApiMetricAlertErrorResponseDeserializer,
  metricAlertApiMetricAlertResourcePatchSerializer,
  _metricAlertApiMetricAlertResourceCollectionDeserializer,
} from "../../models/metricAlertApi/models.js";
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
      "api%2Dversion": "2026-01-01",
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
): Promise<_MetricAlertApiMetricAlertResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _metricAlertApiMetricAlertResourceCollectionDeserializer(result.body);
}

/** Retrieve alert rule definitions in a subscription. */
export function listBySubscription(
  context: Client,
  options: MetricAlertsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricAlertApiMetricAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
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
      "api%2Dversion": "2026-01-01",
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
): Promise<_MetricAlertApiMetricAlertResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _metricAlertApiMetricAlertResourceCollectionDeserializer(result.body);
}

/** Retrieve alert rule definitions in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: MetricAlertsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricAlertApiMetricAlertResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
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
      "api%2Dversion": "2026-01-01",
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
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete an alert rule definition. */
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
  parameters: MetricAlertApiMetricAlertResourcePatch,
  options: MetricAlertsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: metricAlertApiMetricAlertResourcePatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricAlertApiMetricAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricAlertApiMetricAlertResourceDeserializer(result.body);
}

/** Update an metric alert definition. */
export async function update(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MetricAlertApiMetricAlertResourcePatch,
  options: MetricAlertsUpdateOptionalParams = { requestOptions: {} },
): Promise<MetricAlertApiMetricAlertResource> {
  const result = await _updateSend(context, resourceGroupName, ruleName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MetricAlertApiMetricAlertResource,
  options: MetricAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/metricAlerts/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: metricAlertApiMetricAlertResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricAlertApiMetricAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricAlertApiMetricAlertResourceDeserializer(result.body);
}

/** Create or update an metric alert definition. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MetricAlertApiMetricAlertResource,
  options: MetricAlertsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MetricAlertApiMetricAlertResource> {
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
      "api%2Dversion": "2026-01-01",
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
): Promise<MetricAlertApiMetricAlertResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = metricAlertApiMetricAlertErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricAlertApiMetricAlertResourceDeserializer(result.body);
}

/** Retrieve an alert rule definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: MetricAlertsGetOptionalParams = { requestOptions: {} },
): Promise<MetricAlertApiMetricAlertResource> {
  const result = await _getSend(context, resourceGroupName, ruleName, options);
  return _getDeserialize(result);
}
