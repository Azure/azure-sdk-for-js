// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DiscoveryRule,
  discoveryRuleSerializer,
  discoveryRuleDeserializer,
  _DiscoveryRuleListResult,
  _discoveryRuleListResultDeserializer,
} from "../../models/models.js";
import {
  DiscoveryRulesListByHealthModelOptionalParams,
  DiscoveryRulesDeleteOptionalParams,
  DiscoveryRulesCreateOrUpdateOptionalParams,
  DiscoveryRulesGetOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByHealthModelSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: DiscoveryRulesListByHealthModelOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/discoveryrules{?api%2Dversion,timestamp}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      "api%2Dversion": context.apiVersion,
      timestamp: !options?.timestamp ? options?.timestamp : options?.timestamp.toISOString(),
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

export async function _listByHealthModelDeserialize(
  result: PathUncheckedResponse,
): Promise<_DiscoveryRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _discoveryRuleListResultDeserializer(result.body);
}

/** List DiscoveryRule resources by HealthModel */
export function listByHealthModel(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: DiscoveryRulesListByHealthModelOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DiscoveryRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByHealthModelSend(context, resourceGroupName, healthModelName, options),
    _listByHealthModelDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
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
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a DiscoveryRule */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  options: DiscoveryRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    healthModelName,
    discoveryRuleName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  resource: DiscoveryRule,
  options: DiscoveryRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/discoveryrules/{discoveryRuleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      discoveryRuleName: discoveryRuleName,
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
    body: discoveryRuleSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return discoveryRuleDeserializer(result.body);
}

/** Create a DiscoveryRule */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  discoveryRuleName: string,
  resource: DiscoveryRule,
  options: DiscoveryRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DiscoveryRule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    healthModelName,
    discoveryRuleName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DiscoveryRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
