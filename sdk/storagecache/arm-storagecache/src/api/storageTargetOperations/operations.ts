// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StorageTargetOperationsInvalidateOptionalParams,
  StorageTargetOperationsResumeOptionalParams,
  StorageTargetOperationsSuspendOptionalParams,
  StorageTargetOperationsFlushOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _invalidateSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsInvalidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/invalidate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      storageTargetName: storageTargetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _invalidateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Invalidate all cached data for a storage target. Cached files are discarded and fetched from the back end on the next request. */
export function invalidate(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsInvalidateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _invalidateDeserialize, ["202", "200", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _invalidateSend(context, resourceGroupName, cacheName, storageTargetName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      storageTargetName: storageTargetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resumeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Resumes client access to a previously suspended storage target. */
export function resume(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _resumeDeserialize, ["202", "200", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeSend(context, resourceGroupName, cacheName, storageTargetName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _suspendSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/suspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      storageTargetName: storageTargetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _suspendDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Suspends client access to a storage target. */
export function suspend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsSuspendOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _suspendDeserialize, ["202", "200", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _suspendSend(context, resourceGroupName, cacheName, storageTargetName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _flushSend(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsFlushOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/caches/{cacheName}/storageTargets/{storageTargetName}/flush{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cacheName: cacheName,
      storageTargetName: storageTargetName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _flushDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes. */
export function flush(
  context: Client,
  resourceGroupName: string,
  cacheName: string,
  storageTargetName: string,
  options: StorageTargetOperationsFlushOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _flushDeserialize, ["202", "200", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _flushSend(context, resourceGroupName, cacheName, storageTargetName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}
