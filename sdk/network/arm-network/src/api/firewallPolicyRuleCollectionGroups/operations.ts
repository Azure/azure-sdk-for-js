// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { FirewallPolicyRuleCollectionGroup } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  firewallPolicyRuleCollectionGroupSerializer,
  firewallPolicyRuleCollectionGroupDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _FirewallPolicyRuleCollectionGroupListResult } from "../../models/models.js";
import { _firewallPolicyRuleCollectionGroupListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FirewallPolicyRuleCollectionGroupsListOptionalParams,
  FirewallPolicyRuleCollectionGroupsDeleteOptionalParams,
  FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams,
  FirewallPolicyRuleCollectionGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyRuleCollectionGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
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
): Promise<_FirewallPolicyRuleCollectionGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _firewallPolicyRuleCollectionGroupListResultDeserializer(result.body);
}

/** Lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  options: FirewallPolicyRuleCollectionGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirewallPolicyRuleCollectionGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, firewallPolicyName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      ruleCollectionGroupName: ruleCollectionGroupName,
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

/** Deletes the specified FirewallPolicyRuleCollectionGroup. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  parameters: FirewallPolicyRuleCollectionGroup,
  options: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      ruleCollectionGroupName: ruleCollectionGroupName,
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
    body: firewallPolicyRuleCollectionGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallPolicyRuleCollectionGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return firewallPolicyRuleCollectionGroupDeserializer(result.body);
}

/** Creates or updates the specified FirewallPolicyRuleCollectionGroup. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  parameters: FirewallPolicyRuleCollectionGroup,
  options: FirewallPolicyRuleCollectionGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<FirewallPolicyRuleCollectionGroup>,
  FirewallPolicyRuleCollectionGroup
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        firewallPolicyName,
        ruleCollectionGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<FirewallPolicyRuleCollectionGroup>,
    FirewallPolicyRuleCollectionGroup
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firewallPolicyName: firewallPolicyName,
      ruleCollectionGroupName: ruleCollectionGroupName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<FirewallPolicyRuleCollectionGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return firewallPolicyRuleCollectionGroupDeserializer(result.body);
}

/** Gets the specified FirewallPolicyRuleCollectionGroup. */
export async function get(
  context: Client,
  resourceGroupName: string,
  firewallPolicyName: string,
  ruleCollectionGroupName: string,
  options: FirewallPolicyRuleCollectionGroupsGetOptionalParams = { requestOptions: {} },
): Promise<FirewallPolicyRuleCollectionGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    firewallPolicyName,
    ruleCollectionGroupName,
    options,
  );
  return _getDeserialize(result);
}
