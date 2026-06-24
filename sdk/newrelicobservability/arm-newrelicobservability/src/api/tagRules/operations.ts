// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  TagRule,
  tagRuleSerializer,
  tagRuleDeserializer,
  TagRuleUpdate,
  tagRuleUpdateSerializer,
  _TagRuleListResult,
  _tagRuleListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TagRulesListByNewRelicMonitorResourceOptionalParams,
  TagRulesDeleteOptionalParams,
  TagRulesUpdateOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByNewRelicMonitorResourceSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: TagRulesListByNewRelicMonitorResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByNewRelicMonitorResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TagRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _tagRuleListResultDeserializer(result.body);
}

/** Lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring */
export function listByNewRelicMonitorResource(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: TagRulesListByNewRelicMonitorResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNewRelicMonitorResourceSend(context, resourceGroupName, monitorName, options),
    _listByNewRelicMonitorResourceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  options: TagRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      ruleSetName: ruleSetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
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

/** Deletes a tag rule set for a given New Relic monitor resource, removing fine-grained control over observability based on resource tags */
export function $delete(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  options: TagRulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, monitorName, ruleSetName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  properties: TagRuleUpdate,
  options: TagRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      ruleSetName: ruleSetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: tagRuleUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<TagRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tagRuleDeserializer(result.body);
}

/** Updates the tag rules for a specific New Relic monitor resource, allowing you to modify the rules that control which Azure resources are monitored */
export async function update(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  properties: TagRuleUpdate,
  options: TagRulesUpdateOptionalParams = { requestOptions: {} },
): Promise<TagRule> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    monitorName,
    ruleSetName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  resource: TagRule,
  options: TagRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      ruleSetName: ruleSetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: tagRuleSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<TagRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tagRuleDeserializer(result.body);
}

/** Creates a new set of tag rules for a specific New Relic monitor resource, determining which Azure resources are monitored based on their tags */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  resource: TagRule,
  options: TagRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TagRule>, TagRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, monitorName, ruleSetName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-05-01-preview",
  }) as PollerLike<OperationState<TagRule>, TagRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  options: TagRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/NewRelic.Observability/monitors/{monitorName}/tagRules/{ruleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      ruleSetName: ruleSetName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TagRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return tagRuleDeserializer(result.body);
}

/** Retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status */
export async function get(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  ruleSetName: string,
  options: TagRulesGetOptionalParams = { requestOptions: {} },
): Promise<TagRule> {
  const result = await _getSend(context, resourceGroupName, monitorName, ruleSetName, options);
  return _getDeserialize(result);
}
