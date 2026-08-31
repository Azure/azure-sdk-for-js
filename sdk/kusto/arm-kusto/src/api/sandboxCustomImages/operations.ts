// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext as Client } from "../index.js";
import type {
  CheckNameResult,
  SandboxCustomImage,
  _SandboxCustomImagesListResult,
  SandboxCustomImagesCheckNameRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameResultDeserializer,
  sandboxCustomImageSerializer,
  sandboxCustomImageDeserializer,
  _sandboxCustomImagesListResultDeserializer,
  sandboxCustomImagesCheckNameRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SandboxCustomImagesCheckNameAvailabilityOptionalParams,
  SandboxCustomImagesListByClusterOptionalParams,
  SandboxCustomImagesDeleteOptionalParams,
  SandboxCustomImagesUpdateOptionalParams,
  SandboxCustomImagesCreateOrUpdateOptionalParams,
  SandboxCustomImagesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resourceName: SandboxCustomImagesCheckNameRequest,
  options: SandboxCustomImagesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImagesCheckNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sandboxCustomImagesCheckNameRequestSerializer(resourceName),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameResultDeserializer(result.body);
}

/** Checks that the sandbox custom image resource name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resourceName: SandboxCustomImagesCheckNameRequest,
  options: SandboxCustomImagesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    clusterName,
    resourceName,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: SandboxCustomImagesListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_SandboxCustomImagesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sandboxCustomImagesListResultDeserializer(result.body);
}

/** Returns the list of the existing sandbox custom images of the given Kusto cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: SandboxCustomImagesListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SandboxCustomImage> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-02-14" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  options: SandboxCustomImagesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      sandboxCustomImageName: sandboxCustomImageName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a sandbox custom image. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  options: SandboxCustomImagesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, sandboxCustomImageName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  parameters: SandboxCustomImage,
  options: SandboxCustomImagesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      sandboxCustomImageName: sandboxCustomImageName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sandboxCustomImageSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SandboxCustomImage> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sandboxCustomImageDeserializer(result.body);
}

/** Updates a sandbox custom image. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  parameters: SandboxCustomImage,
  options: SandboxCustomImagesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  parameters: SandboxCustomImage,
  options: SandboxCustomImagesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      sandboxCustomImageName: sandboxCustomImageName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sandboxCustomImageSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SandboxCustomImage> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sandboxCustomImageDeserializer(result.body);
}

/** Creates or updates a sandbox custom image. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  parameters: SandboxCustomImage,
  options: SandboxCustomImagesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-14",
  }) as PollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  options: SandboxCustomImagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Kusto/clusters/{clusterName}/sandboxCustomImages/{sandboxCustomImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      sandboxCustomImageName: sandboxCustomImageName,
      "api%2Dversion": context.apiVersion ?? "2025-02-14",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SandboxCustomImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sandboxCustomImageDeserializer(result.body);
}

/** Returns a sandbox custom image */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  sandboxCustomImageName: string,
  options: SandboxCustomImagesGetOptionalParams = { requestOptions: {} },
): Promise<SandboxCustomImage> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    sandboxCustomImageName,
    options,
  );
  return _getDeserialize(result);
}
