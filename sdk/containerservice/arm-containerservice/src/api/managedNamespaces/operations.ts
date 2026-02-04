// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  TagsObject,
  CredentialResults,
  ManagedNamespace,
  _ManagedNamespaceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  tagsObjectSerializer,
  credentialResultsDeserializer,
  managedNamespaceSerializer,
  managedNamespaceDeserializer,
  _managedNamespaceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedNamespacesListCredentialOptionalParams,
  ManagedNamespacesListByManagedClusterOptionalParams,
  ManagedNamespacesDeleteOptionalParams,
  ManagedNamespacesUpdateOptionalParams,
  ManagedNamespacesCreateOrUpdateOptionalParams,
  ManagedNamespacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listCredentialSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  options: ManagedNamespacesListCredentialOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}/listCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      managedNamespaceName: managedNamespaceName,
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

export async function _listCredentialDeserialize(
  result: PathUncheckedResponse,
): Promise<CredentialResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return credentialResultsDeserializer(result.body);
}

/** Lists the credentials of a namespace. */
export async function listCredential(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  options: ManagedNamespacesListCredentialOptionalParams = { requestOptions: {} },
): Promise<CredentialResults> {
  const result = await _listCredentialSend(
    context,
    resourceGroupName,
    resourceName,
    managedNamespaceName,
    options,
  );
  return _listCredentialDeserialize(result);
}

export function _listByManagedClusterSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedNamespacesListByManagedClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
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

export async function _listByManagedClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedNamespaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedNamespaceListResultDeserializer(result.body);
}

/** Gets a list of managed namespaces in the specified managed cluster. */
export function listByManagedCluster(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ManagedNamespacesListByManagedClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedClusterSend(context, resourceGroupName, resourceName, options),
    _listByManagedClusterDeserialize,
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
  resourceName: string,
  managedNamespaceName: string,
  options: ManagedNamespacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      managedNamespaceName: managedNamespaceName,
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

/** Deletes a namespace. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  options: ManagedNamespacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, resourceName, managedNamespaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  parameters: TagsObject,
  options: ManagedNamespacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      managedNamespaceName: managedNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagedNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedNamespaceDeserializer(result.body);
}

/** Updates tags on a managed namespace. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  parameters: TagsObject,
  options: ManagedNamespacesUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagedNamespace> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    managedNamespaceName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  parameters: ManagedNamespace,
  options: ManagedNamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      managedNamespaceName: managedNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedNamespaceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedNamespace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedNamespaceDeserializer(result.body);
}

/** Creates or updates a namespace managed by ARM for the specified managed cluster. Users can configure aspects like resource quotas, network ingress/egress policies, and more. See aka.ms/aks/managed-namespaces for more details. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  parameters: ManagedNamespace,
  options: ManagedNamespacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedNamespace>, ManagedNamespace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        resourceName,
        managedNamespaceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ManagedNamespace>, ManagedNamespace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  options: ManagedNamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      managedNamespaceName: managedNamespaceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedNamespaceDeserializer(result.body);
}

/** Gets the specified namespace of a managed cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  managedNamespaceName: string,
  options: ManagedNamespacesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedNamespace> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    managedNamespaceName,
    options,
  );
  return _getDeserialize(result);
}
