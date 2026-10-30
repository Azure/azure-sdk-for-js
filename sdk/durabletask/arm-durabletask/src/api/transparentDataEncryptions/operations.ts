// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext as Client } from "../index.js";
import type {
  TransparentDataEncryption,
  _TransparentDataEncryptionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  transparentDataEncryptionSerializer,
  transparentDataEncryptionDeserializer,
  _transparentDataEncryptionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TransparentDataEncryptionsListBySchedulerOptionalParams,
  TransparentDataEncryptionsDeleteOptionalParams,
  TransparentDataEncryptionsCreateOrReplaceOptionalParams,
  TransparentDataEncryptionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySchedulerSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: TransparentDataEncryptionsListBySchedulerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/transparentDataEncryptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listBySchedulerDeserialize(
  result: PathUncheckedResponse,
): Promise<_TransparentDataEncryptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _transparentDataEncryptionListResultDeserializer(result.body);
}

/** List Transparent Data Encryptions */
export function listByScheduler(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: TransparentDataEncryptionsListBySchedulerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TransparentDataEncryption> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySchedulerSend(context, resourceGroupName, schedulerName, options),
    _listBySchedulerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: TransparentDataEncryptionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/transparentDataEncryptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Transparent Data Encryption */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: TransparentDataEncryptionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, schedulerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: TransparentDataEncryption,
  options: TransparentDataEncryptionsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/transparentDataEncryptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: transparentDataEncryptionSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<TransparentDataEncryption> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return transparentDataEncryptionDeserializer(result.body);
}

/** Create or Update a Transparent Data Encryption */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: TransparentDataEncryption,
  options: TransparentDataEncryptionsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<TransparentDataEncryption>, TransparentDataEncryption> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, schedulerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<TransparentDataEncryption>, TransparentDataEncryption>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: TransparentDataEncryptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/transparentDataEncryptions/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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
): Promise<TransparentDataEncryption> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return transparentDataEncryptionDeserializer(result.body);
}

/** Get a Transparent Data Encryption */
export async function get(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: TransparentDataEncryptionsGetOptionalParams = { requestOptions: {} },
): Promise<TransparentDataEncryption> {
  const result = await _getSend(context, resourceGroupName, schedulerName, options);
  return _getDeserialize(result);
}
