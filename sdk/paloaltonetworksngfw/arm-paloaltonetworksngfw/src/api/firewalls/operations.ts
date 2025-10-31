// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  FirewallResource,
  FirewallResourceUpdate,
  _FirewallResourceListResult,
  GlobalRulestackInfo,
  LogSettings,
  SupportInfo,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  firewallResourceSerializer,
  firewallResourceDeserializer,
  firewallResourceUpdateSerializer,
  _firewallResourceListResultDeserializer,
  globalRulestackInfoDeserializer,
  logSettingsSerializer,
  logSettingsDeserializer,
  supportInfoDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FirewallsSaveLogProfileOptionalParams,
  FirewallsGetSupportInfoOptionalParams,
  FirewallsGetLogProfileOptionalParams,
  FirewallsGetGlobalRulestackOptionalParams,
  FirewallsListBySubscriptionOptionalParams,
  FirewallsListByResourceGroupOptionalParams,
  FirewallsDeleteOptionalParams,
  FirewallsUpdateOptionalParams,
  FirewallsCreateOrUpdateOptionalParams,
  FirewallsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _saveLogProfileSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsSaveLogProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/saveLogProfile{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["logSettings"]
      ? options["logSettings"]
      : logSettingsSerializer(options["logSettings"]),
  });
}

export async function _saveLogProfileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Log Profile for Firewall */
export async function saveLogProfile(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsSaveLogProfileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _saveLogProfileSend(context, resourceGroupName, firewallName, options);
  return _saveLogProfileDeserialize(result);
}

export function _getSupportInfoSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetSupportInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/getSupportInfo{?api%2Dversion,email}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallName: firewallName,
      "api%2Dversion": context.apiVersion,
      email: options?.email,
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

export async function _getSupportInfoDeserialize(
  result: PathUncheckedResponse,
): Promise<SupportInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return supportInfoDeserializer(result.body);
}

/** support info for firewall. */
export async function getSupportInfo(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetSupportInfoOptionalParams = { requestOptions: {} },
): Promise<SupportInfo> {
  const result = await _getSupportInfoSend(context, resourceGroupName, firewallName, options);
  return _getSupportInfoDeserialize(result);
}

export function _getLogProfileSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetLogProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/getLogProfile{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getLogProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<LogSettings> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return logSettingsDeserializer(result.body);
}

/** Log Profile for Firewall */
export async function getLogProfile(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetLogProfileOptionalParams = { requestOptions: {} },
): Promise<LogSettings> {
  const result = await _getLogProfileSend(context, resourceGroupName, firewallName, options);
  return _getLogProfileDeserialize(result);
}

export function _getGlobalRulestackSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetGlobalRulestackOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}/getGlobalRulestack{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getGlobalRulestackDeserialize(
  result: PathUncheckedResponse,
): Promise<GlobalRulestackInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return globalRulestackInfoDeserializer(result.body);
}

/** Get Global Rulestack associated with the Firewall */
export async function getGlobalRulestack(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetGlobalRulestackOptionalParams = { requestOptions: {} },
): Promise<GlobalRulestackInfo> {
  const result = await _getGlobalRulestackSend(context, resourceGroupName, firewallName, options);
  return _getGlobalRulestackDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: FirewallsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PaloAltoNetworks.Cloudngfw/firewalls{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_FirewallResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _firewallResourceListResultDeserializer(result.body);
}

/** List FirewallResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: FirewallsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirewallResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: FirewallsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_FirewallResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _firewallResourceListResultDeserializer(result.body);
}

/** List FirewallResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: FirewallsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirewallResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}{?api%2Dversion}",
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
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a FirewallResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, firewallName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  properties: FirewallResourceUpdate,
  options: FirewallsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: firewallResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<FirewallResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return firewallResourceDeserializer(result.body);
}

/** Update a FirewallResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  properties: FirewallResourceUpdate,
  options: FirewallsUpdateOptionalParams = { requestOptions: {} },
): Promise<FirewallResource> {
  const result = await _updateSend(context, resourceGroupName, firewallName, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: FirewallResource,
  options: FirewallsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}{?api%2Dversion}",
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
    body: firewallResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return firewallResourceDeserializer(result.body);
}

/** Create a FirewallResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  resource: FirewallResource,
  options: FirewallsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FirewallResource>, FirewallResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, firewallName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<FirewallResource>, FirewallResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/firewalls/{firewallName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FirewallResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return firewallResourceDeserializer(result.body);
}

/** Get a FirewallResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallName: string,
  options: FirewallsGetOptionalParams = { requestOptions: {} },
): Promise<FirewallResource> {
  const result = await _getSend(context, resourceGroupName, firewallName, options);
  return _getDeserialize(result);
}
