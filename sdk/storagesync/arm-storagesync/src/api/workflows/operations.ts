// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSyncContext as Client } from "../index.js";
import {
  storageSyncErrorDeserializer,
  Workflow,
  workflowDeserializer,
  _WorkflowArray,
  _workflowArrayDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkflowsAbortOptionalParams,
  WorkflowsListByStorageSyncServiceOptionalParams,
  WorkflowsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _abortSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  workflowId: string,
  options: WorkflowsAbortOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/workflows/{workflowId}/abort{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      workflowId: workflowId,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _abortDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Abort the given workflow. */
export async function abort(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  workflowId: string,
  options: WorkflowsAbortOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _abortSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    workflowId,
    options,
  );
  return _abortDeserialize(result);
}

export function _listByStorageSyncServiceSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: WorkflowsListByStorageSyncServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/workflows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _listByStorageSyncServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkflowArray> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return _workflowArrayDeserializer(result.body);
}

/** Get a Workflow List */
export function listByStorageSyncService(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  options: WorkflowsListByStorageSyncServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workflow> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByStorageSyncServiceSend(context, resourceGroupName, storageSyncServiceName, options),
    _listByStorageSyncServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-09-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  workflowId: string,
  options: WorkflowsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/storageSyncServices/{storageSyncServiceName}/workflows/{workflowId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageSyncServiceName: storageSyncServiceName,
      workflowId: workflowId,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Workflow> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return workflowDeserializer(result.body);
}

/** Get Workflows resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageSyncServiceName: string,
  workflowId: string,
  options: WorkflowsGetOptionalParams = { requestOptions: {} },
): Promise<Workflow> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageSyncServiceName,
    workflowId,
    options,
  );
  return _getDeserialize(result);
}
