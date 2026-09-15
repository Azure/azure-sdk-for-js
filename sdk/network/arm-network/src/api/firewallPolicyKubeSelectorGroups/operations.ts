// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { FirewallPolicyKubeSelectorGroup } from "../../models/microsoft/network/models.js";
import {
  firewallPolicyKubeSelectorGroupSerializer,
  firewallPolicyKubeSelectorGroupDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _FirewallPolicyKubeSelectorGroupListResult } from "../../models/models.js";
import { _firewallPolicyKubeSelectorGroupListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FirewallPolicyKubeSelectorGroupsListOptionalParams,
  FirewallPolicyKubeSelectorGroupsDeleteOptionalParams,
  FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams,
  FirewallPolicyKubeSelectorGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyKubeSelectorGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/kubeSelectorGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      "api%2Dversion": "2025-09-01",
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
): Promise<_FirewallPolicyKubeSelectorGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _firewallPolicyKubeSelectorGroupListResultDeserializer(result.body);
}

/** Lists all FirewallPolicyKubeSelectorGroups in a FirewallPolicy resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyKubeSelectorGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirewallPolicyKubeSelectorGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, firewallPolicyName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  kubeSelectorGroupName: string,
  options: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/kubeSelectorGroups/{kubeSelectorGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      kubeSelectorGroupName: kubeSelectorGroupName,
      "api%2Dversion": "2025-09-01",
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified FirewallPolicyKubeSelectorGroup. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  kubeSelectorGroupName: string,
  options: FirewallPolicyKubeSelectorGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, firewallPolicyName, kubeSelectorGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  kubeSelectorGroupName: string,
  resource: FirewallPolicyKubeSelectorGroup,
  options: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/kubeSelectorGroups/{kubeSelectorGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      kubeSelectorGroupName: kubeSelectorGroupName,
      "api%2Dversion": "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: firewallPolicyKubeSelectorGroupSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallPolicyKubeSelectorGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return firewallPolicyKubeSelectorGroupDeserializer(result.body);
}

/** Creates or updates the specified FirewallPolicyKubeSelectorGroup. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  kubeSelectorGroupName: string,
  resource: FirewallPolicyKubeSelectorGroup,
  options: FirewallPolicyKubeSelectorGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FirewallPolicyKubeSelectorGroup>, FirewallPolicyKubeSelectorGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        firewallPolicyName,
        kubeSelectorGroupName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-09-01",
  }) as PollerLike<
    OperationState<FirewallPolicyKubeSelectorGroup>,
    FirewallPolicyKubeSelectorGroup
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  kubeSelectorGroupName: string,
  options: FirewallPolicyKubeSelectorGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/kubeSelectorGroups/{kubeSelectorGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      kubeSelectorGroupName: kubeSelectorGroupName,
      "api%2Dversion": "2025-09-01",
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
): Promise<FirewallPolicyKubeSelectorGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return firewallPolicyKubeSelectorGroupDeserializer(result.body);
}

/** Gets the specified FirewallPolicyKubeSelectorGroup. */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  kubeSelectorGroupName: string,
  options: FirewallPolicyKubeSelectorGroupsGetOptionalParams = { requestOptions: {} },
): Promise<FirewallPolicyKubeSelectorGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    kubeSelectorGroupName,
    options,
  );
  return _getDeserialize(result);
}
