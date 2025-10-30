// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  MetricsObjectFirewallResource,
  _MetricsObjectFirewallResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  metricsObjectFirewallResourceSerializer,
  metricsObjectFirewallResourceDeserializer,
  _metricsObjectFirewallResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetricsObjectFirewallListByFirewallsOptionalParams,
  MetricsObjectFirewallDeleteOptionalParams,
  MetricsObjectFirewallCreateOrUpdateOptionalParams,
  MetricsObjectFirewallGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByFirewallsSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: MetricsObjectFirewallListByFirewallsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/metrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByFirewallsDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetricsObjectFirewallResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _metricsObjectFirewallResourceListResultDeserializer(result.body);
}

/** List MetricsObjectFirewallResource resources by Firewalls */
export function listByFirewalls(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: MetricsObjectFirewallListByFirewallsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MetricsObjectFirewallResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFirewallsSend(context, resourceGroupName, firewallName, options),
    _listByFirewallsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: MetricsObjectFirewallDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/metrics/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a MetricsObjectFirewallResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: MetricsObjectFirewallDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, firewallName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: MetricsObjectFirewallResource,
  options: MetricsObjectFirewallCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/metrics/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: metricsObjectFirewallResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricsObjectFirewallResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return metricsObjectFirewallResourceDeserializer(result.body);
}

/** Create a MetricsObjectFirewallResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: MetricsObjectFirewallResource,
  options: MetricsObjectFirewallCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<MetricsObjectFirewallResource>, MetricsObjectFirewallResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, firewallName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<MetricsObjectFirewallResource>, MetricsObjectFirewallResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: MetricsObjectFirewallGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/metrics/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricsObjectFirewallResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return metricsObjectFirewallResourceDeserializer(result.body);
}

/** Get a MetricsObjectFirewallResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: MetricsObjectFirewallGetOptionalParams = { requestOptions: {} },
): Promise<MetricsObjectFirewallResource> {
  const result = await _getSend(context, resourceGroupName, firewallName, options);
  return _getDeserialize(result);
}
