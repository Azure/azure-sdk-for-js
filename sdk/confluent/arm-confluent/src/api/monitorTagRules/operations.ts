// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext as Client } from "../index.js";
import type { MonitorTagRule, _MonitorTagRuleListResult } from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  monitorTagRuleSerializer,
  monitorTagRuleDeserializer,
  _monitorTagRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MonitorTagRulesListByMonitorOptionalParams,
  MonitorTagRulesDeleteOptionalParams,
  MonitorTagRulesCreateOrUpdateOptionalParams,
  MonitorTagRulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByMonitorSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  options: MonitorTagRulesListByMonitorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}/tagRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
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

export async function _listByMonitorDeserialize(
  result: PathUncheckedResponse,
): Promise<_MonitorTagRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _monitorTagRuleListResultDeserializer(result.body);
}

/** Lists the rule sets configured for a Confluent monitor. */
export function listByMonitor(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  options: MonitorTagRulesListByMonitorOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MonitorTagRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByMonitorSend(context, resourceGroupName, organizationName, monitorName, options),
    _listByMonitorDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-21-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  ruleSetName: string,
  options: MonitorTagRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}/tagRules/{ruleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      ruleSetName: ruleSetName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
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
      error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a named rule set from a Confluent monitor. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  ruleSetName: string,
  options: MonitorTagRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    organizationName,
    monitorName,
    ruleSetName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  ruleSetName: string,
  resource: MonitorTagRule,
  options: MonitorTagRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}/tagRules/{ruleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      ruleSetName: ruleSetName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: monitorTagRuleSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MonitorTagRule> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorTagRuleDeserializer(result.body);
}

/**
 * Creates or fully replaces a named rule set that specifies which Azure logs
 * are sent through a Confluent monitor.
 */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  ruleSetName: string,
  resource: MonitorTagRule,
  options: MonitorTagRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MonitorTagRule> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    organizationName,
    monitorName,
    ruleSetName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  ruleSetName: string,
  options: MonitorTagRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/monitors/{monitorName}/tagRules/{ruleSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      monitorName: monitorName,
      ruleSetName: ruleSetName,
      "api%2Dversion": context.apiVersion ?? "2026-10-21-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<MonitorTagRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return monitorTagRuleDeserializer(result.body);
}

/** Gets a named rule set for a Confluent monitor. */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  monitorName: string,
  ruleSetName: string,
  options: MonitorTagRulesGetOptionalParams = { requestOptions: {} },
): Promise<MonitorTagRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    monitorName,
    ruleSetName,
    options,
  );
  return _getDeserialize(result);
}
