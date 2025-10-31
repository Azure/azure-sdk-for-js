// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  Changelog,
  AdvSecurityObjectListResponse,
  _ListAppIdResponse,
  _CountriesResponse,
  Country,
  ListFirewallsResponse,
  _PredefinedUrlCategoriesResponse,
  PredefinedUrlCategory,
  SecurityServicesResponse,
  SupportInfo,
  LocalRulestackResource,
  LocalRulestackResourceUpdate,
  _LocalRulestackResourceListResult,
  AdvSecurityObjectTypeEnum,
  SecurityServicesTypeEnum,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  changelogDeserializer,
  advSecurityObjectListResponseDeserializer,
  _listAppIdResponseDeserializer,
  _countriesResponseDeserializer,
  listFirewallsResponseDeserializer,
  _predefinedUrlCategoriesResponseDeserializer,
  securityServicesResponseDeserializer,
  supportInfoDeserializer,
  localRulestackResourceSerializer,
  localRulestackResourceDeserializer,
  localRulestackResourceUpdateSerializer,
  _localRulestackResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LocalRulestacksRevertOptionalParams,
  LocalRulestacksListSecurityServicesOptionalParams,
  LocalRulestacksListPredefinedUrlCategoriesOptionalParams,
  LocalRulestacksListFirewallsOptionalParams,
  LocalRulestacksListCountriesOptionalParams,
  LocalRulestacksListAppIdsOptionalParams,
  LocalRulestacksListAdvancedSecurityObjectsOptionalParams,
  LocalRulestacksGetSupportInfoOptionalParams,
  LocalRulestacksGetChangeLogOptionalParams,
  LocalRulestacksCommitOptionalParams,
  LocalRulestacksListBySubscriptionOptionalParams,
  LocalRulestacksListByResourceGroupOptionalParams,
  LocalRulestacksDeleteOptionalParams,
  LocalRulestacksUpdateOptionalParams,
  LocalRulestacksCreateOrUpdateOptionalParams,
  LocalRulestacksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revertSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksRevertOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/revert{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revertDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Revert rulestack configuration */
export async function revert(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksRevertOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revertSend(context, resourceGroupName, localRulestackName, options);
  return _revertDeserialize(result);
}

export function _listSecurityServicesSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  typeParam: SecurityServicesTypeEnum,
  options: LocalRulestacksListSecurityServicesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/listSecurityServices{?api%2Dversion,skip,top,type}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      "api%2Dversion": context.apiVersion,
      skip: options?.skip,
      top: options?.top,
      type: typeParam,
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

export async function _listSecurityServicesDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityServicesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return securityServicesResponseDeserializer(result.body);
}

/** List the security services for rulestack */
export async function listSecurityServices(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  typeParam: SecurityServicesTypeEnum,
  options: LocalRulestacksListSecurityServicesOptionalParams = {
    requestOptions: {},
  },
): Promise<SecurityServicesResponse> {
  const result = await _listSecurityServicesSend(
    context,
    resourceGroupName,
    localRulestackName,
    typeParam,
    options,
  );
  return _listSecurityServicesDeserialize(result);
}

export function _listPredefinedUrlCategoriesSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListPredefinedUrlCategoriesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/listPredefinedUrlCategories{?api%2Dversion,skip,top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      "api%2Dversion": context.apiVersion,
      skip: options?.skip,
      top: options?.top,
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

export async function _listPredefinedUrlCategoriesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PredefinedUrlCategoriesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _predefinedUrlCategoriesResponseDeserializer(result.body);
}

/** List predefined URL categories for rulestack */
export function listPredefinedUrlCategories(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListPredefinedUrlCategoriesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PredefinedUrlCategory> {
  return buildPagedAsyncIterator(
    context,
    () => _listPredefinedUrlCategoriesSend(context, resourceGroupName, localRulestackName, options),
    _listPredefinedUrlCategoriesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listFirewallsSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListFirewallsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/listFirewalls{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listFirewallsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListFirewallsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return listFirewallsResponseDeserializer(result.body);
}

/** List of Firewalls associated with Rulestack */
export async function listFirewalls(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListFirewallsOptionalParams = { requestOptions: {} },
): Promise<ListFirewallsResponse> {
  const result = await _listFirewallsSend(context, resourceGroupName, localRulestackName, options);
  return _listFirewallsDeserialize(result);
}

export function _listCountriesSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListCountriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/listCountries{?api%2Dversion,skip,top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      "api%2Dversion": context.apiVersion,
      skip: options?.skip,
      top: options?.top,
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

export async function _listCountriesDeserialize(
  result: PathUncheckedResponse,
): Promise<_CountriesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _countriesResponseDeserializer(result.body);
}

/** List of countries for Rulestack */
export function listCountries(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListCountriesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Country> {
  return buildPagedAsyncIterator(
    context,
    () => _listCountriesSend(context, resourceGroupName, localRulestackName, options),
    _listCountriesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listAppIdsSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListAppIdsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/listAppIds{?api%2Dversion,appIdVersion,appPrefix,skip,top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      "api%2Dversion": context.apiVersion,
      appIdVersion: options?.appIdVersion,
      appPrefix: options?.appPrefix,
      skip: options?.skip,
      top: options?.top,
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

export async function _listAppIdsDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListAppIdResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _listAppIdResponseDeserializer(result.body);
}

/** List of AppIds for LocalRulestack ApiVersion */
export function listAppIds(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksListAppIdsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listAppIdsSend(context, resourceGroupName, localRulestackName, options),
    _listAppIdsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listAdvancedSecurityObjectsSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  typeParam: AdvSecurityObjectTypeEnum,
  options: LocalRulestacksListAdvancedSecurityObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/listAdvancedSecurityObjects{?api%2Dversion,skip,top,type}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
      "api%2Dversion": context.apiVersion,
      skip: options?.skip,
      top: options?.top,
      type: typeParam,
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

export async function _listAdvancedSecurityObjectsDeserialize(
  result: PathUncheckedResponse,
): Promise<AdvSecurityObjectListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return advSecurityObjectListResponseDeserializer(result.body);
}

/** Get the list of advanced security objects */
export async function listAdvancedSecurityObjects(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  typeParam: AdvSecurityObjectTypeEnum,
  options: LocalRulestacksListAdvancedSecurityObjectsOptionalParams = {
    requestOptions: {},
  },
): Promise<AdvSecurityObjectListResponse> {
  const result = await _listAdvancedSecurityObjectsSend(
    context,
    resourceGroupName,
    localRulestackName,
    typeParam,
    options,
  );
  return _listAdvancedSecurityObjectsDeserialize(result);
}

export function _getSupportInfoSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksGetSupportInfoOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/getSupportInfo{?api%2Dversion,email}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      localRulestackName: localRulestackName,
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

/** support info for rulestack. */
export async function getSupportInfo(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksGetSupportInfoOptionalParams = { requestOptions: {} },
): Promise<SupportInfo> {
  const result = await _getSupportInfoSend(context, resourceGroupName, localRulestackName, options);
  return _getSupportInfoDeserialize(result);
}

export function _getChangeLogSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksGetChangeLogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/getChangeLog{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getChangeLogDeserialize(result: PathUncheckedResponse): Promise<Changelog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return changelogDeserializer(result.body);
}

/** Get changelog */
export async function getChangeLog(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksGetChangeLogOptionalParams = { requestOptions: {} },
): Promise<Changelog> {
  const result = await _getChangeLogSend(context, resourceGroupName, localRulestackName, options);
  return _getChangeLogDeserialize(result);
}

export function _commitSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}/commit{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _commitDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Commit rulestack configuration */
export function commit(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksCommitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _commitDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _commitSend(context, resourceGroupName, localRulestackName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: LocalRulestacksListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks{?api%2Dversion}",
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
): Promise<_LocalRulestackResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _localRulestackResourceListResultDeserializer(result.body);
}

/** List LocalRulestackResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: LocalRulestacksListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LocalRulestackResource> {
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
  options: LocalRulestacksListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks{?api%2Dversion}",
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
): Promise<_LocalRulestackResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _localRulestackResourceListResultDeserializer(result.body);
}

/** List LocalRulestackResource resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: LocalRulestacksListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<LocalRulestackResource> {
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
  localRulestackName: string,
  options: LocalRulestacksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}{?api%2Dversion}",
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

/** Delete a LocalRulestackResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, localRulestackName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  properties: LocalRulestackResourceUpdate,
  options: LocalRulestacksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: localRulestackResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<LocalRulestackResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return localRulestackResourceDeserializer(result.body);
}

/** Update a LocalRulestackResource */
export async function update(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  properties: LocalRulestackResourceUpdate,
  options: LocalRulestacksUpdateOptionalParams = { requestOptions: {} },
): Promise<LocalRulestackResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    localRulestackName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  resource: LocalRulestackResource,
  options: LocalRulestacksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: localRulestackResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<LocalRulestackResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return localRulestackResourceDeserializer(result.body);
}

/** Create a LocalRulestackResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  resource: LocalRulestackResource,
  options: LocalRulestacksCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LocalRulestackResource>, LocalRulestackResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, localRulestackName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<LocalRulestackResource>, LocalRulestackResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/PaloAltoNetworks.Cloudngfw/localRulestacks/{localRulestackName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<LocalRulestackResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return localRulestackResourceDeserializer(result.body);
}

/** Get a LocalRulestackResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  localRulestackName: string,
  options: LocalRulestacksGetOptionalParams = { requestOptions: {} },
): Promise<LocalRulestackResource> {
  const result = await _getSend(context, resourceGroupName, localRulestackName, options);
  return _getDeserialize(result);
}
