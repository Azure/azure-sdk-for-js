// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateTrafficManagerManagementContext as Client } from "../index.js";
import type { HealthPolicyUnion, _HealthPolicyListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  healthPolicyUnionSerializer,
  healthPolicyUnionDeserializer,
  _healthPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HealthPoliciesListByParentOptionalParams,
  HealthPoliciesDeleteOptionalParams,
  HealthPoliciesCreateOrUpdateOptionalParams,
  HealthPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: HealthPoliciesListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/healthPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_HealthPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _healthPolicyListResultDeserializer(result.body);
}

/** Lists all Health Policies within a Traffic Manager profile. */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: HealthPoliciesListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HealthPolicyUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, privateTrafficManagerProfileName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  healthPolicyName: string,
  options: HealthPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/healthPolicies/{healthPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      healthPolicyName: healthPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a Traffic Manager health policy. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  healthPolicyName: string,
  options: HealthPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        healthPolicyName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  healthPolicyName: string,
  resource: HealthPolicyUnion,
  options: HealthPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/healthPolicies/{healthPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      healthPolicyName: healthPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: healthPolicyUnionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HealthPolicyUnion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return healthPolicyUnionDeserializer(result.body);
}

/** Create or update a Traffic Manager health policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  healthPolicyName: string,
  resource: HealthPolicyUnion,
  options: HealthPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HealthPolicyUnion>, HealthPolicyUnion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        healthPolicyName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<HealthPolicyUnion>, HealthPolicyUnion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  healthPolicyName: string,
  options: HealthPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}/healthPolicies/{healthPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      healthPolicyName: healthPolicyName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HealthPolicyUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return healthPolicyUnionDeserializer(result.body);
}

/** Gets a Traffic Manager health policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  healthPolicyName: string,
  options: HealthPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<HealthPolicyUnion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    privateTrafficManagerProfileName,
    healthPolicyName,
    options,
  );
  return _getDeserialize(result);
}
