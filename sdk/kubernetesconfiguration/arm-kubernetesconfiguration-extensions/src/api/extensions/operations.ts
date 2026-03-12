// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KubernetesConfigurationContext as Client } from "../index.js";
import type { Extension, PatchExtension, _ExtensionsList } from "../../models/models.js";
import {
  extensionSerializer,
  extensionDeserializer,
  errorResponseDeserializer,
  patchExtensionSerializer,
  _extensionsListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExtensionsListOptionalParams,
  ExtensionsDeleteOptionalParams,
  ExtensionsUpdateOptionalParams,
  ExtensionsCreateOptionalParams,
  ExtensionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  options: ExtensionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ExtensionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _extensionsListDeserializer(result.body);
}

/** List all Extensions in the cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  options: ExtensionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Extension> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, resourceGroupName, clusterRp, clusterResourceName, clusterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}{?api%2Dversion,forceDelete}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
      forceDelete: options?.forceDelete,
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a Kubernetes Cluster Extension. This will cause the Agent to Uninstall the extension from the cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  patchExtension: PatchExtension,
  options: ExtensionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchExtensionSerializer(patchExtension),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Extension> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return extensionDeserializer(result.body);
}

/** Patch an existing Kubernetes Cluster Extension. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  patchExtension: PatchExtension,
  options: ExtensionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Extension>, Extension> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        patchExtension,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-11-01",
  }) as PollerLike<OperationState<Extension>, Extension>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  extension: Extension,
  options: ExtensionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: extensionSerializer(extension),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Extension> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return extensionDeserializer(result.body);
}

/** Create a new Kubernetes Cluster Extension. */
export function create(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  extension: Extension,
  options: ExtensionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Extension>, Extension> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        extensionName,
        extension,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-11-01",
  }) as PollerLike<OperationState<Extension>, Extension>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Extension> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return extensionDeserializer(result.body);
}

/** Gets Kubernetes Cluster Extension. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsGetOptionalParams = { requestOptions: {} },
): Promise<Extension> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    extensionName,
    options,
  );
  return _getDeserialize(result);
}
