// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedHatOpenShiftContext as Client } from "../index.js";
import type {
  HcpOpenShiftCluster,
  HcpOpenShiftClusterResourceCreate,
  HcpOpenShiftClusterUpdate,
  _HcpOpenShiftClusterListResult,
  HcpOpenShiftClusterAdminCredential,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  hcpOpenShiftClusterDeserializer,
  hcpOpenShiftClusterResourceCreateSerializer,
  hcpOpenShiftClusterUpdateSerializer,
  _hcpOpenShiftClusterListResultDeserializer,
  hcpOpenShiftClusterAdminCredentialDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HcpOpenShiftClustersRevokeCredentialsOptionalParams,
  HcpOpenShiftClustersRequestAdminCredentialOptionalParams,
  HcpOpenShiftClustersListBySubscriptionOptionalParams,
  HcpOpenShiftClustersListByResourceGroupOptionalParams,
  HcpOpenShiftClustersDeleteOptionalParams,
  HcpOpenShiftClustersUpdateOptionalParams,
  HcpOpenShiftClustersCreateOrUpdateOptionalParams,
  HcpOpenShiftClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _revokeCredentialsSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersRevokeCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/revokeCredentials{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _revokeCredentialsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Revoke all credentials issued by requestAdminCredential */
export function revokeCredentials(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersRevokeCredentialsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _revokeCredentialsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _revokeCredentialsSend(context, resourceGroupName, hcpOpenShiftClusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-30-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _requestAdminCredentialSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersRequestAdminCredentialOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}/requestAdminCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
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

export async function _requestAdminCredentialDeserialize(
  result: PathUncheckedResponse,
): Promise<HcpOpenShiftClusterAdminCredential> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hcpOpenShiftClusterAdminCredentialDeserializer(result.body);
}

/** Request a temporary admin kubeconfig for the cluster */
export function requestAdminCredential(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersRequestAdminCredentialOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<HcpOpenShiftClusterAdminCredential>,
  HcpOpenShiftClusterAdminCredential
> {
  return getLongRunningPoller(context, _requestAdminCredentialDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _requestAdminCredentialSend(context, resourceGroupName, hcpOpenShiftClusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-30-preview",
  }) as PollerLike<
    OperationState<HcpOpenShiftClusterAdminCredential>,
    HcpOpenShiftClusterAdminCredential
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: HcpOpenShiftClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_HcpOpenShiftClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hcpOpenShiftClusterListResultDeserializer(result.body);
}

/** List HcpOpenShiftCluster resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: HcpOpenShiftClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HcpOpenShiftCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-30-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: HcpOpenShiftClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
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
): Promise<_HcpOpenShiftClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _hcpOpenShiftClusterListResultDeserializer(result.body);
}

/** List HcpOpenShiftCluster resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: HcpOpenShiftClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HcpOpenShiftCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-30-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
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

/** Delete a HcpOpenShiftCluster */
export function $delete(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, hcpOpenShiftClusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-30-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  properties: HcpOpenShiftClusterUpdate,
  options: HcpOpenShiftClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hcpOpenShiftClusterUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<HcpOpenShiftCluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hcpOpenShiftClusterDeserializer(result.body);
}

/** Update a HcpOpenShiftCluster */
export function update(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  properties: HcpOpenShiftClusterUpdate,
  options: HcpOpenShiftClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HcpOpenShiftCluster>, HcpOpenShiftCluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, hcpOpenShiftClusterName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-30-preview",
  }) as PollerLike<OperationState<HcpOpenShiftCluster>, HcpOpenShiftCluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  resource: HcpOpenShiftClusterResourceCreate,
  options: HcpOpenShiftClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: hcpOpenShiftClusterResourceCreateSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HcpOpenShiftCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hcpOpenShiftClusterDeserializer(result.body);
}

/** Create a HcpOpenShiftCluster */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  resource: HcpOpenShiftClusterResourceCreate,
  options: HcpOpenShiftClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HcpOpenShiftCluster>, HcpOpenShiftCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, hcpOpenShiftClusterName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-30-preview",
  }) as PollerLike<OperationState<HcpOpenShiftCluster>, HcpOpenShiftCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RedHatOpenShift/hcpOpenShiftClusters/{hcpOpenShiftClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      hcpOpenShiftClusterName: hcpOpenShiftClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-06-30-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HcpOpenShiftCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return hcpOpenShiftClusterDeserializer(result.body);
}

/** Get a HcpOpenShiftCluster */
export async function get(
  context: Client,
  resourceGroupName: string,
  hcpOpenShiftClusterName: string,
  options: HcpOpenShiftClustersGetOptionalParams = { requestOptions: {} },
): Promise<HcpOpenShiftCluster> {
  const result = await _getSend(context, resourceGroupName, hcpOpenShiftClusterName, options);
  return _getDeserialize(result);
}
