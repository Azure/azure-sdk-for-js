// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type { Rule, RuleUpdateParameters, _RuleListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  ruleSerializer,
  ruleDeserializer,
  ruleUpdateParametersSerializer,
  _ruleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RulesListByRuleSetOptionalParams,
  RulesDeleteOptionalParams,
  RulesUpdateOptionalParams,
  RulesCreateOptionalParams,
  RulesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByRuleSetSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  options: RulesListByRuleSetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      ruleSetName: ruleSetName,
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

export async function _listByRuleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<_RuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _ruleListResultDeserializer(result.body);
}

/** Lists all of the existing delivery rules within a rule set. */
export function listByRuleSet(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  options: RulesListByRuleSetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Rule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByRuleSetSend(context, resourceGroupName, profileName, ruleSetName, options),
    _listByRuleSetDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  options: RulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      ruleSetName: ruleSetName,
      ruleName: ruleName,
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

/** Deletes an existing delivery rule within a rule set. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  options: RulesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, ruleSetName, ruleName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  ruleUpdateProperties: RuleUpdateParameters,
  options: RulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      ruleSetName: ruleSetName,
      ruleName: ruleName,
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
    body: ruleUpdateParametersSerializer(ruleUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ruleDeserializer(result.body);
}

/** Updates an existing delivery rule within a rule set. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  ruleUpdateProperties: RuleUpdateParameters,
  options: RulesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Rule>, Rule> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        profileName,
        ruleSetName,
        ruleName,
        ruleUpdateProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Rule>, Rule>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  rule: Rule,
  options: RulesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      ruleSetName: ruleSetName,
      ruleName: ruleName,
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
    body: ruleSerializer(rule),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ruleDeserializer(result.body);
}

/** Creates a new delivery rule within the specified rule set. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  rule: Rule,
  options: RulesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Rule>, Rule> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, ruleSetName, ruleName, rule, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<Rule>, Rule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  options: RulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/ruleSets/{ruleSetName}/rules/{ruleName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      ruleSetName: ruleSetName,
      ruleName: ruleName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Rule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return ruleDeserializer(result.body);
}

/** Gets an existing delivery rule within a rule set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  ruleSetName: string,
  ruleName: string,
  options: RulesGetOptionalParams = { requestOptions: {} },
): Promise<Rule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    profileName,
    ruleSetName,
    ruleName,
    options,
  );
  return _getDeserialize(result);
}
