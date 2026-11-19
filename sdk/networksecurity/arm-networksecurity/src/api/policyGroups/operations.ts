// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type { PolicyGroup } from "../../models/microsoft/networkSecurity/models.js";
import {
  policyGroupSerializer,
  policyGroupDeserializer,
} from "../../models/microsoft/networkSecurity/models.js";
import type { PolicyGroupTagsUpdate, _PolicyGroupListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  policyGroupTagsUpdateSerializer,
  _policyGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PolicyGroupsListBySubscriptionOptionalParams,
  PolicyGroupsListByResourceGroupOptionalParams,
  PolicyGroupsDeleteOptionalParams,
  PolicyGroupsUpdateOptionalParams,
  PolicyGroupsCreateOrUpdateOptionalParams,
  PolicyGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: PolicyGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkSecurity/policyGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _policyGroupListResultDeserializer(result.body);
}

/** List PolicyGroup resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: PolicyGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-11-03-preview" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PolicyGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/policyGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PolicyGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _policyGroupListResultDeserializer(result.body);
}

/** List PolicyGroup resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PolicyGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PolicyGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-11-03-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  options: PolicyGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/policyGroups/{policyGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyGroupName: policyGroupName,
      "api%2Dversion": "2026-11-03-preview",
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

/** Delete a PolicyGroup */
export function $delete(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  options: PolicyGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, policyGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  properties: PolicyGroupTagsUpdate,
  options: PolicyGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/policyGroups/{policyGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyGroupName: policyGroupName,
      "api%2Dversion": "2026-11-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyGroupTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PolicyGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return policyGroupDeserializer(result.body);
}

/** Update a PolicyGroup */
export function update(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  properties: PolicyGroupTagsUpdate,
  options: PolicyGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PolicyGroup>, PolicyGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, policyGroupName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<PolicyGroup>, PolicyGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  resource: PolicyGroup,
  options: PolicyGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/policyGroups/{policyGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyGroupName: policyGroupName,
      "api%2Dversion": "2026-11-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: policyGroupSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return policyGroupDeserializer(result.body);
}

/**
 * Creates or replaces a PolicyGroup.
 *
 * If the PUT introduces a ContentInspection policy in networkSecurityPolicies and any
 * associated fabric has no configured inspection connection, reject the
 * request with HTTP 409 and error code ContentInspectionCapabilityDisabled, targeting
 * properties.networkSecurityPolicies. Validate before persisting or distributing policy changes,
 * preserving the previously accepted policies on rejection. Do not partially apply changes to
 * compatible fabrics or silently skip inspection for fabrics without an inspection connection.
 *
 * Compatibility uses the associated fabrics' stored configuration, independent of whether
 * policy selectors currently match traffic. This is a configuration check, not a fresh Content
 * Safety connectivity probe. Changes that do not introduce ContentInspection policies do not
 * require this check; transient connection failures do not remove a fabric's configuration.
 * Existing legacy fabrics without a profile retain their regional Content Safety connection,
 * which satisfies the inspection prerequisite without new probes, management calls, or key
 * retrieval. A connection still being validated is not an absent connection.
 * Unattached groups and groups associated only with compatible fabrics may
 * contain ContentInspection policies. Removing those policies or detaching a group
 * remains allowed, subject to other validation. Tags-only PATCH does not change policy contents.
 * Error messages must not disclose associated fabric IDs the caller is not authorized to read.
 *
 * Example rejection response (HTTP 409 Conflict):
 *
 * ```json
 * {
 *   "error": {
 *     "code": "ContentInspectionCapabilityDisabled",
 *     "message": "The proposed ContentInspection policy is incompatible with an associated fabric that has no configured inspection connection.",
 *     "target": "properties.networkSecurityPolicies"
 *   }
 * }
 * ```
 */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  resource: PolicyGroup,
  options: PolicyGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PolicyGroup>, PolicyGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, policyGroupName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2026-11-03-preview",
  }) as PollerLike<OperationState<PolicyGroup>, PolicyGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  options: PolicyGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/policyGroups/{policyGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      policyGroupName: policyGroupName,
      "api%2Dversion": "2026-11-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PolicyGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return policyGroupDeserializer(result.body);
}

/** Get a PolicyGroup */
export async function get(
  context: Client,
  resourceGroupName: string,
  policyGroupName: string,
  options: PolicyGroupsGetOptionalParams = { requestOptions: {} },
): Promise<PolicyGroup> {
  const result = await _getSend(context, resourceGroupName, policyGroupName, options);
  return _getDeserialize(result);
}
