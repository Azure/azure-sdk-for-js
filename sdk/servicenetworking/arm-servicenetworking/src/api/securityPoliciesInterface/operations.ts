// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SecurityPolicy,
  securityPolicySerializer,
  securityPolicyDeserializer,
  SecurityPolicyUpdate,
  securityPolicyUpdateSerializer,
  _SecurityPolicyListResult,
  _securityPolicyListResultDeserializer,
} from "../../models/models.js";
import {
  SecurityPoliciesInterfaceListByTrafficControllerOptionalParams,
  SecurityPoliciesInterfaceDeleteOptionalParams,
  SecurityPoliciesInterfaceUpdateOptionalParams,
  SecurityPoliciesInterfaceCreateOrUpdateOptionalParams,
  SecurityPoliciesInterfaceGetOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByTrafficControllerSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: SecurityPoliciesInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/securityPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
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

export async function _listByTrafficControllerDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecurityPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _securityPolicyListResultDeserializer(result.body);
}

/** List SecurityPolicy resources by TrafficController */
export function listByTrafficController(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  options: SecurityPoliciesInterfaceListByTrafficControllerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SecurityPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTrafficControllerSend(context, resourceGroupName, trafficControllerName, options),
    _listByTrafficControllerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  options: SecurityPoliciesInterfaceDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      securityPolicyName: securityPolicyName,
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
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a SecurityPolicy */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  options: SecurityPoliciesInterfaceDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, trafficControllerName, securityPolicyName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  properties: SecurityPolicyUpdate,
  options: SecurityPoliciesInterfaceUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      securityPolicyName: securityPolicyName,
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
    body: securityPolicyUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SecurityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return securityPolicyDeserializer(result.body);
}

/** Update a SecurityPolicy */
export async function update(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  properties: SecurityPolicyUpdate,
  options: SecurityPoliciesInterfaceUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<SecurityPolicy> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    trafficControllerName,
    securityPolicyName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  resource: SecurityPolicy,
  options: SecurityPoliciesInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      securityPolicyName: securityPolicyName,
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
    body: securityPolicySerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return securityPolicyDeserializer(result.body);
}

/** Create a SecurityPolicy */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  resource: SecurityPolicy,
  options: SecurityPoliciesInterfaceCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SecurityPolicy>, SecurityPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        trafficControllerName,
        securityPolicyName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SecurityPolicy>, SecurityPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  options: SecurityPoliciesInterfaceGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ServiceNetworking/trafficControllers/{trafficControllerName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      trafficControllerName: trafficControllerName,
      securityPolicyName: securityPolicyName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SecurityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return securityPolicyDeserializer(result.body);
}

/** Get a SecurityPolicy */
export async function get(
  context: Client,
  resourceGroupName: string,
  trafficControllerName: string,
  securityPolicyName: string,
  options: SecurityPoliciesInterfaceGetOptionalParams = { requestOptions: {} },
): Promise<SecurityPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    trafficControllerName,
    securityPolicyName,
    options,
  );
  return _getDeserialize(result);
}
