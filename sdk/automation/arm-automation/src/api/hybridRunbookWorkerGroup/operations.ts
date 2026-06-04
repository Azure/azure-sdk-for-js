// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  HybridRunbookWorkerGroup,
  HybridRunbookWorkerGroupCreateOrUpdateParameters,
  _HybridRunbookWorkerGroupsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  hybridRunbookWorkerGroupDeserializer,
  hybridRunbookWorkerGroupCreateOrUpdateParametersSerializer,
  _hybridRunbookWorkerGroupsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HybridRunbookWorkerGroupListByAutomationAccountOptionalParams,
  HybridRunbookWorkerGroupDeleteOptionalParams,
  HybridRunbookWorkerGroupUpdateOptionalParams,
  HybridRunbookWorkerGroupCreateOptionalParams,
  HybridRunbookWorkerGroupGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: HybridRunbookWorkerGroupListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
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
): Promise<_HybridRunbookWorkerGroupsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hybridRunbookWorkerGroupsListResultDeserializer(result.body);
}

/** Retrieve a list of hybrid runbook worker groups. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: HybridRunbookWorkerGroupListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HybridRunbookWorkerGroup> {
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
  hybridRunbookWorkerGroupName: string,
  options: HybridRunbookWorkerGroupDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
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

/** Delete a hybrid runbook worker group. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  options: HybridRunbookWorkerGroupDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerGroupUpdationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
  options: HybridRunbookWorkerGroupUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hybridRunbookWorkerGroupCreateOrUpdateParametersSerializer(
      hybridRunbookWorkerGroupUpdationParameters,
    ),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridRunbookWorkerGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridRunbookWorkerGroupDeserializer(result.body);
}

/** Update a hybrid runbook worker group. */
export async function update(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerGroupUpdationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
  options: HybridRunbookWorkerGroupUpdateOptionalParams = { requestOptions: {} },
): Promise<HybridRunbookWorkerGroup> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerGroupUpdationParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerGroupCreationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
  options: HybridRunbookWorkerGroupCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
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
    body: hybridRunbookWorkerGroupCreateOrUpdateParametersSerializer(
      hybridRunbookWorkerGroupCreationParameters,
    ),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<HybridRunbookWorkerGroup> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridRunbookWorkerGroupDeserializer(result.body);
}

/** Create a hybrid runbook worker group. */
export async function create(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  hybridRunbookWorkerGroupCreationParameters: HybridRunbookWorkerGroupCreateOrUpdateParameters,
  options: HybridRunbookWorkerGroupCreateOptionalParams = { requestOptions: {} },
): Promise<HybridRunbookWorkerGroup> {
  const result = await _createSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    hybridRunbookWorkerGroupCreationParameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  options: HybridRunbookWorkerGroupGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/hybridRunbookWorkerGroups/{hybridRunbookWorkerGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      hybridRunbookWorkerGroupName: hybridRunbookWorkerGroupName,
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
): Promise<HybridRunbookWorkerGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hybridRunbookWorkerGroupDeserializer(result.body);
}

/** Retrieve a hybrid runbook worker group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  hybridRunbookWorkerGroupName: string,
  options: HybridRunbookWorkerGroupGetOptionalParams = { requestOptions: {} },
): Promise<HybridRunbookWorkerGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    hybridRunbookWorkerGroupName,
    options,
  );
  return _getDeserialize(result);
}
