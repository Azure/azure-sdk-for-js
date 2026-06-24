// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  SecurityPolicy,
  SecurityPolicyUpdateParameters,
  _SecurityPolicyListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  securityPolicySerializer,
  securityPolicyDeserializer,
  securityPolicyUpdateParametersSerializer,
  _securityPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecurityPoliciesListByProfileOptionalParams,
  SecurityPoliciesDeleteOptionalParams,
  SecurityPoliciesPatchOptionalParams,
  SecurityPoliciesCreateOptionalParams,
  SecurityPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByProfileSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: SecurityPoliciesListByProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
): Promise<_SecurityPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _securityPolicyListResultDeserializer(result.body);
}

/** Lists security policies associated with the profile */
export function listByProfile(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: SecurityPoliciesListByProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProfileSend(context, resourceGroupName, profileName, options),
    _listByProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  options: SecurityPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      securityPolicyName: securityPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

/** Deletes an existing security policy within profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  options: SecurityPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, securityPolicyName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
  options: SecurityPoliciesPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      securityPolicyName: securityPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityPolicyUpdateParametersSerializer(securityPolicyUpdateProperties),
  });
}

export async function _patchDeserialize(result: PathUncheckedResponse): Promise<SecurityPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return securityPolicyDeserializer(result.body);
}

/** Updates an existing security policy within a profile. */
export function patch(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  securityPolicyUpdateProperties: SecurityPolicyUpdateParameters,
  options: SecurityPoliciesPatchOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SecurityPolicy>, SecurityPolicy> {
  return getLongRunningPoller(context, _patchDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _patchSend(
        context,
        resourceGroupName,
        profileName,
        securityPolicyName,
        securityPolicyUpdateProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<SecurityPolicy>, SecurityPolicy>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  securityPolicy: SecurityPolicy,
  options: SecurityPoliciesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      securityPolicyName: securityPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityPolicySerializer(securityPolicy),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SecurityPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return securityPolicyDeserializer(result.body);
}

/** Creates a new security policy within the specified profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  securityPolicy: SecurityPolicy,
  options: SecurityPoliciesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SecurityPolicy>, SecurityPolicy> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        profileName,
        securityPolicyName,
        securityPolicy,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<SecurityPolicy>, SecurityPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  options: SecurityPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/securityPolicies/{securityPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      securityPolicyName: securityPolicyName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SecurityPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return securityPolicyDeserializer(result.body);
}

/** Gets an existing security policy within a profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  securityPolicyName: string,
  options: SecurityPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<SecurityPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    profileName,
    securityPolicyName,
    options,
  );
  return _getDeserialize(result);
}
