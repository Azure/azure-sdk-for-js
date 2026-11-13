// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  AttachedAksCluster,
  _AttachedAksClusterListResult,
  AttachedAksClusterListItem,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  attachedAksClusterSerializer,
  attachedAksClusterDeserializer,
  _attachedAksClusterListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AttachedAksClustersListOptionalParams,
  AttachedAksClustersDeleteOptionalParams,
  AttachedAksClustersCreateOrUpdateOptionalParams,
  AttachedAksClustersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AttachedAksClustersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/attachedAksClusters{?api%2Dversion,%24filter,%24orderby,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skip": options?.skip,
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
): Promise<_AttachedAksClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _attachedAksClusterListResultDeserializer(result.body);
}

/**
 * Lists lightweight AKS attachment summaries for the account.
 * Use GET on an individual attachment to retrieve its full status and bindings.
 */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AttachedAksClustersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AttachedAksClusterListItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  attachedAksClusterName: string,
  options: AttachedAksClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/attachedAksClusters/{attachedAksClusterName}{?api%2Dversion,clusterDisposition}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      attachedAksClusterName: attachedAksClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
      clusterDisposition: !options?.clusterDisposition ? options?.clusterDisposition : "Keep",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<AttachedAksCluster | void> {
  const expectedStatuses = ["204", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (!result.body) {
    return;
  }

  return attachedAksClusterDeserializer(result.body);
}

/**
 * Detaches an AKS cluster while retaining the physical AKS and AI Manager
 * resources. A 202 response contains the current attachment; poll GET until
 * the attachment is no longer found. A 204 response indicates that the
 * attachment has been removed or did not exist.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  attachedAksClusterName: string,
  options: AttachedAksClustersDeleteOptionalParams = { requestOptions: {} },
): Promise<AttachedAksCluster | void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    attachedAksClusterName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  attachedAksClusterName: string,
  resource: AttachedAksCluster,
  options: AttachedAksClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/attachedAksClusters/{attachedAksClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      attachedAksClusterName: attachedAksClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attachedAksClusterSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AttachedAksCluster> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attachedAksClusterDeserializer(result.body);
}

/**
 * Attaches an existing AKS cluster to the account, or updates its attachment.
 * A 202 response contains the current attachment; poll GET and inspect
 * properties.status.stage for progress. A 200 response also contains the
 * current attachment state and does not by itself guarantee workload readiness.
 */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  attachedAksClusterName: string,
  resource: AttachedAksCluster,
  options: AttachedAksClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AttachedAksCluster> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    attachedAksClusterName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  attachedAksClusterName: string,
  options: AttachedAksClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/attachedAksClusters/{attachedAksClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      attachedAksClusterName: attachedAksClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-11-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AttachedAksCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attachedAksClusterDeserializer(result.body);
}

/** Gets an AKS attachment and its current provisioning and health status. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  attachedAksClusterName: string,
  options: AttachedAksClustersGetOptionalParams = { requestOptions: {} },
): Promise<AttachedAksCluster> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    attachedAksClusterName,
    options,
  );
  return _getDeserialize(result);
}
