// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { _AuthenticationPolicyListResult } from "../../models/models.js";
import { _authenticationPolicyListResultDeserializer } from "../../models/models.js";
import type {
  AuthenticationPolicy,
  AuthenticationPolicyUpdateParameters,
} from "../../models/network/models.js";
import {
  authenticationPolicySerializer,
  authenticationPolicyDeserializer,
  authenticationPolicyUpdateParametersSerializer,
} from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AuthenticationPoliciesListAllOptionalParams,
  AuthenticationPoliciesListOptionalParams,
  AuthenticationPoliciesDeleteOptionalParams,
  AuthenticationPoliciesUpdateOptionalParams,
  AuthenticationPoliciesCreateOrUpdateOptionalParams,
  AuthenticationPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: AuthenticationPoliciesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/authenticationPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2026-01-01",
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
): Promise<_AuthenticationPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _authenticationPolicyListResultDeserializer(result.body);
}

/** Gets all the authentication policies in a subscription. */
export function listAll(
  context: Client,
  options: AuthenticationPoliciesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthenticationPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: AuthenticationPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/authenticationPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2026-01-01",
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
): Promise<_AuthenticationPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _authenticationPolicyListResultDeserializer(result.body);
}

/** Lists all of the authentication policies within a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: AuthenticationPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthenticationPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  options: AuthenticationPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/authenticationPolicies/{authenticationPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      authenticationPolicyName: authenticationPolicyName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified authentication policy. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  options: AuthenticationPoliciesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, authenticationPolicyName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  parameters: AuthenticationPolicyUpdateParameters,
  options: AuthenticationPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/authenticationPolicies/{authenticationPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      authenticationPolicyName: authenticationPolicyName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: authenticationPolicyUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthenticationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return authenticationPolicyDeserializer(result.body);
}

/** Updates the tags and identity of an authentication policy. */
export async function update(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  parameters: AuthenticationPolicyUpdateParameters,
  options: AuthenticationPoliciesUpdateOptionalParams = { requestOptions: {} },
): Promise<AuthenticationPolicy> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    authenticationPolicyName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  resource: AuthenticationPolicy,
  options: AuthenticationPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/authenticationPolicies/{authenticationPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      authenticationPolicyName: authenticationPolicyName,
      "api%2Dversion": "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: authenticationPolicySerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthenticationPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return authenticationPolicyDeserializer(result.body);
}

/** Creates or updates an authentication policy with the specified name within a resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  resource: AuthenticationPolicy,
  options: AuthenticationPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AuthenticationPolicy>, AuthenticationPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, authenticationPolicyName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-01-01",
  }) as PollerLike<OperationState<AuthenticationPolicy>, AuthenticationPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  options: AuthenticationPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/authenticationPolicies/{authenticationPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      authenticationPolicyName: authenticationPolicyName,
      "api%2Dversion": "2026-01-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthenticationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return authenticationPolicyDeserializer(result.body);
}

/** Retrieve the authentication policy with specified name within a resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  authenticationPolicyName: string,
  options: AuthenticationPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<AuthenticationPolicy> {
  const result = await _getSend(context, resourceGroupName, authenticationPolicyName, options);
  return _getDeserialize(result);
}
