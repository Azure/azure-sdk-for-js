// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  ExternalSvm,
  ExternalSvmTagsUpdate,
  _ExternalSvmListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  externalSvmSerializer,
  externalSvmDeserializer,
  externalSvmTagsUpdateSerializer,
  _externalSvmListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalSvmsListByParentOptionalParams,
  ExternalSvmsDeleteOptionalParams,
  ExternalSvmsUpdateOptionalParams,
  ExternalSvmsCreateOrUpdateOptionalParams,
  ExternalSvmsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ExternalSvmsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/externalSvms{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExternalSvmListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _externalSvmListResultDeserializer(result.body);
}

/** List all External SVMs under an External Cluster */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  options: ExternalSvmsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalSvm> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, externalClusterName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  options: ExternalSvmsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/externalSvms/{externalSvmName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      externalSvmName: externalSvmName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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

/** Delete the specified External SVM */
export function $delete(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  options: ExternalSvmsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, externalClusterName, externalSvmName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  properties: ExternalSvmTagsUpdate,
  options: ExternalSvmsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/externalSvms/{externalSvmName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      externalSvmName: externalSvmName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalSvmTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ExternalSvm> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalSvmDeserializer(result.body);
}

/** Patch the specified External SVM */
export function update(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  properties: ExternalSvmTagsUpdate,
  options: ExternalSvmsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalSvm>, ExternalSvm> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        externalClusterName,
        externalSvmName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<ExternalSvm>, ExternalSvm>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  resource: ExternalSvm,
  options: ExternalSvmsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/externalSvms/{externalSvmName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      externalSvmName: externalSvmName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: externalSvmSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalSvm> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalSvmDeserializer(result.body);
}

/** Create or update the specified External SVM */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  resource: ExternalSvm,
  options: ExternalSvmsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalSvm>, ExternalSvm> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        externalClusterName,
        externalSvmName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-15-preview",
  }) as PollerLike<OperationState<ExternalSvm>, ExternalSvm>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  options: ExternalSvmsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/externalClusters/{externalClusterName}/externalSvms/{externalSvmName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      externalClusterName: externalClusterName,
      externalSvmName: externalSvmName,
      "api%2Dversion": context.apiVersion ?? "2026-08-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExternalSvm> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return externalSvmDeserializer(result.body);
}

/** Get the External SVM resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  externalClusterName: string,
  externalSvmName: string,
  options: ExternalSvmsGetOptionalParams = { requestOptions: {} },
): Promise<ExternalSvm> {
  const result = await _getSend(
    context,
    resourceGroupName,
    externalClusterName,
    externalSvmName,
    options,
  );
  return _getDeserialize(result);
}
