// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  RuleCounter,
  RuleCounterReset,
  LocalRulesResource,
  _LocalRulesResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  ruleCounterDeserializer,
  ruleCounterResetDeserializer,
  localRulesResourceSerializer,
  localRulesResourceDeserializer,
  _localRulesResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LocalRulesResetCountersOptionalParams,
  LocalRulesRefreshCountersOptionalParams,
  LocalRulesGetCountersOptionalParams,
  LocalRulesListByLocalRulestacksOptionalParams,
  LocalRulesDeleteOptionalParams,
  LocalRulesCreateOrUpdateOptionalParams,
  LocalRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resetCountersSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesResetCountersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/localRules/{priority}/resetCounters{?api%2Dversion,firewallName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      priority: priority,
      "api%2Dversion": context.apiVersion,
      firewallName: options?.firewallName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _resetCountersDeserialize(
  result: PathUncheckedResponse,
): Promise<RuleCounterReset> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ruleCounterResetDeserializer(result.body);
}

/** Reset counters */
export async function resetCounters(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesResetCountersOptionalParams = { requestOptions: {} },
): Promise<RuleCounterReset> {
  const result = await _resetCountersSend(
    context,
    resourceGroupName,
    localRulestackName,
    priority,
    options,
  );
  return _resetCountersDeserialize(result);
}

export function _refreshCountersSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesRefreshCountersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/localRules/{priority}/refreshCounters{?api%2Dversion,firewallName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      priority: priority,
      "api%2Dversion": context.apiVersion,
      firewallName: options?.firewallName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshCountersDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Refresh counters */
export async function refreshCounters(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesRefreshCountersOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _refreshCountersSend(
    context,
    resourceGroupName,
    localRulestackName,
    priority,
    options,
  );
  return _refreshCountersDeserialize(result);
}

export function _getCountersSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesGetCountersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/localRules/{priority}/getCounters{?api%2Dversion,firewallName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      priority: priority,
      "api%2Dversion": context.apiVersion,
      firewallName: options?.firewallName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCountersDeserialize(result: PathUncheckedResponse): Promise<RuleCounter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return ruleCounterDeserializer(result.body);
}

/** Get counters */
export async function getCounters(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesGetCountersOptionalParams = { requestOptions: {} },
): Promise<RuleCounter> {
  const result = await _getCountersSend(
    context,
    resourceGroupName,
    localRulestackName,
    priority,
    options,
  );
  return _getCountersDeserialize(result);
}

export function _listByLocalRulestacksSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulesListByLocalRulestacksOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/localRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
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

export async function _listByLocalRulestacksDeserialize(
  result: PathUncheckedResponse,
): Promise<_LocalRulesResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _localRulesResourceListResultDeserializer(result.body);
}

/** List LocalRulesResource resources by LocalRulestacks */
export function listByLocalRulestacks(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulesListByLocalRulestacksOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LocalRulesResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocalRulestacksSend(context, resourceGroupName, localRulestackName, options),
    _listByLocalRulestacksDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/localRules/{priority}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      priority: priority,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a LocalRulesResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, localRulestackName, priority, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  resource: LocalRulesResource,
  options: LocalRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/localRules/{priority}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      priority: priority,
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
    body: localRulesResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LocalRulesResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return localRulesResourceDeserializer(result.body);
}

/** Create a LocalRulesResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  resource: LocalRulesResource,
  options: LocalRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LocalRulesResource>, LocalRulesResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        localRulestackName,
        priority,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LocalRulesResource>, LocalRulesResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/localRules/{priority}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      priority: priority,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LocalRulesResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return localRulesResourceDeserializer(result.body);
}

/** Get a LocalRulesResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  priority: string,
  options: LocalRulesGetOptionalParams = { requestOptions: {} },
): Promise<LocalRulesResource> {
  const result = await _getSend(context, resourceGroupName, localRulestackName, priority, options);
  return _getDeserialize(result);
}
