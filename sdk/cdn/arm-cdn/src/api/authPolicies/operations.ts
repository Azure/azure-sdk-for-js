// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  AuthPolicy,
  AuthPolicyUpdateParameters,
  _AuthPolicyListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  authPolicySerializer,
  authPolicyDeserializer,
  authPolicyUpdateParametersSerializer,
  _authPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AuthPoliciesListByProfileOptionalParams,
  AuthPoliciesDeleteOptionalParams,
  AuthPoliciesUpdateOptionalParams,
  AuthPoliciesCreateOptionalParams,
  AuthPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByProfileSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AuthPoliciesListByProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/authPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _listByProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_AuthPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _authPolicyListResultDeserializer(result.body);
}

/** Lists authorization policies associated with the profile. */
export function listByProfile(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AuthPoliciesListByProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProfileSend(context, resourceGroupName, profileName, options),
    _listByProfileDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  options: AuthPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/authPolicies/{authPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      authPolicyName: authPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing authorization policy within a profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  options: AuthPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, authPolicyName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  properties: AuthPolicyUpdateParameters,
  options: AuthPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/authPolicies/{authPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      authPolicyName: authPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: authPolicyUpdateParametersSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AuthPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authPolicyDeserializer(result.body);
}

/** Updates an existing authorization policy within a profile. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  properties: AuthPolicyUpdateParameters,
  options: AuthPoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AuthPolicy>, AuthPolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, profileName, authPolicyName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<AuthPolicy>, AuthPolicy>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  resource: AuthPolicy,
  options: AuthPoliciesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/authPolicies/{authPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      authPolicyName: authPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: authPolicySerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<AuthPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authPolicyDeserializer(result.body);
}

/** Creates or updates an authorization policy within the specified profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  resource: AuthPolicy,
  options: AuthPoliciesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AuthPolicy>, AuthPolicy> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, authPolicyName, resource, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-09-01-preview",
  }) as PollerLike<OperationState<AuthPolicy>, AuthPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  options: AuthPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/authPolicies/{authPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      authPolicyName: authPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AuthPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authPolicyDeserializer(result.body);
}

/** Gets an existing authorization policy within a profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  authPolicyName: string,
  options: AuthPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<AuthPolicy> {
  const result = await _getSend(context, resourceGroupName, profileName, authPolicyName, options);
  return _getDeserialize(result);
}
