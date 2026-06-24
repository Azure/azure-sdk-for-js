// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  StorageClassResource,
  storageClassResourceSerializer,
  storageClassResourceDeserializer,
  errorResponseDeserializer,
  StorageClassResourceUpdate,
  storageClassResourceUpdateSerializer,
  _StorageClassResourceListResult,
  _storageClassResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StorageClassListOptionalParams,
  StorageClassDeleteOptionalParams,
  StorageClassUpdateOptionalParams,
  StorageClassCreateOrUpdateOptionalParams,
  StorageClassGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceUri: string,
  options: StorageClassListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_StorageClassResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _storageClassResourceListResultDeserializer(result.body);
}

/** List StorageClassResource resources by parent */
export function list(
  context: Client,
  resourceUri: string,
  options: StorageClassListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StorageClassResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      storageClassName: storageClassName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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

/** Delete a StorageClassResource */
export function $delete(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, storageClassName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-03-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  properties: StorageClassResourceUpdate,
  options: StorageClassUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      storageClassName: storageClassName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: storageClassResourceUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageClassResourceDeserializer(result.body);
}

/** Update a StorageClassResource */
export function update(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  properties: StorageClassResourceUpdate,
  options: StorageClassUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageClassResource>, StorageClassResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceUri, storageClassName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-03-01",
  }) as PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  resource: StorageClassResource,
  options: StorageClassCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      storageClassName: storageClassName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: storageClassResourceSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageClassResourceDeserializer(result.body);
}

/** Create a StorageClassResource */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  resource: StorageClassResource,
  options: StorageClassCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<StorageClassResource>, StorageClassResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceUri, storageClassName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-03-01",
  }) as PollerLike<OperationState<StorageClassResource>, StorageClassResource>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.KubernetesRuntime/storageClasses/{storageClassName}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      storageClassName: storageClassName,
      "api%2Dversion": context.apiVersion ?? "2024-03-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageClassResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return storageClassResourceDeserializer(result.body);
}

/** Get a StorageClassResource */
export async function get(
  context: Client,
  resourceUri: string,
  storageClassName: string,
  options: StorageClassGetOptionalParams = { requestOptions: {} },
): Promise<StorageClassResource> {
  const result = await _getSend(context, resourceUri, storageClassName, options);
  return _getDeserialize(result);
}
