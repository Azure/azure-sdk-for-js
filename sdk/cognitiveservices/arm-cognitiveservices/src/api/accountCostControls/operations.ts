// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  AccountCostControl,
  CostControlPatch,
  _CostControlListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  accountCostControlSerializer,
  accountCostControlDeserializer,
  costControlPatchSerializer,
  _costControlListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccountCostControlsListOptionalParams,
  AccountCostControlsDeleteOptionalParams,
  AccountCostControlsUpdateOptionalParams,
  AccountCostControlsCreateOrUpdateOptionalParams,
  AccountCostControlsCheckExistenceOptionalParams,
  AccountCostControlsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountCostControlsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/costControls{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
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
): Promise<_CostControlListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _costControlListResultDeserializer(result.body);
}

/** Lists account-owned cost controls. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountCostControlsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccountCostControl> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  options: AccountCostControlsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an account-owned cost control. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  options: AccountCostControlsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    costControlName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  properties: CostControlPatch,
  options: AccountCostControlsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: costControlPatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<AccountCostControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accountCostControlDeserializer(result.body);
}

/**
 * Updates an account-owned cost control. Omitting properties preserves all existing cost control properties; setting properties to null or an empty object ({}) clears them all.
 * A non-empty properties object updates selected fields, preserving omitted fields; a successful update that leaves the cost control unchanged retains its entity tag.
 * The complete merged result may contain at most one notification, including disabled notifications, and one Block action.
 * Exceeding either limit returns HTTP 400 without changing the stored definition.
 */
export async function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  properties: CostControlPatch,
  options: AccountCostControlsUpdateOptionalParams = { requestOptions: {} },
): Promise<AccountCostControl> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    accountName,
    costControlName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  resource: AccountCostControl,
  options: AccountCostControlsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: accountCostControlSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AccountCostControl> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accountCostControlDeserializer(result.body);
}

/**
 * Creates or replaces an account-owned cost control.
 * The definition may contain at most one notification, including disabled notifications, and one Block action.
 * Exceeding either limit returns HTTP 400 without persisting the request.
 */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  resource: AccountCostControl,
  options: AccountCostControlsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AccountCostControl> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    costControlName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _checkExistenceSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  options: AccountCostControlsCheckExistenceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkExistenceDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Checks whether an account-owned cost control exists without returning its body. */
export async function checkExistence(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  options: AccountCostControlsCheckExistenceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkExistenceSend(
    context,
    resourceGroupName,
    accountName,
    costControlName,
    options,
  );
  return _checkExistenceDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  options: AccountCostControlsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/costControls/{costControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      costControlName: costControlName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AccountCostControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accountCostControlDeserializer(result.body);
}

/** Gets an account-owned cost control and its representation entity tag. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  costControlName: string,
  options: AccountCostControlsGetOptionalParams = { requestOptions: {} },
): Promise<AccountCostControl> {
  const result = await _getSend(context, resourceGroupName, accountName, costControlName, options);
  return _getDeserialize(result);
}
