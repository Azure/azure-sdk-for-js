// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedOpsContext as Client } from "../index.js";
import type { ManagedOp, _ManagedOpListResult, ManagedOpUpdate } from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedOpSerializer,
  managedOpDeserializer,
  _managedOpListResultDeserializer,
  managedOpUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedOpsDeleteOptionalParams,
  ManagedOpsUpdateOptionalParams,
  ManagedOpsListOptionalParams,
  ManagedOpsCreateOrUpdateOptionalParams,
  ManagedOpsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  managedOpsName: string,
  options: ManagedOpsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedOps/managedOps/{managedOpsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      managedOpsName: managedOpsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-28-preview",
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the ManagedOps instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  managedOpsName: string,
  options: ManagedOpsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, managedOpsName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-28-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  managedOpsName: string,
  properties: ManagedOpUpdate,
  options: ManagedOpsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedOps/managedOps/{managedOpsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      managedOpsName: managedOpsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-28-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedOpUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagedOp> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedOpDeserializer(result.body);
}

/** Updates the ManagedOps instance with the supplied fields. */
export function update(
  context: Client,
  managedOpsName: string,
  properties: ManagedOpUpdate,
  options: ManagedOpsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedOp>, ManagedOp> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, managedOpsName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-28-preview",
  }) as PollerLike<OperationState<ManagedOp>, ManagedOp>;
}

export function _listSend(
  context: Client,
  options: ManagedOpsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedOps/managedOps{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-07-28-preview",
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
): Promise<_ManagedOpListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedOpListResultDeserializer(result.body);
}

/** List all ManagedOps instances in the subscription. */
export function list(
  context: Client,
  options: ManagedOpsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedOp> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-28-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  managedOpsName: string,
  resource: ManagedOp,
  options: ManagedOpsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedOps/managedOps/{managedOpsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      managedOpsName: managedOpsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-28-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedOpSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedOp> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedOpDeserializer(result.body);
}

/** Creates or updates the ManagedOps instance. */
export function createOrUpdate(
  context: Client,
  managedOpsName: string,
  resource: ManagedOp,
  options: ManagedOpsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedOp>, ManagedOp> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, managedOpsName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-28-preview",
  }) as PollerLike<OperationState<ManagedOp>, ManagedOp>;
}

export function _getSend(
  context: Client,
  managedOpsName: string,
  options: ManagedOpsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedOps/managedOps/{managedOpsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      managedOpsName: managedOpsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-28-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedOp> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedOpDeserializer(result.body);
}

/** Gets the information of the ManagedOps instance. */
export async function get(
  context: Client,
  managedOpsName: string,
  options: ManagedOpsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedOp> {
  const result = await _getSend(context, managedOpsName, options);
  return _getDeserialize(result);
}
