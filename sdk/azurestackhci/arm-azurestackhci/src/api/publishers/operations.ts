// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type { Publisher, _PublisherList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  publisherDeserializer,
  _publisherListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PublishersListByClusterOptionalParams,
  PublishersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: PublishersListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
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
): Promise<_PublisherList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _publisherListDeserializer(result.body);
}

/** List Publishers available for the HCI Cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: PublishersListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Publisher> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  options: PublishersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/publishers/{publisherName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      publisherName: publisherName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Publisher> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return publisherDeserializer(result.body);
}

/** Get Publisher resource details of HCI Cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  publisherName: string,
  options: PublishersGetOptionalParams = { requestOptions: {} },
): Promise<Publisher> {
  const result = await _getSend(context, resourceGroupName, clusterName, publisherName, options);
  return _getDeserialize(result);
}
