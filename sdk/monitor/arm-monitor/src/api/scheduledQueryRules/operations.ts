// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
  MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
  _MicrosoftScheduledQueryRuleScheduledQueryRuleResourceCollection,
} from "../../models/microsoft/scheduledQueryRule/models.js";
import {
  microsoftScheduledQueryRuleScheduledQueryRuleResourceSerializer,
  microsoftScheduledQueryRuleScheduledQueryRuleResourceDeserializer,
  microsoftScheduledQueryRuleErrorContractDeserializer,
  microsoftScheduledQueryRuleScheduledQueryRuleResourcePatchSerializer,
  _microsoftScheduledQueryRuleScheduledQueryRuleResourceCollectionDeserializer,
} from "../../models/microsoft/scheduledQueryRule/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScheduledQueryRulesListBySubscriptionOptionalParams,
  ScheduledQueryRulesListByResourceGroupOptionalParams,
  ScheduledQueryRulesDeleteOptionalParams,
  ScheduledQueryRulesUpdateOptionalParams,
  ScheduledQueryRulesCreateOrUpdateOptionalParams,
  ScheduledQueryRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: ScheduledQueryRulesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/scheduledQueryRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-01-01-preview",
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
): Promise<_MicrosoftScheduledQueryRuleScheduledQueryRuleResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftScheduledQueryRuleErrorContractDeserializer(result.body);

    throw error;
  }

  return _microsoftScheduledQueryRuleScheduledQueryRuleResourceCollectionDeserializer(result.body);
}

/** Retrieve a scheduled query rule definitions in a subscription. */
export function listBySubscription(
  context: Client,
  options: ScheduledQueryRulesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-01-01-preview" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ScheduledQueryRulesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-01-01-preview",
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
): Promise<_MicrosoftScheduledQueryRuleScheduledQueryRuleResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftScheduledQueryRuleErrorContractDeserializer(result.body);

    throw error;
  }

  return _microsoftScheduledQueryRuleScheduledQueryRuleResourceCollectionDeserializer(result.body);
}

/** Retrieve scheduled query rule definitions in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ScheduledQueryRulesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-01-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: ScheduledQueryRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2025-01-01-preview",
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
    error.details = microsoftScheduledQueryRuleErrorContractDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a scheduled query rule. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: ScheduledQueryRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, ruleName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
  options: ScheduledQueryRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftScheduledQueryRuleScheduledQueryRuleResourcePatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftScheduledQueryRuleErrorContractDeserializer(result.body);

    throw error;
  }

  return microsoftScheduledQueryRuleScheduledQueryRuleResourceDeserializer(result.body);
}

/** Update a scheduled query rule. */
export async function update(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResourcePatch,
  options: ScheduledQueryRulesUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  const result = await _updateSend(context, resourceGroupName, ruleName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
  options: ScheduledQueryRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2025-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftScheduledQueryRuleScheduledQueryRuleResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftScheduledQueryRuleErrorContractDeserializer(result.body);

    throw error;
  }

  return microsoftScheduledQueryRuleScheduledQueryRuleResourceDeserializer(result.body);
}

/** Creates or updates a scheduled query rule. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  parameters: MicrosoftScheduledQueryRuleScheduledQueryRuleResource,
  options: ScheduledQueryRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    ruleName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: ScheduledQueryRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2025-01-01-preview",
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
): Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = microsoftScheduledQueryRuleErrorContractDeserializer(result.body);

    throw error;
  }

  return microsoftScheduledQueryRuleScheduledQueryRuleResourceDeserializer(result.body);
}

/** Retrieve an scheduled query rule definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: ScheduledQueryRulesGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftScheduledQueryRuleScheduledQueryRuleResource> {
  const result = await _getSend(context, resourceGroupName, ruleName, options);
  return _getDeserialize(result);
}
