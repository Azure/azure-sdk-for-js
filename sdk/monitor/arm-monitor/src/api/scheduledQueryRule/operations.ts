// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationListResult,
} from "../../models/models.js";
import {
  armErrorResponseDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
  _networkSecurityPerimeterConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScheduledQueryRuleReconcileNSPOptionalParams,
  ScheduledQueryRuleListNSPOptionalParams,
  ScheduledQueryRuleGetNSPOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileNSPSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ScheduledQueryRuleReconcileNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": "2021-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reconcileNSPDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = armErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Reconcile network security perimeter configuration for ScheduledQueryRule resource. */
export function reconcileNSP(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ScheduledQueryRuleReconcileNSPOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _reconcileNSPDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reconcileNSPSend(
        context,
        resourceGroupName,
        ruleName,
        networkSecurityPerimeterConfigurationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2021-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listNSPSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: ScheduledQueryRuleListNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      "api%2Dversion": "2021-10-01",
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

export async function _listNSPDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = armErrorResponseDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterConfigurationListResultDeserializer(result.body);
}

/** Gets a list of NSP configurations for specified scheduled query rule. */
export function listNSP(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  options: ScheduledQueryRuleListNSPOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listNSPSend(context, resourceGroupName, ruleName, options),
    _listNSPDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-10-01" },
  );
}

export function _getNSPSend(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ScheduledQueryRuleGetNSPOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/scheduledQueryRules/{ruleName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ruleName: ruleName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": "2021-10-01",
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

export async function _getNSPDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = armErrorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Gets a network security perimeter configuration. */
export async function getNSP(
  context: Client,
  resourceGroupName: string,
  ruleName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: ScheduledQueryRuleGetNSPOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getNSPSend(
    context,
    resourceGroupName,
    ruleName,
    networkSecurityPerimeterConfigurationName,
    options,
  );
  return _getNSPDeserialize(result);
}
