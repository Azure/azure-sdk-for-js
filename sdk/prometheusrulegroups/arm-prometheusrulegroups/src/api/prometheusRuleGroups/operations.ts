// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrometheusRuleGroupsManagementContext as Client } from "../index.js";
import type {
  PrometheusRuleGroupResource,
  PrometheusRuleGroupResourcePatchParameters,
  _PrometheusRuleGroupResourceCollection,
} from "../../models/models.js";
import {
  prometheusRuleGroupResourceSerializer,
  prometheusRuleGroupResourceDeserializer,
  errorResponseDeserializer,
  prometheusRuleGroupResourcePatchParametersSerializer,
  _prometheusRuleGroupResourceCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrometheusRuleGroupsListBySubscriptionOptionalParams,
  PrometheusRuleGroupsListByResourceGroupOptionalParams,
  PrometheusRuleGroupsDeleteOptionalParams,
  PrometheusRuleGroupsUpdateOptionalParams,
  PrometheusRuleGroupsCreateOrUpdateOptionalParams,
  PrometheusRuleGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: PrometheusRuleGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AlertsManagement/prometheusRuleGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-03-01",
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
): Promise<_PrometheusRuleGroupResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _prometheusRuleGroupResourceCollectionDeserializer(result.body);
}

/** Retrieve Prometheus all rule group definitions in a subscription. */
export function listBySubscription(
  context: Client,
  options: PrometheusRuleGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrometheusRuleGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-03-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PrometheusRuleGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/prometheusRuleGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-03-01",
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
): Promise<_PrometheusRuleGroupResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _prometheusRuleGroupResourceCollectionDeserializer(result.body);
}

/** Retrieve Prometheus rule group definitions in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PrometheusRuleGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrometheusRuleGroupResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  options: PrometheusRuleGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/prometheusRuleGroups/{ruleGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleGroupName: ruleGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-03-01",
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

/** Delete a Prometheus rule group definition. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  options: PrometheusRuleGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, ruleGroupName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  parameters: PrometheusRuleGroupResourcePatchParameters,
  options: PrometheusRuleGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/prometheusRuleGroups/{ruleGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleGroupName: ruleGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: prometheusRuleGroupResourcePatchParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrometheusRuleGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return prometheusRuleGroupResourceDeserializer(result.body);
}

/** Update an Prometheus rule group definition. */
export async function update(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  parameters: PrometheusRuleGroupResourcePatchParameters,
  options: PrometheusRuleGroupsUpdateOptionalParams = { requestOptions: {} },
): Promise<PrometheusRuleGroupResource> {
  const result = await _updateSend(context, resourceGroupName, ruleGroupName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  parameters: PrometheusRuleGroupResource,
  options: PrometheusRuleGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/prometheusRuleGroups/{ruleGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleGroupName: ruleGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: prometheusRuleGroupResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrometheusRuleGroupResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return prometheusRuleGroupResourceDeserializer(result.body);
}

/** Create or update a Prometheus rule group definition. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  parameters: PrometheusRuleGroupResource,
  options: PrometheusRuleGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PrometheusRuleGroupResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    ruleGroupName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  options: PrometheusRuleGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AlertsManagement/prometheusRuleGroups/{ruleGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleGroupName: ruleGroupName,
      "api%2Dversion": context.apiVersion ?? "2023-03-01",
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
): Promise<PrometheusRuleGroupResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return prometheusRuleGroupResourceDeserializer(result.body);
}

/** Retrieve a Prometheus rule group definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ruleGroupName: string,
  options: PrometheusRuleGroupsGetOptionalParams = { requestOptions: {} },
): Promise<PrometheusRuleGroupResource> {
  const result = await _getSend(context, resourceGroupName, ruleGroupName, options);
  return _getDeserialize(result);
}
