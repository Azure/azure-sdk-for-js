// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext as Client } from "../index.js";
import type {
  ContainerImage,
  ContainerImageUpdate,
  _ContainerImageListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  containerImageSerializer,
  containerImageDeserializer,
  containerImageUpdateSerializer,
  _containerImageListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContainerImagesListByResourceGroupOptionalParams,
  ContainerImagesDeleteOptionalParams,
  ContainerImagesUpdateOptionalParams,
  ContainerImagesCreateOrUpdateOptionalParams,
  ContainerImagesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  options: ContainerImagesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/containerImages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerImageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerImageListResultDeserializer(result.body);
}

/** Lists container images in a cloud. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  options: ContainerImagesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerImage> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, cloudName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  options: ContainerImagesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/containerImages/{containerImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      containerImageName: containerImageName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

/** Deletes a container image. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  options: ContainerImagesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudName, containerImageName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  properties: ContainerImageUpdate,
  options: ContainerImagesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/containerImages/{containerImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      containerImageName: containerImageName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: containerImageUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ContainerImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerImageDeserializer(result.body);
}

/** Updates a container image. */
export async function update(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  properties: ContainerImageUpdate,
  options: ContainerImagesUpdateOptionalParams = { requestOptions: {} },
): Promise<ContainerImage> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    cloudName,
    containerImageName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  resource: ContainerImage,
  options: ContainerImagesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/containerImages/{containerImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      containerImageName: containerImageName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: containerImageSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerImage> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerImageDeserializer(result.body);
}

/** Creates or updates a container image. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  resource: ContainerImage,
  options: ContainerImagesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerImage>, ContainerImage> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudName,
        containerImageName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<ContainerImage>, ContainerImage>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  options: ContainerImagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/containerImages/{containerImageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      containerImageName: containerImageName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ContainerImage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerImageDeserializer(result.body);
}

/** Gets a container image. */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  containerImageName: string,
  options: ContainerImagesGetOptionalParams = { requestOptions: {} },
): Promise<ContainerImage> {
  const result = await _getSend(context, resourceGroupName, cloudName, containerImageName, options);
  return _getDeserialize(result);
}
