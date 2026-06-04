// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  DscNodeConfiguration,
  DscNodeConfigurationCreateOrUpdateParameters,
  _DscNodeConfigurationListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dscNodeConfigurationDeserializer,
  dscNodeConfigurationCreateOrUpdateParametersSerializer,
  _dscNodeConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DscNodeConfigurationListByAutomationAccountOptionalParams,
  DscNodeConfigurationDeleteOptionalParams,
  DscNodeConfigurationCreateOrUpdateOptionalParams,
  DscNodeConfigurationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: DscNodeConfigurationListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations{?api%2Dversion,%24filter,%24skip,%24top,%24inlinecount}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
      "%24skip": options?.skip,
      "%24top": options?.top,
      "%24inlinecount": options?.inlinecount,
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

export async function _listByAutomationAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_DscNodeConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dscNodeConfigurationListResultDeserializer(result.body);
}

/** Retrieve a list of dsc node configurations. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: DscNodeConfigurationListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DscNodeConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAutomationAccountSend(context, resourceGroupName, automationAccountName, options),
    _listByAutomationAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeConfigurationName: nodeConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete the Dsc node configurations by node configuration. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    nodeConfigurationName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  parameters: DscNodeConfigurationCreateOrUpdateParameters,
  options: DscNodeConfigurationCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeConfigurationName: nodeConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dscNodeConfigurationCreateOrUpdateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DscNodeConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscNodeConfigurationDeserializer(result.body);
}

/** Create the node configuration identified by node configuration name. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  parameters: DscNodeConfigurationCreateOrUpdateParameters,
  options: DscNodeConfigurationCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        automationAccountName,
        nodeConfigurationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-10-23",
  }) as PollerLike<OperationState<DscNodeConfiguration>, DscNodeConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/nodeConfigurations/{nodeConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      nodeConfigurationName: nodeConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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
): Promise<DscNodeConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dscNodeConfigurationDeserializer(result.body);
}

/** Retrieve the Dsc node configurations by node configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  nodeConfigurationName: string,
  options: DscNodeConfigurationGetOptionalParams = { requestOptions: {} },
): Promise<DscNodeConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    nodeConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
