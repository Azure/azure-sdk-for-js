// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ContainerAppsPatchResource,
  containerAppsPatchResourceDeserializer,
  _PatchCollection,
  _patchCollectionDeserializer,
  PatchSkipConfig,
  patchSkipConfigSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ContainerAppsPatchesApplyOptionalParams,
  ContainerAppsPatchesSkipConfigureOptionalParams,
  ContainerAppsPatchesListByContainerAppOptionalParams,
  ContainerAppsPatchesDeleteOptionalParams,
  ContainerAppsPatchesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _applySend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  options: ContainerAppsPatchesApplyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches/{patchName}/apply{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      patchName: patchName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _applyDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerAppsPatchResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return containerAppsPatchResourceDeserializer(result.body);
}

/** Apply a Container Apps Patch resource with patch name. */
export function apply(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  options: ContainerAppsPatchesApplyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerAppsPatchResource>, ContainerAppsPatchResource> {
  return getLongRunningPoller(context, _applyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _applySend(context, resourceGroupName, containerAppName, patchName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ContainerAppsPatchResource>, ContainerAppsPatchResource>;
}

export function _skipConfigureSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  patchSkipConfig: PatchSkipConfig,
  options: ContainerAppsPatchesSkipConfigureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches/{patchName}/skipConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      patchName: patchName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: patchSkipConfigSerializer(patchSkipConfig),
  });
}

export async function _skipConfigureDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Configure the Container Apps Patch skip option by patch name. */
export function skipConfigure(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  patchSkipConfig: PatchSkipConfig,
  options: ContainerAppsPatchesSkipConfigureOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _skipConfigureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _skipConfigureSend(
        context,
        resourceGroupName,
        containerAppName,
        patchName,
        patchSkipConfig,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByContainerAppSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsPatchesListByContainerAppOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listByContainerAppDeserialize(
  result: PathUncheckedResponse,
): Promise<_PatchCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _patchCollectionDeserializer(result.body);
}

/** List Container Apps Patch resources by ContainerApp. */
export function listByContainerApp(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  options: ContainerAppsPatchesListByContainerAppOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerAppsPatchResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByContainerAppSend(context, resourceGroupName, containerAppName, options),
    _listByContainerAppDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  options: ContainerAppsPatchesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches/{patchName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      patchName: patchName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

/** Delete specific Container Apps Patch by patch name. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  options: ContainerAppsPatchesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, containerAppName, patchName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  options: ContainerAppsPatchesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/containerApps/{containerAppName}/patches/{patchName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      containerAppName: containerAppName,
      patchName: patchName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<ContainerAppsPatchResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return containerAppsPatchResourceDeserializer(result.body);
}

/** Get details for specific Container Apps Patch by patch name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  containerAppName: string,
  patchName: string,
  options: ContainerAppsPatchesGetOptionalParams = { requestOptions: {} },
): Promise<ContainerAppsPatchResource> {
  const result = await _getSend(context, resourceGroupName, containerAppName, patchName, options);
  return _getDeserialize(result);
}
