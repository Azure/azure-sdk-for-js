// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudHealthContext as Client } from "../index.js";
import type {
  DiscoveryRule,
  DiscoveryRuleResourceCreate,
  _DiscoveryRuleListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  discoveryRuleDeserializer,
  discoveryRuleResourceCreateSerializer,
  _discoveryRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DiscoveryRulesListByHealthModelOptionalParams,
  DiscoveryRulesDeleteOptionalParams,
  DiscoveryRulesCreateOrUpdateOptionalParams,
  DiscoveryRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByHealthModelSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: DiscoveryRulesListByHealthModelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/discoveryrules{?api%2Dversion,timestamp}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      timestamp: !options?.timestamp ? options?.timestamp : options?.timestamp.toISOString(),
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

export async function _listByHealthModelDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoveryRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _discoveryRuleListResultDeserializer(result.body);
}

/** List DiscoveryRule resources by HealthModel */
export function listByHealthModel(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: DiscoveryRulesListByHealthModelOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DiscoveryRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByHealthModelSend(context, resourceGroupName, healthModelName, options),
    _listByHealthModelDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  options: DiscoveryRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/discoveryrules/{discoveryRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      discoveryRuleName: discoveryRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a DiscoveryRule */
export function $delete(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  options: DiscoveryRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, healthModelName, discoveryRuleName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  resource: DiscoveryRuleResourceCreate,
  options: DiscoveryRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/discoveryrules/{discoveryRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      discoveryRuleName: discoveryRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: discoveryRuleResourceCreateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return discoveryRuleDeserializer(result.body);
}

/** Create a DiscoveryRule */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  resource: DiscoveryRuleResourceCreate,
  options: DiscoveryRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DiscoveryRule>, DiscoveryRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        healthModelName,
        discoveryRuleName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<DiscoveryRule>, DiscoveryRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  options: DiscoveryRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/discoveryrules/{discoveryRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      discoveryRuleName: discoveryRuleName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DiscoveryRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return discoveryRuleDeserializer(result.body);
}

/** Get a DiscoveryRule */
export async function get(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  options: DiscoveryRulesGetOptionalParams = { requestOptions: {} },
): Promise<DiscoveryRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    healthModelName,
    discoveryRuleName,
    options,
  );
  return _getDeserialize(result);
}
