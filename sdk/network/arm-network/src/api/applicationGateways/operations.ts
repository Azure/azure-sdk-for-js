// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  ApplicationGateway,
  TagsObject,
  ApplicationGatewayBackendHealth,
  ApplicationGatewayOnDemandProbe,
  ApplicationGatewayBackendHealthOnDemand,
  ApplicationGatewayAvailableSslOptions,
  _ApplicationGatewayAvailableSslPredefinedPolicies,
  ApplicationGatewaySslPredefinedPolicy,
  ApplicationGatewayAvailableWafRuleSetsResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  applicationGatewaySerializer,
  applicationGatewayDeserializer,
  tagsObjectSerializer,
  applicationGatewayBackendHealthDeserializer,
  applicationGatewayOnDemandProbeSerializer,
  applicationGatewayBackendHealthOnDemandDeserializer,
  applicationGatewayAvailableSslOptionsDeserializer,
  _applicationGatewayAvailableSslPredefinedPoliciesDeserializer,
  applicationGatewaySslPredefinedPolicyDeserializer,
  errorDeserializer,
  applicationGatewayAvailableWafRuleSetsResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type {
  _ApplicationGatewayListResult,
  ApplicationGatewaysListAvailableResponseHeadersResponse,
  ApplicationGatewaysListAvailableRequestHeadersResponse,
  ApplicationGatewaysListAvailableServerVariablesResponse,
} from "../../models/models.js";
import { _applicationGatewayListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApplicationGatewaysListAvailableWafRuleSetsOptionalParams,
  ApplicationGatewaysListAvailableResponseHeadersOptionalParams,
  ApplicationGatewaysListAvailableRequestHeadersOptionalParams,
  ApplicationGatewaysListAvailableServerVariablesOptionalParams,
  ApplicationGatewaysGetSslPredefinedPolicyOptionalParams,
  ApplicationGatewaysListAvailableSslPredefinedPoliciesOptionalParams,
  ApplicationGatewaysListAvailableSslOptionsOptionalParams,
  ApplicationGatewaysBackendHealthOnDemandOptionalParams,
  ApplicationGatewaysBackendHealthOptionalParams,
  ApplicationGatewaysStopOptionalParams,
  ApplicationGatewaysStartOptionalParams,
  ApplicationGatewaysListAllOptionalParams,
  ApplicationGatewaysListOptionalParams,
  ApplicationGatewaysDeleteOptionalParams,
  ApplicationGatewaysUpdateTagsOptionalParams,
  ApplicationGatewaysCreateOrUpdateOptionalParams,
  ApplicationGatewaysGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAvailableWafRuleSetsSend(
  context: Client,
  options: ApplicationGatewaysListAvailableWafRuleSetsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableWafRuleSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAvailableWafRuleSetsDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewayAvailableWafRuleSetsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayAvailableWafRuleSetsResultDeserializer(result.body);
}

/** Lists all available web application firewall rule sets. */
export async function listAvailableWafRuleSets(
  context: Client,
  options: ApplicationGatewaysListAvailableWafRuleSetsOptionalParams = { requestOptions: {} },
): Promise<ApplicationGatewayAvailableWafRuleSetsResult> {
  const result = await _listAvailableWafRuleSetsSend(context, options);
  return _listAvailableWafRuleSetsDeserialize(result);
}

export function _listAvailableResponseHeadersSend(
  context: Client,
  options: ApplicationGatewaysListAvailableResponseHeadersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableResponseHeaders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAvailableResponseHeadersDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewaysListAvailableResponseHeadersResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Lists all available response headers. */
export async function listAvailableResponseHeaders(
  context: Client,
  options: ApplicationGatewaysListAvailableResponseHeadersOptionalParams = { requestOptions: {} },
): Promise<ApplicationGatewaysListAvailableResponseHeadersResponse> {
  const result = await _listAvailableResponseHeadersSend(context, options);
  return _listAvailableResponseHeadersDeserialize(result);
}

export function _listAvailableRequestHeadersSend(
  context: Client,
  options: ApplicationGatewaysListAvailableRequestHeadersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableRequestHeaders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAvailableRequestHeadersDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewaysListAvailableRequestHeadersResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Lists all available request headers. */
export async function listAvailableRequestHeaders(
  context: Client,
  options: ApplicationGatewaysListAvailableRequestHeadersOptionalParams = { requestOptions: {} },
): Promise<ApplicationGatewaysListAvailableRequestHeadersResponse> {
  const result = await _listAvailableRequestHeadersSend(context, options);
  return _listAvailableRequestHeadersDeserialize(result);
}

export function _listAvailableServerVariablesSend(
  context: Client,
  options: ApplicationGatewaysListAvailableServerVariablesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableServerVariables{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAvailableServerVariablesDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewaysListAvailableServerVariablesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return p;
    }),
  };
}

/** Lists all available server variables. */
export async function listAvailableServerVariables(
  context: Client,
  options: ApplicationGatewaysListAvailableServerVariablesOptionalParams = { requestOptions: {} },
): Promise<ApplicationGatewaysListAvailableServerVariablesResponse> {
  const result = await _listAvailableServerVariablesSend(context, options);
  return _listAvailableServerVariablesDeserialize(result);
}

export function _getSslPredefinedPolicySend(
  context: Client,
  predefinedPolicyName: string,
  options: ApplicationGatewaysGetSslPredefinedPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableSslOptions/default/predefinedPolicies/{predefinedPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      predefinedPolicyName: predefinedPolicyName,
      "api%2Dversion": "2025-05-01",
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

export async function _getSslPredefinedPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewaySslPredefinedPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewaySslPredefinedPolicyDeserializer(result.body);
}

/** Gets Ssl predefined policy with the specified policy name. */
export async function getSslPredefinedPolicy(
  context: Client,
  predefinedPolicyName: string,
  options: ApplicationGatewaysGetSslPredefinedPolicyOptionalParams = { requestOptions: {} },
): Promise<ApplicationGatewaySslPredefinedPolicy> {
  const result = await _getSslPredefinedPolicySend(context, predefinedPolicyName, options);
  return _getSslPredefinedPolicyDeserialize(result);
}

export function _listAvailableSslPredefinedPoliciesSend(
  context: Client,
  options: ApplicationGatewaysListAvailableSslPredefinedPoliciesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableSslOptions/default/predefinedPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAvailableSslPredefinedPoliciesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationGatewayAvailableSslPredefinedPolicies> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _applicationGatewayAvailableSslPredefinedPoliciesDeserializer(result.body);
}

/** Lists all SSL predefined policies for configuring Ssl policy. */
export function listAvailableSslPredefinedPolicies(
  context: Client,
  options: ApplicationGatewaysListAvailableSslPredefinedPoliciesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ApplicationGatewaySslPredefinedPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableSslPredefinedPoliciesSend(context, options),
    _listAvailableSslPredefinedPoliciesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listAvailableSslOptionsSend(
  context: Client,
  options: ApplicationGatewaysListAvailableSslOptionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableSslOptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAvailableSslOptionsDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewayAvailableSslOptions> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayAvailableSslOptionsDeserializer(result.body);
}

/** Lists available Ssl options for configuring Ssl policy. */
export async function listAvailableSslOptions(
  context: Client,
  options: ApplicationGatewaysListAvailableSslOptionsOptionalParams = { requestOptions: {} },
): Promise<ApplicationGatewayAvailableSslOptions> {
  const result = await _listAvailableSslOptionsSend(context, options);
  return _listAvailableSslOptionsDeserialize(result);
}

export function _backendHealthOnDemandSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  probeRequest: ApplicationGatewayOnDemandProbe,
  options: ApplicationGatewaysBackendHealthOnDemandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/getBackendHealthOnDemand{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationGatewayOnDemandProbeSerializer(probeRequest),
  });
}

export async function _backendHealthOnDemandDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewayBackendHealthOnDemand> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayBackendHealthOnDemandDeserializer(result.body);
}

/** Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group. */
export function backendHealthOnDemand(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  probeRequest: ApplicationGatewayOnDemandProbe,
  options: ApplicationGatewaysBackendHealthOnDemandOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ApplicationGatewayBackendHealthOnDemand>,
  ApplicationGatewayBackendHealthOnDemand
> {
  return getLongRunningPoller(context, _backendHealthOnDemandDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _backendHealthOnDemandSend(
        context,
        resourceGroupName,
        applicationGatewayName,
        probeRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ApplicationGatewayBackendHealthOnDemand>,
    ApplicationGatewayBackendHealthOnDemand
  >;
}

export function _backendHealthSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysBackendHealthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/backendhealth{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _backendHealthDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGatewayBackendHealth> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayBackendHealthDeserializer(result.body);
}

/** Gets the backend health of the specified application gateway in a resource group. */
export function backendHealth(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysBackendHealthOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApplicationGatewayBackendHealth>, ApplicationGatewayBackendHealth> {
  return getLongRunningPoller(context, _backendHealthDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _backendHealthSend(context, resourceGroupName, applicationGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<ApplicationGatewayBackendHealth>,
    ApplicationGatewayBackendHealth
  >;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stops the specified application gateway in a resource group. */
export function stop(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(context, resourceGroupName, applicationGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Starts the specified application gateway. */
export function start(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, applicationGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listAllSend(
  context: Client,
  options: ApplicationGatewaysListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/applicationGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _applicationGatewayListResultDeserializer(result.body);
}

/** Gets all the application gateways in a subscription. */
export function listAll(
  context: Client,
  options: ApplicationGatewaysListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: ApplicationGatewaysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _applicationGatewayListResultDeserializer(result.body);
}

/** Lists all application gateways in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: ApplicationGatewaysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified application gateway. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, applicationGatewayName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  parameters: TagsObject,
  options: ApplicationGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayDeserializer(result.body);
}

/** Updates the specified application gateway tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  parameters: TagsObject,
  options: ApplicationGatewaysUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<ApplicationGateway> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    applicationGatewayName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  parameters: ApplicationGateway,
  options: ApplicationGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationGatewaySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationGateway> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayDeserializer(result.body);
}

/** Creates or updates the specified application gateway. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  parameters: ApplicationGateway,
  options: ApplicationGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApplicationGateway>, ApplicationGateway> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, applicationGatewayName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<ApplicationGateway>, ApplicationGateway>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationGatewayName: applicationGatewayName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ApplicationGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return applicationGatewayDeserializer(result.body);
}

/** Gets the specified application gateway. */
export async function get(
  context: Client,
  resourceGroupName: string,
  applicationGatewayName: string,
  options: ApplicationGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationGateway> {
  const result = await _getSend(context, resourceGroupName, applicationGatewayName, options);
  return _getDeserialize(result);
}
