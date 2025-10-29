// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  GlobalRulestackResource,
  GlobalRulestackResourceUpdate,
  _GlobalRulestackResourceListResult,
  Changelog,
  AdvSecurityObjectListResponse,
  _ListAppIdResponse,
  _CountriesResponse,
  ListFirewallsResponse,
  _PredefinedUrlCategoriesResponse,
  SecurityServicesResponse,
  AdvSecurityObjectTypeEnum,
  SecurityServicesTypeEnum,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  globalRulestackResourceSerializer,
  globalRulestackResourceDeserializer,
  globalRulestackResourceUpdateSerializer,
  _globalRulestackResourceListResultDeserializer,
  changelogDeserializer,
  advSecurityObjectListResponseDeserializer,
  _listAppIdResponseDeserializer,
  _countriesResponseDeserializer,
  listFirewallsResponseDeserializer,
  _predefinedUrlCategoriesResponseDeserializer,
  securityServicesResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GlobalRulestackRevertOptionalParams,
  GlobalRulestackListSecurityServicesOptionalParams,
  GlobalRulestackListPredefinedUrlCategoriesOptionalParams,
  GlobalRulestackListFirewallsOptionalParams,
  GlobalRulestackListCountriesOptionalParams,
  GlobalRulestackListAppIdsOptionalParams,
  GlobalRulestackListAdvancedSecurityObjectsOptionalParams,
  GlobalRulestackGetChangeLogOptionalParams,
  GlobalRulestackCommitOptionalParams,
  GlobalRulestackListOptionalParams,
  GlobalRulestackDeleteOptionalParams,
  GlobalRulestackUpdateOptionalParams,
  GlobalRulestackCreateOrUpdateOptionalParams,
  GlobalRulestackGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revertSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackRevertOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/revert{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  options: GlobalRulestackRevertOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _revertSend(context, globalRulestackName, options);
  return _revertDeserialize(result);
}

export function _listSecurityServicesSend(
  context: Client,
  globalRulestackName: string,
  typeParam: SecurityServicesTypeEnum,
  options: GlobalRulestackListSecurityServicesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/listSecurityServices{?api%2Dversion,skip,top,type}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  typeParam: SecurityServicesTypeEnum,
  options: GlobalRulestackListSecurityServicesOptionalParams = {
    requestOptions: {},
  },
): Promise<SecurityServicesResponse> {
  const result = await _listSecurityServicesSend(context, globalRulestackName, typeParam, options);
  return _listSecurityServicesDeserialize(result);
}

export function _listPredefinedUrlCategoriesSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackListPredefinedUrlCategoriesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/listPredefinedUrlCategories{?api%2Dversion,skip,top}",
    {
      globalRulestackName: globalRulestackName,
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
export async function listPredefinedUrlCategories(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackListPredefinedUrlCategoriesOptionalParams = {
    requestOptions: {},
  },
): Promise<_PredefinedUrlCategoriesResponse> {
  const result = await _listPredefinedUrlCategoriesSend(context, globalRulestackName, options);
  return _listPredefinedUrlCategoriesDeserialize(result);
}

export function _listFirewallsSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackListFirewallsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/listFirewalls{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  options: GlobalRulestackListFirewallsOptionalParams = { requestOptions: {} },
): Promise<ListFirewallsResponse> {
  const result = await _listFirewallsSend(context, globalRulestackName, options);
  return _listFirewallsDeserialize(result);
}

export function _listCountriesSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackListCountriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/listCountries{?api%2Dversion,skip,top}",
    {
      globalRulestackName: globalRulestackName,
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
export async function listCountries(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackListCountriesOptionalParams = { requestOptions: {} },
): Promise<_CountriesResponse> {
  const result = await _listCountriesSend(context, globalRulestackName, options);
  return _listCountriesDeserialize(result);
}

export function _listAppIdsSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackListAppIdsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/listAppIds{?api%2Dversion,appIdVersion,appPrefix,skip,top}",
    {
      globalRulestackName: globalRulestackName,
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

/** List of AppIds for GlobalRulestack ApiVersion */
export async function listAppIds(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackListAppIdsOptionalParams = { requestOptions: {} },
): Promise<_ListAppIdResponse> {
  const result = await _listAppIdsSend(context, globalRulestackName, options);
  return _listAppIdsDeserialize(result);
}

export function _listAdvancedSecurityObjectsSend(
  context: Client,
  globalRulestackName: string,
  typeParam: AdvSecurityObjectTypeEnum,
  options: GlobalRulestackListAdvancedSecurityObjectsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/listAdvancedSecurityObjects{?api%2Dversion,skip,top,type}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  typeParam: AdvSecurityObjectTypeEnum,
  options: GlobalRulestackListAdvancedSecurityObjectsOptionalParams = {
    requestOptions: {},
  },
): Promise<AdvSecurityObjectListResponse> {
  const result = await _listAdvancedSecurityObjectsSend(
    context,
    globalRulestackName,
    typeParam,
    options,
  );
  return _listAdvancedSecurityObjectsDeserialize(result);
}

export function _getChangeLogSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackGetChangeLogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/getChangeLog{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  options: GlobalRulestackGetChangeLogOptionalParams = { requestOptions: {} },
): Promise<Changelog> {
  const result = await _getChangeLogSend(context, globalRulestackName, options);
  return _getChangeLogDeserialize(result);
}

export function _commitSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/commit{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  options: GlobalRulestackCommitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _commitDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _commitSend(context, globalRulestackName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: GlobalRulestackListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks{?api%2Dversion}",
    {
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_GlobalRulestackResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _globalRulestackResourceListResultDeserializer(result.body);
}

/** List GlobalRulestackResource resources by Tenant */
export function list(
  context: Client,
  options: GlobalRulestackListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GlobalRulestackResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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

/** Delete a GlobalRulestackResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, globalRulestackName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  globalRulestackName: string,
  properties: GlobalRulestackResourceUpdate,
  options: GlobalRulestackUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
    body: globalRulestackResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<GlobalRulestackResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return globalRulestackResourceDeserializer(result.body);
}

/** Update a GlobalRulestackResource */
export async function update(
  context: Client,
  globalRulestackName: string,
  properties: GlobalRulestackResourceUpdate,
  options: GlobalRulestackUpdateOptionalParams = { requestOptions: {} },
): Promise<GlobalRulestackResource> {
  const result = await _updateSend(context, globalRulestackName, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  globalRulestackName: string,
  resource: GlobalRulestackResource,
  options: GlobalRulestackCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
    body: globalRulestackResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GlobalRulestackResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return globalRulestackResourceDeserializer(result.body);
}

/** Create a GlobalRulestackResource */
export function createOrUpdate(
  context: Client,
  globalRulestackName: string,
  resource: GlobalRulestackResource,
  options: GlobalRulestackCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GlobalRulestackResource>, GlobalRulestackResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, globalRulestackName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<GlobalRulestackResource>, GlobalRulestackResource>;
}

export function _getSend(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
): Promise<GlobalRulestackResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return globalRulestackResourceDeserializer(result.body);
}

/** Get a GlobalRulestackResource */
export async function get(
  context: Client,
  globalRulestackName: string,
  options: GlobalRulestackGetOptionalParams = { requestOptions: {} },
): Promise<GlobalRulestackResource> {
  const result = await _getSend(context, globalRulestackName, options);
  return _getDeserialize(result);
}
