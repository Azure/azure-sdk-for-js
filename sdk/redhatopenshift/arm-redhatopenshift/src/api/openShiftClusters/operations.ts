// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext as Client } from "../index.js";
import type {
  OpenShiftCluster,
  OpenShiftClusterUpdate,
  _OpenShiftClusterList,
  OpenShiftClusterAdminKubeconfig,
  OpenShiftClusterCredentials,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  openShiftClusterSerializer,
  openShiftClusterDeserializer,
  openShiftClusterUpdateSerializer,
  _openShiftClusterListDeserializer,
  openShiftClusterAdminKubeconfigDeserializer,
  openShiftClusterCredentialsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OpenShiftClustersListCredentialsOptionalParams,
  OpenShiftClustersListAdminCredentialsOptionalParams,
  OpenShiftClustersListOptionalParams,
  OpenShiftClustersListByResourceGroupOptionalParams,
  OpenShiftClustersDeleteOptionalParams,
  OpenShiftClustersUpdateOptionalParams,
  OpenShiftClustersCreateOrUpdateOptionalParams,
  OpenShiftClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listCredentialsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersListCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}/listCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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

export async function _listCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenShiftClusterCredentials> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return openShiftClusterCredentialsDeserializer(result.body);
}

/** The operation returns the credentials. */
export async function listCredentials(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersListCredentialsOptionalParams = { requestOptions: {} },
): Promise<OpenShiftClusterCredentials> {
  const result = await _listCredentialsSend(context, resourceGroupName, resourceName, options);
  return _listCredentialsDeserialize(result);
}

export function _listAdminCredentialsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersListAdminCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}/listAdminCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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

export async function _listAdminCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenShiftClusterAdminKubeconfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return openShiftClusterAdminKubeconfigDeserializer(result.body);
}

/** The operation returns the admin kubeconfig. */
export async function listAdminCredentials(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersListAdminCredentialsOptionalParams = { requestOptions: {} },
): Promise<OpenShiftClusterAdminKubeconfig> {
  const result = await _listAdminCredentialsSend(context, resourceGroupName, resourceName, options);
  return _listAdminCredentialsDeserialize(result);
}

export function _listSend(
  context: Client,
  options: OpenShiftClustersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/openShiftClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_OpenShiftClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _openShiftClusterListDeserializer(result.body);
}

/** The operation returns properties of each OpenShift cluster. */
export function list(
  context: Client,
  options: OpenShiftClustersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OpenShiftCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-25" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: OpenShiftClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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
): Promise<_OpenShiftClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _openShiftClusterListDeserializer(result.body);
}

/** The operation returns properties of each OpenShift cluster. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: OpenShiftClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OpenShiftCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-25" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** The operation returns nothing. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-25",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: OpenShiftClusterUpdate,
  options: OpenShiftClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: openShiftClusterUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<OpenShiftCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return openShiftClusterDeserializer(result.body);
}

/** The operation returns properties of a OpenShift cluster. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: OpenShiftClusterUpdate,
  options: OpenShiftClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-25",
  }) as PollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: OpenShiftCluster,
  options: OpenShiftClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: openShiftClusterSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenShiftCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return openShiftClusterDeserializer(result.body);
}

/** The operation returns properties of a OpenShift cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: OpenShiftCluster,
  options: OpenShiftClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-25",
  }) as PollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/openShiftClusters/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OpenShiftCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return openShiftClusterDeserializer(result.body);
}

/** The operation returns properties of a OpenShift cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: OpenShiftClustersGetOptionalParams = { requestOptions: {} },
): Promise<OpenShiftCluster> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
