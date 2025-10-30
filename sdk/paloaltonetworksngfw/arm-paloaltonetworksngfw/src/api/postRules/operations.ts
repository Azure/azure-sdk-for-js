// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PaloAltoNetworksCloudngfwContext as Client } from "../index.js";
import type {
  PostRulesResource,
  _PostRulesResourceListResult,
  RuleCounter,
  RuleCounterReset,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  postRulesResourceSerializer,
  postRulesResourceDeserializer,
  _postRulesResourceListResultDeserializer,
  ruleCounterDeserializer,
  ruleCounterResetDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PostRulesResetCountersOptionalParams,
  PostRulesRefreshCountersOptionalParams,
  PostRulesGetCountersOptionalParams,
  PostRulesListOptionalParams,
  PostRulesDeleteOptionalParams,
  PostRulesCreateOrUpdateOptionalParams,
  PostRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resetCountersSend(
  context: Client,
  globalRulestackName: string,
  priority: string,
  options: PostRulesResetCountersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/postRules/{priority}/resetCounters{?api%2Dversion,firewallName}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  priority: string,
  options: PostRulesResetCountersOptionalParams = { requestOptions: {} },
): Promise<RuleCounterReset> {
  const result = await _resetCountersSend(context, globalRulestackName, priority, options);
  return _resetCountersDeserialize(result);
}

export function _refreshCountersSend(
  context: Client,
  globalRulestackName: string,
  priority: string,
  options: PostRulesRefreshCountersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/postRules/{priority}/refreshCounters{?api%2Dversion,firewallName}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  priority: string,
  options: PostRulesRefreshCountersOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _refreshCountersSend(context, globalRulestackName, priority, options);
  return _refreshCountersDeserialize(result);
}

export function _getCountersSend(
  context: Client,
  globalRulestackName: string,
  priority: string,
  options: PostRulesGetCountersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/postRules/{priority}/getCounters{?api%2Dversion,firewallName}",
    {
      globalRulestackName: globalRulestackName,
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
  globalRulestackName: string,
  priority: string,
  options: PostRulesGetCountersOptionalParams = { requestOptions: {} },
): Promise<RuleCounter> {
  const result = await _getCountersSend(context, globalRulestackName, priority, options);
  return _getCountersDeserialize(result);
}

export function _listSend(
  context: Client,
  globalRulestackName: string,
  options: PostRulesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/postRules{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PostRulesResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _postRulesResourceListResultDeserializer(result.body);
}

/** List PostRulesResource resources by Tenant */
export function list(
  context: Client,
  globalRulestackName: string,
  options: PostRulesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PostRulesResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, globalRulestackName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  globalRulestackName: string,
  priority: string,
  options: PostRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/postRules/{priority}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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

/** Delete a PostRulesResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  globalRulestackName: string,
  priority: string,
  options: PostRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, globalRulestackName, priority, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  globalRulestackName: string,
  priority: string,
  resource: PostRulesResource,
  options: PostRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/postRules/{priority}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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
    body: postRulesResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PostRulesResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return postRulesResourceDeserializer(result.body);
}

/** Create a PostRulesResource */
export function createOrUpdate(
  context: Client,
  globalRulestackName: string,
  priority: string,
  resource: PostRulesResource,
  options: PostRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PostRulesResource>, PostRulesResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, globalRulestackName, priority, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<PostRulesResource>, PostRulesResource>;
}

export function _getSend(
  context: Client,
  globalRulestackName: string,
  priority: string,
  options: PostRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/PaloAltoNetworks.Cloudngfw/globalRulestacks/{globalRulestackName}/postRules/{priority}{?api%2Dversion}",
    {
      globalRulestackName: globalRulestackName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PostRulesResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return postRulesResourceDeserializer(result.body);
}

/** Get a PostRulesResource */
export async function get(
  context: Client,
  globalRulestackName: string,
  priority: string,
  options: PostRulesGetOptionalParams = { requestOptions: {} },
): Promise<PostRulesResource> {
  const result = await _getSend(context, globalRulestackName, priority, options);
  return _getDeserialize(result);
}
